<script lang="ts">
  import { cart, cartTotals } from "./stores/cart";
  import credit from "../assets/credit.png";
  import { tweened } from "svelte/motion";
  import ClearCart from "./ClearCart.svelte";

  const estimatedCost = tweened($cartTotals.price || 0);
  const estimatedWeight = tweened($cartTotals.weight || 0);

  cartTotals.subscribe((totals) => {
    estimatedCost.set(totals.price);
    estimatedWeight.set(totals.weight);
  });
</script>

<div class="flex justify-between items-center mt-10">
  <div class="h-full">
    <ClearCart />
  </div>
  <div>
    <p class="flex content-center items-center justify-between">
      <span class="font-bold mr-4">Estimated cost:</span>
      <img src={credit} alt="starfield credit logo" class="h-4" />{Math.floor(
        $estimatedCost
      )}
    </p>
    <p class="flex justify-between">
      <span class="font-bold mr-4">Estimated weight:</span>
      <span>{$estimatedWeight.toFixed(2)}</span>
    </p>
  </div>
</div>
