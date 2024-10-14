import { useState } from "react";

import { ethers, Contract } from "ethers";

export default function UNOVAManager(props) {
  const [unstakeUnova, setUnstakeUnova] = useState(500);
  const [stakeEth, setStakeEth] = useState(1);

  async function wrap() {
    const approveTx = await props.WETH.approve(
      "0x54fDA4D66093eA51E5Be7dfDE77511666401426c",
      stakeEth,
    );
    await approveTx.wait();
    const wrapTx = await props.uNOVA.wrap(BigInt(stakeEth));
    await wrapTx.wait();
  }

  return (
    <div>
      <br />
      <div className="backdrop-brightness-50 rounded-sm w-min p-3 ml-12">
        <mark className="dark:invert bg-foreground">Balance:</mark>
        <br />
        <mark className="dark:invert bg-foreground text-2xl">
          <b>100</b>
        </mark>
        <br />
        <mark className="dark:invert bg-foreground">uNOVA</mark>
      </div>
      <div className="flex justify-evenly">
        <div className="dark:invert backdrop-brightness-95 rounded-sm p-5 m-12 w-screen min-h-96">
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3">
            <b>Wrap</b>
            <br />
            Deposit your ETH, AAVE, and MKR into a contract to mint new uNOVA.
            <br />
            <i>Fixed rate</i>
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <img src="eth.png" className="inline w-6 m-2"></img>
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm p-1"
              type="number"
              value={stakeEth}
              onChange={(e) => {
                if (
                  isNaN(e.target.value) ||
                  isNaN(parseFloat(e.target.value))
                ) {
                  return;
                }
                setStakeEth(e.target.value);
              }}
            />
            &nbsp; <b>ETH</b>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <img src="aave.svg" className="inline w-6 m-2"></img>
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
              type="number"
              value={stakeEth * 10}
            />
            &nbsp; <b>AAVE</b>&nbsp;
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <img src="mkr.svg" className="inline w-6 m-2"></img>
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
              type="number"
              value={stakeEth}
            />
            &nbsp; <b>MKR</b>&nbsp;&nbsp;
          </div>
          <div className="flex justify-center">
            <img
              src="arrow.svg"
              width={50}
              height={50}
              className="opacity-70"
            />
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
              type="number"
              value={stakeEth / 0.002}
            />
            &nbsp; <b>uNOVA</b>
          </div>
          <br />
          <button
            className="backdrop-blur-md backdrop-brightness-90 py-1 w-64 rounded-sm"
            onClick={wrap}
          >
            <mark className="bg-foreground">Wrap</mark>
          </button>
        </div>
        <div className="dark:invert backdrop-brightness-90 rounded-sm p-5 m-12 w-screen min-h-96">
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3">
            <b>Unwrap</b>
            <br />
            Burn uNOVA in a contract to receive ETH.
            <br />
            <i>Fixed rate</i>
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm p-1"
              type="number"
              value={unstakeUnova}
              onChange={(e) => {
                if (
                  isNaN(e.target.value) ||
                  isNaN(parseFloat(e.target.value))
                ) {
                  return;
                }
                setUnstakeUnova(e.target.value);
              }}
            />
            &nbsp; <b>uNOVA</b>
          </div>
          <div className="flex justify-center">
            <img
              src="arrow.svg"
              width={50}
              height={50}
              className="opacity-70"
            />
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <img src="eth.png" className="inline w-6 m-2"></img>
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
              type="number"
              value={unstakeUnova * 0.002}
            />
            &nbsp; <b>ETH</b>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <img src="aave.svg" className="inline w-6 m-2"></img>
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
              type="number"
              value={unstakeUnova * 0.02}
            />
            &nbsp; <b>AAVE</b>&nbsp;
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <img src="mkr.svg" className="inline w-6 m-2"></img>
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
              type="number"
              value={unstakeUnova * 0.002}
            />
            &nbsp; <b>MKR</b>&nbsp;&nbsp;
          </div>
          <br />
          <button className="backdrop-blur-md backdrop-brightness-90 py-1 w-64 rounded-sm">
            <mark className="bg-foreground">Unwrap</mark>
          </button>
        </div>
      </div>
    </div>
  );
}
