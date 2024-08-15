<script lang="ts">
  import { onMount } from "svelte";
  import { Mention } from "@/components/Mention";
  import { credits } from "@/assets/credits";

  //   export let data;

  //   const { image } = data;

  let container: HTMLDivElement;
  let container_block: HTMLDivElement;

  onMount(() => {
    let width = container.getBoundingClientRect().width;
    let height = container.getBoundingClientRect().height;

    let blocksPerRow = Math.floor(Math.sqrt(width) / 2);
    let blocksPerColumn = Math.floor(Math.sqrt(height) / 2);
    let totalBlocks = blocksPerRow * blocksPerColumn;

    let blockWidth = width / blocksPerRow;
    let blockHeigth = height / blocksPerColumn;

    let blockStyle = `
        width: ${blockWidth}px;
        height: ${blockHeigth}px;
        background: rgba(43, 15, 15, 0.5);
        border: 1px solid black;
        `;

    for (let index = 0; index < totalBlocks; index++) {
      let block = document.createElement("div");
      block.style.cssText = blockStyle;
      container_block.appendChild(block);
    }
  });
</script>

<svelte:head>
  <title>Squares</title>
</svelte:head>

<!-- {#await image}
  ...wait
{:then image}
  <img src={image.urls.regular} alt="" />
{:catch}
  <p>:p</p>
{/await} -->

<div class="container_image">
  <div bind:this={container} class="container_image__container">
    <div class="container_image__container_image">
      <img src="image.jpg" alt="" />
    </div>
    <div bind:this={container_block} class="container_image__blocks"></div>
    <div class="container_image__overalay"></div>
  </div>
  <Mention.MentionText
    >Photo By
    <Mention.MentionLink href={credits.Igor}>Igor Rand</Mention.MentionLink>
  </Mention.MentionText>
</div>

<style>
  :global(*) {
    @apply m-0 p-0 box-border;
  }

  .container_image {
    @apply h-svh grid text-center justify-center items-center w-svw;
  }

  .container_image__container {
    @apply relative w-[600px] h-[600px] overflow-hidden;
  }

  .container_image__overalay {
    @apply absolute top-0 w-full h-full mix-blend-multiply bg-grid_block;
  }

  .container_image__blocks {
    @apply absolute top-0 flex w-full h-full overflow-hidden flex-row flex-wrap;
  }
</style>
