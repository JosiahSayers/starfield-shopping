<script lang="ts">
  import { slide } from "svelte/transition";
  import CartItem from "./CartItem.svelte";
  import { cart } from "./stores/cart";
</script>

<ul class="pt-10">
  {#each $cart as item (item.id)}
    <div transition:slide>
      <CartItem {item} />
    </div>
  {/each}
</ul>
