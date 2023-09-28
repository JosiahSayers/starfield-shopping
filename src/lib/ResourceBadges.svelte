<script lang="ts">
  import ResourcePrice from "./SearchResult/ResourcePrice.svelte";
  import ResourceRarity from "./SearchResult/ResourceRarity.svelte";
  import ResourceType from "./SearchResult/ResourceType.svelte";
  import type { Resource } from "./stores/cart";

  export let resource: Resource;
</script>

<div class="flex flex-wrap">
  <ResourceRarity rarity={resource.rarity} />
  <ResourceType type={resource.type} />
  <ResourcePrice price={resource.value} />
</div>
