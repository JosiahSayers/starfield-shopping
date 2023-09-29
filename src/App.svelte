<script lang="ts">
  import Navbar from "./lib/Navbar.svelte";
  import AppTheme from "./lib/AppTheme.svelte";
  import Search from "./lib/Search.svelte";
  import Cart from "./lib/Cart.svelte";
  import CartTotal from "./lib/CartTotal.svelte";
</script>

<AppTheme />

<Navbar />
<div class="p-6">
  <Search />
  <Cart />
  <CartTotal />
</div>
