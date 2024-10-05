import { useState } from "react";

export default function UNOVAManager() {
  const [unstakeUnova, setUnstakeUnova] = useState(500);
  const [stakeEth, setStakeEth] = useState(1);
  return (
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
              if (isNaN(e.target.value) || isNaN(parseFloat(e.target.value))) {
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
          <img src="arrow.svg" width={50} height={50} className="opacity-70" />
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
        <button className="backdrop-blur-md backdrop-brightness-90 py-1 w-64 rounded-sm">
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
              if (isNaN(e.target.value) || isNaN(parseFloat(e.target.value))) {
                return;
              }
              setUnstakeUnova(e.target.value);
            }}
          />
          &nbsp; <b>uNOVA</b>
        </div>
        <div className="flex justify-center">
          <img src="arrow.svg" width={50} height={50} className="opacity-70" />
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
  );
}
