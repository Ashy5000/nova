import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-[family-name:var(--font-merriweather)]">
          NOVA
        </h1>
        <p className="text-xl font-[family-name:var(--font-merriweather)] dark:invert">
          The revelation
          <br />
          of DeFi.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="./app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex dark:invert items-center">
              <span className="text-2xl">✧</span>
              &nbsp; Launch app
            </span>
          </a>
          <div className="group relative w-max">
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 cursor-not-allowed"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
            <span className="pointer-events-none absolute -bottom-7 left-3 w-max opacity-0 transition-opacity group-hover:opacity-100 dark:invert">
              Coming soon!
            </span>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a> */}
        <div class="dark:invert backdrop-brightness-90 rounded-sm p-5">
          <mark class="dark:invert bg-foreground">
            <b>Notes: About NOVA</b>
            <br />
            DAI has long been the decentralized stablecoin of choice for DeFi
            users. But coming soon are the risks associated with lower liquidity
            on the DAI stablecoin due to its centralized replacement, USDS.
            Also, it's mostly backed by USDC, a centralized stablecoin. Nova is
            the solution. It's a decentralized stablecoin that leverages
            trustless assets for liquidity: 0% of Nova's collateral is
            centralized.
          </mark>
        </div>
      </footer>
    </div>
  );
}
