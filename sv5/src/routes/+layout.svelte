<script lang="ts">
    import '../app.css';
    // Import any components you need for the layout
    import { ModeWatcher } from "mode-watcher";
    import { injectAnalytics } from '@vercel/analytics/sveltekit'
</script>

<!-- Your standard layout should simply pass through the slot content -->
<ModeWatcher />
<slot />

<style>
  /* Any global styles can remain here */
</style>