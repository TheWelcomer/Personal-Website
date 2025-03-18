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
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { Avatar } from "$lib/components/ui/avatar";
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
    let currentPage = $state(1);
    let postsPerPage = $state(9);
    let featuredPost = $state(null);
    let allTags = $state<string[]>([]);
    let selectedTags = $state<string[]>([]);
    let initialRender = $state(true);

    // -------- Non-reactive update tracking system --------
    let lastUpdateTimestamp = 0;
    let updateTimer = null;
    let updatesInProgress = false;
    let updateRequested = false;
    let filterState = {
        filter: 'all',
        tags: [],
        search: '',
        page: 1,
        perPage: 9
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
     * Toggle tag selection - non-reactive implementation
     */
    function toggleTag(tag) {
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter(t => t !== tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }
        // Reset to first page when changing filters
        currentPage = 1;
        // Explicitly request update
        requestBlogUpdate();
    }

    /**
     * Calculate total pages based on filtered posts and posts per page
     * Non-reactive function to avoid loops
     */
    function getTotalPages() {
        // Create local copies to avoid reactivity
        const currentFilter = filter;
        const currentTags = [...selectedTags];
        const currentSearch = searchQuery;
        const currentPostsPerPage = Number(postsPerPage);

        // Get all blog posts
        const allBlogs = ensureBlogData();

        // Remove featured post from count
        const featId = featuredPost?.id;
        let filteredPosts = allBlogs.filter(post => post.id !== featId);

        // Apply filters (same logic as in updateBlogPostsNow)
        if (currentFilter !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.category === currentFilter);
        }

        if (currentTags.length > 0) {
            filteredPosts = filteredPosts.filter(post =>
                post.tags && currentTags.some(tag => post.tags.includes(tag))
            );
        }

        if (currentSearch.trim() !== '') {
            const query = currentSearch.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
            );
        }

        // Calculate total pages
        return Math.ceil(filteredPosts.length / currentPostsPerPage);
    }

    /**
     * Jump to specific page - non-reactive implementation
     */
    function goToPage(page) {
        const totalPages = getTotalPages();
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Explicitly request update
            requestBlogUpdate();
        }
    }

    /**
     * Reset all filters - non-reactive implementation
     */
    function resetFilters() {
        searchQuery = '';
        filter = 'all';
        selectedTags = [];
        currentPage = 1;
        // Explicitly request update
        requestBlogUpdate();
    }

    /**
     * Non-reactive function to update the blog posts
     * This avoids the infinite reactivity cycle
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

        // Mark as in progress and update timestamp
        updatesInProgress = true;
        lastUpdateTimestamp = now;
        updateRequested = false;

        try {
            // Capture current filter state to avoid reactivity during processing
            const localFilter = filter;
            const localTags = [...selectedTags];
            const localSearch = searchQuery;
            const localPage = currentPage;
            const localPerPage = Number(postsPerPage); // Ensure it's a number

            // Record filter state to detect future changes
            filterState = {
                filter: localFilter,
                tags: localTags,
                search: localSearch,
                page: localPage,
                perPage: localPerPage
            };

            // Get blog data (non-reactive call)
            const allBlogs = ensureBlogData();

            // Process unique tags if needed
            if (allTags.length === 0) {
                allTags = extractTags(allBlogs);
            }

            // Find featured post
            const foundFeaturedPost = allBlogs.find(post => post.featured) || allBlogs[0];
            featuredPost = foundFeaturedPost;

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

            // Paginate
            const startIndex = (localPage - 1) * localPerPage;
            const endIndex = startIndex + localPerPage;
            const paginatedPosts = regularPosts.slice(startIndex, endIndex);

            // Update state in a single batch to reduce reactivity triggers
            blogs = paginatedPosts;
            isLoading = false;
        } finally {
            // Mark as completed
            updatesInProgress = false;

            // If another update was requested during processing, schedule it
            if (updateRequested) {
                setTimeout(updateBlogPostsNow, 50);
            }
        }
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
            filterState.search === searchQuery &&
            filterState.page === currentPage &&
            filterState.perPage === Number(postsPerPage)
        ) {
            return;
        }

        // Schedule an update
        updateBlogPostsNow();
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

    // Initialize blogs once on mount
    onMount(() => {
        // Reset scroll position when page loads
        window.scrollTo(0, 0);

        // Initial data load
        updateBlogPostsNow();

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

    // Form submission handler for search
    function handleSearchSubmit(e) {
        e.preventDefault();
        requestBlogUpdate();
    }

    // Handle select change for posts per page
    function handlePostsPerPageChange(e) {
        postsPerPage = Number(e.target.value);
        requestBlogUpdate();
    }
</script>

<!-- Main content container with padding for fixed navbar -->
<div class="content-container">
  <div class="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
    <!-- Page header -->
    <div class="text-center mb-16 mt-8">
      <h1 class="text-4xl font-ibm-bold mb-4 animate-on-scroll opacity-0">Blog</h1>
      <p class="text-lg font-ibm opacity-75 max-w-2xl mx-auto animate-on-scroll opacity-0">
        Thoughts, ideas, and explorations on technology, research, and personal projects.
      </p>

      <!-- Mobile search - visible only on small screens -->
      <div class="relative mt-6 max-w-md mx-auto md:hidden">
        <form onsubmit={handleSearchSubmit}>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
              type="search"
              id="mobile-search-main"
              class="block w-full p-3 pl-10 text-sm border rounded-lg bg-surface-100-800-token border-surface-300-600-token focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search blog posts..."
              bind:value={searchQuery}
              onchange={() => requestBlogUpdate()}
          />
        </form>
      </div>

      <!-- Mobile tags button -->
      <div class="mt-4 md:hidden">
        <Button variant="outline" class="w-full" onclick={openTagsDrawer}>
          <TagIcon class="h-4 w-4 mr-2" />
          Browse by Tags
        </Button>
      </div>

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
                  onclick={() => toggleTag(tag)}
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

    {#if isLoading}
      <!-- Loading state -->
      <div class="flex justify-center items-center py-20">
        <div class="animate-spin h-10 w-10 rounded-full border-t-4 border-primary-500 border-opacity-50"></div>
      </div>
    {:else if featuredPost && currentPage === 1 && (filter === 'all' && selectedTags.length === 0 && searchQuery === '')}
      <!-- Featured post (only on first page with no filters) -->
      <div class="mb-16 animate-on-scroll opacity-0">
        <h2 class="text-2xl font-ibm-bold mb-6 flex items-center">
          <span class="mr-2">Featured Post</span>
          <Badge variant="outline" class="ml-2 text-xs font-normal">
            Editor's Pick
          </Badge>
        </h2>

        <Card class="overflow-hidden">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="relative h-64 md:h-full">
              <img
                  src={featuredPost.image || `/images/placeholder-1.jpg`}
                  alt={featuredPost.title}
                  class="absolute inset-0 w-full h-full object-cover"
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

              <div class="flex items-center mb-4 mt-auto">
                <Avatar class="h-8 w-8 mr-3">
                  <img src={featuredPost.author?.avatar || "/images/placeholder-avatar.jpg"} alt={featuredPost.author?.name || "Author"} />
                </Avatar>
                <div>
                  <p class="font-ibm-bold text-sm">{featuredPost.author?.name || "Author"}</p>
                  <div class="flex items-center text-xs opacity-75">
                    <BookOpen class="h-3 w-3 mr-1" />
                    {calculateReadingTime(featuredPost.content)} min read
                  </div>
                </div>
              </div>

              {#if featuredPost.tags && featuredPost.tags.length > 0}
                <div class="flex flex-wrap gap-1 mb-4">
                  {#each featuredPost.tags.slice(0, 3) as tag}
                    <Badge variant="outline" class="text-xs cursor-pointer" onclick={() => toggleTag(tag)}>
                      {tag}
                    </Badge>
                  {/each}
                </div>
              {/if}

              <a href={`/blog/${featuredPost.id}`} class="btn variant-filled-primary font-ibm self-start">
                Read Article
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </Card>
      </div>
    {/if}

    {#if blogs.length === 0 && !isLoading}
      <!-- No results state -->
      <div class="text-center py-20">
        <h2 class="text-2xl font-ibm-bold mb-4">No blog posts found</h2>
        <p class="text-lg opacity-75 mb-8">Try adjusting your search or filter criteria.</p>
        <Button variant="outline" class="mt-6" onclick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    {:else if !isLoading}
      <!-- Recent posts heading -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-ibm-bold animate-on-scroll opacity-0">
          {currentPage === 1 && filter === 'all' && selectedTags.length === 0 && searchQuery === ''
            ? 'Recent Posts'
            : 'Blog Posts'}
        </h2>

        <!-- Sort/View options - can be expanded later -->
        <div class="flex space-x-2">
          <select
              class="text-sm border rounded-lg bg-surface-100-800-token border-surface-300-600-token focus:ring-primary-500 focus:border-primary-500 p-2"
              value={postsPerPage}
              onchange={handlePostsPerPageChange}
          >
            <option value="6">6 per page</option>
            <option value="9">9 per page</option>
            <option value="12">12 per page</option>
          </select>
        </div>
      </div>

      <!-- Blog posts grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {#each blogs as post, i}
          <Card class="blog-card opacity-0 overflow-hidden h-full flex flex-col" style="animation-delay: {i * 100}ms;">
            <div class="relative h-48 w-full overflow-hidden">
              <img
                  src={post.image || `/images/placeholder-${(i % 3) + 1}.jpg`}
                  alt={post.title}
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                <div class="flex flex-wrap gap-1 mb-4">
                  {#each post.tags.slice(0, 3) as tag}
                    <Badge variant="outline" class="text-xs cursor-pointer" onclick={() => toggleTag(tag)}>
                      {tag}
                    </Badge>
                  {/each}
                </div>
              {/if}

              <div class="mt-auto">
                <a href={`/blog/${post.id}`} class="inline-flex items-center text-primary-500 hover:underline font-ibm">
                  Read more
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </Card>
        {/each}
      </div>

      <!-- Pagination -->
      {#if getTotalPages() > 1}
        <div class="flex justify-center mt-12">
          <nav aria-label="Page navigation" class="flex flex-wrap justify-center gap-2">
            <!-- Previous page button -->
            <Button
                variant="outline"
                size="sm"
                onclick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
              </svg>
            </Button>

            <!-- Page numbers -->
            {#each Array(getTotalPages()) as _, index}
              <Button
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  onclick={() => goToPage(index + 1)}
              >
                {index + 1}
              </Button>
            {/each}

            <!-- Next page button -->
            <Button
                variant="outline"
                size="sm"
                onclick={() => goToPage(currentPage + 1)}
                disabled={currentPage === getTotalPages()}
                aria-label="Next page"
            >
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
            </Button>
          </nav>
        </div>
      {/if}
    {/if}
  </div>

  <!-- Newsletter sign up -->
  <div class="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
    <div class="rounded-xl bg-primary-100 dark:bg-primary-900/30 p-8">
      <div class="text-center">
        <h2 class="text-2xl font-ibm-bold mb-4">Stay updated</h2>
        <p class="text-lg opacity-75 max-w-2xl mx-auto mb-6">
          Subscribe to my newsletter to get the latest blog posts and updates directly to your inbox.
        </p>
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <input
              type="email"
              class="flex-grow p-3 text-sm border rounded-lg bg-surface-100-800-token border-surface-300-600-token focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your email address"
          />
          <Button variant="default" size="default" class="font-ibm-bold">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  </div>
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

  /* Blog card styling */
  .blog-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* Layout components */
  .outer-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }

  .fixed-navbar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
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
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  }
</style>