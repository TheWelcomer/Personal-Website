<script lang="ts">
    import '../app.css';
    import { Avatar, AppBar, Modal} from '@skeletonlabs/skeleton-svelte';
    import { page } from '$app/stores';

    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

    // Drawer state management
    let drawerState = $state(false);

    function drawerClose() {
        drawerState = false;
    }

    function openDrawer() {
        drawerState = true;
    }
</script>

<!-- Fixed navbar instead of sticky to ensure it always stays at the top -->
<div class="fixed-navbar-container">
  <AppBar class="fixed top-0 left-0 right-0 w-full z-50" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
    {#snippet lead()}
    <!-- Drawer trigger button -->
    <button type="button" class="btn font-ibm-bold md:btn-lg lg:btn-lg preset-tonal mr-2" onclick={openDrawer}>
      Menu
    </button>

    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-lg preset-tonal mr-2" data-theme="skeleton" href="/">
      Intro
    </a>
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-lg preset-tonal mr-2" data-theme="skeleton" href="/projects">
      Projects
    </a>
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-lg preset-tonal" data-theme="skeleton" href="/devlog">
      Blog
    </a>
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-lg preset-tonal" data-theme="skeleton" href="/contact">
      Contact
    </a>
    {#if $page.url.pathname === '/'}
      <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-lg preset-filled" data-theme="skeleton" href="#bottom">
        Skip Scroll
      </a>
    {/if}
    {/snippet}

    {#snippet trail()}
    {/snippet}
  </AppBar>
</div>

<!-- Add padding to the top of the content to account for fixed navbar -->
<div class="content-container">
  <!-- Drawer Modal implementation -->
  <Modal
      open={drawerState}
      onOpenChange={(e) => (drawerState = e.open)}
      contentBase="bg-purple-900 text-white p-4 space-y-4 shadow-xl w-[280px] md:w-[480px] h-screen rounded-r-xl"
      positionerJustify="justify-start"
      positionerAlign=""
      positionerPadding=""
      backdropClasses="bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50"
      transitionsPositionerIn={{ x: -480, duration: 200 }}
      transitionsPositionerOut={{ x: -480, duration: 200 }}
  >
    {#snippet content()}
    <header class="flex justify-between">
      <h2 class="h2">Navigation</h2>
      <button type="button" class="btn btn-sm" onclick={drawerClose}>×</button>
    </header>
    <article class="py-4">
      <nav class="flex flex-col space-y-4">
        <a class="btn w-full justify-start" href="/">Home</a>
        <a class="btn w-full justify-start" href="/projects">Projects</a>
        <a class="btn w-full justify-start" href="/devlog">Blog</a>
        <a class="btn w-full justify-start" href="/contact">Contact</a>
      </nav>
    </article>
    <footer>
      <button type="button" class="btn w-full preset-filled" onclick={drawerClose}>Close</button>
    </footer>
    {/snippet}
  </Modal>

  <!-- Render children with top padding to prevent content from hiding under navbar -->
  <div class="pt-16">
    {@render children?.()}
  </div>

  <!-- Anchor for the "Skip Scroll" button -->
  <div id="bottom"></div>
</div>

<style>
  /* Font classes */
  .font-ibm-bold {
    font-family: 'IBM Plex Mono Bold', monospace;
    font-weight: bold;
  }

  /* Fixed navbar container */
  .fixed-navbar-container {
    position: relative;
    z-index: 999; /* Higher z-index to ensure it's above everything */
  }

  /* Content container */
  .content-container {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  /* Anchor for skip scroll */
  #bottom {
    height: 0;
    width: 0;
    position: absolute;
    bottom: 0;
  }
</style>