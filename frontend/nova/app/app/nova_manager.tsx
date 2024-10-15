import { useState } from "react";

import { ethers, Contract } from "ethers";

export default function NOVAManager(props) {
  const [mintNova, setMintNova] = useState(1);
  const [burnNova, setBurnNova] = useState(1);
  const [NOVABalance, setNOVABalance] = useState(0);

  async function mint() {
    const uNOVAAmount =
      (BigInt(mintNova) * BigInt(1_00000_00000_00000) * BigInt(1000)) /
      (await props.pool.uNOVAValue());
    const approveTx = await props.uNOVA.approve(
      "0xBAe4489C0a09A60279cD25215A701F60f0A84b41",
      uNOVAAmount,
    );
    await approveTx.wait();
    const mintTx = await props.pool.mintNOVA(mintNova);
    await mintTx.wait();
  }

  async function burn() {
    const burnTx = await props.pool.burnNOVA(burnNova);
    await burnTx.wait();
  }

  async function calculateBalance() {
    if (NOVABalance != 0 || props.nova == null || props.user == null) {
      return;
    }
    const balance = await props.nova.getAccountCredit(props.user);
    setNOVABalance(Number(balance));
  }

  calculateBalance();

  return (
    <div>
      <br />
      <div className="backdrop-brightness-50 rounded-sm w-min p-3 ml-12">
        <mark className="dark:invert bg-foreground">Balance:</mark>
        <br />
        <mark className="dark:invert bg-foreground text-2xl">
          <b>{NOVABalance}</b>
        </mark>
        <br />
        <mark className="dark:invert bg-foreground">NOVA</mark>
      </div>
      <div className="flex justify-evenly">
        <div className="dark:invert backdrop-brightness-95 rounded-sm p-5 m-12 w-screen min-h-96">
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3">
            <b>Mint</b>
            <br />
            Deposit your uNOVA into the Pool and mint NOVA.
            <br />
            <i>Variable rate</i>
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm p-1"
              type="number"
              value={mintNova}
              onChange={(e) => {
                if (
                  isNaN(e.target.value) ||
                  isNaN(parseFloat(e.target.value))
                ) {
                  return;
                }
                setMintNova(e.target.value);
              }}
            />
            &nbsp; <b>NOVA</b>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <br />
          <button
            className="backdrop-blur-md backdrop-brightness-90 py-1 w-64 rounded-sm"
            onClick={mint}
          >
            <mark className="bg-foreground">Mint</mark>
          </button>
        </div>
        <div className="dark:invert backdrop-brightness-90 rounded-sm p-5 m-12 w-screen min-h-96">
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3">
            <b>Burn</b>
            <br />
            Burn your NOVA and receive uNOVA.
            <br />
            <i>Variable rate</i>
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm p-1"
              type="number"
              value={burnNova}
              onChange={(e) => {
                if (
                  isNaN(e.target.value) ||
                  isNaN(parseFloat(e.target.value))
                ) {
                  return;
                }
                setBurnNova(e.target.value);
              }}
            />
            &nbsp; <b>NOVA</b>
          </div>
          <br />
          <button
            className="backdrop-blur-md backdrop-brightness-90 py-1 w-64 rounded-sm"
            onClick={burn}
          >
            <mark className="bg-foreground">Burn</mark>
          </button>
        </div>
      </div>
    </div>
  );
}
