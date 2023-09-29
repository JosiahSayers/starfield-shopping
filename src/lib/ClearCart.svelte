<script lang="ts">
  import { cart } from "./stores/cart";
  let modal: HTMLDialogElement;
</script>

<button class="btn btn-secondary" on:click={() => modal.showModal()}
  >Clear</button
>
<dialog id="clear-cart-modal" class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">Clear Everything?</h3>
    <form method="dialog">
      <div class="modal-action">
        <button class="btn">No</button>
        <button class="btn btn-primary" on:click={cart.clear}>Yes</button>
      </div>
    </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
