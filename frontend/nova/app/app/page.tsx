"use client";

import "./tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UNOVAManager from "./unova_manager";
import StkNOVAManager from "./stknova_manager";
import NOVAManager from "./nova_manager";
import { useState } from "react";
import { Contract, ethers } from "ethers";
import Statistics from "./statistics";

export default function App() {
  const [walletReady, setWalletReady] = useState(false);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [uNOVAContract, setuNOVAContract] = useState(null);
  const [WETHContract, setWETHContract] = useState(null);
  const [poolContract, setPoolContract] = useState(null);
  const [NOVAContract, setNOVAContract] = useState(null);

  async function connectWallet() {
    if (walletReady) {
      return;
    }
    if (window.ethereum == null) {
      alert(
        "For the moment, Nova only supports the Metamask browser wallet, and it looks like it's not installed.",
      );
      return;
    }
    let providerTmp = new ethers.JsonRpcProvider("https://1rpc.io/sepolia");
    let signerTmp = await new ethers.BrowserProvider(
      window.ethereum,
    ).getSigner();
    fetch("uNOVAAbi.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (abi) {
        const contract = new Contract(
          "0x54fDA4D66093eA51E5Be7dfDE77511666401426c",
          abi,
          signerTmp,
        );
        setuNOVAContract(contract);
      })
      .catch(function (err) {
        alert(err);
      });
    fetch("erc20abi.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (abi) {
        const contract = new ethers.Contract(
          "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
          abi,
          signerTmp,
        );
        setWETHContract(contract);
      });
    fetch("poolabi.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (abi) {
        const contract = new ethers.Contract(
          "0xBAe4489C0a09A60279cD25215A701F60f0A84b41",
          abi,
          signerTmp,
        );
        fetch("NOVAAbi.json")
          .then(function (response) {
            return response.json();
          })
          .then(async function (tokenAbi) {
            console.log(tokenAbi);
            const tokenContract = new ethers.Contract(
              await contract.getNOVAContract(),
              tokenAbi,
              signerTmp,
            );
            setNOVAContract(tokenContract);
          })
          .catch(function (err) {
            alert(err);
          });
        setPoolContract(contract);
      })
      .catch(function (err) {
        alert(err);
      });
    setProvider(providerTmp);
    setSigner(signerTmp);
    setWalletReady(true);
  }

  return (
    <div className="dark:invert backdrop-brightness-90 rounded-sm p-5 m-12 font-[family-name:var(--font-geist-sans)]">
      <span className="flex items-center">
        <span className="text-7xl">✧</span>
        <span className="text-3xl">&nbsp;Dashboard</span>
      </span>
      <br />
      <br />
      <button
        className="dark:invert backdrop-brightness-90 rounded p-1 my-1 bg-black w-48 hover:bg-inherit"
        onClick={connectWallet}
      >
        Connect
      </button>
      <br />
      <b>IMPORTANT</b>: This interface displays 0.0000000000000000001 token as 1
      token to enable easier trading with small amounts.
      {walletReady ? (
        <div>
          <br />
          <Statistics pool={poolContract} />
          <br />
          <Tabs>
            <TabList>
              <Tab>uNOVA</Tab>
              <Tab>stkNOVA</Tab>
              <Tab>NOVA</Tab>
            </TabList>
            <TabPanel>
              <mark class="dark:invert bg-foreground">Manage your uNOVA.</mark>
              <UNOVAManager
                uNOVA={uNOVAContract}
                WETH={WETHContract}
                user={signer}
              />
            </TabPanel>
            <TabPanel>
              <mark class="dark:invert bg-foreground">
                Manage your stkNOVA.
              </mark>
              <StkNOVAManager
                pool={poolContract}
                uNOVA={uNOVAContract}
                user={signer}
              />
            </TabPanel>
            <TabPanel>
              <mark class="dark:invert bg-foreground">Manage your NOVA.</mark>
              <NOVAManager
                pool={poolContract}
                uNOVA={uNOVAContract}
                nova={NOVAContract}
              />
            </TabPanel>
          </Tabs>
        </div>
      ) : (
        <div>
          <br />
          <mark class="dark:invert bg-foreground">
            Please connect your wallet.
          </mark>
        </div>
      )}
    </div>
  );
}
