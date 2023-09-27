<script lang="ts">
  import { onMount } from "svelte";

  let theme: "light" | "dark" = "dark";

  onMount(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        theme = e.matches ? "dark" : "light";
      });
  });

  $: {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }
</script>
