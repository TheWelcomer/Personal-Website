<script lang="ts">
	import '../app.postcss';
  import { LightSwitch, AppShell, Avatar, AppBar } from '@skeletonlabs/skeleton';
</script>
<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <a href="/about">
      About
    </a>
  </svelte:fragment>
  <svelte:fragment slot="default">Skeleton</svelte:fragment>
  <svelte:fragment slot="trail">
    <LightSwitch />
    <Avatar />
  </svelte:fragment>
</AppBar>
<slot />
