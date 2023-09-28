<script lang="ts">
  import { cartTotals } from "./stores/cart";
  import credit from "../assets/credit.png";
</script>

<div class="flex flex-col items-end">
  <div>
    <p class="flex content-center items-center justify-between mt-10">
      <span class="font-bold mr-4">Estimated cost:</span>
      <img
        src={credit}
        alt="starfield credit logo"
        class="h-4"
      />{$cartTotals.price}
    </p>
    <p class="flex justify-between">
      <span class="font-bold mr-4">Estimated weight:</span>
      <span>{$cartTotals.weight}</span>
    </p>
  </div>
</div>
