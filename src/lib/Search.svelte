<script lang="ts">
  import SearchResult from "./SearchResult/SearchResult.svelte";
  import { cart } from "./stores/cart";
  import { resources, type Resource } from "./stores/resources";

  let wrapperRef: HTMLDivElement;
  let open = false;
  let searchValue = "";

  $: {
    open = searchValue.length > 0;
  }

  $: filteredList = $resources.filter((resource) =>
    searchValue.length
      ? resource.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        resource.shortName.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  function handleSelect(resource: Resource) {
    cart.add({ ...resource, quantity: 1 });
    searchValue = "";
    (document.activeElement as any)?.blur?.();
  }
</script>

<div class="dropdown w-full" class:dropdown-open={open} bind:this={wrapperRef}>
  <input
    type="text"
    class="input input-bordered w-full"
    placeholder="Add Item..."
    bind:value={searchValue}
  />

  <div
    class="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md z-10"
  >
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- Safari bug requires the tabindex to be set -->
    <ul
      tabindex="0"
      class="menu menu-compact"
      style={`width: ${wrapperRef?.clientWidth}px`}
    >
      {#each filteredList as resource}
        <li class="border-b border-b-base-content/10 w-full">
          <button on:click={() => handleSelect(resource)}
            ><SearchResult {resource} /></button
          >
        </li>
      {/each}
    </ul>
  </div>
</div>
