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

<AppBar class="fixed top-0 w-full z-50" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
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
  <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-lg preset-tonal" data-theme="skeleton" href="/devlog">
    Contact
  </a>
  {#if $page.url.pathname === '/'}
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-lg preset-filled" data-theme="skeleton" href="/devlog">
      Skip Scroll
    </a>
  {/if}
  {/snippet}

  {#snippet trail()}
  {/snippet}
</AppBar>

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

{@render children?.()}