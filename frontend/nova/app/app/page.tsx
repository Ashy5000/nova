"use client";

import "./tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";

export default function App() {
  const [walletReady, setWalletReady] = useState(false);
  return (
    <div class="dark:invert backdrop-brightness-90 rounded-sm p-5 m-12">
      <span className="flex items-center">
        <span className="text-7xl">✧</span>
        <span className="text-3xl">&nbsp;Dashboard</span>
      </span>
      <br />
      <br />
      <button class="dark:invert backdrop-brightness-90 rounded p-1 my-1 bg-black w-48 hover:bg-inherit">
        Connect
      </button>
      <br />
      {walletReady ? (
        <Tabs>
          <TabList>
            <Tab>uNOVA</Tab>
            <Tab>stkNOVA</Tab>
            <Tab>NOVA</Tab>
          </TabList>
          <TabPanel>
            <mark class="dark:invert bg-foreground">Manage your uNOVA.</mark>
          </TabPanel>
          <TabPanel>
            <mark class="dark:invert bg-foreground">Manage your stkNOVA.</mark>
          </TabPanel>
          <TabPanel>
            <mark class="dark:invert bg-foreground">Manage your NOVA.</mark>
          </TabPanel>
        </Tabs>
      ) : (
        <mark class="dark:invert bg-foreground">
          Please connect your wallet.
        </mark>
      )}
    </div>
  );
}
