<script lang="ts">
  import ResourceBadges from "../ResourceBadges.svelte";
  import type { Resource } from "../stores/cart";

  export let resource: Resource;
</script>

<div class="flex flex-col">
  <span class="mb-1">
    {resource.name}
    {#if resource.shortName}
      - {resource.shortName}
    {/if}
  </span>
  <ResourceBadges {resource} />
</div>
