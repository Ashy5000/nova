import { useState } from "react";

import { ethers, Contract } from "ethers";

export default function StkNOVAManager(props) {
  const [unstakeUnova, setUnstakeUnova] = useState(1);
  const [stakeUnova, setStakeUnova] = useState(1);
  const [stkNOVABalance, setStkNOVABalance] = useState(0);

  async function stake() {
    const approveTx = await props.uNOVA.approve(
      "0xBAe4489C0a09A60279cD25215A701F60f0A84b41",
      stakeUnova,
    );
    await approveTx.wait();
    const stakeTx = await props.pool.provide(BigInt(stakeUnova));
    await stakeTx.wait();
  }
  async function unstake() {
    const unstakeTx = await props.pool.withdraw(BigInt(unstakeUnova));
    await unstakeTx.wait();
  }

  async function calculateBalance() {
    if (stkNOVABalance != 0 || props.pool == null || props.user == null) {
      return;
    }
    const balance = await props.pool.getAccountCredit(props.user);
    setStkNOVABalance(Number(balance));
  }

  calculateBalance();

  return (
    <div>
      <br />
      <div className="backdrop-brightness-50 rounded-sm w-min p-3 ml-12">
        <mark className="dark:invert bg-foreground">Balance:</mark>
        <br />
        <mark className="dark:invert bg-foreground text-2xl">
          <b>{stkNOVABalance}</b>
        </mark>
        <br />
        <mark className="dark:invert bg-foreground">stkNOVA</mark>
      </div>
      <div className="flex justify-evenly">
        <div className="dark:invert backdrop-brightness-95 rounded-sm p-5 m-12 w-screen min-h-96">
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3">
            <b>Stake</b>
            <br />
            Deposit your uNOVA into the Pool for stkNOVA credit.
            <br />
            <i>Variable rate</i>
          </div>
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3 my-2">
            <input
              className="w-36 my-2 bg-gray-800 rounded-sm p-1"
              type="number"
              value={stakeUnova}
              onChange={(e) => {
                if (
                  isNaN(e.target.value) ||
                  isNaN(parseFloat(e.target.value))
                ) {
                  return;
                }
                setStakeUnova(e.target.value);
              }}
            />
            &nbsp; <b>uNOVA</b>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <br />
          <button
            className="backdrop-blur-md backdrop-brightness-90 py-1 w-64 rounded-sm"
            onClick={stake}
          >
            <mark className="bg-foreground">Wrap</mark>
          </button>
        </div>
        <div className="dark:invert backdrop-brightness-90 rounded-sm p-5 m-12 w-screen min-h-96">
          <div className="backdrop-blur-md backdrop-brightness-50 rounded-sm p-3">
            <b>Unstake</b>
            <br />
            Unstake your stkNOVA for uNOVA.
            <br />
            <i>Variable rate</i>
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
          <br />
          <button
            className="backdrop-blur-md backdrop-brightness-90 py-1 w-64 rounded-sm"
            onClick={unstake}
          >
            <mark className="bg-foreground">Unwrap</mark>
          </button>
        </div>
      </div>
    </div>
  );
}
