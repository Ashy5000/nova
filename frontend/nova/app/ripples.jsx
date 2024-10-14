export function runRipples() {
  $("body").ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04,
  });

  // $("body").ripples("set", "interactive", false);

  setInterval(function () {
    $("body").ripples(
      "drop",
      $(document).width() / 2,
      $(document).height() / 2,
      10,
      0.05,
    );
  }, 4000);
}
