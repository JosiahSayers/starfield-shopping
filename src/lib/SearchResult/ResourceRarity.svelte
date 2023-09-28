<script lang="ts">
  export let rarity: string;
  $: colorClass = ["rare", "unique", "uncommon", "exotic"].includes(
    rarity.toLowerCase()
  )
    ? rarity.toLowerCase()
    : "badge-neutral";
</script>

<span class={`badge ${colorClass} m-1`}>{rarity}</span>

<style>
  .rare {
    background-color: #a179d1;
    border-color: #a179d1;
    color: white;
  }

  .unique {
    background-color: #6fb374;
    border-color: #6fb374;
    color: white;
  }

  .uncommon {
    background-color: #6db5c5;
    border-color: #6db5c5;
    color: white;
  }

  .exotic {
    background-color: #cbb784;
    border-color: #cbb784;
    color: white;
  }
</style>
