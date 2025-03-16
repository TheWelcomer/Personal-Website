<script lang="ts">
    import '../../app.css';
    import { Modal } from '@skeletonlabs/skeleton-svelte';

    // Use $state for Svelte 5 runes
    let drawerState = $state(false);
</script>

<!-- Simple fixed navbar without AppBar component -->
<div class="fixed top-0 w-full z-50 bg-theme-background p-2">
  <div class="container mx-auto flex justify-between items-center">
    <button type="button" class="btn preset-tonal" onclick={() => drawerState = true}>
      Menu
    </button>

    <a class="btn preset-tonal" href="/static">Home</a>
  </div>
</div>

<!-- Drawer Modal -->
<Modal
    open={drawerState}
    onOpenChange={(e) => drawerState = e.open}
>
  {#snippet content()}
  
      <div class="fixed top-0 w-full z-50 bg-theme-background p-2">
        <div class="flex justify-between mb-4">
          <h2 class="h2">Menu</h2>
          <button class="btn btn-sm" onclick={() => drawerState = false}>×</button>
        </div>

        <nav class="space-y-2">
          <a class="btn w-full justify-start" href="/static">Home</a>
          <a class="btn w-full justify-start" href="/projects">Projects</a>
          <a class="btn w-full justify-start" href="/devlog">Blog</a>
          <a class="btn w-full justify-start" href="/contact">Contact</a>
        </nav>
      </div>
    
  {/snippet}
</Modal>