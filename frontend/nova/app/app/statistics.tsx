"use client";
import { useState } from "react";

export default function Statistics(props) {
  const [collateralization, setCollateralization] = useState(0);
  const [uNOVAPrice, setuNOVAPrice] = useState(0);
  async function update() {
    if (props.pool == null) {
      return;
    }
    const uNOVAValue = await props.pool.uNOVAValue();
    setuNOVAPrice(Number(uNOVAValue));
    const collateralizationTmp = await props.pool.calculateCollateralization(
      uNOVAValue,
      "0xbaddcafedeadbeefbaddcafedeadbeefbaddcafe",
    );
    setCollateralization(Number(collateralizationTmp));
  }
  update();
  return (
    <div className="backdrop-brightness-90 dark:invert rounded-sm p-3">
      <b>Statistics</b>
      <div className="flex justify-evenly">
        <div className="backdrop-brightness-90 dark:invert rounded-sm p-3">
          <p>
            <mark className="dark:invert bg-foreground">
              <b>
                {(Math.round((collateralization / 10000) * 100) / 100).toFixed(
                  2,
                )}
                %
              </b>
            </mark>
          </p>
          <mark className="dark:invert bg-foreground">Collateralization</mark>
        </div>
        <div className="backdrop-brightness-90 dark:invert rounded-sm p-3">
          <p>
            <mark className="dark:invert bg-foreground">
              <b>
                {(
                  Math.round((uNOVAPrice / 1000000000000000000) * 100) / 100
                ).toFixed(2)}
                $
              </b>
            </mark>
          </p>
          <mark className="dark:invert bg-foreground">uNOVA price</mark>
        </div>
      </div>
    </div>
  );
}
