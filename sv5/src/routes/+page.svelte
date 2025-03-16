<!-- This is the intro page and contains a pudding.cool style series of cards and visuals that the user scrolls between. -->

<!-- Script -->
<script lang="ts">
    // Imports
    import { onMount } from 'svelte';
    import '../app.css';
    import { TO_PRINT } from './resumeInfo';

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
    let render = $state(['', '', '', '', '', '', '', '', '']);

    // Derived state
    let numScrolled = $derived(Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]));

    // Effect to handle scrolling
    $effect(() => {
        if (numScrolled > numScrollsHandled) {
            handleScroll();
        }
    });

    // Adding initial card text
    render.forEach((cardText, i) => {
        render[i] = TO_PRINT[i].initial || '';
    });

    // Handle scrolling
    const handleScroll = async () => {
        if (!printing) {
            return;
        }
        if (render[currentCard].length >= 18 && render[currentCard].slice(-32) === '<span class="opacity-0">▋</span>') {
            render[currentCard] = render[currentCard].slice(0, -32);
        }
        if (currentCard === 0 && charsPrinted === 0) {
            render[currentCard] = '';
        }
        clearInterval(timer);
        for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
            if (render[currentCard][render[currentCard].length - 1] === '▋') {
                render[currentCard] = render[currentCard].slice(0, -1);
            }
            if (charsPrinted >= TO_PRINT[currentCard].text.length) {
                printing = false;
                break;
            }
            if (TO_PRINT[currentCard].text[charsPrinted] === '@') {
                charsPrinted++;
                while (TO_PRINT[currentCard].text[charsPrinted] !== '@') {
                    if (TO_PRINT[currentCard].text[charsPrinted] === '~') {
                        speed++;
                        numScrollsHandled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
                        charsPrinted++;
                        continue;
                    }
                    if (TO_PRINT[currentCard].text[charsPrinted] === '+') {
                        render[currentCard] += '@';
                        charsPrinted++;
                        continue;
                    }
                    render[currentCard] += TO_PRINT[currentCard].text[charsPrinted];
                    charsPrinted++;
                }
                charsPrinted++;
                break;
            }
            render[currentCard] += TO_PRINT[currentCard].text[charsPrinted];
            render[currentCard] += '▋'
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
                        cards[currentCard].innerHTML.replace('▋', '');
                        printing = true;
                        charsPrinted = 0;
                        currentCard++;
                        if (cards[currentCard].classList.contains('opacity-0')) {
                            lockScroll(1000);
                            cards[currentCard].classList.remove('opacity-0');
                            cards[currentCard].classList.add('animate-fadeIn');
                        }
                        speed = 0;
                        numScrollsHandled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
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

<!-- Bind scrollY to the window's scrollY -->
<svelte:window bind:scrollY={scrollY} />

<!-- HTML with theme background class applied -->
<div class="relative bg-theme-background">
  <div class="container">
    <div class="skipcont">
      <!-- Cards and visuals -->
      <div class="flexreel grid grid-cols-2">
        <!-- Cards -->
        <div class="cards">
          <div class="super_card super_card_0">
            <div class="card card_0 sticky top-28 min-h-96 ml-4 p-4 break-words whitespace-pre-wrap animate-fadeIn font-ibm">
              {@html render[0]}
            </div>
          </div>
          <div class="super_card super_card_1">
            <div class="card card_1 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap font-ibm">
              {@html render[1]}
            </div>
          </div>
          <div class="super_card super_card_2">
            <div class="card card_2 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap font-ibm">
              {@html render[2]}
            </div>
          </div>
          <div class="super_card super_card_3">
            <div class="card card_3 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap font-ibm">
              {@html render[3]}
            </div>
          </div>
          <div class="super_card super_card_4">
            <div class="card card_4 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap font-ibm">
              {@html render[4]}
            </div>
          </div>
          <div class="super_card super_card_5">
            <div class="card card_5 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap font-ibm">
              {@html render[5]}
            </div>
          </div>
          <div class="super_card super_card_6">
            <div class="card card_6 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap font-ibm">
              {@html render[6]}
            </div>
          </div>
          <div class="super_card super_card_7">
            <div class="card card_7 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap font-ibm">
              {@html render[7]}
            </div>
          </div>
          <div class="super_card super_card_8">
            <div class="card card_8 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap font-ibm">
              {@html render[8]}
            </div>
          </div>
        </div>

        <!-- Visuals -->
        <div class="visuals">
          <div class="super_visual super_visual_0">
            <div class="visual visual_0 sticky top-28 ml-4 mr-4 animate-fadeIn">
              <img class="h-auto max-h-86.2vh rounded-lg" src="/images/professional.jpg" alt="Professional photo" />
            </div>
          </div>
          <div class="super_visual super_visual_1">
            <div class="visual visual_1 sticky top-28 ml-4 mr-4 mt-4">
              <img class="h-auto max-h-86.2vh rounded-lg" src="/images/chin.jpg" alt="Profile photo" />
            </div>
          </div>
          <div class="super_visual super_visual_2">
            <div class="visual visual_2 sticky top-28 ml-4 mr-4 mt-4">
              <img class="h-auto max-h-86.2vh rounded-lg" src="/images/juice.jpg" alt="Casual photo" />
            </div>
          </div>
          <div class="super_visual super_visual_3">
            <div class="visual visual_3 sticky top-28 ml-4 mr-4 mt-4">
              <img class="h-auto max-h-86.2vh rounded-lg" src="/images/snow.jpg" alt="Winter photo" />
            </div>
          </div>
          <div class="super_visual super_visual_4">
            <div class="visual visual_4 sticky top-28 ml-4 mr-4 mt-4">
              <img class="h-auto max-h-86.2vh rounded-lg" src="/images/hack_umass_2.jpg" alt="HackUMass photo" />
            </div>
          </div>
          <div class="super_visual super_visual_5">
            <div class="visual visual_5 sticky top-28 ml-4 mr-4 mt-4">
              <img class="h-auto max-h-86.2vh rounded-lg" src="/images/hack_princeton.jpg" alt="HackPrinceton photo" />
            </div>
          </div>
          <div class="super_visual super_visual_6">
            <div class="visual visual_6 sticky top-28 ml-4 mr-4 mt-4">
              <img class="h-auto max-h-86.2vh rounded-lg" src="/images/wizard.jpg" alt="Fun photo" />
            </div>
          </div>
          <div class="super_visual super_visual_7">
            <div class="visual visual_7 sticky top-28 ml-4 mr-4 mt-4">
              <img class="h-auto max-h-86.2vh rounded-lg" src="/images/personal_web_wireframe.jpg" alt="Project photo" />
            </div>
          </div>
          <div class="super_visual super_visual_8">
            <div class="visual visual_8 sticky top-28 ml-4 mr-4 mt-4">
              <iframe class="h-96 w-full rounded-lg" src="https://www.youtube.com/embed/C0lpYQtMhu8?si=BwRp5bTAGB2_TKlG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--Styles-->
<style lang="css">
  /* View Containers */
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .flexreel {
    height: 26000px;
    z-index: 1;
  }
  .flexreel, .skipcont {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .skipcont {
    height: 100%;
    z-index: 1;
  }
  .skipbtn {
    margin-top: 90vh;
    margin-left: 50vw;
  }

  /* Card lengths - Adjusted for combined bio and contact card */
  .super_card_0 {
    height: calc(4500px + 16px); /* Intro card */
  }
  .super_card_1 {
    height: calc(5000px + 16px); /* Combined bio and contact card - increased height */
  }
  .super_card_2 {
    height: calc(4000px + 16px); /* Technologies section */
  }
  .super_card_3 {
    height: calc(3500px + 8px); /* Education section */
  }
  .super_card_4 {
    height: calc(4000px + 8px); /* Experience MassAI */
  }
  .super_card_5 {
    height: calc(4000px + 8px); /* Second experience section */
  }
  .super_card_6 {
    height: calc(3500px + 8px); /* Projects section */
  }
  .super_card_7 {
    height: calc(3500px + 8px); /* More projects */
  }
  .super_card_8 {
    height: calc(4000px + 8px); /* Awards section */
  }

  /* Visual lengths - Adjusted to match card heights */
  .super_visual_0 {
    height: 2250px; /* Intro card */
  }
  .super_visual_1 {
    height: 2500px; /* Bio and contact */
  }
  .super_visual_2 {
    height: 2000px; /* Technologies */
  }
  .super_visual_3 {
    height: 1750px; /* Education */
  }
  .super_visual_4 {
    height: 2000px; /* Experience MassAI */
  }
  .super_visual_5 {
    height: 2000px; /* Second experience */
  }
  .super_visual_6 {
    height: 1750px; /* Projects */
  }
  .super_visual_7 {
    height: 1750px; /* More projects */
  }
  .super_visual_8 {
    height: 2000px; /* Awards */
  }

  /* Ensure all visuals are visible on page load */
  .visual {
    opacity: 1 !important;
  }

  /* Fonts */
  @font-face {
    font-family: 'IBM Plex Mono';
    src: url('../lib/fonts/IBM Plex Mono/semibolditalic.woff2') format('woff2');
    font-style: italic;
  }
  @font-face {
    font-family: 'IBM Plex Mono Bold';
    src: url('../lib/fonts/IBM Plex Mono/bolditalic.woff2') format('woff2');
    font-weight: bold;
    font-style: italic;
  }
  @font-face {
    font-family: 'Inter';
    src: url('../lib/fonts/Inter/Inter-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Roboto Mono';
    src: url('../lib/fonts/Roboto Mono/RobotoMono-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Ubuntu Sans Mono';
    src: url('../lib/fonts/Ubuntu Sans Mono/UbuntuSansMono-Regular.woff2') format('woff2');
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

  /* Dark Mode Colors - Modified to use .dark class instead of media query */
  :root.dark, html.dark {
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

  /* Theme Class Utilities */
  .text-theme-primary { color: var(--color-primary) !important; }
  .text-theme-accent1 { color: var(--color-accent1) !important; }
  .text-theme-accent2 { color: var(--color-accent2) !important; }
  .text-theme-accent3 { color: var(--color-accent3) !important; }
  .text-theme-accent4 { color: var(--color-accent4) !important; }
  .text-theme-accent5 { color: var(--color-accent5) !important; }
  .text-theme-accent6 { color: var(--color-accent6) !important; }
  .text-theme-text { color: var(--color-text) !important; }
  .text-theme-neutral { color: var(--color-neutral) !important; }
  .text-theme-link { color: var(--color-link) !important; }
  .border-theme-link-border { border-color: var(--color-link-border) !important; }
  .border-theme-border { border-color: var(--color-border) !important; }
  .bg-theme-background { background-color: var(--color-background) !important; }

  /* Smooth transition between modes */
  * {
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  }
</style>