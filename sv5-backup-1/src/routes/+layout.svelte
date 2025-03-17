<script lang="ts">
    import '../app.css';
    // Import any components you need for the layout
    import { onMount } from 'svelte';
</script>

<!-- Your standard layout should simply pass through the slot content -->
<slot />

<style>
  /* Any global styles can remain here */
</style>