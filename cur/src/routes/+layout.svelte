<script lang="ts">
  import '../app.postcss';
  import { LightSwitch, AppShell, Avatar, AppBar } from '@skeletonlabs/skeleton';
  import type { DrawerSettings } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
  initializeStores();
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();
  const drawerSettings: DrawerSettings = {
      id: 'example-3',
      // Provide your property overrides:
      bgDrawer: 'bg-purple-900 text-white',
      bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
      width: 'w-[280px] md:w-[480px]',
      padding: 'p-4',
      rounded: 'rounded-xl',
  };
  drawerStore.open(drawerSettings);
</script>
<AppBar class="fixed top-0 w-full z-50" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <Drawer />
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-xl variant-glass mr-2" data-theme="skeleton" href="/">
      Intro
    </a>
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-xl variant-glass mr-2" data-theme="skeleton" href="/projects">
      Projects
    </a>
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-xl variant-glass" data-theme="skeleton" href="/devlog">
      Blog
    </a>
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-xl variant-glass" data-theme="skeleton" href="/devlog">
      Contact
    </a>
    {#if $page.url.pathname === '/'}
      <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-xl variant-filled" data-theme="skeleton" href="/devlog">
        Skip Scroll
      </a>
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <LightSwitch/>
  </svelte:fragment>
</AppBar>
<slot/>
