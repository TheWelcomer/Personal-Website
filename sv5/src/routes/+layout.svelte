<script lang="ts">
    import '../app.css';
    import { AppBar, Modal } from '@skeletonlabs/skeleton-svelte';
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
    import { ModeWatcher } from "mode-watcher";
    import { injectAnalytics } from '@vercel/analytics/sveltekit';

    injectAnalytics();

    // Drawer state
    let drawerState = $state(false);

    function drawerClose() {
        drawerState = false;
    }

    function openDrawer() {
        drawerState = true;
    }
</script>

<svelte:head>
  <style>
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      margin: 0;
    }

    .font-ibm-bold {
      font-family: 'IBM Plex Mono Bold', monospace;
      font-weight: bold;
    }
    .font-ibm {
      font-family: 'IBM Plex Mono', monospace;
    }
  </style>
</svelte:head>

<!-- Main wrapper div -->
<div class="layout-container">
  <!-- Mode watcher -->
  <ModeWatcher />
  <ModeWatcher />

  <!-- Fixed navbar -->
  <div class="fixed-navbar-container">
    <AppBar class="fixed top-0 left-0 right-0 w-full border-b border-surface-300-600-token shadow-lg bg-surface-100-800-token" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
      {#snippet lead()}
      <!-- Hamburger menu button (only visible on small screens) -->
      <button type="button" class="btn font-ibm-bold md:hidden lg:hidden preset-tonal mr-2" on:click={openDrawer} aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- Navigation buttons with Skeleton.dev styling - hidden on small screens -->
      <a href="/" class="btn font-ibm-bold hidden md:inline-flex lg:inline-flex md:btn-lg lg:btn-lg preset-tonal mr-2">
        About Me
      </a>
      <a href="/blog" class="btn font-ibm-bold hidden md:inline-flex lg:inline-flex md:btn-lg lg:btn-lg preset-tonal mr-2">
        Blog
      </a>
      <a href="/resume.pdf" target="_blank" class="btn font-ibm-bold hidden md:inline-flex lg:inline-flex md:btn-lg lg:btn-lg preset-tonal mr-2">
        Resume
      </a>
      {/snippet}

      {#snippet trail()}
      <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        >
          <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z"
              fill="currentColor"
          />
        </svg>
        <span class="sr-only">Toggle theme</span>
      </Button>
      {/snippet}
    </AppBar>
  </div>

  <!-- Drawer Modal -->
  <Modal
      open={drawerState}
      onOpenChange={(e) => (drawerState = e.open)}
      contentBase="bg-surface-800 text-white p-4 space-y-4 shadow-xl w-[280px] md:w-[480px] h-screen rounded-r-xl"
      positionerJustify="justify-start"
      positionerAlign=""
      positionerPadding="p-0"
      alignOffset={0}
      backdropClasses="bg-gradient-to-tr from-surface-500/50 via-primary-500/50 to-secondary-500/50 backdrop-blur-sm"
      transitionsPositionerIn={{ x: -480, duration: 200 }}
      transitionsPositionerOut={{ x: -480, duration: 200 }}
  >
    {#snippet content()}
    <header class="flex justify-between items-center mb-4">
      <h2 class="h2 font-ibm-bold">Navigation</h2>
      <button type="button" class="btn-icon variant-ghost-surface" on:click={drawerClose} aria-label="Close">×</button>
    </header>
    <hr class="opacity-50" />
    <article class="py-4">
      <nav class="flex flex-col space-y-4">
        <a class="btn variant-ghost-surface w-full justify-start font-ibm" href="/">About Me</a>
        <a class="btn variant-ghost-surface w-full justify-start font-ibm" href="/blog">Blog</a>
        <a class="btn variant-ghost-surface w-full justify-start font-ibm" target="_blank" href="/resume.pdf">Resume</a>
      </nav>
    </article>
    <hr class="opacity-50" />
    <footer class="mt-4">
      <button type="button" class="btn variant-filled-primary w-full font-ibm-bold" on:click={drawerClose}>Close</button>
    </footer>
    {/snippet}
  </Modal>

  <!-- Main content -->
  <main class="content-container flex-1">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="mt-auto bg-surface-200-700-token py-12 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-ibm-bold mb-4">About</h3>
          <p class="opacity-75 mb-4">Personal website showcasing my work, research, and thoughts on technology and innovation.</p>
          <div class="flex space-x-4">
            <a href="https://linkedin.com" aria-label="LinkedIn" class="opacity-75 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://github.com" aria-label="GitHub" class="opacity-75 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" class="opacity-75 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-ibm-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="/static" class="opacity-75 hover:opacity-100 hover:text-primary-500">Home</a></li>
            <li><a href="/about" class="opacity-75 hover:opacity-100 hover:text-primary-500">About</a></li>
            <li><a href="/blog" class="opacity-75 hover:opacity-100 hover:text-primary-500">Blog</a></li>
            <li><a href="/resume.pdf" class="opacity-75 hover:opacity-100 hover:text-primary-500">Resume</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-ibm-bold mb-4">Contact</h3>
          <ul class="space-y-2 opacity-75">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +1 (123) 456-7890
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              hello@example.com
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              123 Tech Street, City, Country
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-surface-300-600-token">
        <p class="text-center opacity-75">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>

<style lang="css">
  /* Layout container */
  .layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }
  /* Content area expansion */
  .content-container {
    flex: 1 0 auto;
    padding-top: 56px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* Navbar compensation */
  @media (min-width: 768px) {
    .content-container {
      padding-top: 64px;
    }
  }

  /* Fixed navbar positioning */
  .fixed-navbar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }

  /* Font faces */
  @font-face {
    font-family: 'IBM Plex Mono';
    src: url('https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@4.5.1/files/ibm-plex-mono-latin-400-normal.woff2') format('woff2');
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'IBM Plex Mono Bold';
    src: url('/fonts/IBM Plex Mono/bolditalic.woff2') format('woff2');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  /* Smooth theme transitions */
  * {
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  }
</style>