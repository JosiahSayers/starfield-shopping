<script lang="ts">
  import Plus from "./icons/Plus.svelte";
  import Minus from "./icons/Minus.svelte";
  import { cart, type CartItem } from "./stores/cart";
  import ResourceBadges from "./ResourceBadges.svelte";
  import { scale } from "svelte/transition";

  export let item: CartItem;

  function increment() {
    cart.increment(item.id);
  }

  function decrement() {
    cart.decrement(item.id);
  }
</script>

<li class="pt-6">
  <div class="card w-full bg-primary">
    <div class="card-body p-4 flex flex-row items-center justify-between">
      <div class="flex flex-col half">
        <p class="font-semibold text-lg">
          {item.name}
          {#if item.shortName}
            - {item.shortName}
          {/if}
        </p>
        <ResourceBadges resource={item} />
      </div>

      <div class="counter flex flex-row items-center">
        <button class="btn btn-circle" on:click={decrement}><Minus /></button>
        {#key item.quantity}
          <p class="px-2 font-bold text-lg" in:scale>{item.quantity}</p>
        {/key}
        <button class="btn btn-circle" on:click={increment}><Plus /> </button>
      </div>
    </div>
  </div>
</li>

<style>
  .half {
    max-width: 60%;
  }
</style>
