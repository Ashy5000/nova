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
          <img src="eth.png" width={20} height={20} className="inline"></img>
        </div>
        <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
          <input
            className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
            type="number"
            value={stakeEth * 10}
          />
          &nbsp; <b>AAVE</b>&nbsp;
          <img src="aave.svg" width={30} height={30} className="inline"></img>
        </div>
        <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
          <input
            className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
            type="number"
            value={stakeEth}
          />
          &nbsp; <b>MKR</b>&nbsp;&nbsp;
          <svg
            width="30"
            height="15"
            viewBox="0 0 38 20"
            fill="none"
            className="inline"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.89486 4.10903V19.0599H0V1.69174C0 0.298924 1.59119 -0.495032 2.70406 0.342453L16.4546 10.6903C16.8786 11.0094 17.1279 11.5091 17.1279 12.0396V19.0599H14.2331V12.6415L2.89486 4.10903Z"
              fill="#333333"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M34.5319 4.10903V19.0599H37.4268V1.69174C37.4268 0.298924 35.8356 -0.495032 34.7227 0.342453L20.9721 10.6903C20.5482 11.0094 20.2988 11.5091 20.2988 12.0396V19.0599H23.1937V12.6415L34.5319 4.10903Z"
              fill="#333333"
            ></path>
          </svg>
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
          <input
            className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
            type="number"
            value={unstakeUnova * 0.002}
          />
          &nbsp; <b>ETH</b>&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="eth.png" width={20} height={20} className="inline"></img>
        </div>
        <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
          <input
            className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
            type="number"
            value={unstakeUnova * 0.02}
          />
          &nbsp; <b>AAVE</b>&nbsp;
          <img src="aave.svg" width={30} height={30} className="inline"></img>
        </div>
        <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
          <input
            className="w-36 my-2 bg-gray-800 rounded-sm cursor-not-allowed p-1"
            type="number"
            value={unstakeUnova * 0.002}
          />
          &nbsp; <b>MKR</b>&nbsp;&nbsp;
          <svg
            width="30"
            height="15"
            viewBox="0 0 38 20"
            fill="none"
            className="inline"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.89486 4.10903V19.0599H0V1.69174C0 0.298924 1.59119 -0.495032 2.70406 0.342453L16.4546 10.6903C16.8786 11.0094 17.1279 11.5091 17.1279 12.0396V19.0599H14.2331V12.6415L2.89486 4.10903Z"
              fill="#333333"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M34.5319 4.10903V19.0599H37.4268V1.69174C37.4268 0.298924 35.8356 -0.495032 34.7227 0.342453L20.9721 10.6903C20.5482 11.0094 20.2988 11.5091 20.2988 12.0396V19.0599H23.1937V12.6415L34.5319 4.10903Z"
              fill="#333333"
            ></path>
          </svg>
        </div>
        <br />
        <button className="backdrop-blur-md backdrop-brightness-90 py-1 w-64 rounded-sm">
          <mark className="bg-foreground">Unwrap</mark>
        </button>
      </div>
    </div>
  );
}
