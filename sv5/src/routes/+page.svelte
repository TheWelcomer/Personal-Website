<script lang="ts">
    // Imports
    import { onMount } from 'svelte';
    import { TO_PRINT } from '$lib/data/resumeInfo';
    import { Avatar } from '@skeletonlabs/skeleton-svelte';

    // Constants
    const TIMER_INTERVAL = 515;
    const PRINT_VISIBILITY_THRESHOLD = 0.4; // Minimum visibility before printing starts
    const MAX_SCROLLS_PER_FRAME = 5; // Prevent printing too much text at once

    // State variables
    let scrollY = $state(0);
    let numScrollsHandled = $state(0);
    let speed = $state(0);
    let charsPrinted = $state(0);
    let currentCard = $state(0);
    let currentVisual = $state(0);
    let printing = $state(true);
    let timer: ReturnType<typeof setInterval>;
    let initialized = $state(false);

    /**
     * Ensure TO_PRINT has enough items for all cards.
     * Fill with empty objects if needed.
     */
    const ensureCardData = () => {
        // Check if TO_PRINT exists and has the right length
        if (!Array.isArray(TO_PRINT) || TO_PRINT.length < 11) {
            console.warn('TO_PRINT is missing or doesn\'t have enough items');

            // Initialize with default empty objects if needed
            return Array(11).fill(0).map((_, i) => {
                // Return the actual item if it exists, otherwise return an empty object
                return (TO_PRINT && TO_PRINT[i]) || {
                    initial: '',
                    text: '',
                    speed: [10]
                };
            });
        }
        return TO_PRINT;
    };

    // Get card data with fallbacks
    const cardData = ensureCardData();

    // Initialize render array for each card
    let render = $state(['', '', '', '', '', '', '', '', '', '', '']);

    // Derived state
    let numScrolled = $derived(Math.floor(scrollY / cardData[currentCard].speed[speed]));

    // Effect to handle scrolling
    $effect(() => {
        // Only process scroll if we have new scrolling to handle and printing is active
        if (initialized && numScrolled > numScrollsHandled && printing) {
            handleScroll();
        }
    });

    // Adding initial card text
    render.forEach((cardText, i) => {
        render[i] = (cardData[i] && cardData[i].initial) || '';
    });

    /**
     * Handle scrolling and text printing
     * Processes scroll events to show text gradually
     */
    const handleScroll = async () => {
        if (!printing) return;

        // Remove temporary opacity cursor if present
        if (render[currentCard].length >= 18 && render[currentCard].slice(-32) === '<span class="opacity-0">▋</span>') {
            render[currentCard] = render[currentCard].slice(0, -32);
        }

        // Reset render for first card if needed
        if (currentCard === 0 && charsPrinted === 0) {
            render[currentCard] = '';
        }

        // Clear the blink timer during text printing
        clearInterval(timer);

        const currentCardData = cardData[currentCard] || { text: '', speed: [10] };

        // Calculate how many scrolls to process
        const scrollDelta = numScrolled - numScrollsHandled;

        // Limit maximum scrolls per frame to prevent skipping too much text at once
        const scrollsToProcess = Math.min(scrollDelta, MAX_SCROLLS_PER_FRAME);

        for (let i = 0; i < scrollsToProcess; i++) {
            // Remove cursor if present
            if (render[currentCard][render[currentCard].length - 1] === '▋') {
                render[currentCard] = render[currentCard].slice(0, -1);
            }

            // Check if we've reached the end of the text
            if (charsPrinted >= currentCardData.text.length) {
                printing = false;
                break;
            }

            // Special character handling
            if (currentCardData.text[charsPrinted] === '@') {
                charsPrinted++;

                // Process text between @ markers
                while (charsPrinted < currentCardData.text.length && currentCardData.text[charsPrinted] !== '@') {
                    // Speed adjustment
                    if (currentCardData.text[charsPrinted] === '~') {
                        speed++;
                        numScrollsHandled = Math.floor(scrollY / currentCardData.speed[speed]);
                        charsPrinted++;
                        continue;
                    }

                    // Escape @ character
                    if (currentCardData.text[charsPrinted] === '+') {
                        render[currentCard] += '@';
                        charsPrinted++;
                        continue;
                    }

                    // Add normal characters
                    render[currentCard] += currentCardData.text[charsPrinted];
                    charsPrinted++;
                }

                // Skip the closing @
                charsPrinted++;
                break;
            }

            // Add the next character and cursor
            render[currentCard] += currentCardData.text[charsPrinted];
            render[currentCard] += '▋';
            charsPrinted++;
            numScrollsHandled++;
        }

        // Restart cursor blinking
        timer = startCursorBlinking();
    };

    /**
     * Handle cursor blinking animation
     * Returns interval timer for blinking cursor
     */
    const startCursorBlinking = () => {
        return setInterval(() => {
            // Fix for double line breaks
            if (render[currentCard].length >= 8 && render[currentCard].slice(-8) === '<br><br>') {
                render[currentCard] = render[currentCard].slice(0, -4);
            }

            // Toggle cursor visibility
            if (render[currentCard][render[currentCard].length - 1] === '▋') {
                // Replace visible cursor with invisible one
                render[currentCard] = render[currentCard].slice(0, -1);
                render[currentCard] += '<span class="opacity-0">▋</span>';

                // Preserve line breaks
                if (render[currentCard].slice(-4) === '<br>') {
                    render[currentCard] += '<br>';
                }
            } else {
                // Replace invisible cursor with visible one
                if (render[currentCard].slice(-32) === '<span class="opacity-0">▋</span>') {
                    render[currentCard] = render[currentCard].slice(0, -32);
                }
                render[currentCard] += '▋';
            }
        }, TIMER_INTERVAL);
    };

    /**
     * Locks scrolling temporarily
     * Used for animations and transitions
     */
    function lockScroll(ms: number) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = '';
        }, ms);
    }

    /**
     * Set up card scroll detection and text printing
     */
    onMount(() => {
        // Handle scrolling to top on page refresh
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };

        // Wait for DOM to be fully rendered
        setTimeout(() => {
            // Initialize cursor blinking
            timer = startCursorBlinking();

            // Set up card observers
            const cards = document.querySelectorAll('.card');
            if (!cards.length) {
                console.error('No card elements found');
                return;
            }

            // Create intersection observer with options for better control
            const cardObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        // Only process if the card is intersecting
                        if (entry.isIntersecting) {
                            const cardIndex = parseInt(entry.target.classList[1].slice(5));

                            // Check if enough of the card is visible
                            if (entry.intersectionRatio > PRINT_VISIBILITY_THRESHOLD) {
                                // Only switch to next card if this is a new one
                                if (cardIndex > currentCard) {
                                    // Clear any cursor from previous card
                                    if (currentCard >= 0 && currentCard < cards.length) {
                                        const prevHtml = cards[currentCard].innerHTML;
                                        cards[currentCard].innerHTML = prevHtml.replace('▋', '')
                                            .replace('<span class="opacity-0">▋</span>', '');
                                    }

                                    printing = true;
                                    charsPrinted = 0;
                                    currentCard = cardIndex;

                                    // Check if the card needs to fade in
                                    if (cards[currentCard].classList.contains('opacity-0')) {
                                        lockScroll(1000);
                                        cards[currentCard].classList.remove('opacity-0');
                                        cards[currentCard].classList.add('animate-fadeIn');
                                    }

                                    speed = 0;
                                    numScrollsHandled = Math.floor(scrollY / cardData[currentCard].speed[speed]);
                                }
                            }
                        }
                    });
                },
                {
                    // These options give better control over when the observer fires
                    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                    rootMargin: "-20% 0px -40% 0px" // Adjusted detection box to account for navbar being in layout
                }
            );

            cards.forEach((card) => {
                cardObserver.observe(card);
            });

            // Set up visual observers
            const visuals = document.querySelectorAll('.visual');
            if (!visuals.length) {
                console.error('No visual elements found');
                return;
            }

            // Create similar observer for visuals
            const visualObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.intersectionRatio > PRINT_VISIBILITY_THRESHOLD) {
                            const visualIndex = parseInt(entry.target.classList[1].slice(7));

                            // Only proceed to next visual if this is a new one
                            if (visualIndex > currentVisual) {
                                currentVisual = visualIndex;

                                if (visuals[currentVisual].classList.contains('opacity-0')) {
                                    visuals[currentVisual].classList.remove('opacity-0');
                                    visuals[currentVisual].classList.add('animate-fadeIn');
                                }
                            }
                        }
                    });
                },
                {
                    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                    rootMargin: "-20% 0px -40% 0px" // Adjusted to account for navbar being in layout
                }
            );

            visuals.forEach((visual) => {
                visualObserver.observe(visual);
            });

            // Mark as initialized to enable scrolling effects
            initialized = true;
        }, 100); // Small delay to ensure DOM is fully rendered
    });
</script>

<!-- HTML -->
<svelte:window bind:scrollY={scrollY} />

<!-- Wrapper div with position relative instead of using absolute positioning everywhere -->
<div class="relative bg-theme-background">
  <!-- Two column grid layout for cards and visuals -->
  <div class="grid grid-cols-1 md:grid-cols-2 relative z-10">
    <!-- Cards column -->
    <div class="cards md:block">
      <!-- Card 0 with visuals 0 and 1 -->
      <div class="super_card_0">
        <div class="card card_0 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base animate-fadeIn">
          {@html render[0]}
        </div>
      </div>

      <!-- Visual 0 and 1 after Card 0 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_0">
          <div class="visual visual_0 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center animate-fadeIn">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/professional.jpg" alt="Professional" />
          </div>
        </div>
        <div class="super_visual super_visual_1">
          <div class="visual visual_1 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/chin.jpg" alt="Profile" />
          </div>
        </div>
      </div>

      <!-- Card 1 with visuals 2 and 3 -->
      <div class="super_card_1">
        <div class="card card_1 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[1]}
        </div>
      </div>

      <!-- Visual 2 and 3 after Card 1 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_2">
          <div class="visual visual_2 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/juice.jpg" alt="Casual" />
          </div>
        </div>
        <div class="super_visual super_visual_3">
          <div class="visual visual_3 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/snow.jpg" alt="Winter" />
          </div>
        </div>
      </div>

      <!-- Card 2 with visuals 4 and 5 -->
      <div class="super_card_2">
        <div class="card card_2 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[2]}
        </div>
      </div>

      <!-- Visual 4 and 5 after Card 2 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_4">
          <div class="visual visual_4 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/beachnight.jpg" alt="Beach Night" />
          </div>
        </div>
        <div class="super_visual super_visual_5">
          <div class="visual visual_5 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/beachchair.jpg" alt="Beach Chair" />
          </div>
        </div>
      </div>

      <!-- Card 3 with visuals 6 and 7 -->
      <div class="super_card_3">
        <div class="card card_3 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[3]}
        </div>
      </div>

      <!-- Visual 6 and 7 after Card 3 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_6">
          <div class="visual visual_6 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/wizard.jpg" alt="Wizard" />
          </div>
        </div>
        <div class="super_visual super_visual_7">
          <div class="visual visual_7 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/plasbrick_2.jpg" alt="Plasbrick" />
          </div>
        </div>
      </div>

      <!-- Card 4 with visual 8 -->
      <div class="super_card_4">
        <div class="card card_4 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[4]}
        </div>
      </div>

      <!-- Visual 8 after Card 4 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_8">
          <div class="visual visual_8 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <iframe class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-11rem)] rounded-lg" src="https://www.umassai.com/" title="UMass AI website" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      <!-- Card 5 with visuals 9 and 10 -->
      <div class="super_card_5">
        <div class="card card_5 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[5]}
        </div>
      </div>

      <!-- Visual 9 and 10 after Card 5 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_9">
          <div class="visual visual_9 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">

            {#if typeof window != 'undefined' && location.hostname === 'www.dwink.dev'}
              <div id="mobile-adobe-dc-view-1" class="w-full h-[calc(100vh-7rem)] sm:h-[calc(100vh-9rem)] rounded-lg"></div>
              <script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
              <script type="text/javascript">
                document.addEventListener("adobe_dc_view_sdk.ready", function(){
                  var adobeDCView =
                    new AdobeDC.View({clientId: "1cc3ec82e7c242c1909daa48e3da9c3d", divId: "mobile-adobe-dc-view-1"});
                  adobeDCView.previewFile({
                    content:{location: {url: "/images/paper.pdf"}},
                    metaData:{fileName: "Research Paper.pdf"}
                  }, {
                    embedMode: "SIZED_CONTAINER",
                    showDownloadPDF: true,
                    showPrintPDF: true,
                    showFullScreen: true
                  });
                });
              </script>
             {/if}
          </div>
        </div>
        <div class="super_visual super_visual_10">
          <div class="visual visual_10 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            {#if typeof window != 'undefined' && location.hostname === 'www.dwink.dev'}
              <div id="mobile-adobe-dc-view-2" class="w-full h-[calc(100vh-7rem)] sm:h-[calc(100vh-9rem)] rounded-lg"></div>
              <script type="text/javascript">
                document.addEventListener("adobe_dc_view_sdk.ready", function(){
                  var adobeDCView =
                    new AdobeDC.View({clientId: "1cc3ec82e7c242c1909daa48e3da9c3d", divId: "mobile-adobe-dc-view-2"});
                  adobeDCView.previewFile({
                    content:{location: {url: "/images/poster.pdf"}},
                    metaData:{fileName: "Conference Poster.pdf"}
                  }, {
                    embedMode: "SIZED_CONTAINER",
                    showDownloadPDF: true,
                    showPrintPDF: true,
                    showFullScreen: true
                  });
                });
              </script>
             {/if}
          </div>
        </div>
      </div>

      <!-- Card 6 with visual 11 -->
      <div class="super_card_6">
        <div class="card card_6 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[6]}
        </div>
      </div>

      <!-- Visual 11 after Card 6 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_11">
          <div class="visual visual_11 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <iframe class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-11rem)] rounded-lg" src="https://beatcode.dev/" title="BeatCode Website" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      <!-- Card 7 with visuals 12 and 13 -->
      <div class="super_card_7">
        <div class="card card_7 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[7]}
        </div>
      </div>

      <!-- Visual 12 and 13 after Card 7 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_12">
          <div class="visual visual_12 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <iframe class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-11rem)] rounded-lg" src="https://www.youtube.com/embed/9HHAOiQH_pA?start=78" title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
        <div class="super_visual super_visual_13">
          <div class="visual visual_13 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <iframe class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-11rem)] rounded-lg" src="https://www.youtube.com/embed/MdE_fYm7meg?si=id_WXNJd_2i6ZSOO" title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      <!-- Card 8 with visual 14 -->
      <div class="super_card_8">
        <div class="card card_8 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[8]}
        </div>
      </div>

      <!-- Visual 14 after Card 8 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_14">
          <div class="visual visual_14 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <iframe class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-11rem)] rounded-lg" src="https://www.youtube.com/embed/XfWcxHTRSsI" title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      <!-- Remaining cards without visuals -->
      <div class="super_card_9">
        <div class="card card_9 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-2 sm:mt-4 mx-1 sm:ml-4 p-2 sm:p-4 break-words whitespace-pre-wrap text-sm sm:text-base">
          {@html render[9]}
        </div>
      </div>

      <!-- Visual 15 after Card 8 (mobile only) -->
      <div class="block md:hidden">
        <div class="super_visual super_visual_15">
          <div class="visual visual_15 sticky top-20 sm:top-28 min-h-80 sm:min-h-96 mt-4 mx-1 p-2 sm:p-4 flex justify-center items-center">
            <img class="max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/lightman.jpg" alt="Lightman" />
          </div>
        </div>
      </div>
    </div>

    <!-- Visuals column - only visible on medium screens and up -->
    <div class="visuals hidden md:block">
      <div class="super_visual super_visual_0">
        <div class="visual visual_0 sticky top-28 min-h-96 ml-4 mr-4 p-4 flex justify-center items-center animate-fadeIn">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/professional.jpg" alt="Professional" />
        </div>
      </div>
      <div class="super_visual super_visual_1">
        <div class="visual visual_1 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/chin.jpg" alt="Profile" />
        </div>
      </div>
      <!-- Rest of visuals for desktop view -->
      <div class="super_visual super_visual_2">
        <div class="visual visual_2 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/juice.jpg" alt="Casual" />
        </div>
      </div>
      <div class="super_visual super_visual_3">
        <div class="visual visual_3 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/snow.jpg" alt="Winter" />
        </div>
      </div>
      <div class="super_visual super_visual_4">
        <div class="visual visual_4 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/beachnight.jpg" alt="Beach Night" />
        </div>
      </div>
      <div class="super_visual super_visual_5">
        <div class="visual visual_5 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/beachchair.jpg" alt="Beach Chair" />
        </div>
      </div>
      <div class="super_visual super_visual_6">
        <div class="visual visual_6 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/wizard.jpg" alt="Wizard" />
        </div>
      </div>
      <div class="super_visual super_visual_7">
        <div class="visual visual_7 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/plasbrick_2.jpg" alt="Plasbrick" />
        </div>
      </div>
      <div class="super_visual super_visual_8">
        <div class="visual visual_8 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <iframe class="max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-11rem)] rounded-lg" src="https://www.umassai.com/" title="UMass AI website" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div class="super_visual super_visual_9">
        <div class="visual visual_9 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          {#if typeof window != 'undefined' && location.hostname === 'www.dwink.dev'}
          <div id="adobe-dc-view-1" class="w-full h-[calc(100vh-9rem)] rounded-lg"></div>
          <script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
          <script type="text/javascript">
            document.addEventListener("adobe_dc_view_sdk.ready", function(){
              var adobeDCView =
                new AdobeDC.View({clientId: "1cc3ec82e7c242c1909daa48e3da9c3d", divId: "adobe-dc-view-1"});
              adobeDCView.previewFile({
                content:{location: {url: "/images/paper.pdf"}},
                metaData:{fileName: "Research Paper.pdf"}
              }, {
                embedMode: "SIZED_CONTAINER",
                showDownloadPDF: true,
                showPrintPDF: true,
                showFullScreen: true
              });
            });
          </script>
          {/if}
        </div>
      </div>
      <div class="super_visual super_visual_10">
        <div class="visual visual_10 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          {#if typeof window != 'undefined' && location.hostname === 'www.dwink.dev'}
          <div id="adobe-dc-view-2" class="w-full h-[calc(100vh-9rem)] rounded-lg"></div>
          <script type="text/javascript">
            document.addEventListener("adobe_dc_view_sdk.ready", function(){
              var adobeDCView =
                new AdobeDC.View({clientId: "1cc3ec82e7c242c1909daa48e3da9c3d", divId: "adobe-dc-view-2"});
              adobeDCView.previewFile({
                content:{location: {url: "/images/poster.pdf"}},
                metaData:{fileName: "Conference Poster.pdf"}
              }, {
                embedMode: "SIZED_CONTAINER",
                showDownloadPDF: true,
                showPrintPDF: true,
                showFullScreen: true
              });
            });
          </script>
          {/if}
        </div>
      </div>
      <div class="super_visual super_visual_11">
        <div class="visual visual_11 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <iframe class="max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-11rem)] rounded-lg" src="https://beatcode.dev/" title="BeatCode Website" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div class="super_visual super_visual_12">
        <div class="visual visual_12 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <iframe class="max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-11rem)] rounded-lg" src="https://www.youtube.com/embed/9HHAOiQH_pA?start=78" title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div class="super_visual super_visual_13">
        <div class="visual visual_13 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <iframe class="max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-11rem)] rounded-lg" src="https://www.youtube.com/embed/MdE_fYm7meg?si=id_WXNJd_2i6ZSOO" title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div class="super_visual super_visual_14">
        <div class="visual visual_14 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <iframe class="max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-11rem)] rounded-lg" src="https://www.youtube.com/embed/XfWcxHTRSsI" title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div class="super_visual super_visual_15">
        <div class="visual visual_15 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
          <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/lightman.jpg" alt="Lightman" />
        </div>
    </div>
  </div>
</div>
  </div>

<!-- Anchor for the bottom of the page -->
<div id="bottom"></div>

<style lang="css">
  /* Super card heights - consistent for better scrolling */
  .super_card_0, .super_card_1, .super_card_2, .super_card_3,
  .super_card_4, .super_card_5, .super_card_6, .super_card_7,
  .super_card_8 {
    height: calc(2500px);
    position: relative;
  }

  .super_card_9 {
    height: 1500px;
  }

  /* Visual heights for desktop view */
  .super_visual_0, .super_visual_1, .super_visual_2, .super_visual_3,
  .super_visual_4, .super_visual_5, .super_visual_6, .super_visual_7,
  .super_visual_9, .super_visual_10, .super_visual_12, .super_visual_13 {
    height: 1250px;
    position: relative;
  }

  .super_visual_8, .super_visual_11, .super_visual_14 {
    height: 2500px;
    position: relative;
  }

  .super_visual_15 {
    height: 1500px;
  }

  /* Mobile-specific height adjustments */
  @media (max-width: 768px) {
    .super_card_0, .super_card_1, .super_card_2, .super_card_3,
    .super_card_4, .super_card_5, .super_card_6, .super_card_7,
    .super_card_8, .super_card_9, .super_card_10, .super_card_11 {
      height: calc(1500px); /* Reduced height for mobile */
    }

    .super_visual_0, .super_visual_1, .super_visual_2, .super_visual_3,
    .super_visual_4, .super_visual_5, .super_visual_6, .super_visual_7,
    .super_visual_9, .super_visual_10, .super_visual_12, .super_visual_13 {
      height: 750px;
    }

    .super_visual_8, .super_visual_11, .super_visual_14 {
      height: 1250px;
    }

    .super_card_9 {
      height: calc(1000px)
    }

    .super_visual_15 {
      height: calc(500px)
    }
  }

  /* Improved card and visual styling */
  .card, .visual {
    opacity: 1 !important;
    position: sticky !important;
    /* Use consistent positioning based on screen size */
    top: calc(20px + 5vh) !important;
    transition: opacity 0.5s ease, transform 0.5s ease;
    will-change: transform, opacity;
    z-index: 2;
  }

  /* Adjust positioning for larger screens */
  @media (min-width: 640px) {
    .card, .visual {
      top: calc(28px + 5vh) !important;
    }
  }

  /* Ensure cards have higher z-index than visuals */
  .card {
    z-index: 3;
    margin-bottom: 2vh;
  }

  /* Improved fade-in animation */
  .animate-fadeIn {
    animation: fadeIn 1s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Bottom anchor */
  #bottom {
    height: 0;
    width: 0;
    position: absolute;
    bottom: 0;
  }

  /* Theme CSS Variables for Light/Dark Mode */
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
</style>