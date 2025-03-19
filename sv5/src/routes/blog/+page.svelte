<script lang="ts">
    import { onMount } from 'svelte';
    import '../../app.css';
    import { BLOG_POSTS } from '$lib/data/blogData.ts';
    import { AppBar, Modal} from '@skeletonlabs/skeleton-svelte';
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import Search from "lucide-svelte/icons/search";
    import Filter from "lucide-svelte/icons/filter";
    import Calendar from "lucide-svelte/icons/calendar";
    import BookOpen from "lucide-svelte/icons/book-open";
    import TagIcon from "lucide-svelte/icons/tag";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge/index.js";

    // -------- State variables --------
    let scrollY = $state(0);
    let filter = $state('all'); // 'all', 'tech', 'personal', etc.
    let searchQuery = $state('');
    let blogs = $state([]);
    let isLoading = $state(true);
    let drawerState = $state(false);
    let filterDrawerState = $state(false);
    let tagsDrawerState = $state(false);
    let featuredPost = $state(null);
    let allTags = $state<string[]>([]);
    let selectedTags = $state<string[]>([]);
    let initialRender = $state(true);
    let hasError = $state(false);
    let errorMessage = $state('');

    // -------- Non-reactive update tracking system --------
    let lastUpdateTimestamp = 0;
    let updateTimer = null;
    let updatesInProgress = false;
    let updateRequested = false;
    let filterState = {
        filter: 'all',
        tags: [],
        search: ''
    };

    // -------- Filter categories --------
    const categories = [
        { id: 'all', name: 'All Posts' },
        { id: 'tech', name: 'Technology' },
        { id: 'research', name: 'Research' },
        { id: 'personal', name: 'Personal' },
        { id: 'projects', name: 'Projects' }
    ];

    /**
     * Ensures we have blog data by providing fallbacks if needed
     */
    const ensureBlogData = () => {
        if (!Array.isArray(BLOG_POSTS) || BLOG_POSTS.length === 0) {
            console.warn('BLOG_POSTS is missing or empty');

            // Return demo blog posts if none exist
            return Array(6).fill(0).map((_, i) => ({
                id: i.toString(),
                title: `Demo Blog Post ${i + 1}`,
                excerpt: 'This is a placeholder for a blog post. The actual content would go here.',
                date: new Date(2023, i, 15).toISOString(),
                category: ['tech', 'research', 'personal', 'projects'][i % 4],
                image: `/images/placeholder-${(i % 3) + 1}.jpg`,
                tags: ['demo', 'placeholder', categories[i % 4].id],
                author: {
                    name: 'Demo Author',
                    avatar: '/images/placeholder-avatar.jpg'
                },
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                featured: i === 0 // Make the first post featured
            }));
        }
        return BLOG_POSTS;
    };

    /**
     * Extract all unique tags from blog posts
     */
    function extractTags(posts) {
        const tagSet = new Set<string>();
        posts.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach(tag => tagSet.add(tag));
            }
        });
        return Array.from(tagSet).sort();
    }

    /**
     * Calculate reading time based on content length
     */
    function calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime > 0 ? readingTime : 1;
    }

    /**
     * Format date for display
     */
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    /**
     * Navigate to blog post
     */
    function navigateToBlogPost(postId) {
        window.location.href = `/blog/${postId}`;
    }

    /**
     * Toggle tag selection - non-reactive implementation
     * Improved to handle event propagation
     */
    function toggleTag(tag, event) {
        // Stop event propagation to prevent card click
        if (event) {
            event.stopPropagation();
        }

        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter(t => t !== tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }
        // Explicitly request update
        requestBlogUpdate();
    }

    /**
     * Reset all filters - non-reactive implementation
     * With improved animation handling for both blog cards and featured post
     */
    function resetFilters() {
        searchQuery = '';
        filter = 'all';
        selectedTags = [];

        // Explicitly request update
        requestBlogUpdate();

        // Force immediate visibility of cards after reset
        setTimeout(() => {
            if (typeof document !== 'undefined') {
                // Make all regular blog cards visible
                document.querySelectorAll('.blog-card, .post-card').forEach(card => {
                    // Make visible immediately
                    card.style.opacity = '1';
                    card.classList.add('animate-fadeIn');
                    card.classList.remove('opacity-0');
                });

                // Also make featured post visible
                const featuredPostContainer = document.querySelector('.mb-16.animate-on-scroll');
                if (featuredPostContainer) {
                    featuredPostContainer.style.opacity = '1';
                    featuredPostContainer.classList.add('animate-fadeIn');
                    featuredPostContainer.classList.remove('opacity-0');
                }
            }
        }, 50);
    }

    /**
     * Request an update when filters change
     * Can be called directly from event handlers
     */
    function requestBlogUpdate() {
        // If filter state is unchanged, don't update
        if (
            filterState.filter === filter &&
            JSON.stringify(filterState.tags) === JSON.stringify(selectedTags) &&
            filterState.search === searchQuery
        ) {
            return;
        }

        // Schedule an update
        updateBlogPostsNow();
    }

    /**
     * Non-reactive function to update the blog posts
     * This avoids the infinite reactivity cycle
     * Improved with better error handling
     */
    function updateBlogPostsNow() {
        // Prevent multiple simultaneous updates
        if (updatesInProgress) {
            updateRequested = true;
            return;
        }

        // Prevent updates that happen too quickly (debounce)
        const now = Date.now();
        if (now - lastUpdateTimestamp < 100) {
            if (!updateTimer) {
                updateTimer = setTimeout(() => {
                    updateTimer = null;
                    updateBlogPostsNow();
                }, 150);
            }
            return;
        }

        // Reset error state
        hasError = false;
        errorMessage = '';

        // Mark as in progress and update timestamp
        updatesInProgress = true;
        lastUpdateTimestamp = now;
        updateRequested = false;

        try {
            console.log('Updating blog posts with filters:', {
                filter,
                tags: selectedTags,
                search: searchQuery
            });

            // Capture current filter state to avoid reactivity during processing
            const localFilter = filter;
            const localTags = [...selectedTags];
            const localSearch = searchQuery;

            // Record filter state to detect future changes
            filterState = {
                filter: localFilter,
                tags: localTags,
                search: localSearch
            };

            // Get blog data (non-reactive call)
            const allBlogs = ensureBlogData();
            console.log('Total blog posts:', allBlogs.length);

            // Process unique tags if needed
            if (allTags.length === 0) {
                allTags = extractTags(allBlogs);
            }

            // Find featured post
            const foundFeaturedPost = allBlogs.find(post => post.featured) || allBlogs[0];
            featuredPost = foundFeaturedPost;
            console.log('Featured post:', foundFeaturedPost.title);

            // Filter posts without triggering reactivity
            let regularPosts = allBlogs.filter(post => post.id !== foundFeaturedPost.id);

            // Apply filters
            if (localFilter !== 'all') {
                regularPosts = regularPosts.filter(post => post.category === localFilter);
            }

            if (localTags.length > 0) {
                regularPosts = regularPosts.filter(post =>
                    post.tags && localTags.some(tag => post.tags.includes(tag))
                );
            }

            if (localSearch.trim() !== '') {
                const query = localSearch.toLowerCase();
                regularPosts = regularPosts.filter(post =>
                    post.title.toLowerCase().includes(query) ||
                    post.excerpt.toLowerCase().includes(query) ||
                    post.content.toLowerCase().includes(query) ||
                    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
                );
            }

            // Sort (doesn't trigger reactivity)
            regularPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

            console.log('Filtered posts:', regularPosts.length);

            // Update state in a single batch to reduce reactivity triggers
            blogs = regularPosts;
            isLoading = false;
        } catch (error) {
            console.error('Error updating blog posts:', error);
            hasError = true;
            errorMessage = error.message || 'An error occurred while loading blog posts';
            // Still set blogs to empty array and isLoading to false
            blogs = [];
            isLoading = false;
        } finally {
            // ALWAYS mark as completed and NOT loading
            updatesInProgress = false;
            isLoading = false;

            // If another update was requested during processing, schedule it
            if (updateRequested) {
                setTimeout(updateBlogPostsNow, 50);
            }

            // Reset animations on posts after update
            setTimeout(() => {
                if (typeof document !== 'undefined') {
                    const blogCards = document.querySelectorAll('.blog-card.opacity-0');
                    blogCards.forEach(card => {
                        card.classList.add('animate-fadeIn');
                        card.classList.remove('opacity-0');
                    });
                }
            }, 100);
        }
    }

    /**
     * Animation helper for elements
     */
    function setupAnimations() {
        if (typeof document === 'undefined') return;

        // Animate blog cards on scroll
        const blogCards = document.querySelectorAll('.blog-card');

        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeIn');
                        entry.target.classList.remove('opacity-0');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px"
            }
        );

        blogCards.forEach(card => {
            cardObserver.observe(card);
        });

        // Animate other elements (featured post, headers)
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        const elementObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeIn');
                        entry.target.classList.remove('opacity-0');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        animatedElements.forEach(element => {
            elementObserver.observe(element);
        });
    }

    // Drawer functions
    function drawerClose() {
        drawerState = false;
    }

    function openDrawer() {
        drawerState = true;
    }

    function filterDrawerClose() {
        filterDrawerState = false;
    }

    function openFilterDrawer() {
        filterDrawerState = true;
    }

    function tagsDrawerClose() {
        tagsDrawerState = false;
    }

    function openTagsDrawer() {
        tagsDrawerState = true;
    }

    // Form submission handler for search with reset functionality
    function handleSearchSubmit(e) {
        e.preventDefault();

        // If search is cleared, reset all filters
        if (searchQuery.trim() === '') {
            resetFilters();
        } else {
            requestBlogUpdate();
        }
    }

    // Initialize blogs once on mount
    onMount(() => {
        // Reset scroll position when page loads
        window.scrollTo(0, 0);

        console.log('Blog page mounted, initializing...');

        // Make sure we have blog data
        const blogData = ensureBlogData();
        console.log('Blog data loaded:', blogData.length, 'posts found');

        // Initial data load with setTimeout to ensure it runs after mounting
        setTimeout(() => {
            updateBlogPostsNow();
            console.log('Initial blog update complete, isLoading:', isLoading, 'blogs length:', blogs.length);
        }, 50);

        // Set up animations after initial render
        setTimeout(setupAnimations, 100);

        // Set up filter change detection through polling
        const unsubscribe = setInterval(() => {
            requestBlogUpdate();
        }, 300);

        return () => {
            clearInterval(unsubscribe);
            if (updateTimer) clearTimeout(updateTimer);
        };
    });
</script>

<!-- Main content container with padding for fixed navbar -->
<div class="content-container">
  <div class="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
    <!-- Page header -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-ibm-bold mb-4 animate-on-scroll opacity-0">DevBlog</h1>
      <p class="text-lg font-ibm opacity-75 max-w-2xl mx-auto animate-on-scroll opacity-0">
        Where I write about all the things!
      </p>

      <!-- Mobile and desktop search -->
      <div class="relative mt-6 max-w-md mx-auto">
        <form onsubmit={handleSearchSubmit}>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
              type="search"
              id="search-main"
              class="block w-full p-3 pl-10 text-sm border rounded-lg bg-surface-100-800-token border-surface-300-600-token focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search blog posts..."
              value={searchQuery}
              oninput={(e) => {
      // Update searchQuery manually instead of using bind:value
      searchQuery = e.target.value;

      if (e.target.value.trim() === '') {
        // When search is cleared:
        // 1. Reset all filters
        resetFilters();

        // 2. Force immediate re-render of all blog cards and featured post
        setTimeout(() => {
          if (typeof document !== 'undefined') {
            // Make all cards visible immediately
            document.querySelectorAll('.blog-card, .post-card').forEach(card => {
              card.style.opacity = '1';
              card.classList.add('animate-fadeIn');
              card.classList.remove('opacity-0');
            });

            // Ensure featured post container is visible
            const featuredPostContainer = document.querySelector('.mb-16.animate-on-scroll');
            if (featuredPostContainer) {
              featuredPostContainer.style.opacity = '1';
              featuredPostContainer.classList.add('animate-fadeIn');
              featuredPostContainer.classList.remove('opacity-0');
            }
          }
        }, 10);
      } else {
        requestBlogUpdate();
      }
    }}
          />
        </form>
      </div>

      <!-- Mobile tags button - commented out for now -->
      <!--
      <div class="mt-4 md:hidden">
        <Button variant="outline" class="w-full" onclick={openTagsDrawer}>
          <TagIcon class="h-4 w-4 mr-2" />
          Browse by Tags
        </Button>
      </div>
      -->

      <!-- Active filters display -->
      {#if filter !== 'all' || selectedTags.length > 0}
        <div class="mt-6 flex flex-wrap justify-center items-center gap-2 animate-fadeIn">
          {#if filter !== 'all'}
            <Badge class="bg-primary-500 text-white px-3 py-1">
              {categories.find(c => c.id === filter)?.name}
              <button
                  class="ml-1 inline-flex items-center"
                  onclick={() => {
                      filter = 'all';
                      requestBlogUpdate();
                  }}
                  aria-label="Remove filter"
              >×</button>
            </Badge>
          {/if}

          {#each selectedTags as tag}
            <Badge class="bg-surface-300-600-token px-3 py-1">
              {tag}
              <button
                  class="ml-1 inline-flex items-center"
                  onclick={(e) => toggleTag(tag, e)}
                  aria-label="Remove tag"
              >×</button>
            </Badge>
          {/each}

          {#if filter !== 'all' || selectedTags.length > 0}
            <Button
                variant="ghost"
                size="sm"
                onclick={resetFilters}
                class="text-xs"
            >
              Clear All
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if hasError}
      <!-- Error state -->
      <div class="text-center py-12 mb-8">
        <h2 class="text-2xl font-ibm-bold mb-4 text-red-500">Something went wrong</h2>
        <p class="text-lg opacity-75 mb-6">{errorMessage || 'Error loading blog posts'}</p>
        <Button variant="outline" onclick={() => updateBlogPostsNow()}>
          Try Again
        </Button>
      </div>
    {/if}

    {#if isLoading}
      <!-- Loading state -->
      <div class="flex justify-center items-center py-20">
        <div class="animate-spin h-10 w-10 rounded-full border-t-4 border-primary-500 border-opacity-50"></div>
      </div>
    {:else}
      <!-- Featured post (only with no filters) -->
      {#if featuredPost && (filter === 'all' && selectedTags.length === 0 && searchQuery === '')}
        <div class="mb-16 animate-on-scroll opacity-0">
          <h2 class="text-2xl font-ibm-bold mb-6 flex items-center">
            <span class="mr-2">Featured Post</span>
            <Badge variant="outline" class="ml-2 text-xs font-normal">
              Editor's Pick
            </Badge>
          </h2>

          <Card class="overflow-hidden blog-card post-card" onclick={() => navigateToBlogPost(featuredPost.id)}>
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div class="relative h-64 md:h-full">
                <img
                    src={featuredPost.image || `/images/placeholder-1.jpg`}
                    alt={featuredPost.title}
                    class="absolute inset-0 w-full h-full object-cover card-image transition-transform duration-500"
                />
              </div>
              <div class="p-6 flex flex-col">
                <div class="flex justify-between items-center mb-2">
                  <span class="px-3 py-1 text-xs rounded-full font-ibm-bold bg-primary-500 text-white">
                    {featuredPost.category.charAt(0).toUpperCase() + featuredPost.category.slice(1)}
                  </span>
                  <div class="flex items-center text-xs opacity-75 font-ibm">
                    <Calendar class="h-4 w-4 mr-1" />
                    {formatDate(featuredPost.date)}
                  </div>
                </div>

                <h3 class="text-2xl font-ibm-bold mb-4">{featuredPost.title}</h3>
                <p class="mb-6 opacity-85">{featuredPost.excerpt}</p>

                <div class="flex items-center mb-4">
                  <div class="flex items-center text-xs opacity-75">
                    <BookOpen class="h-4 w-4 mr-1" />
                    {calculateReadingTime(featuredPost.content)} min read
                  </div>
                </div>

                {#if featuredPost.tags && featuredPost.tags.length > 0}
                  <div class="flex flex-wrap gap-1 mt-auto">
                    {#each featuredPost.tags.slice(0, 3) as tag}
                      <Badge variant="outline" class="text-xs cursor-pointer" onclick={(e) => toggleTag(tag, e)}>
                        {tag}
                      </Badge>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </Card>
        </div>
      {/if}

      <!-- Blog posts section (now separate from featured post condition) -->
      {#if blogs.length === 0}
        <!-- No results state -->
        <div class="text-center py-20">
          <h2 class="text-2xl font-ibm-bold mb-4">No blog posts found</h2>
          <p class="text-lg opacity-75 mb-8">Try adjusting your search or filter criteria.</p>
          <Button variant="outline" class="mt-6" onclick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      {:else}
        <!-- Posts heading -->
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-ibm-bold animate-on-scroll opacity-0">
            {filter === 'all' && selectedTags.length === 0 && searchQuery === ''
              ? 'All Posts'
              : 'Blog Posts'}
          </h2>
        </div>

        <!-- Blog posts grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {#each blogs as post, i}
            <Card
                class="blog-card post-card opacity-0 overflow-hidden h-full flex flex-col cursor-pointer"
                style="animation-delay: {i * 100}ms;"
                onclick={() => navigateToBlogPost(post.id)}
            >
              <div class="relative h-48 w-full overflow-hidden">
                <img
                    src={post.image || `/images/placeholder-${(i % 3) + 1}.jpg`}
                    alt={post.title}
                    class="w-full h-full object-cover card-image transition-transform duration-500"
                />
                <div class="absolute top-4 right-4">
                  <span class="px-3 py-1 text-xs rounded-full font-ibm-bold bg-primary-500 text-white">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs opacity-75 font-ibm">{formatDate(post.date)}</span>
                  <span class="text-xs opacity-75 font-ibm flex items-center">
                    <BookOpen class="h-3 w-3 mr-1" />
                    {calculateReadingTime(post.content)} min read
                  </span>
                </div>
                <h3 class="text-xl font-ibm-bold mb-3 line-clamp-2">{post.title}</h3>
                <p class="mb-4 opacity-85 line-clamp-3">{post.excerpt}</p>

                {#if post.tags && post.tags.length > 0}
                  <div class="flex flex-wrap gap-1 mt-auto">
                    {#each post.tags.slice(0, 3) as tag}
                      <Badge variant="outline" class="text-xs cursor-pointer" onclick={(e) => toggleTag(tag, e)}>
                        {tag}
                      </Badge>
                    {/each}
                  </div>
                {/if}
              </div>
            </Card>
          {/each}
        </div>
      {/if}
    {/if}
  </div>

  <!-- Tags Drawer Modal - commented out for now -->
  <!--
  <Modal
      open={tagsDrawerState}
      onOpenChange={(e) => (tagsDrawerState = e.open)}
      contentBase="bg-surface-100-800-token p-4 space-y-4 shadow-xl w-[280px] md:w-[480px] h-screen rounded-r-xl"
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
      <h2 class="h2 font-ibm-bold">Browse by Tags</h2>
      <button type="button" class="btn-icon variant-ghost-surface" onclick={tagsDrawerClose} aria-label="Close">×</button>
    </header>
    <hr class="opacity-50" />
    <article class="py-4">
      <div class="flex flex-wrap gap-2">
        {#each allTags as tag}
          <Badge
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            class="cursor-pointer px-3 py-1.5 text-sm"
            onclick={(e) => toggleTag(tag, e)}
          >
            {tag}
          </Badge>
        {/each}
      </div>
    </article>
    <hr class="opacity-50" />
    <footer class="mt-4">
      <div class="flex space-x-2">
        <Button variant="outline" class="flex-1" onclick={tagsDrawerClose}>
          Close
        </Button>
        <Button variant="default" class="flex-1" onclick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </footer>
    {/snippet}
  </Modal>
  -->
</div>

<style>
  /* Add these styles to your page */
  .font-ibm-bold {
    font-family: 'IBM Plex Mono Bold', monospace;
    font-weight: bold;
  }

  .font-ibm {
    font-family: 'IBM Plex Mono', monospace;
  }

  /* Animation classes */
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }

  .animate-slideUp {
    animation: slideUp 0.6s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Utility classes */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Blog card styling - base styles */
  .blog-card, .post-card {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /* Card image transitions - add base state with transition */
  :global(.card-image) {
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    transform: scale(1) rotate(0deg);
    will-change: transform;
  }

  /* Card transitions and base state */
  :global(.post-card),
  :global(.blog-card),
  :global(div.post-card),
  :global(div.blog-card),
  :global(.card),
  :global(.card.post-card),
  :global(.card.blog-card) {
    /* Ensure smooth transition for all relevant properties */
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease !important;
    /* Set initial state explicitly */
    transform: translateY(0) scale(1);
    will-change: transform, box-shadow; /* Performance optimization */
  }

  /* Card hover effects */
  :global(.post-card):hover,
  :global(.blog-card):hover,
  :global(div.post-card):hover,
  :global(div.blog-card):hover,
  :global(.card):hover,
  :global(.card.post-card):hover,
  :global(.card.blog-card):hover {
    transform: translateY(-5px) scale(1.01) !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    border-color: var(--color-primary) !important;
  }

  /* Image hover effect */
  :global(.blog-card:hover) :global(.card-image),
  :global(.post-card:hover) :global(.card-image) {
    transform: scale(1.1) rotate(1deg) !important;
  }

  /* Fix for featured post card image container to prevent clipping */
  .relative.h-64.md\:h-full {
    overflow: hidden !important;
  }

  /* General fix for all image containers */
  :global(.relative.h-48.w-full),
  :global(.relative.h-64),
  :global([class*="relative"][class*="h-"]) {
    overflow: hidden !important;
  }

  /* Bottom border animation */
  .blog-card::after, .post-card::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background-color: var(--color-primary);
    transition: width 0.3s ease;
    z-index: 5;
  }

  .blog-card:hover::after, .post-card:hover::after {
    width: 100%;
  }

  /* Fix select dropdown appearance to ensure text is visible */
  select {
    color: inherit !important;
    appearance: auto !important;
  }

  select option {
    background-color: inherit;
    color: inherit;
  }

  .content-container {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin-top: 0;
    padding-top: 64px; /* Height of the navbar */
  }

  /* Animation observer setup */
  .animate-on-scroll.animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }

  /* Theme variables */
  :root {
    /* Default Light Mode Colors */
    --color-primary: #3b82f6;      /* Blue 500 */
    --color-accent1: #10b981;      /* Emerald 500 */
    --color-accent2: #8b5cf6;      /* Violet 500 */
    --color-accent3: #06b6d4;      /* Cyan 500 */
    --color-accent4: #34d399;      /* Emerald 400 */
    --color-accent5: #f43f5e;      /* Rose 500 */
    --color-accent6: #a78bfa;      /* Violet 400 */
    --color-text: #1f2937;         /* Gray 800 */
    --color-neutral: #4b5563;      /* Gray 600 */
    --color-link: #0ea5e9;         /* Sky 500 */
    --color-link-border: #bae6fd;  /* Sky 200 */
    --color-border: #e5e7eb;       /* Gray 200 */
    --color-background: #ffffff;   /* White */
  }

  /* Dark Mode Colors */
  :root.dark {
    --color-primary: #60a5fa;    /* Blue 400 */
    --color-accent1: #34d399;    /* Emerald 400 */
    --color-accent2: #a78bfa;    /* Violet 400 */
    --color-accent3: #22d3ee;    /* Cyan 400 */
    --color-accent4: #6ee7b7;    /* Emerald 300 */
    --color-accent5: #fb7185;    /* Rose 400 */
    --color-accent6: #c4b5fd;    /* Violet 300 */
    --color-text: #f9fafb;       /* Gray 50 */
    --color-neutral: #d1d5db;    /* Gray 300 */
    --color-link: #38bdf8;       /* Sky 400 */
    --color-link-border: #0284c7; /* Sky 600 */
    --color-border: #4b5563;     /* Gray 600 */
    --color-background: #111827; /* Gray 900 */
  }

  /* Theme transitions */
  * {
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  }
</style>