<script lang="ts">
  import { afterUpdate, onMount, tick } from "svelte";
  import { Mention } from "@/components/Mention";
  import { credits } from "@/assets/credits";

  export let data;

  const { image } = data;

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
        background: #1915ffcb;
        transition: all 0.5s ease;
        `;

    for (let index = 0; index < totalBlocks; index++) {
      let block = document.createElement("div");
      block.style.cssText = blockStyle;
      block.classList.add("block");
      container_block.appendChild(block);
    }
  });

  afterUpdate(async () => {
    const blocks = document.querySelectorAll(".block");
    const timeOutDuration = 300;

    await tick();

    blocks.forEach((block: Element) => {
      let timeout: number | undefined;
      const blockDiv = block as HTMLDivElement;
      blockDiv.addEventListener("mouseover", () => {
        clearTimeout(timeout);
        blockDiv.style.background = "red";

        timeout = setTimeout(() => {
          blockDiv.style.background = "#1915ffcb";
        }, timeOutDuration);
      });
    });
  });
</script>

<svelte:head>
  <title>Squares</title>
</svelte:head>

<div class="container_image">
  <div bind:this={container} class="container_image__container">
    <div class="container_image__container_image">
      {#await image}
        ...wait
      {:then image}
        <img class="container_image__image" src={image.urls.regular} alt="" />
      {:catch}
        <p>:p</p>
      {/await}
    </div>
    <div bind:this={container_block} class="container_image__blocks"></div>
  </div>
  <Mention.MentionText
    >Photo By
    <Mention.MentionLink href={credits.Igor}>Igor Rand</Mention.MentionLink>
  </Mention.MentionText>
</div>

<style>
  :global(*) {
    @apply m-0 p-0 box-border font-sans uppercase;
  }

  .container_image {
    @apply h-svh grid text-center justify-center items-center w-svw;
  }

  .container_image__container {
    @apply relative w-[600px] h-[600px] overflow-hidden;
  }

  .container_image__image {
    @apply w-full h-auto;
  }

  .container_image__blocks {
    @apply absolute top-0 mix-blend-multiply flex w-full h-full overflow-hidden flex-row flex-wrap z-20;
  }
</style>
