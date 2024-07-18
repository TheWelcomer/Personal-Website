<script lang="ts">
  import '../app.postcss';
  import { LightSwitch, AppShell, Avatar, AppBar } from '@skeletonlabs/skeleton';
</script>
<AppBar class="fixed top-0 w-full z-50" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-xl variant-glass mr-2" data-theme="skeleton" href="/">
      Intro
    </a>
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-xl variant-glass mr-2" data-theme="skeleton" href="/projects">
      Projects
    </a>
    <a type="font-bold button" class="btn font-ibm-bold md:btn-lg lg:btn-xl variant-glass" data-theme="skeleton" href="/devlog">
      Devlog
    </a>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <LightSwitch />
  </svelte:fragment>
</AppBar>
<slot />
