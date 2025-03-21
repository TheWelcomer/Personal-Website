<!-- Script remains the same -->
<script lang="ts">
    // Imports
    import { onMount } from 'svelte';
    import '../app.css';
    import { TO_PRINT } from './resumeInfo';
    import PdfViewer from 'svelte-pdf';
    import { Avatar, AppBar, Modal} from '@skeletonlabs/skeleton-svelte';
    import { page } from '$app/stores';

    // Constants
    const TIMER_INTERVAL = 515;

    // State variables
    let scrollY = $state(0);
    let numScrollsHandled = $state(0);
    let speed = $state(0);
    let charsPrinted = $state(0);
    let currentCard = $state(0);
    let currentVisual = $state(0);
    let printing = $state(true);

    // Drawer state for the navbar
    let drawerState = $state(false);

    // Make sure TO_PRINT has enough items for 11 cards, fill with empty objects if needed
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

    let render = $state(['', '', '', '', '', '', '', '', '', '', '']);

    // Derived state
    let numScrolled = $derived(Math.floor(scrollY / cardData[currentCard].speed[speed]));

    // Effect to handle scrolling
    $effect(() => {
        if (numScrolled > numScrollsHandled) {
            handleScroll();
        }
    });

    // Adding initial card text
    render.forEach((cardText, i) => {
        render[i] = (cardData[i] && cardData[i].initial) || '';
    });

    // Drawer functions
    function drawerClose() {
        drawerState = false;
    }

    function openDrawer() {
        drawerState = true;
    }

    // Handle scrolling
    const handleScroll = async () => {
        if (!printing) return;

        if (render[currentCard].length >= 18 && render[currentCard].slice(-32) === '<span class="opacity-0">▋</span>') {
            render[currentCard] = render[currentCard].slice(0, -32);
        }

        if (currentCard === 0 && charsPrinted === 0) {
            render[currentCard] = '';
        }

        clearInterval(timer);

        const currentCardData = cardData[currentCard] || { text: '', speed: [10] };

        for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
            if (render[currentCard][render[currentCard].length - 1] === '▋') {
                render[currentCard] = render[currentCard].slice(0, -1);
            }

            if (charsPrinted >= currentCardData.text.length) {
                printing = false;
                break;
            }

            if (currentCardData.text[charsPrinted] === '@') {
                charsPrinted++;
                while (charsPrinted < currentCardData.text.length && currentCardData.text[charsPrinted] !== '@') {
                    if (currentCardData.text[charsPrinted] === '~') {
                        speed++;
                        numScrollsHandled = Math.floor(scrollY / currentCardData.speed[speed]);
                        charsPrinted++;
                        continue;
                    }
                    if (currentCardData.text[charsPrinted] === '+') {
                        render[currentCard] += '@';
                        charsPrinted++;
                        continue;
                    }
                    render[currentCard] += currentCardData.text[charsPrinted];
                    charsPrinted++;
                }
                charsPrinted++;
                break;
            }

            render[currentCard] += currentCardData.text[charsPrinted];
            render[currentCard] += '▋';
            charsPrinted++;
            numScrollsHandled++;
        }

        timer = startCursorBlinking();
    }

    // Handle cursor blinking
    const startCursorBlinking = () => {
        return setInterval(() => {
            if (render[currentCard].length >= 8 && render[currentCard].slice(-8) === '<br><br>') {
                render[currentCard] = render[currentCard].slice(0, -4);
            }

            if (render[currentCard][render[currentCard].length - 1] === '▋') {
                render[currentCard] = render[currentCard].slice(0, -1);
                render[currentCard] += '<span class="opacity-0">▋</span>';

                if (render[currentCard].slice(-4) === '<br>') {
                    render[currentCard] += '<br>';
                }
            } else {
                if (render[currentCard].slice(-32) === '<span class="opacity-0">▋</span>') {
                    render[currentCard] = render[currentCard].slice(0, -32);
                }
                render[currentCard] += '▋';
            }
        }, TIMER_INTERVAL);
    }

    // Handle scrolling to top on page refresh
    onMount(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    });

    // Handle active card switching
    onMount(() => {
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.boundingClientRect.top < 0) {
                    let thinksCurrentCard = parseInt(entry.target.classList[1][5]) + 1;
                    if (thinksCurrentCard > currentCard) {
                        cards[currentCard].innerHTML = cards[currentCard].innerHTML.replace('▋', '');
                        printing = true;
                        charsPrinted = 0;
                        currentCard++;

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
        );

        cards.forEach((card) => {
            observer.observe(card);
        });
    });

    // Handle active visual switching
    onMount(() => {
        const visuals = document.querySelectorAll('.visual');
        const visualObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.boundingClientRect.top < 0) {
                    let thinksCurrentVisual = parseInt(entry.target.classList[1].slice(7)) + 1;
                    if (thinksCurrentVisual > currentVisual) {
                        currentVisual++;

                        if (visuals[currentVisual].classList.contains('opacity-0')) {
                            visuals[currentVisual].classList.remove('opacity-0');
                            visuals[currentVisual].classList.add('animate-fadeIn');
                        }
                    }
                }
            }
        );

        visuals.forEach((visual) => {
            visualObserver.observe(visual);
        });
    });

    function lockScroll(ms: number) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = '';
        }, ms);
    }

    // Start cursor blinking
    let timer = startCursorBlinking();
</script>

<!-- HTML -->
<svelte:window bind:scrollY={scrollY} />

<!-- Add these font classes to make the styling work correctly -->
<svelte:head>
  <style>
    .font-ibm-bold {
      font-family: 'IBM Plex Mono Bold', monospace;
      font-weight: bold;
    }
    .font-ibm {
      font-family: 'IBM Plex Mono', monospace;
    }
  </style>
</svelte:head>

<!-- This outer wrapper ensures the navbar stays fixed regardless of scrolling -->
<div class="outer-wrapper">
  <!-- Fixed navbar container positioned outside the scrollable area -->
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
      <a href="/about" class="btn font-ibm-bold hidden md:inline-flex lg:inline-flex md:btn-lg lg:btn-lg preset-tonal mr-2">
        About Me
      </a>
      <a href="/resume" class="btn font-ibm-bold hidden md:inline-flex lg:inline-flex md:btn-lg lg:btn-lg preset-tonal mr-2">
        Resume
      </a>
      <a href="/blog" class="btn font-ibm-bold hidden md:inline-flex lg:inline-flex md:btn-lg lg:btn-lg preset-tonal mr-2">
        Blog
      </a>
      {/snippet}

      {#snippet trail()}
      <!-- Keep this empty for now -->
      {/snippet}
    </AppBar>
  </div>

  <!-- Drawer Modal with Skeleton.dev styling -->
  <Modal
      open={drawerState}
      onOpenChange={(e) => (drawerState = e.open)}
      contentBase="bg-surface-800 text-white p-4 space-y-4 shadow-xl w-[280px] md:w-[480px] h-screen rounded-r-xl"
      positionerJustify="justify-start"
      positionerAlign=""
      positionerPadding=""
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
        <a class="btn variant-ghost-surface w-full justify-start font-ibm" href="/about">About Me</a>
        <a class="btn variant-ghost-surface w-full justify-start font-ibm" href="/resume">Resume</a>
        <a class="btn variant-ghost-surface w-full justify-start font-ibm" href="/blog">Blog</a>
      </nav>
    </article>
    <hr class="opacity-50" />
    <footer class="mt-4">
      <button type="button" class="btn variant-filled-primary w-full font-ibm-bold" on:click={drawerClose}>Close</button>
    </footer>
    {/snippet}
  </Modal>

  <!-- Main content with padding for the fixed navbar -->
  <div class="content-container">
    <div class="relative bg-theme-background pt-16">
      <div class="w-full h-full absolute">
        <div class="w-full h-full absolute top-0 left-0 z-10">
          <!-- Cards and visuals - responsive grid layout -->
          <div class="grid grid-cols-1 md:grid-cols-2 h-[26000px] w-full absolute top-0 left-0 z-10">
            <!-- On mobile, show only a single column with cards and visuals interweaved -->
            <div class="cards md:block">
              {#each Array(11) as _, i}
                <div class={`super_card_${i}`}>
                  <div class={`card card_${i} sticky top-28 min-h-96 ${i > 0 ? 'mt-4' : ''} ml-4 p-4 break-words whitespace-pre-wrap ${i === 0 ? 'animate-fadeIn' : ''}`}>
                    {@html render[i]}
                  </div>
                </div>

                <!-- Insert visuals after each card on mobile only -->
                <div class="block md:hidden">
                  <div class={`super_visual super_visual_${i} md:hidden`}>
                    <div class={`visual visual_${i} sticky top-28 min-h-96 ${i > 0 ? 'mt-4' : ''} ml-4 mr-4 p-4 flex justify-center items-center ${i === 0 ? 'animate-fadeIn' : ''}`}>
                      <!-- Copy of the visual content for this index -->
                      {#if i === 0}
                        <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/professional.jpg" alt="Professional" />
                      {:else if i === 1}
                        <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/chin.jpg" alt="Profile" />
                      {:else if i === 2}
                        <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/juice.jpg" alt="Casual" />
                      {:else if i === 3}
                        <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/snow.jpg" alt="Winter" />
                      {:else if i === 4}
                        <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/beachnight.jpg" alt="Beach Night" />
                      {:else if i === 5}
                        <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/beachchair.jpg" alt="Beach Chair" />
                      {:else if i === 6}
                        <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/wizard.jpg" alt="Wizard" />
                      {:else if i === 7}
                        <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/plasbrick_2.jpg" alt="Plasbrick" />
                      {:else if i === 8}
                        <iframe class="max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-11rem)] rounded-lg" src="https://www.umassai.com/" title="UMass AI website" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                      {:else if i === 9}
                        <div id="mobile-adobe-dc-view-1" class="w-full h-[calc(100vh-9rem)] rounded-lg"></div>
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
                      {:else if i === 10}
                        <div id="mobile-adobe-dc-view-2" class="w-full h-[calc(100vh-9rem)] rounded-lg"></div>
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
              {/each}
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
              <!-- Rest of visuals remain unchanged for desktop view -->
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
                  <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/beachnight.jpg" alt="Winter" />
                </div>
              </div>
              <div class="super_visual super_visual_5">
                <div class="visual visual_5 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
                  <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/beachchair.jpg" alt="Winter" />
                </div>
              </div>
              <div class="super_visual super_visual_6">
                <div class="visual visual_6 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
                  <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/wizard.jpg" alt="Winter" />
                </div>
              </div>
              <div class="super_visual super_visual_7">
                <div class="visual visual_7 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
                  <img class="max-h-[calc(100vh-9rem)] max-w-full object-scale-down rounded-lg" src="/images/plasbrick_2.jpg" alt="Winter" />
                </div>
              </div>
              <div class="super_visual super_visual_8">
                <div class="visual visual_8 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
                  <iframe class="max-h-[calc(100vh-9rem)] w-full h-[calc(100vh-11rem)] rounded-lg" src="https://www.umassai.com/" title="UMass AI website" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
              </div>
              <div class="super_visual super_visual_9">
                <div class="visual visual_9 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
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
                </div>
              </div>
              <div class="super_visual super_visual_10">
                <div class="visual visual_10 sticky top-28 min-h-96 mt-4 ml-4 mr-4 p-4 flex justify-center items-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Anchor for the bottom of the page -->
  <div id="bottom"></div>
</div>

<style lang="css">
  /* Super card heights */
  /* Super card heights - adjusted for smoother, more consistent scrolling */
  .super_card_0 { height: calc(2500px); }  /* Reduced from 4500px */
  .super_card_1 { height: calc(2500px); }  /* Reduced from 5000px */
  .super_card_2 { height: calc(2500px); }  /* Reduced from 4000px */
  .super_card_3 { height: calc(2500px); }   /* Reduced from 3500px */
  .super_card_4 { height: calc(2500px); }   /* Reduced from 4000px */
  .super_card_5 { height: calc(2500px); }   /* Reduced from 4000px */
  .super_card_6 { height: calc(2500px); }   /* Reduced from 3500px */
  .super_card_7 { height: calc(2500px); }   /* Reduced from 3500px */
  .super_card_8 { height: calc(2500px); }   /* Reduced from 4000px */
  .super_card_9 { height: calc(2500px); }   /* Reduced from 4000px */
  .super_card_10 { height: calc(2500px); }  /* Reduced from 4000px */

  /* Visual heights - adjusted for desktop view */
  .super_visual_0 { height: 1250px; }  /* Adjusted from 2250px */
  .super_visual_1 { height: 1250px; }  /* Adjusted from 2500px */
  .super_visual_2 { height: 1250px; }  /* Adjusted from 2000px */
  .super_visual_3 { height: 1250px; }  /* Adjusted from 1750px */
  .super_visual_4 { height: 1250px; }  /* Adjusted from 2000px */
  .super_visual_5 { height: 1250px; }  /* Adjusted from 2000px */
  .super_visual_6 { height: 1250px; }  /* Adjusted from 1750px */
  .super_visual_7 { height: 1250px; }  /* Adjusted from 1750px */
  .super_visual_8 { height: 2500px; }  /* Adjusted from 2000px */
  .super_visual_9 { height: 1250px; }  /* Adjusted from 2000px */
  .super_visual_10 { height: 1250px; } /* Adjusted from 2000px */
  .super_visual_11 { height: 2500px; } /* Adjusted from 2000px */
  .super_visual_12 { height: 1250px; } /* Adjusted from 2000px */
  .super_visual_13 { height: 1250px; } /* Adjusted from 2000px */
  .super_visual_14 { height: 2500px; } /* Adjusted from 2000px */

  /* Mobile-specific height adjustments for the single column layout */
  @media (max-width: 768px) {
    .super_card_0, .super_card_1, .super_card_2, .super_card_3,
    .super_card_4, .super_card_5, .super_card_6, .super_card_7,
    .super_card_8, .super_card_9, .super_card_10 {
      height: calc(1500px); /* Reduced height for mobile */
    }
  }

  .visual {
    opacity: 1 !important;
    position: sticky !important; /* Explicitly set sticky positioning */
    top: 7rem !important; /* Match the top-28 (7rem) used in your HTML */
  }

  /* Outer wrapper to contain everything */
  .outer-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }

  /* Fixed navbar container - position fixed to stay at top during scrolling */
  .fixed-navbar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999; /* Maximum z-index to keep above all content */
  }

  /* Content container with appropriate padding for navbar */
  .content-container {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin-top: 0; /* No margin needed since we use padding */
  }

  /* Anchor styling */
  #bottom {
    height: 0;
    width: 0;
    position: absolute;
    bottom: 0;
  }

  /* Fonts */
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
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter/Inter-Regular.woff2') format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto Mono';
    src: url('/fonts/Roboto Mono/RobotoMono-Regular.woff2') format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: 'Ubuntu Mono';
    src: url('/fonts/Ubuntu Sans Mono/UbuntuSansMono-Regular.woff2') format('woff2');
    font-display: swap;
  }

  /* Theme CSS Variables for Light/Dark Mode - kept for inline styles to work */
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

  /* Dark Mode Colors - removed html.dark selector */
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