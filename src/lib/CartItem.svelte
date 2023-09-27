<script lang="ts">
  import Plus from "./icons/Plus.svelte";
  import Minus from "./icons/Minus.svelte";
  import { cart, type CartItem } from "./stores/cart";

  export let item: CartItem;

  function increment() {
    cart.increment(item.name);
  }

  function decrement() {
    cart.decrement(item.name);
  }
</script>

<li class="pt-6">
  <div class="card w-full bg-primary">
    <div class="card-body flex flex-row items-center">
      <p>{item.name}</p>
      <div class="counter flex flex-row items-center">
        <button class="btn btn-circle" on:click={decrement}><Minus /></button>
        <p class="px-2">{item.quantity}</p>
        <button class="btn btn-circle" on:click={increment}><Plus /> </button>
      </div>
    </div>
  </div>
</li>
