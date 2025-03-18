<!-- src/routes/blog/[id]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import Calendar from "lucide-svelte/icons/calendar";
  import BookOpen from "lucide-svelte/icons/book-open";
  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import MarkdownRenderer from "$lib/components/MarkdownRenderer/MarkdownRenderer.svelte";

  // Export the data from the page load function
  export let data;

  // Post data access
  $: post = data?.post;

  // State variables - no reactive stuff outside onMount
  let isScrolled = false;
  let tableOfContents = [];
  let currentUrl = '';
  let isDarkMode = false;

  // Format date for display - pure function with no browser APIs
  function formatDate(dateString) {
    if (!dateString) return '';

    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

  // Calculate reading time - pure function with no browser APIs
  function calculateReadingTime(content) {
    if (!content) return 1;

    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime > 0 ? readingTime : 1;
  }

  // Generate table of contents from content
  function generateTableOfContents(content) {
    if (!content) return [];

    const toc = [];
    const headingRegex = /^(#{1,3})\s+(.+?)$/gm;
    let match;

    try {
      let execResult;
      while ((execResult = headingRegex.exec(content)) !== null) {
        const level = execResult[1].length;
        const text = execResult[2].trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        toc.push({ level, text, id });
      }
    } catch (error) {
      console.error('Error generating TOC:', error);
    }

    return toc;
  }

  // Process TOC during component initialization
  $: if (post?.content) {
    tableOfContents = generateTableOfContents(post.content);

    // Log content for debugging
    console.log('Post content length:', post.content.length);
    console.log('Content preview:', post.content.substring(0, 200));

    // Check if content contains code blocks
    const codeBlockCount = (post.content.match(/```/g) || []).length / 2;
    console.log('Code block count:', codeBlockCount);
  }

  // All browser interactions happen only in onMount
  onMount(() => {
    if (browser) {
      // Safe to use browser APIs here
      currentUrl = window.location.href;

      // Check for dark mode
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Add scroll handler for "back to top" button
      const handleScroll = () => {
        isScrolled = window.scrollY > 100;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<div class="blog-detail py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
  <!-- Loading state -->
  {#if !post}
    <div class="flex flex-col items-center justify-center py-32">
      <div class="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
      <p class="text-gray-500 dark:text-gray-400">Loading article...</p>
    </div>
  {:else}
    <!-- Back to top button - only in browser -->
    {#if browser && isScrolled}
      <button
          onclick={() => {
                    if (browser) window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
          class="fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors z-50"
          aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <span class="sr-only">Back to top</span>
      </button>
    {/if}

    <!-- Back button -->
    <a href="/blog" class="inline-flex items-center mb-8 text-primary-500 hover:underline group transition-all">
      <ArrowLeft class="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
      Back to all posts
    </a>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Main content -->
      <div class="lg:col-span-9">
        <!-- Article header -->
        <header class="mb-10">
          <div class="flex flex-wrap items-center gap-3 mb-4">
                        <span class="px-3 py-1 text-xs rounded-full font-semibold bg-primary-500 text-white">
                            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
            <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar class="h-4 w-4 mr-1" />
              {formatDate(post.date)}
            </div>
            <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <BookOpen class="h-4 w-4 mr-1" />
              {calculateReadingTime(post.content)} min read
            </div>
          </div>

          <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">{post.title}</h1>

          <p class="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{post.excerpt}</p>

          <!-- Author info -->
          {#if post.author}
            <div class="flex items-center mb-8">
              <div class="h-12 w-12 rounded-full overflow-hidden mr-4">
                <img
                    src={post.author.avatar || "/images/placeholder-avatar.jpg"}
                    alt={post.author.name || "Author"}
                    class="h-full w-full object-cover"
                />
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">{post.author.name || "Author"}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Author</p>
              </div>
            </div>
          {/if}

          <!-- Featured image -->
          {#if post.image}
            <div class="mb-10 overflow-hidden rounded-xl shadow-lg">
              <img src={post.image} alt={post.title} class="w-full object-cover h-64 md:h-[400px]" />
            </div>
          {/if}
        </header>

        <!-- Article content using MarkdownRenderer with CodeBlock -->
        <div class="article-content mb-16">
          <!-- Add debugging output during development -->
          {#if browser && import.meta.env.DEV}
            <details class="mb-4 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
              <summary class="font-bold cursor-pointer">Debug Raw Content</summary>
              <pre class="whitespace-pre-wrap text-xs mt-2">{post.content}</pre>
            </details>
          {/if}

          <!-- Use the MarkdownRenderer component -->
          <MarkdownRenderer markdown={post.content} isDarkMode={isDarkMode} />
        </div>

        <!-- Tags -->
        {#if post.tags && post.tags.length > 0}
          <div class="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <span class="text-gray-700 dark:text-gray-300 font-medium mr-2">Tags:</span>
            {#each post.tags as tag}
              <Badge variant="outline" class="text-sm px-3 py-1">
                #{tag}
              </Badge>
            {/each}
          </div>
        {/if}

        <!-- Share section - no javascript sharing buttons on SSR -->
        <div class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Share this article</h3>

          {#if browser}
            <!-- Only show interactive share buttons in browser -->
            <div class="flex space-x-3">
              <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-3 rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-colors"
                  aria-label="Share on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span class="sr-only">Share on Twitter</span>
              </a>
              <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-3 rounded-full bg-[#1877F2] text-white hover:bg-opacity-90 transition-colors"
                  aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span class="sr-only">Share on Facebook</span>
              </a>
              <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-3 rounded-full bg-[#0A66C2] text-white hover:bg-opacity-90 transition-colors"
                  aria-label="Share on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span class="sr-only">Share on LinkedIn</span>
              </a>
            </div>
          {:else}
            <!-- Static fallback for SSR -->
            <p class="text-sm text-gray-500 dark:text-gray-400">Share options available in browser</p>
          {/if}
        </div>

        <!-- Navigation -->
        <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <a href="/blog" class="inline-flex items-center justify-center w-full sm:w-auto py-3 px-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors">
              <ArrowLeft class="h-4 w-4 mr-2" />
              Back to blog
            </a>
            <Button variant="default" class="w-full sm:w-auto">
              <span>Read more articles</span>
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <!-- Sidebar with table of contents -->
      <div class="lg:col-span-3">
        <div class="sticky top-24">
          {#if tableOfContents.length > 0}
            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 mb-8">
              <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Table of Contents</h3>
              <nav class="space-y-2">
                {#each tableOfContents as item}
                  <a
                      href={`#${item.id}`}
                      class="block text-sm hover:text-primary-500 transition-colors"
                      style={`padding-left: ${(item.level - 1) * 0.75}rem`}
                  >
                    {item.text}
                  </a>
                {/each}
              </nav>
            </div>
          {/if}

          <!-- Tags widget -->
          {#if post.tags && post.tags.length > 0}
            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5">
              <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Tags</h3>
              <div class="flex flex-wrap gap-2">
                {#each post.tags as tag}
                  <Badge variant="outline" class="text-sm">
                    #{tag}
                  </Badge>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>