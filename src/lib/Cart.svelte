<script lang="ts">
  import CartItem from "./CartItem.svelte";
  import { cart } from "./stores/cart";
</script>

<ul class="pt-10">
  {#each $cart as item}
    <CartItem {item} />
  {/each}
</ul>
