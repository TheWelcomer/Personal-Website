<script lang="ts">
  import { LightSwitch, AppShell, Avatar, AppBar } from '@skeletonlabs/skeleton';
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
</script>
<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <a href="/">
      Intro
    </a>
    <a href="/projects">
      Projects
    </a>
    <a href="/devlog">
      Devlog
    </a>
  </svelte:fragment>
  <svelte:fragment slot="default">Skeleton</svelte:fragment>
  <svelte:fragment slot="trail">
    <LightSwitch />
    <Avatar />
  </svelte:fragment>
</AppBar>
<slot />
