<!-- src/routes/blog/[id]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import Calendar from "lucide-svelte/icons/calendar";
  import BookOpen from "lucide-svelte/icons/book-open";
  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import MarkdownRenderer from "$lib/components/MarkdownRenderer/MarkdownRenderer.svelte";

  export let data;

  $: post = data?.post;
  $: totalArticles = data?.totalArticles || 1;
  $: recentArticles = data?.recentArticles || [];

  let isScrolled = false;
  let tableOfContents = [];
  let currentUrl = '';
  let isDarkMode = false;
  let activeHeadingId = '';

  function goToNextArticle() {
    if (!browser) return;
    const currentId = parseInt(window.location.pathname.split('/').pop()) || 1;
    const nextId = ((currentId) % totalArticles) + 1;
    goto(`/blog/${nextId}`, { replaceState: false });
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

  function calculateReadingTime(content) {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime > 0 ? readingTime : 1;
  }

  function generateTableOfContents(content) {
    if (!content) return [];
    const toc = [];
    const headingRegex = /^(#{1,3})\s+(.+?)$/gm;
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

  $: if (post?.content) {
    tableOfContents = generateTableOfContents(post.content);
  }

  function updateActiveHeading() {
    if (!browser || !tableOfContents.length) return;
    const headingElements = tableOfContents
      .map(item => document.getElementById(item.id))
      .filter(Boolean);
    if (!headingElements.length) return;

    const scrollPosition = window.scrollY;
    const offset = 120;
    let currentHeading = headingElements[0];

    for (const heading of headingElements) {
      if (heading.offsetTop - offset <= scrollPosition) {
        currentHeading = heading;
      } else {
        break;
      }
    }
    activeHeadingId = currentHeading.id;
  }

  function throttle(func, limit) {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func.apply(this, args);
      }
    };
  }

  onMount(() => {
    if (browser) {
      currentUrl = window.location.href;
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const handleScroll = () => {
        isScrolled = window.scrollY > 100;
        updateActiveHeading();
      };

      const throttledHandleScroll = throttle(handleScroll, 100);
      window.addEventListener('scroll', throttledHandleScroll);
      setTimeout(updateActiveHeading, 300);

      return () => window.removeEventListener('scroll', throttledHandleScroll);
    }
  });
</script>

<!-- Expanded full-width container with adaptive background color -->
<div class="blog-detail py-8 sm:py-12 w-full bg-white dark:bg-black text-gray-800 dark:text-white">
  <div class="mx-auto px-0">
    {#if !post}
      <div class="flex flex-col items-center justify-center py-32">
        <div class="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
        <p class="text-gray-500 dark:text-gray-400">Loading article...</p>
      </div>
    {:else}
      {#if browser && isScrolled}
        <button
            on:click={() => {
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

      <!-- Back to all posts link - aligned with left column -->
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(220px,1fr)_minmax(720px,720px)_minmax(180px,1fr)] gap-8 md:gap-6 lg:gap-4 mb-8">
        <div class="px-4 sm:px-6 lg:px-8 col-span-full lg:col-span-1">
          <a href="/blog" class="inline-flex items-center text-primary-500 hover:underline group transition-all">
            <ArrowLeft class="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to all posts
          </a>
        </div>
        <div class="hidden lg:block"></div>
        <div class="hidden lg:block"></div>
      </div>

      <!-- Three-column layout with adjusted spacing -->
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(220px,1fr)_minmax(720px,720px)_minmax(180px,1fr)] gap-8 md:gap-6 lg:gap-4">
        <!-- Left Column - Article List (expanded outward) -->
        <div class="hidden lg:block px-4 sm:px-6 lg:px-8 mt-5">
          <div class="sticky top-29 overflow-y-auto max-h-[calc(100vh-8rem)] pr-4">
            <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Recent Articles</h3>
            <nav class="space-y-1">
              {#if recentArticles && recentArticles.length > 0}
                {#each recentArticles as article}
                  <a
                      href={`/blog/${article.id}`}
                      class="block py-2 px-3 text-sm rounded-md transition-colors
                      {String(post.id) === String(article.id)
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}"
                  >
                    <span class="line-clamp-2">{article.title}</span>
                  </a>
                {/each}
              {:else}
                <!-- Fallback for when no recent articles are available -->
                <div class="text-sm text-gray-500 dark:text-gray-400 italic">No recent articles found</div>
              {/if}
            </nav>
          </div>
        </div>

        <!-- Middle Column - Article Content (fixed width) -->
        <div class="px-4 sm:px-6 lg:px-0">
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

            <h1 class="font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white leading-tight text-3xl sm:text-4xl">
              {post.title}
            </h1>
            <p class="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed text-xl sm:text-2xl font-light italic border-l-4 border-primary-500 pl-4 py-2">
              {post.excerpt}
            </p>

            {#if post.image}
              <div class="mb-10 overflow-hidden rounded-xl shadow-lg">
                <img src={post.image} alt={post.title} class="w-full object-cover h-64 md:h-[400px]" />
              </div>
            {/if}
          </header>

          {#key post.id}
            <div class="article-content mb-16">
              <!-- Pass a modified version of the content to remove the duplicate title -->
              <MarkdownRenderer
                  markdown={post.content.replace(/^# +\s*{post.title}\s*\n+/m, '')}
                  isDarkMode={isDarkMode}
              />
            </div>
          {/key}

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

          <div class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Share this article</h3>

            {#if browser}
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
              <p class="text-sm text-gray-500 dark:text-gray-400">Share options available in browser</p>
            {/if}
          </div>

          <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row justify-between gap-4">
              <a href="/blog" class="inline-flex items-center justify-center w-full sm:w-auto py-3 px-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors">
                <ArrowLeft class="h-4 w-4 mr-2" />
                Back to blog
              </a>
              <button
                  on:click={goToNextArticle}
                  class="inline-flex items-center justify-center w-full sm:w-auto py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                <span>Next Article</span>
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column - Table of Contents (expanded outward) -->
        <div class="hidden lg:block px-4 sm:px-6 lg:px-8">
          <div class="sticky top-24 w-full pl-0">
            {#if tableOfContents.length > 0}
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-5 mb-6 sm:mb-8 w-full">
                <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Table of Contents</h3>
                <nav class="space-y-2 w-full">
                  {#each tableOfContents as item}
                    <a
                        href={`#${item.id}`}
                        class="block text-sm transition-colors w-full hover:text-blue-500
                        {activeHeadingId === item.id
                            ? 'text-blue-500 font-medium'
                            : 'text-gray-700 dark:text-gray-300'}"
                        style={`padding-left: ${(item.level - 1) * 0.75}rem`}
                    >
                      {item.text}
                    </a>
                  {/each}
                </nav>
              </div>
            {/if}

            {#if post.tags && post.tags.length > 0}
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 w-full">
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
</div>

<style>
  /* Line clamp utility */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Custom styles for article content - no @apply directives */
  :global(.article-content h1) {
    font-size: 1.875rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  :global(.article-content h2) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  :global(.article-content h3) {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #1f2937;
  }

  :global(.article-content p) {
    font-size: 1rem;
    line-height: 1.625;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  :global(.article-content a) {
    color: #2563eb;
    text-decoration: none;
  }

  :global(.article-content a:hover) {
    text-decoration: underline;
  }

  :global(.article-content ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    color: #1f2937;
  }

  :global(.article-content ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    color: #1f2937;
  }

  :global(.article-content li) {
    margin-bottom: 0.5rem;
    color: #1f2937;
  }

  :global(.article-content blockquote) {
    border-left: 4px solid #d1d5db;
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
    color: #4b5563;
  }

  :global(.article-content code) {
    font-family: monospace;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #1f2937;
  }

  :global(.article-content pre) {
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }

  :global(.article-content pre code) {
    background-color: transparent;
    padding: 0;
    color: #1f2937;
  }

  :global(.article-content img) {
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-width: 100%;
    height: auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  :global(.article-content table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    color: #1f2937;
  }

  :global(.article-content th) {
    border: 1px solid #d1d5db;
    background-color: #f3f4f6;
    padding: 0.5rem 1rem;
    text-align: left;
  }

  :global(.article-content td) {
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
  }

  /* Dark mode overrides using media query */
  @media (prefers-color-scheme: dark) {
    :global(.article-content h1),
    :global(.article-content h2),
    :global(.article-content h3) {
      color: #f9fafb;
    }

    :global(.article-content p),
    :global(.article-content li),
    :global(.article-content table) {
      color: #e5e7eb;
    }

    :global(.article-content a) {
      color: #3b82f6;
    }

    :global(.article-content blockquote) {
      border-color: #4b5563;
      color: #9ca3af;
    }

    :global(.article-content code),
    :global(.article-content pre code) {
      color: #e5e7eb;
    }

    :global(.article-content pre) {
      background-color: #1f2937;
    }

    :global(.article-content th) {
      border-color: #4b5563;
      background-color: #1f2937;
      color: #e5e7eb;
    }

    :global(.article-content td) {
      border-color: #4b5563;
      color: #e5e7eb;
    }
  }

  /* Support for dark class in addition to media query */
  :global(.dark .article-content h1),
  :global(.dark .article-content h2),
  :global(.dark .article-content h3) {
    color: #f9fafb;
  }

  :global(.dark .article-content p),
  :global(.dark .article-content li),
  :global(.dark .article-content table) {
    color: #e5e7eb;
  }

  :global(.dark .article-content a) {
    color: #3b82f6;
  }

  :global(.dark .article-content blockquote) {
    border-color: #4b5563;
    color: #9ca3af;
  }

  :global(.dark .article-content code),
  :global(.dark .article-content pre code) {
    color: #e5e7eb;
  }

  :global(.dark .article-content pre) {
    background-color: #1f2937;
  }

  :global(.dark .article-content th) {
    border-color: #4b5563;
    background-color: #1f2937;
    color: #e5e7eb;
  }

  :global(.dark .article-content td) {
    border-color: #4b5563;
    color: #e5e7eb;
  }

  :global(figcaption) {
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
    color: #4b5563;
    width: 100%;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    :global(figcaption) {
      color: #9ca3af;
    }
  }

  :global(.dark figcaption) {
    color: #9ca3af;
  }
</style>