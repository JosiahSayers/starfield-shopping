<script lang="ts">
  import Navbar from "./lib/Navbar.svelte";
  import AppTheme from "./lib/AppTheme.svelte";
  import CartItem from "./lib/CartItem.svelte";
  import Search from "./lib/Search.svelte";
  import { cart } from "./lib/stores/cart";
</script>

<AppTheme />

<Navbar />
<div class="p-6">
  <Search />
  <ul class="pt-10">
    {#each $cart as item}
      <CartItem {item} />
    {/each}
  </ul>
</div>
