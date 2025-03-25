// blogData.ts
// This file contains the data for blog posts

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    image?: string;
    tags?: string[];
    author?: {
        name: string;
        avatar?: string;
    };
}

// Sample blog post data
export const BLOG_POSTS: BlogPost[] = [
//     {
//         id: '1',
//         title: 'Building Responsive Interfaces with Svelte 5',
//         excerpt: 'Explore the power of Svelte 5\'s reactivity and state management for building modern, responsive interfaces.',
//         date: '2025-03-10T12:00:00Z',
//         category: 'tech',
//         image: '/images/professional.jpg',
//         tags: ['svelte', 'webdev', 'javascript', 'frontend'],
//         author: {
//             name: 'Your Name',
//             avatar: '/images/professional.jpg'
//         },
//         content: `
// # Building Responsive Interfaces with Svelte 5
//
// Svelte has revolutionized the way we build web interfaces by shifting the work from the browser to the compile step. With Svelte 5, we now have even more powerful tools at our disposal, like the new state management system using \`$state\`, \`$derived\`, and \`$effect\`.
//
// ## The Power of Fine-Grained Reactivity
//
// One of the biggest improvements in Svelte 5 is the introduction of fine-grained reactivity. Unlike the previous versions where reactivity was defined at the component level, Svelte 5 allows us to define reactivity at the variable level.
//
// \`\`\`javascript
// let count = $state(0);
// let doubled = $derived(count * 2);
//
// $effect(() => {
//     console.log(\`Count is \${count}, doubled is \${doubled}\`);
// });
// \`\`\`
//
// This new approach eliminates the need for the \`$:\` syntax and provides a more intuitive way to define reactive variables and effects.
//
// ## Building a Responsive Navigation
//
// Let's look at how we can build a responsive navigation component using Svelte 5's new features:
//
// \`\`\`svelte
// <script>
//     let isMenuOpen = $state(false);
//     let scrollY = $state(0);
//     let isScrolled = $derived(scrollY > 50);
//
//     function toggleMenu() {
//         isMenuOpen = !isMenuOpen;
//     }
//
//     $effect(() => {
//         if (isMenuOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = '';
//         }
//     });
// </script>
//
// <svelte:window bind:scrollY={scrollY} />
//
// <nav class:scrolled={isScrolled}>
//     <div class="logo">My Site</div>
//     <button on:click={toggleMenu}>
//         {isMenuOpen ? 'Close' : 'Menu'}
//     </button>
//     <div class="menu" class:open={isMenuOpen}>
//         <a href="/">Home</a>
//         <a href="/about">About</a>
//         <a href="/blog">Blog</a>
//         <a href="/contact">Contact</a>
//     </div>
// </nav>
//
// <style>
//     nav {
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         display: flex;
//         justify-content: space-between;
//         padding: 1rem;
//         transition: background-color 0.3s;
//     }
//
//     nav.scrolled {
//         background-color: #fff;
//         box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//     }
//
//     .menu {
//         display: none;
//     }
//
//     .menu.open {
//         display: flex;
//         flex-direction: column;
//         position: absolute;
//         top: 100%;
//         left: 0;
//         width: 100%;
//         background: #fff;
//         padding: 1rem;
//     }
//
//     @media (min-width: 768px) {
//         .menu {
//             display: flex;
//             position: static;
//             width: auto;
//             background: none;
//             padding: 0;
//         }
//
//         button {
//             display: none;
//         }
//     }
// </style>
// \`\`\`
//
// ## Conclusion
//
// Svelte 5's new reactivity system provides a more intuitive and powerful way to build responsive interfaces. By leveraging \`$state\`, \`$derived\`, and \`$effect\`, we can create more maintainable and performant applications.
//
// In future posts, we'll explore more advanced patterns and techniques for building complex UIs with Svelte 5.
//         `
//     },
//     {
//         id: '2',
//         title: 'Leveraging TailwindCSS v4 for Modern Design Systems',
//         excerpt: 'Discover how to create consistent, maintainable design systems using the latest features in TailwindCSS v4.',
//         date: '2025-03-05T10:30:00Z',
//         category: 'tech',
//         image: '/images/professional.jpg',
//         tags: ['css', 'tailwind', 'design', 'frontend'],
//         author: {
//             name: 'Your Name',
//             avatar: '/images/professional.jpg'
//         },
//         content: `
// # Leveraging TailwindCSS v4 for Modern Design Systems
//
// TailwindCSS has transformed the way developers approach styling web applications. With the release of version 4, we have even more powerful tools to create consistent, maintainable design systems.
//
// ## What's New in TailwindCSS v4
//
// Version 4 brings significant performance improvements and new features that make it even more powerful:
//
// - Lightning-fast build times with the new engine
// - Native CSS variables for theming
// - Improved color palette system
// - Enhanced dark mode support
// - Better responsive design utilities
//
// ## Building a Design System with TailwindCSS v4
//
// Here's how to create a robust design system using Tailwind v4:
//
// ### 1. Set Up Your Theme
//
// \`\`\`javascript
// // tailwind.config.js
// module.exports = {
//   content: ['./src/**/*.{html,js,svelte,ts}'],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#f0f9ff',
//           100: '#e0f2fe',
//           // ... rest of the scale
//           900: '#0c4a6e',
//         },
//         secondary: {
//           // Your secondary color scale
//         },
//         // Additional colors
//       },
//       spacing: {
//         // Custom spacing
//       },
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'],
//         mono: ['IBM Plex Mono', 'monospace'],
//       },
//       // Additional theme extensions
//     },
//   },
//   plugins: [
//     // Your plugins
//   ],
// }
// \`\`\`
//
// ### 2. Create Component Classes
//
// While Tailwind advocates for utility-first CSS, for a design system, it's useful to create component classes that can be reused:
//
// \`\`\`css
// @layer components {
//   .btn {
//     @apply py-2 px-4 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2;
//   }
//
//   .btn-primary {
//     @apply bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500;
//   }
//
//   .btn-secondary {
//     @apply bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500;
//   }
//
//   /* More components */
// }
// \`\`\`
//
// ### 3. Use CSS Variables for Dynamic Theming
//
// TailwindCSS v4 makes it easier to work with CSS variables:
//
// \`\`\`css
// :root {
//   --color-primary: theme('colors.blue.500');
//   --color-secondary: theme('colors.purple.500');
// }
//
// .dark {
//   --color-primary: theme('colors.blue.400');
//   --color-secondary: theme('colors.purple.400');
// }
//
// @layer utilities {
//   .bg-theme-primary {
//     background-color: var(--color-primary);
//   }
//   .text-theme-primary {
//     color: var(--color-primary);
//   }
//   /* More theme utilities */
// }
// \`\`\`
//
// ## Best Practices for Maintainable Design Systems
//
// 1. **Document your components**: Create a living style guide that documents all your components and how to use them.
// 2. **Consistent naming conventions**: Establish and stick to a naming convention for your custom utilities and components.
// 3. **Limit customization**: Only extend Tailwind when necessary to avoid bloat.
// 4. **Use design tokens**: Abstract values like colors and spacing into design tokens.
// 5. **Performance optimization**: Regularly audit your CSS and remove unused styles.
//
// ## Conclusion
//
// TailwindCSS v4 provides an excellent foundation for building modern design systems. By combining its utility-first approach with strategic component abstractions, you can create a design system that is both flexible and maintainable.
//
// In the next post, we'll explore how to integrate this design system with a component library built using Svelte and shadcn-ui.
//         `
//     },
//     {
//         id: '3',
//         title: 'Research Findings: Neural Networks in Natural Language Processing',
//         excerpt: 'A comprehensive overview of our latest research on neural network architectures for natural language processing tasks.',
//         date: '2025-02-28T09:15:00Z',
//         category: 'research',
//         image: '/images/professional.jpg',
//         tags: ['ai', 'nlp', 'machine-learning', 'research'],
//         author: {
//             name: 'Your Name',
//             avatar: '/images/professional.jpg'
//         },
//         content: `
// # Research Findings: Neural Networks in Natural Language Processing
//
// This post summarizes our team's recent research findings on neural network architectures for natural language processing (NLP) tasks.
//
// ## Background
//
// Natural language processing has seen tremendous advancements in recent years, primarily driven by the development of sophisticated neural network architectures. Our research focused on evaluating different architectures for specific NLP tasks, including sentiment analysis, named entity recognition, and text classification.
//
// ## Methodology
//
// We conducted a series of experiments comparing various neural network architectures:
//
// 1. Recurrent Neural Networks (RNNs) with LSTM and GRU cells
// 2. Transformer-based models (BERT, RoBERTa, T5)
// 3. Hybrid architectures combining convolutional and recurrent layers
// 4. Attention-based mechanisms
//
// Each model was trained on standardized datasets, including:
// - Stanford Sentiment Treebank (SST-2) for sentiment analysis
// - CoNLL-2003 for named entity recognition
// - AG News and DBpedia for text classification
//
// ## Key Findings
//
// ### Performance Comparison
//
// Our experiments yielded the following accuracy results on the test sets:
//
// | Model              | Sentiment Analysis | Named Entity Recognition | Text Classification |
// |--------------------|--------------------|--------------------------|--------------------|
// | LSTM               | 87.3%              | 89.1%                    | 92.4%              |
// | GRU                | 86.9%              | 88.7%                    | 91.8%              |
// | BERT Base          | 93.5%              | 94.6%                    | 95.2%              |
// | RoBERTa Base       | 94.8%              | 95.3%                    | 95.7%              |
// | Hybrid CNN-LSTM    | 89.2%              | 91.3%                    | 93.5%              |
//
// ### Efficiency Analysis
//
// While transformer-based models achieved the highest accuracy, they also required significantly more computational resources. The following table shows the training time and memory requirements for each model:
//
// | Model              | Training Time (hours) | GPU Memory (GB) | Model Size (MB) |
// |--------------------|----------------------|----------------|----------------|
// | LSTM               | 2.3                  | 4.2            | 45             |
// | GRU                | 1.9                  | 3.8            | 42             |
// | BERT Base          | 12.7                 | 12.3           | 435            |
// | RoBERTa Base       | 14.2                 | 13.5           | 476            |
// | Hybrid CNN-LSTM    | 3.5                  | 5.8            | 78             |
//
// ### Qualitative Analysis
//
// Beyond quantitative metrics, we also conducted a qualitative analysis of each model's outputs. Some interesting observations:
//
// 1. Transformer models showed superior performance on tasks requiring deeper contextual understanding
// 2. RNN-based models performed well on sequential data with clear patterns
// 3. Hybrid models provided a good balance between performance and computational efficiency
// 4. All models struggled with sarcasm and implicit meanings
//
// ## Practical Applications
//
// Based on our findings, we recommend:
//
// 1. For resource-constrained environments: Hybrid CNN-LSTM architectures provide the best balance of performance and efficiency
// 2. For high-accuracy requirements: RoBERTa-based models deliver state-of-the-art results
// 3. For real-time applications: GRU networks offer the fastest inference times while maintaining reasonable accuracy
//
// ## Future Research Directions
//
// Our findings suggest several promising directions for future research:
//
// 1. Exploring knowledge distillation techniques to create more efficient models
// 2. Investigating multilingual capabilities of different architectures
// 3. Developing specialized architectures for domain-specific NLP tasks
// 4. Enhancing interpretability and explainability of neural models
//
// ## Conclusion
//
// Our research demonstrates that while transformer-based models currently achieve state-of-the-art results on most NLP tasks, there's still value in exploring alternative architectures, especially for specific use cases with constraints on computational resources or unique domain requirements.
//
// In our next research phase, we'll be exploring how these models perform on multilingual tasks and investigating techniques to reduce their computational footprint while maintaining high accuracy.
//         `
//     },
//     {
//         id: '4',
//         title: 'Weekend Project: Building a Smart Home Dashboard with Svelte and IoT',
//         excerpt: 'A walkthrough of my weekend project creating a smart home dashboard using Svelte, TailwindCSS, and IoT devices.',
//         date: '2025-02-15T14:45:00Z',
//         category: 'projects',
//         image: '/images/professional.jpg',
//         tags: ['iot', 'svelte', 'smart-home', 'diy'],
//         author: {
//             name: 'Your Name',
//             avatar: '/images/professional.jpg'
//         },
//         content: `
// # Weekend Project: Building a Smart Home Dashboard with Svelte and IoT
//
// This weekend, I embarked on creating a custom dashboard to control and monitor all my smart home devices. Here's how I built it using Svelte, TailwindCSS, and a Raspberry Pi.
//
// ## The Problem
//
// Like many tech enthusiasts, I've accumulated various smart home devices over the years - smart lights, thermostats, cameras, and sensors - each with their own app and interface. Switching between apps became tedious, and I wanted a single, unified dashboard to control everything.
//
// ## The Solution: A Custom Dashboard
//
// I decided to build a web-based dashboard that would run on a wall-mounted tablet and also be accessible from any device on my home network. My requirements were:
//
// 1. A clean, modern interface
// 2. Real-time updates from all devices
// 3. Control capabilities for lights, thermostat, etc.
// 4. Historical data visualization
// 5. Customizable widgets
//
// ## Tech Stack
//
// Here's what I used:
//
// - **Frontend**: Svelte 5 with TailwindCSS
// - **Backend**: Node.js with Express
// - **Database**: InfluxDB for time-series data
// - **Hardware**: Raspberry Pi 4 as the server
// - **IoT Integration**: Home Assistant for device communication
// - **Visualization**: Recharts for data graphs
//
// ## Building the Dashboard
//
// ### 1. Setting Up the Project
//
// I started with a basic Svelte project using SvelteKit:
//
// \`\`\`bash
// npm create svelte@latest smart-home-dashboard
// cd smart-home-dashboard
// npm install
// \`\`\`
//
// Then added TailwindCSS and other dependencies:
//
// \`\`\`bash
// npx svelte-add@latest tailwindcss
// npm install axios recharts date-fns
// \`\`\`
//
// ### 2. Creating the Layout
//
// I designed a responsive grid layout that would work well on both the wall-mounted tablet and mobile devices:
//
// \`\`\`svelte
// <script>
//     import { onMount } from 'svelte';
//     import { Dashboard, Widget } from '$lib/components';
//     let devices = $state([]);
//
//     onMount(async () => {
//         // Fetch devices from the API
//         const response = await fetch('/api/devices');
//         devices = await response.json();
//     });
// </script>
//
// <div class="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
//     <header class="mb-6">
//         <h1 class="text-2xl font-bold">Smart Home Dashboard</h1>
//         <p class="text-gray-600 dark:text-gray-300">
//             {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
//         </p>
//     </header>
//
//     <Dashboard>
//         <Widget colspan={2} rowspan={1} title="Climate">
//             <!-- Temperature and humidity widgets -->
//         </Widget>
//
//         <Widget colspan={1} rowspan={1} title="Lighting">
//             <!-- Lighting controls -->
//         </Widget>
//
//         <Widget colspan={1} rowspan={1} title="Security">
//             <!-- Security camera feeds -->
//         </Widget>
//
//         <Widget colspan={3} rowspan={1} title="Energy Usage">
//             <!-- Energy consumption charts -->
//         </Widget>
//     </Dashboard>
// </div>
// \`\`\`
//
// ### 3. Connecting to Home Assistant
//
// I used Home Assistant's REST API to fetch device states and send commands:
//
// \`\`\`javascript
// // src/lib/api.js
// import axios from 'axios';
//
// const API_URL = 'http://homeassistant.local:8123/api';
// const API_TOKEN = 'your_long_lived_access_token';
//
// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         Authorization: \`Bearer \${API_TOKEN}\`,
//         'Content-Type': 'application/json'
//     }
// });
//
// export async function getDeviceStates() {
//     const response = await api.get('/states');
//     return response.data;
// }
//
// export async function toggleDevice(entityId, state) {
//     return api.post('/services/switch/turn_' + state, {
//         entity_id: entityId
//     });
// }
//
// // More API functions...
// \`\`\`
//
// ### 4. Building Interactive Components
//
// I created reusable components for different types of devices:
//
// \`\`\`svelte
// <!-- src/lib/components/LightControl.svelte -->
// <script>
//     import { toggleDevice } from '$lib/api';
//
//     export let entity;
//     export let state;
//
//     let brightness = $state(state.attributes.brightness || 0);
//     let isOn = $state(state.state === 'on');
//
//     async function toggle() {
//         isOn = !isOn;
//         await toggleDevice(entity.entity_id, isOn ? 'on' : 'off');
//     }
//
//     async function updateBrightness() {
//         // API call to update brightness
//     }
// </script>
//
// <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//     <div class="flex justify-between items-center mb-4">
//         <h3 class="font-medium">{entity.attributes.friendly_name}</h3>
//         <button
//             on:click={toggle}
//             class="w-12 h-6 rounded-full {isOn ? 'bg-primary-500' : 'bg-gray-300'} relative"
//         >
//             <span
//                 class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform {isOn ? 'translate-x-6' : ''}"
//             ></span>
//         </button>
//     </div>
//
//     {#if isOn}
//         <input
//             type="range"
//             min="0"
//             max="255"
//             bind:value={brightness}
//             on:change={updateBrightness}
//             class="w-full"
//         />
//     {/if}
// </div>
// \`\`\`
//
// ### 5. Setting Up Real-time Updates
//
// For real-time updates, I used WebSockets to connect to Home Assistant's event stream:
//
// \`\`\`javascript
// // src/lib/websocket.js
// import { writable } from 'svelte/store';
//
// export const deviceStates = writable({});
//
// let ws;
// let reconnectTimer;
// let messageId = 1;
//
// export function connectWebSocket() {
//     ws = new WebSocket('ws://homeassistant.local:8123/api/websocket');
//
//     ws.onopen = () => {
//         console.log('Connected to Home Assistant');
//
//         // Auth phase
//         ws.send(JSON.stringify({ type: 'auth', access_token: 'your_token' }));
//     };
//
//     ws.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//
//         if (data.type === 'auth_ok') {
//             // Subscribe to events
//             ws.send(JSON.stringify({
//                 id: messageId++,
//                 type: 'subscribe_events',
//                 event_type: 'state_changed'
//             }));
//         }
//
//         if (data.type === 'event' && data.event.event_type === 'state_changed') {
//             const { entity_id, new_state } = data.event.data;
//
//             deviceStates.update(states => {
//                 return { ...states, [entity_id]: new_state };
//             });
//         }
//     };
//
//     ws.onclose = () => {
//         console.log('Connection closed, reconnecting...');
//         clearTimeout(reconnectTimer);
//         reconnectTimer = setTimeout(connectWebSocket, 5000);
//     };
//
//     ws.onerror = (error) => {
//         console.error('WebSocket error:', error);
//         ws.close();
//     };
// }
// \`\`\`
//
// ## The Result
//
// After a weekend of coding, I had a functional dashboard running on a Raspberry Pi, accessible from any device on my home network. The wall-mounted tablet runs Chrome in kiosk mode, displaying the dashboard 24/7.
//
// ### Features I Implemented:
//
// - **Lighting controls**: Toggle lights on/off, adjust brightness and color
// - **Climate monitoring**: Temperature, humidity, and thermostat controls
// - **Security**: Camera feeds with motion detection alerts
// - **Energy usage**: Charts showing electricity usage over time
// - **Automations**: Quick access to run common automations
//
// ## Challenges and Learnings
//
// - **Performance optimization**: Initial renders were slow, so I had to optimize with lazy loading and efficient state management
// - **Responsive design**: Creating a layout that works well on different screen sizes was challenging
// - **Data visualization**: Learning how to effectively present historical data took some experimentation
// - **Error handling**: Dealing with device disconnections and API errors required robust fallback mechanisms
//
// ## Future Improvements
//
// I plan to enhance the dashboard with:
//
// 1. Voice controls using the Web Speech API
// 2. Presence detection to customize the dashboard based on who's home
// 3. AI-powered suggestions for energy savings
// 4. Weather forecasts with impact on home automation
//
// ## Conclusion
//
// This weekend project was not only practical but also a great way to learn more about Svelte, IoT integration, and real-time data visualization. The beauty of building your own smart home dashboard is that you can continuously improve it based on your specific needs.
//
// If you're interested in building something similar, I've made the code available on [GitHub](https://github.com/yourusername/smart-home-dashboard).
//         `
//     },
//     {
//         id: '5',
//         title: 'My Journey Learning Functional Programming with Scala',
//         excerpt: 'Personal reflections on transitioning from imperative to functional programming paradigms through learning Scala.',
//         date: '2025-02-01T08:20:00Z',
//         category: 'personal',
//         image: '/images/professional.jpg',
//         tags: ['programming', 'scala', 'functional-programming', 'learning'],
//         author: {
//             name: 'Your Name',
//             avatar: '/images/professional.jpg'
//         },
//         content: `
// # My Journey Learning Functional Programming with Scala
//
// For the past six months, I've been on a journey to learn functional programming through Scala. Coming from a background in JavaScript and Python, this has been both challenging and enlightening. Here's my experience and what I've learned along the way.
//
// ## Why Functional Programming?
//
// I first became interested in functional programming after encountering hard-to-debug issues in a complex JavaScript application. Issues with mutable state, side effects, and race conditions were causing subtle bugs that were difficult to reproduce and fix.
//
// After researching potential solutions, I kept coming across the same advice: learn functional programming. The promises were enticing:
//
// - Fewer bugs due to immutability and pure functions
// - More maintainable code through composition
// - Better concurrency handling
// - Stronger type safety
// - More reasonable testing
//
// ## Why Scala?
//
// I chose Scala for several reasons:
//
// 1. It blends functional and object-oriented paradigms, making it easier to transition
// 2. It has a strong static type system that catches errors at compile time
// 3. It runs on the JVM, giving access to a vast ecosystem of libraries
// 4. It's used in industry for real-world applications, particularly in data engineering
//
// ## The Learning Curve
//
// ### Month 1: Confusion and Frustration
//
// The first month was rough. Even basic concepts seemed alien:
//
// - Immutable variables by default
// - Pattern matching instead of switch statements
// - Higher-order functions everywhere
// - Monads, functors, and other abstract concepts
// - The type system with generics and variance
//
// I remember staring at this code and feeling completely lost:
//
// \`\`\`scala
// def processItems[A, B](items: List[A])(f: A => B): List[B] = items match {
//   case head :: tail => f(head) :: processItems(tail)(f)
//   case Nil => Nil
// }
// \`\`\`
//
// The recursive pattern matching with generics was unlike anything I'd written before.
//
// ### Month 2-3: The "Aha" Moments
//
// Around the second month, things started to click. I began to appreciate:
//
// - How \\\`Option\\\` types eliminated null reference exceptions
// - The beauty of composing functions with \\\`.map\\\` and \\\`.flatMap\\\`
// - How pattern matching made code more expressive and safer
// - The elegance of immutable data structures
//
// This simple example was a revelation:
//
// \`\`\`scala
// // Finding a user and getting their address safely
// def getStreetName(userId: String): Option[String] = {
//   userDatabase.get(userId)            // Returns Option[User]
//     .flatMap(user => user.address)    // Returns Option[Address]
//     .map(address => address.street)   // Returns Option[String]
// }
// \`\`\`
//
// Instead of multiple null checks, the code clearly expressed the chain of optional values.
//
// ### Month 4: Building Real Applications
//
// By the fourth month, I was building small applications and utilities:
//
// - A command-line tool for analyzing CSV data
// - A simple REST API using Play Framework
// - Some data processing scripts for work
//
// I started to appreciate the practical benefits:
//
// - Refactoring was less scary because the compiler caught most issues
// - My code had fewer runtime errors
// - Testing was simpler due to pure functions
// - Parallel processing was more intuitive
//
// ### Month 5-6: Diving Deeper
//
// In recent months, I've been exploring more advanced topics:
//
// - Typeclasses and implicits
// - Functional error handling with Either
// - Effect systems like ZIO
// - Property-based testing
// - Category theory fundamentals
//
// ## Key Learnings
//
// ### 1. Functional Programming Changes How You Think
//
// The biggest impact wasn't learning syntax or libraries—it was the fundamental shift in how I approached problems. I now instinctively:
//
// - Break problems into small, composable functions
// - Think about data transformations rather than state mutations
// - Consider edge cases more carefully
// - Design types that make invalid states unrepresentable
//
// ### 2. Type Systems Are Your Friend
//
// Coming from dynamically typed languages, I initially saw Scala's type system as restrictive. Now I view it as:
//
// - Documentation that never goes out of date
// - A thinking tool that helps clarify design
// - A safety net that catches errors early
//
// ### 3. There's Value in Abstraction
//
// While some functional abstractions seemed academic at first, I've found practical value in concepts like:
//
// - Functors for consistent mapping over containers
// - Monads for sequencing operations with context
// - Applicatives for combining independent effects
//
// ### 4. The Community Matters
//
// The Scala community has been invaluable in my learning journey:
//
// - Stack Overflow answers explaining complex concepts
// - Well-written documentation for libraries like Cats and ZIO
// - Meetups and conferences with approachable experts
// - Books and blogs that break down difficult ideas
//
// ## Has It Made Me a Better Developer?
//
// Unequivocally, yes. Even when I write code in other languages, I:
//
// - Write more pure functions
// - Avoid mutable state when possible
// - Handle errors more carefully
// - Design better types and interfaces
// - Test more effectively
//
// ## Advice for Others Starting Their FP Journey
//
// If you're considering learning functional programming:
//
// 1. **Be patient** - It takes time for concepts to click
// 2. **Start small** - Apply functional principles to your current language first
// 3. **Build projects** - Theory only makes sense when applied
// 4. **Find a community** - Learning with others accelerates progress
// 5. **Embrace the struggle** - Confusion is part of the process
//
// ## What's Next
//
// Looking ahead, I plan to:
//
// - Contribute to some open source Scala libraries
// - Explore other functional languages like Haskell and Clojure
// - Bring more functional patterns to my team's codebase
// - Dive deeper into category theory
// - Possibly explore dependent typing with languages like Idris
//
// ## Conclusion
//
// Learning functional programming through Scala has been one of the most challenging and rewarding experiences of my career. While I'm still early in my journey, the paradigm shift has already made me a better programmer and problem solver.
//
// If you've been curious about functional programming, I encourage you to take the leap. The initial struggle is worth the long-term benefits to your code quality and thinking.
//   `
//     },
//     {
//         id: '6',
//         title: 'Behind the Scenes: Creating an Interactive Data Visualization Dashboard',
//         excerpt: 'A detailed walkthrough of building an interactive data visualization dashboard using modern web technologies.',
//         date: '2025-01-20T16:10:00Z',
//         category: 'projects',
//         image: '/images/professional.jpg',
//         tags: ['data-viz', 'javascript', 'svelte', 'charts'],
//         author: {
//             name: 'Your Name',
//             avatar: '/images/professional.jpg'
//         },
//         content: `
// # Behind the Scenes: Creating an Interactive Data Visualization Dashboard
//
// For the past few weeks, I've been working on a data visualization dashboard for analyzing trends in renewable energy adoption. In this post, I'll share the process, challenges, and lessons learned from building this interactive tool.
//
// ## Project Overview
//
// The goal was to create a dashboard that allows users to:
//
// - Explore renewable energy adoption across different countries and regions
// - Compare multiple datasets with interactive filtering
// - Visualize trends over time with animated transitions
// - Drill down into specific data points for detailed information
// - Export and share insights
//
// ## The Tech Stack
//
// After evaluating different options, I settled on:
//
// - **Svelte** for reactive UI components
// - **D3.js** for lower-level visualization control
// - **TailwindCSS** for styling
// - **Netlify** for hosting
// - **Supabase** for the backend database
// - **Recharts** for some standard chart components
//
// ## The Development Process
//
// ### 1. Data Collection and Processing
//
// The first challenge was collecting and organizing the data. I gathered information from several sources:
//
// - World Bank Open Data
// - Our World in Data (OWID)
// - International Renewable Energy Agency (IRENA)
// - National renewable energy departments
//
// The raw data required significant cleaning and normalization:
//
// \`\`\`javascript
// // Example of data processing pipeline
// async function processRawData() {
//   const rawData = await fetchDataFromSources();
//
//   const cleanedData = rawData
//     .filter(removeIncompleteEntries)
//     .map(normalizeCountryNames)
//     .map(convertUnits);
//
//   const aggregatedData = groupAndAggregate(cleanedData);
//
//   return createDataHierarchy(aggregatedData);
// }
// \`\`\`
//
// ### 2. Planning the User Interface
//
// Before writing any code, I sketched the interface and created wireframes. I identified several key components:
//
// - A world map for geographical context
// - Timeline slider for temporal navigation
// - Multiple chart types (line, bar, area, scatter)
// - Filtering and comparison panels
// - Detail views for specific metrics
//
// ### 3. Building the Core Visualization Components
//
// I started by creating reusable chart components that could adapt to different datasets:
//
// \`\`\`svelte
// <!-- Example of a reusable LineChart component -->
// <script>
//   import { onMount, afterUpdate } from 'svelte';
//   import * as d3 from 'd3';
//
//   export let data;
//   export let xKey;
//   export let yKey;
//   export let color = '#3b82f6';
//   export let animated = true;
//
//   let svg;
//   let width;
//   let height;
//
//   $: if (svg && data) updateChart(data);
//
//   onMount(() => {
//     // Initialize the SVG and scales
//     const svgElement = d3.select(svg);
//     // ...setup code
//   });
//
//   function updateChart(newData) {
//     // Update the visualization with new data
//     const transition = d3.transition().duration(animated ? 750 : 0);
//
//     // Update scales
//     // ...
//
//     // Update paths with transition
//     // ...
//   }
// </script>
//
// <div class="chart-container" bind:clientWidth={width} bind:clientHeight={height}>
//   <svg bind:this={svg} {width} {height}></svg>
// </div>
// \`\`\`
//
// ### 4. Adding Interactivity
//
// The most challenging aspect was creating intuitive interactions between components:
//
// - When a user selects a region on the map, all charts should update
// - The timeline scrubber should animate changes over time
// - Comparing datasets should show clear visual differences
// - Tooltips should provide context-sensitive information
//
// I implemented a simple state management system using Svelte's stores:
//
// \`\`\`javascript
// // stores.js
// import { writable, derived } from 'svelte/store';
//
// export const selectedRegions = writable([]);
// export const timeRange = writable([2000, 2022]);
// export const activeMetrics = writable(['solar', 'wind', 'hydro']);
//
// // Derived store that filters the full dataset based on selections
// export const filteredData = derived(
//   [fullDataset, selectedRegions, timeRange, activeMetrics],
//   ([$fullDataset, $selectedRegions, $timeRange, $activeMetrics]) => {
//     return $fullDataset.filter(item => {
//       const inSelectedRegion = $selectedRegions.length === 0 ||
//                               $selectedRegions.includes(item.region);
//       const inTimeRange = item.year >= $timeRange[0] && item.year <= $timeRange[1];
//       const hasActiveMetric = $activeMetrics.some(metric => item[metric] !== undefined);
//
//       return inSelectedRegion && inTimeRange && hasActiveMetric;
//     });
//   }
// );
// \`\`\`
//
// ### 5. Optimizing Performance
//
// With large datasets, performance quickly became an issue. I implemented several optimizations:
//
// - Data aggregation for different zoom levels
// - Debouncing user interactions
// - Virtualized lists for large data tables
// - Progressive loading of detailed information
// - Memoization of expensive calculations
//
// \`\`\`javascript
// // Example of memoization for expensive calculations
// import { memoize } from 'lodash-es';
//
// export const calculateTrends = memoize((data, metric) => {
//   // Complex trend calculation logic
//   // ...
//   return trends;
// }, (data, metric) => {
//   // Custom cache key based on data fingerprint and metric
//   return data.length + '_' + metric;
// });
// \`\`\`
//
// ### 6. Polishing the User Experience
//
// Finally, I focused on making the dashboard intuitive and visually appealing:
//
// - Creating a cohesive color scheme for different data categories
// - Adding helpful onboarding tooltips
// - Designing clear loading and empty states
// - Implementing responsive layouts for different devices
// - Adding keyboard shortcuts for power users
//
// ## Challenges and Solutions
//
// ### Challenge 1: Coordinating Multiple Visualizations
//
// **Problem**: When a user interacts with one chart, other visualizations needed to update consistently.
//
// **Solution**: I implemented a central event bus using Svelte stores that all components could subscribe to:
//
// \`\`\`javascript
// // Events that any component can trigger
// export const events = {
//   REGION_SELECTED: 'region_selected',
//   TIME_CHANGED: 'time_changed',
//   METRIC_TOGGLED: 'metric_toggled',
//   VIEW_RESET: 'view_reset'
// };
//
// // Event bus implementation
// export const eventBus = (() => {
//   const bus = writable({});
//
//   function emit(event, data) {
//     bus.update(() => ({ event, data }));
//   }
//
//   return {
//     emit,
//     subscribe: bus.subscribe
//   };
// })();
//
// // Usage in components
// eventBus.subscribe(({ event, data }) => {
//   if (event === events.REGION_SELECTED) {
//     // Update this component based on the selected region
//   }
// });
// \`\`\`
//
// ### Challenge 2: Managing Large Datasets
//
// **Problem**: Some visualizations became sluggish with the full dataset.
//
// **Solution**: I implemented a multi-level data strategy:
//
// 1. Pre-aggregated summary data for initial views
// 2. On-demand loading of detailed data when zooming or filtering
// 3. Web workers for heavy calculations
//
// \`\`\`javascript
// // Using a web worker for heavy calculations
// const worker = new Worker('/workers/data-processor.js');
//
// function processLargeDataset(data, options) {
//   return new Promise((resolve) => {
//     worker.postMessage({ data, options });
//     worker.onmessage = (e) => resolve(e.data);
//   });
// }
// \`\`\`
//
// ### Challenge 3: Cross-Browser Compatibility
//
// **Problem**: Visualizations rendered differently across browsers, especially with SVG animations.
//
// **Solution**: I created a browser detection utility and adjusted animations and layouts accordingly:
//
// \`\`\`javascript
// // Browser-specific adjustments
// const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
//
// // In components
// const transitionDuration = isSafari ? 0 : 750; // Disable animations in Safari
// \`\`\`
//
// ## Lessons Learned
//
// ### 1. Start with the Data, Not the Visuals
//
// I initially focused too much on how things would look rather than what insights users needed to extract from the data. Once I reframed my approach to start with the data and analytical goals, the design decisions became clearer.
//
// ### 2. Progressive Enhancement is Key
//
// Building a simplified version first and then progressively adding features kept the project manageable. Each feature was tested thoroughly before moving to the next.
//
// ### 3. Performance Optimization is an Ongoing Process
//
// Performance isn't something you can address at the end—it needs to be considered throughout development. Regular profiling helped identify bottlenecks early.
//
// ### 4. User Testing Reveals the Unexpected
//
// What seemed intuitive to me wasn't always clear to users. Early feedback helped reshape the interface to be more user-friendly.
//
// ## The Final Result
//
// The completed dashboard provides interactive visualizations of renewable energy trends across 150+ countries from 2000 to 2022. Users can:
//
// - Compare adoption rates across regions
// - Analyze the impact of policy changes on renewable growth
// - Explore correlations between economic factors and clean energy investment
// - Generate custom reports and visualizations for specific regions
//
// ## Future Improvements
//
// Based on initial feedback, I'm planning several enhancements:
//
// 1. Adding predictive models for future trends
// 2. Implementing more advanced filtering capabilities
// 3. Creating a public API for accessing the processed data
// 4. Adding social sharing features for insights
// 5. Developing a mobile-optimized version
//
// ## Conclusion
//
// Building this dashboard was a challenging but rewarding project. The combination of Svelte for the reactive UI and D3.js for visualization control proved to be powerful and flexible.
//
// I've open-sourced the core visualization components, which you can find on my GitHub. If you're working on similar projects, I'd love to hear about your experiences and approaches.
//
// Feel free to try the live dashboard at [renewable-viz.example.com](https://renewable-viz.example.com) and share your feedback!
//         `
//     },
    {
        id: '1',
        title: 'Book Review: Project Hail Mary',
        excerpt: 'A quick overview of Andy Weir\'s latest science fiction novel "Project Hail Mary"',
        date: '2025-03-19',
        category: 'hobbies',
        image: '/images/hailmary.png',
        tags: ['book review', 'hobbies'],
        author: {
            name: 'Your Name',
            avatar: '/images/hailmary.png'
        },
        featured: false,
        content: `
## If you, like me, are in search of a book with the same great flavor as The Martian, then go read Project Hail Mary.
## Pacing
&nbsp;&nbsp;&nbsp;&nbsp;Overall, The Martian was more consistently paced, whereas Project Hail Mary had higher 
highs and lower lows. Project Hail Mary takes some time to get going, and the story slows down again at the ending 
(although it leads to a very satisfying conclusion). About a third of the way into the book is where Project 
Hail Mary really shines.
## Problem Solving
&nbsp;&nbsp;&nbsp;&nbsp;Project Hail Mary has that same style of structuring the plot around STEM puzzles as the Martian, but feels more Natural
Science focused whereas The Martian felt engineering focused. While Mark Watney would be trying 
to fix or engineer a new gadget, Ryland Grace would be investigating new organisms or materials.
<figure>
    <img src="/images/sattelitesmary.webp" width="300" alt="Satellite Scene in Project Hail Mary">
    <figcaption class="justify-center">Scene from the upcoming Project Hail Mary movie, coming out in 2026!</figcaption>
</figure>
## Characters/Relationships
&nbsp;&nbsp;&nbsp;&nbsp;Where Project Hail Mary really shines is in its characters and their relationships. Mark Watney was an excellent character, but we almost never saw him interacting
with another person and the relationships between the NASA characters felt undeveloped. I was a little worried
Project Hail Mary would go down this route, but it ended up having one of the most genuine relationships I've ever seen 
in a book. <br><br>
&nbsp;&nbsp;&nbsp;&nbsp;I really enjoyed how ethically developed each of the characters was. Like The Martian, the book also lacks a clear villain.
I also enjoyed the complexity of each organism and tool introduced in Project Hail Mary. What seems like
Ryland's worst fear in one moment is his greatest asset in another, and vice versa.
<figure>
    <img src="/images/goslingmary.webp" width="300" alt="Protagonist of Project Hail Mary">
    <figcaption class="justify-center">Ryland Grace, protagonist of Project Hail Mary</figcaption>
</figure>
## Suspense
&nbsp;&nbsp;&nbsp;&nbsp;Both books have a similar thriller feel, but derive it from different sources. In The Martian, it feels like Mark 
Watney's in constant danger from simply living in such a hostile environment. In contrast, there's only a couple of 
moments when Ryland Grace really feels in danger, although these moments are well-executed.
## Conclusion
Project Hail Mary is the perfect novel for fans of Andy Weir's writing, surpassing Artemis and matching The Martian in my rating.
If you haven't read it yet, I highly suggest picking it up before the movie based on Project Hail Mary comes out next year!
        `
    },
    {
        id: '2',
        title: 'AI Medical Scribing Project Proposal',
        excerpt: 'Hierarchical Context Aggregation for Quality Automated Medical Notes',
        date: '2025-03-21',
        category: 'projects',
        image: '/images/scribingnormalization.png',
        tags: ['AI Scribing', 'NLP'],
        author: {
            name: 'Your Name',
            avatar: '/images/hailmary.png'
        },
        featured: true,
        content: `
# Authors

[Prakriti Shetty](mailto:psshetty@umass.edu)<br>  
[Priya Balakrishnan](mailto:pbalakrishna@umass.edu)<br> 
[Avinash Nandyala](mailto:anandyala@umass.edu)<br> 
[Donald Winkleman](mailto:dwinkelman@umass.edu)<br>

# 1 Introduction

    Electronic Health Records (EHRs) have been widely adopted to digitize and automate the collection of patient records, including medical history, consultation notes, and overall case documentation. However, current EHR systems primarily rely on manual data entry, which requires healthcare professionals to manually input information. This manual approach leads to several issues, such as data-entry errors, inconsistent documentation, reduced readability, and increased administrative workload. Consequently, this process not only affects data accuracy and usability but also contributes to physician dissatisfaction due to the significant time investment required for documentation.&nbsp;&nbsp;

    To mitigate these challenges, recent advancements have explored automated clinical documentation systems, commonly referred to as digital scribes. These systems aim to capture and transcribe physician-patient conversations into structured clinical notes, allowing healthcare professionals to focus on patient care rather than administrative tasks. However, many existing solutions primarily depend on automatic speech recognition (ASR) followed by named entity recognition (NER) to extract relevant medical terms, often presenting the output as a tabular summary of keywords. While such approaches offer some level of automation, they fail to capture the nuanced and structured nature of clinical documentation required for effective decision-making and seamless integration into EHR systems.&nbsp;&nbsp;

    In this work, we propose an advanced automated pipeline that processes audio transcripts from doctor-patient interactions to systematically extract key medical information and categorize it according to the standard SOAP (Subjective, Objective, Assessment, Plan) format. Our approach enhances traditional methods by incorporating hierarchical clustering for topic categorization, enabling fine-grained segmentation of medical discussions within the SOAP framework. This structured organization ensures that clinical notes are not only comprehensive and contextually accurate but also readily adaptable for integration into modern EHR systems, ultimately improving workflow efficiency and reducing the documentation burden on healthcare providers.&nbsp;&nbsp;

# 2 Related work

    [Falcetta et al., 2023](#references)'s systematic review on intelligent solutions for automatic speech recognition (ASR) and automatic documentation in medical interviews provided a comprehensive understanding of the problem landscape. Most of the selected studies followed a standardized pipeline, beginning with speech capture using tools such as the Google Speech-to-Text API or commercial ASR systems like Dragon NaturallySpeaking (Nuance). Speaker diarization and recognition were commonly implemented using Hidden Markov Models (HMMs) and Gaussian Mixture Models (GMMs), followed by speech enhancement techniques using Generative Adversarial Networks (GANs), or noise suppression using CNNs. The extracted information was then aligned with medical knowledge bases, including SNOMED-CT and BioPortal, to ensure accuracy and contextual relevance. Finally, structured tabular summaries were generated using machine learning and deep learning techniques, including Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs) such as Long Short-Term Memory (LSTM) networks, and Natural Language Processing (NLP) and Knowledge Extraction modules.

![Text Normalization Techniques and some of their classification](/images/scribingnormalization.png)

*Figure 1: Text Normalization Techniques and some of their classification*

## Speaker Normalisation

    [Aliero et al., 2023](#falcetta2023) provides a comprehensive methodology review of text normalization research across 54 papers from 2018-2022. It subdivides text normalization techniques into four methods shown in figure 1. Neural networks generally have high accuracy, especially with the exponential growth in LLM capabilities in recent years, but come at the cost of computational complexity. Rule-Based and Statistical Methods have the opposite tradeoff for general translation. However, Rule-Based techniques can succeed in domain-specific areas such as medicine when processing to and from specific terminology.

    Recently, research has shifted towards exploring hybrid approaches which generally utilize neural networks alongside rule-based, statistical methods, or both. For the small tradeoff in computational efficiency that comes with using multiple methods, higher accuracy can be achieved on domain-specific language normalization. Therefore, this technique would be best suited for our application.

## Topic Categorization

    Topic categorization in medical dialogues has traditionally relied on manual annotation by domain experts. However, recent research suggests automated approaches using hierarchical clustering can achieve comparable results. Two notable papers propose hierarchical clustering methods for topic modeling: [Kapoor et al., 2024](#aliero2023) focused specifically on news reports achieving strong performance metrics, and [Khandelwal, 2025](#kapoor2024) presented a more generalized document-level approach that enables nuanced topic categorization. While some approaches like prompt-based classification and document-to-document summarization techniques exist, they tend to require more manual effort or may not be as well-suited for dialogue-specific topic modeling.

## Generation of Doctor Notes

Prior work in automated clinical documentation has explored various approaches to structuring transcribed medical conversations. [Wenceslao and Estuar, 2019](#khandelwal2025) mapped transcribed text to multiple clinically relevant categories, including time expression identification, medical entity identification, attribute classification, and primary diagnosis classification. Similarly, [Khattak et al., 2019](#wenceslao2019) structured clinical notes into distinct categories, such as sign and symptom mentions, measurement annotations, disease and disorder mentions, medication mentions, and procedure mentions, thereby facilitating more organized and accessible documentation.

[Soltau et al., 2021](#khattak2019) employed a Named Entity Recognition (NER) tagging approach using Recurrent Neural Network Transducers (RNN-Ts) instead of conventional Conditional Random Fields (CRFs). This choice was motivated by the need to capture temporal dependencies, which play a crucial role in knowledge extraction. Building upon this, [Menon et al., 2021](#soltau2021) proposed a more structured approach, reducing lengthy text transcripts into a labeled set categorized into four key aspects: patient details, symptoms, previous prescriptions, and the current medical situation, and used a Support Vector Machine (SVM) model to evaluate classification accuracy.

A more contextually aware strategy was introduced by [Liu et al., 2024](#menon2021), who incorporated real-time health information extracted from consultation transcripts to construct patient profiles. This approach aimed to enhance the utility of extracted data for clinical decision-making and personalized patient care by integrating dynamically updated medical information alongside demographic details such as age and gender. An alternative line of research has explored generating summaries or paraphrased versions of transcriptions to improve clarity and expressiveness, but without much success.

In our work, we adopt the SOAP (Subjective, Objective, Assessment, and Plan) format for clinical documentation, originally introduced by [Schloss and Konam, 2020](#liu2024). This structured framework has long been a cornerstone of problem-oriented medical notes, providing a standardized and interpretable format for organizing clinical information. However, we extend this approach by integrating the contextual profiling methodology proposed by (Liu et al., 2024). Unlike their approach, which includes demographic attributes, our dataset does not contain patient demographic information. Instead, we synthesize a structured patient profile solely from the consultation transcript, ensuring that relevant clinical context is preserved without introducing demographic fields. By combining these methodologies, our approach seeks to balance structured documentation with dynamic, context-aware medical information extraction, ultimately enhancing both the usability and comprehensiveness of automated clinical notes.

# 3 Data

Our project requires high-quality medical dialogue data to develop a tool that transforms doctor-patient conversations into structured doctor notes in the SOAP format. To achieve this, we will utilize multiple publicly available datasets that contain real-world medical conversations.

The MedDialog-EN dataset is a large-scale English-language corpus featuring approximately 300,000 medical consultations and 500,000 utterances. These conversations span 2 broad medical specialties, including internal medicine, pediatrics, and dentistry, and further branch into 172 fine-grained sub-specialties. Each consultation consists of two components, a description of the patient's medical condition and conversations between the patient and doctor [Zeng et al., 2020](#schloss2020). This dataset is freely accessible and has been widely adopted in medical NLP research, making it a reliable resource for our project. The detailed patient condition descriptions serve as essential context for generating structured medical summaries in the SOAP note format.

The Zenodo dataset consists of English-language transcripts of psychiatric consultations, specifically created for training machine learning models to generate psychiatric case notes from doctor-patient conversations [Kazi et al., 2020](#zeng2020). This dataset is structured in JSON format, with each transcript containing doctor-patient interactions along with corresponding case notes (Kazi et al., 2020). Its clear annotations, structured dialogue format, and focus on psychiatric consultations make it a valuable resource for our project.

The MTS-Dialog Augmented Dataset consists of 3,600 medical dialogue-summary pairs, created by augmenting the original 1,200 training samples through back translation using French and Spanish. The dataset is designed for medical conversation summarization, making it relevant to our goal [Ben Abacha et al., 2023](#kazi2020).

Each conversation is paired with a human-written summary, making it particularly useful for training dialogue summarization models. To enhance linguistic diversity and improve model generalization, the dataset was expanded through back translation, where English dialogues were translated into French and Spanish and then back into English (Ben Abacha et al., 2023). This augmentation technique helps create more varied sentence structures and phrasing, ensuring that models trained on this dataset are more robust and adaptable to real-world medical conversations.

The VRBot (KaMed) dataset is a Chinese medical dialogue corpus sourced from ChunyuDoctor, an online medical consultation platform. It contains long-form, multi-turn conversations spanning over 100 hospital departments and incorporates external medical knowledge from CMeKG, China's largest medical knowledge graph [Li et al., 2021](#benabacha2023). Since our model operates in English, we would need to translate this dataset using MarianMT or similar machine translation models. However, its inclusion in our training pipeline is conditional. We will evaluate its impact on model performance and integrate it only if it provides measurable improvements to SOAP note generation.

# 4 Approach

    Our broad baseline algorithm is that of Unsupervised Hierarchical Clustering for topic annotation in medical consultation transcripts.

    We define our problem statement as follows: Given a raw speech transcript dataset D (English) from a doctor-patient consultation, we process it using the following pipeline to generate tabulated doctor notes N as our result.

    1. **Extraction of data**: Our raw speech transcript dataset D can be in a variety of forms, spanning CSV files to JSON formats. Our first step will be to extract all of them to a common CSV where every entry T is a multi-turn conversation between the doctor and the patient during a particular medical consultation.

    2. **Spoken Language Normalization**: Given a speech transcript T, we aim to transform colloquial spoken English into a more formal written format by eliminating fillers and pauses. Additionally, we plan to ground the transcript against a medical terminology database to enhance contextual accuracy and domain-specific coherence. At the end of this exercise, we have an enhanced transcript T′, with meaningful and concise sentences.

       Following the recommendation of Aliero et al [Aliero et al., 2023](#falcetta2023), we will utilize a hybrid text normalization technique known as a rule-based multihead attention model. We plan to use an AI agent system with an open-source LLM like phi4 to normalize transcripts. For our model's runtime environment, we'll use Ollama, and LangChain. LangChain additionally supports various rule-based text normalization functions which we plan to utilize before and after the use of our LLM. The LLM will have access to a ChromaDB database representing the standard academic style it should translate the medical transcripts to. This data will be effectively relayed to the LLM as context in its translation via LangChain.

       We will be running this step on the cloud, likely on google colab or similar, as this offers more processing power than we have locally and better supports collaboration. Application of LangChain's rule-based normalization capabilities, proper preprocessing of our medical terminology database, and effective prompt engineering for our base model will all be essential for this step.

    3. **Key-Phrase Extraction**: At this point, we extract a set of key phrases K from our transcript T′ in preparation for clustering in the next step.

       Note that we also maintain a separate set Kp of the dialogues spoken exclusively by the patient, which will be used for further analysis in the next step.

    4. **Topic Categorization**: Given the set K (and Kp) of key phrases corresponding to the transcript T′, we employ hierarchical clustering to group phrases pertaining to the same topic together hierarchically, such that we finally end up with 4 main clusters corresponding to the SOAP format for clinical notes (SOAP stands for Subjective, Objective, Assessment, Plan).

    5. **Generation of Doctor Notes**: We generate doctor notes N in the tabular format according to the SOAP standard for clinical notes, with provisions for more fine-grained categorization within the 4 broad segments.′, with meaningful and concise sentences.

Figure 2 provides a diagrammatic description of our entire pipeline, illustrating the flow from raw transcript processing through normalization, key-phrase extraction, and topic categorization, to the final generation of structured SOAP notes.

![Our proposed pipeline for automated clinical documentation](/images/scribingpipeline1.png)

*Figure 2: Our proposed pipeline for automated clinical documentation generation from doctor-patient conversations. The system processes raw transcripts through multiple stages including normalization, key-phrase extraction, topic categorization using hierarchical clustering, and finally generates structured SOAP notes.*

Let's now delve into the intricacies of every aspect of our approach, complete with the tooling and methods we plan to implement.

## 4.1 Spoken Language Normalization

### 4.1.1 Input and Output

Given a speech transcript T, the goal is to transform colloquial spoken English into a more formal written format by eliminating fillers, pauses, and irregular speech patterns. Additionally, the transcript is grounded against a medical terminology database to enhance contextual accuracy and domain-specific coherence. The output is an enhanced transcript T′ with meaningful and concise sentences, facilitating further downstream processing.

### 4.1.2 Plan

Following the recommendation of (Aliero et al., 2023), we employ a hybrid text normalization approach based on a rule-based multihead attention model. Specifically, we use an AI agent system with an open-source LLM like Phi-4 to perform spoken-to-written text normalization. The model is provided with a ChromaDB knowledge base containing medical and academic language standards. LangChain facilitates structured data retrieval from ChromaDB, ensuring context-aware normalization. Additionally, LangChain's rule-based text normalization functions are applied before and after the LLM processing to refine the output further.

### 4.1.3 Evaluation

The effectiveness of the normalised transcripts can be evaluated using topic coherence assessment metrics [Stammbach et al., 2023](#li2021), which measure how semantically meaningful and consistent the identified topics are within the medical context.

## 4.2 Key-Phrase Extraction

### 4.2.1 Input and Output

We will use the transcript T′ as input in the key phrase extraction step. The output of this step is a set of key phrases K = k1, k2, ..., km where each ki represents a significant thematic element within the corpus of transcripts. These key phrases serve as semantic anchors for topic categorization.

### 4.2.2 Plan

The (Kapoor et al., 2024) approach takes advantage of the contextual understanding and clustering algorithms of LLM to identify relevant key phrases from text documents. Although the original paper implements multiple clustering methods, including K-Means, the following algorithm focuses specifically on the hierarchical clustering component for key phrase extraction for medical dialogues.

Our plan for key-phrase extraction follows a structured approach that leverages both the semantic understanding capabilities of large language models and the organizational power of hierarchical clustering. We first extract candidate phrases from each transcript using an LLM and then verify their coherence to filter out potential hallucinations. Next, we compute semantic similarities between the remaining phrases and apply hierarchical clustering to identify natural groupings. Finally, we select exemplar terms from each cluster to serve as our definitive key phrases. This approach maintains the semantic richness of manual annotation while providing a scalable and automated alternative.

The hierarchical clustering approach offers several advantages over alternative methods. Unlike partitional clustering techniques that require a predefined number of clusters, hierarchical clustering discovers the natural structure within the data. This property is particularly valuable for transcript analysis where the optimal number of topics is rarely known a priori. Additionally, the resulting dendrogram provides insights into the relationships between different topics, enabling multi-level topic exploration if desired. The algorithm below is adapted from the QualIT approach presented by (Kapoor et al., 2024), with modifications to specifically handle medical dialogue transcripts and incorporate hallucination checks for clinical accuracy. The complete algorithm is detailed in Algorithm 1.

![Key-Phrase Extraction via LLM and Hierarchical Clustering](/images/scribingsentence.png)

**Algorithm 1: Key-Phrase Extraction via LLM, Hallucination Check, and Hierarchical Clustering**

**Require**: Set of transcripts T′ = {t1, t2, ..., tn}, coherence threshold θ, embedding model E, large language model LLM
**Ensure**: Set of key phrases K = {k1, k2, ..., km}
**Initialize**: P ← ∅ {All candidate phrases}

**Step 1**: Key Phrase Extraction via LLM
\`\`\`
for each transcript ti ∈ T′ do
    Pi ← LLM(ti, "Extract key phrases from this transcript")
    P ← P ∪ Pi {Accumulate key phrase candidates}
end for
\`\`\`

**Step 2**: Hallucination Check / Coherence Filtering
\`\`\`
P′ ← ∅ {Filtered set of phrases}
for each phrase p ∈ P do
    Compute coherence score:
    Cp = (1/n) * Σ(j=1 to n) [E(p) · E(tj) / (||E(p)|| · ||E(tj)||)]
    if Cp ≥ θ then
        P′ ← P′ ∪ {p} {Keep phrases above threshold}
    end if
end for
\`\`\`

**Step 3**: Construct Similarity Matrix
\`\`\`
V ← ∅ {Store embeddings for all filtered phrases}
for each phrase p ∈ P′ do
    vp ← E(p)
    V ← V ∪ {vp}
end for
Compute similarity matrix S where:
Sij = vi · vj / (||vi|| ||vj||)
Convert to distance matrix D where:
Dij = 1 − Sij
\`\`\`

**Step 4**: Hierarchical Clustering
\`\`\`
H ← HierarchicalClustering(D, "complete") {Build cluster tree using a linkage method, e.g., 'complete'}
Use Silhouette score to find optimal cluster count mopt:
s(i) = (b(i) − a(i)) / max(a(i), b(i)), if |Ci| > 1
      = 0, if |Ci| = 1
mopt ← DetermineBestClusterCount(H, S)
G ← CutTree(H, mopt) {Obtains mopt clusters, G = {G1, G2, ..., Gmopt}}
\`\`\`

**Step 5**: Exemplar (Centroid) Selection
\`\`\`
K ← ∅ {Final set of key phrases}
for each cluster Gi ∈ G do
    Compute centroid:
    ci = (1/|Gi|) * Σv∈Gi v
    Find exemplar:
    ei = arg min(pj ∈ Gi) ||E(pj) − ci||²
    K ← K ∪ {ei}
end for
\`\`\`

**Output**: K = {k1, k2, ..., kmopt} {Final set of extracted key phrases}

### 4.2.3 Evaluation

We will evaluate the key-phrase extraction algorithm using both intrinsic and extrinsic metrics. For clustering quality assessment, we will employ the Silhouette Coefficient and Calinski-Harabasz Index to measure intra-cluster cohesion and inter-cluster separation. We will also compute ROUGE-L and BLEU scores to compare our automatically extracted phrases against manually annotated reference phrases from a subset of the corpus. For hallucination detection performance, we will calculate precision, recall, and F1 scores using a test set of deliberately injected non-coherent phrases.

## 4.3 Topic Categorization

### 4.3.1 Input and Output

We use the output of the of key-phrase extraction step as input to the topic categorization step. ie., all the key phrases extracted from the transcript are used as input to the topic categorization step.

### 4.3.2 Plan

This step transforms the clustered key phrases into a comprehensive, medically accurate SOAP note by generating coherent prose for each section. The process follows a modular approach similar to the Cluster2Sent algorithm210, where semantically related key phrases guide the generation of individual sentences that are then combined into section-specific narratives.

We first process each SOAP section independently, using the corresponding categorized key phrases as semantic anchors. For each section, we employ an abstractive summarization approach that preserves medical accuracy while ensuring the generated text adheres to the distinct writing styles characteristic of each SOAP component. The Subjective and Objective sections typically present concise, factual statements drawn directly from patient-reported information and clinical observations, while the Assessment section synthesizes this information into diagnostic conclusions, and the Plan section articulates actionable treatment recommendations.

By generating each section separately, we maintain the structure and purpose of clinical documentation while ensuring the faithful representation of the transcript content. This modular approach helps prevent information hallucination and ensures that the generated notes maintain clinical accuracy and relevance The generation process follows Algorithm 2:

![Pipeline Visual Overview](/images/scribingpipeline2.png)

**Algorithm 2: SOAP Note Generation from Categorized Key Phrases**

**Require**: Categorized key phrase clusters CS, CO, CA, CP; fine-tuned section-specific models MS, MO, MA, MP
**Ensure**: Complete SOAP note N = NS, NO, NA, NP
\`\`\`
for each section i ∈ S, O, A, P do
    C′i ← OrderPhrasesByRelevance(Ci) {Order phrases by clinical relevance}
    prompti ← ConstructPrompt(C′i) {Create section-specific prompt}
    Ni ← Mi(prompti) {Generate section text using appropriate model}
    Ni ← PostProcess(Ni) {Ensure clinical consistency and coherence}
end for
return N = NS, NO, NA, NP
\`\`\`

### 4.3.3 Evaluation

The effectiveness of these automated approaches can be evaluated using topic coherence assessment metrics (Stammbach et al., 2023), which measure how semantically meaningful and consistent the identified topics are within the medical context. We will evaluate topic categorization using multiple coherence metrics tailored to the SOAP format. For each category (S, O, A, P), we will calculate normalized pointwise mutual information (NPMI) between key phrases within the same cluster, measuring statistical coherence based on co-occurrence patterns. Semantic coherence is assessed by computing the average cosine similarity between phrase embeddings within each SOAP section using clinical domain-specific models such as ClinicalBERT. This approach evaluates semantic relationships rather than just term co-occurrence. For external validation, we can compare automatically generated SOAP categorizations with a gold standard datasets of manually categorized transcripts like (Zeng et al., 2020) and [Finley et al., 2018](#stammbach2023), calculating precision, recall, and F1 scores for each SOAP section independently.

# 5 Schedule

Our project is divided into several key phases, with estimated time allocations for each. Responsibilities will be distributed among team members based on expertise, and certain tasks will be completed collaboratively.

- **Data Acquisition and Preprocessing (2 weeks)**
  - Collect and clean medical dialogue datasets (MedDialog-EN, Zenodo, MTS-Dialog, and potentially VRBot).
  - Convert all datasets into a common format.
  - Perform spoken language normalization, including paraphrasing colloquial expressions, grounding terms in medical terminology, and handling fillers and pauses.
  - Conduct initial data quality assessment.

- **Key-Phrase Extraction and Topic Categorization (2 weeks)**
  - Implement key-phrase extraction techniques to identify important medical information from transcripts.
  - Apply hierarchical clustering to categorize extracted phrases into SOAP note sections.
  - Tune clustering parameters and evaluate topic coherence using relevant metrics.

- **Doctor Note Generation (1 week)**
  - Develop a model to structure extracted information into SOAP-format doctor notes.
  - Implement summarization techniques to improve coherence and readability.
  - Validate model outputs against human-written notes.

- **Model Evaluation and Error Analysis (3 weeks)**
  - Analyze the performance of generated SOAP notes.
  - Identify common model errors and refine clustering/summarization approaches.
  - Compare results with existing medical documentation methods.

- **Final Report and Documentation (1 week)**
  - Compile findings and results into a structured report.
  - Document methodologies, datasets, and evaluation metrics.
  - Prepare a presentation if required.

# 6 Tools

- LangChain for creating AI agents for steps like spoken language normalization and implementation of RAG
- Vector database like ChromaDB
- Ollama for downloading and running models
- Selenium for any necessary web scraping
- Google Colab for GPUs
- Phi4, a SOTA 14b llm by Microsoft
- Deepseek R1, a SOTA 14b llm by Deepseek with COT
- Sklearn for common ML algorithms like random forest
- UnityHPC and Colab for GPUs

# 7 Estimation of API Credits

We use LLMs in 3 major steps of our pipeline, namely the spoken language normalisation, key phrase extraction and topic categorisation.

Our MedDialog dataset consists of 300,000 transcripts, and we can safely assume 10-20 words per transcript, which translates to roughly 15-20 tokens (courtesy TikTokeniser) Assuming an average of 20 tokens per transcript, and a GPT-4o pricing of $2.5 for every 1M input tokens, we estimate a $15 usage per stage of the pipeline. Since we have three major stages of the pipeline that relies on the usage of LLMs, we incur a total estimated cost of $45.

# References

Falcetta, F. S., De Almeida, F. K., Lemos, J. C. S., Goldim, J. R., and Da Costa, C. A. (2023). <a id="falcetta2023"></a>Automatic documentation of professional health interactions: A systematic review. Artificial Intelligence in Medicine, 137:102487.

Aliero, A., Bashir, S., Aliyu, H., Tafida, A., Kangiwa, B., and Dankolo, N. (2023). <a id="aliero2023"></a>Systematic review on text normalization techniques and its approach to non-standard words. International Journal of Computer Applications, 185:975–8887.

Kapoor, S., Gil, A., Bhaduri, S., Mittal, A., and Mulkar, R. (2024). <a id="kapoor2024"></a>Qualitative insights tool (qualit): Llm enhanced topic modeling.

Khandelwal, T. (2025). <a id="khandelwal2025"></a>Using llm-based approaches to enhance and automate topic labeling.

Wenceslao, S. J. M. C. and Estuar, M. R. J. E. (2019). <a id="wenceslao2019"></a>Using cTAKES to Build a Simple Speech Transcriber Plugin for an EMR. In Proceedings of the 3rd International Conference on Medical and Health Informatics, ICMHI '19, pages 78–86, New York, NY, USA. Association for Computing Machinery.

Khattak, F. K., Jeblee, S., Crampton, N., Mamdani, M., and Rudzicz, F. (2019). <a id="khattak2019"></a>AutoScribe: Extracting Clinically Pertinent Information from Patient-Clinician Dialogues. In MEDINFO 2019: Health and Wellbeing e-Networks for All, pages 1512–1513. IOS Press.

Soltau, H., Wang, M., Shafran, I., and Shafey, L. E. (2021). <a id="soltau2021"></a>Understanding Medical Conversations: Rich Transcription, Confidence Scores & Information Extraction. arXiv:2104.02219 [cs].

Menon, N. G., Shrivastava, A., Bhavana, N. D., and Simon, J. (2021). <a id="menon2021"></a>Deep Learning based Transcribing and Summarizing Clinical Conversations. In 2021 Fifth International Conference on I-SMAC (IoT in Social, Mobile, Analytics and Cloud) (I-SMAC), pages 358–365. ISSN: 2768-0673.

Liu, Z., Salleh, S., Krishnaswamy, P., and Chen, N. (2024). <a id="liu2024"></a>Context Aggregation with Topic-focused Summarization for Personalized Medical Dialogue Generation. In Naumann, T., Ben Abacha, A., Bethard, S., Roberts, K., and Bitterman, D., editors, Proceedings of the 6th Clinical Natural Language Processing Workshop, pages 310–321, Mexico City, Mexico. Association for Computational Linguistics.

Schloss, B. and Konam, S. (2020). <a id="schloss2020"></a>Towards an Automated SOAP Note: Classifying Utterances from Medical Conversations. In Proceedings of the 5th Machine Learning for Healthcare Conference, pages 610–631. PMLR. ISSN: 2640-3498.

Zeng, G., Yang, W., Ju, Z., Yang, Y., Wang, S., Zhang, R., Zhou, M., Zeng, J., Dong, X., Zhang, R., Fang, H., Zhu, P., Chen, S., and Xie, P. (2020). <a id="zeng2020"></a>MedDialog: Large-scale medical dialogue datasets. In Webber, B., Cohn, T., He, Y., and Liu, Y., editors, Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP), pages 9241–9250, Online. Association for Computational Linguistics.

Kazi, N., Kuntz, M., Kanewala, U., and Kahanda, I. (2020). <a id="kazi2020"></a>Dataset for automated medical transcription. The dataset contains transcripts of psychiatric doctor-patient conversations generated for training machine learning models in automated medical transcription.
# Authors

[Prakriti Shetty](mailto:psshetty@umass.edu)<br>  
[Priya Balakrishnan](mailto:pbalakrishna@umass.edu)<br> 
[Avinash Nandyala](mailto:anandyala@umass.edu)<br> 
[Donald Winkleman](mailto:dwinkelman@umass.edu)<br>

# 1 Introduction

    Electronic Health Records (EHRs) have been widely adopted to digitize and automate the collection of patient records, including medical history, consultation notes, and overall case documentation. However, current EHR systems primarily rely on manual data entry, which requires healthcare professionals to manually input information. This manual approach leads to several issues, such as data-entry errors, inconsistent documentation, reduced readability, and increased administrative workload. Consequently, this process not only affects data accuracy and usability but also contributes to physician dissatisfaction due to the significant time investment required for documentation.&nbsp;&nbsp;

    To mitigate these challenges, recent advancements have explored automated clinical documentation systems, commonly referred to as digital scribes. These systems aim to capture and transcribe physician-patient conversations into structured clinical notes, allowing healthcare professionals to focus on patient care rather than administrative tasks. However, many existing solutions primarily depend on automatic speech recognition (ASR) followed by named entity recognition (NER) to extract relevant medical terms, often presenting the output as a tabular summary of keywords. While such approaches offer some level of automation, they fail to capture the nuanced and structured nature of clinical documentation required for effective decision-making and seamless integration into EHR systems.&nbsp;&nbsp;

    In this work, we propose an advanced automated pipeline that processes audio transcripts from doctor-patient interactions to systematically extract key medical information and categorize it according to the standard SOAP (Subjective, Objective, Assessment, Plan) format. Our approach enhances traditional methods by incorporating hierarchical clustering for topic categorization, enabling fine-grained segmentation of medical discussions within the SOAP framework. This structured organization ensures that clinical notes are not only comprehensive and contextually accurate but also readily adaptable for integration into modern EHR systems, ultimately improving workflow efficiency and reducing the documentation burden on healthcare providers.&nbsp;&nbsp;

# 2 Related work

    [Falcetta et al., 2023](#references)'s systematic review on intelligent solutions for automatic speech recognition (ASR) and automatic documentation in medical interviews provided a comprehensive understanding of the problem landscape. Most of the selected studies followed a standardized pipeline, beginning with speech capture using tools such as the Google Speech-to-Text API or commercial ASR systems like Dragon NaturallySpeaking (Nuance). Speaker diarization and recognition were commonly implemented using Hidden Markov Models (HMMs) and Gaussian Mixture Models (GMMs), followed by speech enhancement techniques using Generative Adversarial Networks (GANs), or noise suppression using CNNs. The extracted information was then aligned with medical knowledge bases, including SNOMED-CT and BioPortal, to ensure accuracy and contextual relevance. Finally, structured tabular summaries were generated using machine learning and deep learning techniques, including Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs) such as Long Short-Term Memory (LSTM) networks, and Natural Language Processing (NLP) and Knowledge Extraction modules.

![Text Normalization Techniques and some of their classification](/images/scribingnormalization.png)

*Figure 1: Text Normalization Techniques and some of their classification*

## Speaker Normalisation

    [Aliero et al., 2023](#falcetta2023) provides a comprehensive methodology review of text normalization research across 54 papers from 2018-2022. It subdivides text normalization techniques into four methods shown in figure 1. Neural networks generally have high accuracy, especially with the exponential growth in LLM capabilities in recent years, but come at the cost of computational complexity. Rule-Based and Statistical Methods have the opposite tradeoff for general translation. However, Rule-Based techniques can succeed in domain-specific areas such as medicine when processing to and from specific terminology.

    Recently, research has shifted towards exploring hybrid approaches which generally utilize neural networks alongside rule-based, statistical methods, or both. For the small tradeoff in computational efficiency that comes with using multiple methods, higher accuracy can be achieved on domain-specific language normalization. Therefore, this technique would be best suited for our application.

## Topic Categorization

    Topic categorization in medical dialogues has traditionally relied on manual annotation by domain experts. However, recent research suggests automated approaches using hierarchical clustering can achieve comparable results. Two notable papers propose hierarchical clustering methods for topic modeling: [Kapoor et al., 2024](#aliero2023) focused specifically on news reports achieving strong performance metrics, and [Khandelwal, 2025](#kapoor2024) presented a more generalized document-level approach that enables nuanced topic categorization. While some approaches like prompt-based classification and document-to-document summarization techniques exist, they tend to require more manual effort or may not be as well-suited for dialogue-specific topic modeling.

## Generation of Doctor Notes

Prior work in automated clinical documentation has explored various approaches to structuring transcribed medical conversations. [Wenceslao and Estuar, 2019](#khandelwal2025) mapped transcribed text to multiple clinically relevant categories, including time expression identification, medical entity identification, attribute classification, and primary diagnosis classification. Similarly, [Khattak et al., 2019](#wenceslao2019) structured clinical notes into distinct categories, such as sign and symptom mentions, measurement annotations, disease and disorder mentions, medication mentions, and procedure mentions, thereby facilitating more organized and accessible documentation.

[Soltau et al., 2021](#khattak2019) employed a Named Entity Recognition (NER) tagging approach using Recurrent Neural Network Transducers (RNN-Ts) instead of conventional Conditional Random Fields (CRFs). This choice was motivated by the need to capture temporal dependencies, which play a crucial role in knowledge extraction. Building upon this, [Menon et al., 2021](#soltau2021) proposed a more structured approach, reducing lengthy text transcripts into a labeled set categorized into four key aspects: patient details, symptoms, previous prescriptions, and the current medical situation, and used a Support Vector Machine (SVM) model to evaluate classification accuracy.

A more contextually aware strategy was introduced by [Liu et al., 2024](#menon2021), who incorporated real-time health information extracted from consultation transcripts to construct patient profiles. This approach aimed to enhance the utility of extracted data for clinical decision-making and personalized patient care by integrating dynamically updated medical information alongside demographic details such as age and gender. An alternative line of research has explored generating summaries or paraphrased versions of transcriptions to improve clarity and expressiveness, but without much success.

In our work, we adopt the SOAP (Subjective, Objective, Assessment, and Plan) format for clinical documentation, originally introduced by [Schloss and Konam, 2020](#liu2024). This structured framework has long been a cornerstone of problem-oriented medical notes, providing a standardized and interpretable format for organizing clinical information. However, we extend this approach by integrating the contextual profiling methodology proposed by (Liu et al., 2024). Unlike their approach, which includes demographic attributes, our dataset does not contain patient demographic information. Instead, we synthesize a structured patient profile solely from the consultation transcript, ensuring that relevant clinical context is preserved without introducing demographic fields. By combining these methodologies, our approach seeks to balance structured documentation with dynamic, context-aware medical information extraction, ultimately enhancing both the usability and comprehensiveness of automated clinical notes.

# 3 Data

Our project requires high-quality medical dialogue data to develop a tool that transforms doctor-patient conversations into structured doctor notes in the SOAP format. To achieve this, we will utilize multiple publicly available datasets that contain real-world medical conversations.

The MedDialog-EN dataset is a large-scale English-language corpus featuring approximately 300,000 medical consultations and 500,000 utterances. These conversations span 2 broad medical specialties, including internal medicine, pediatrics, and dentistry, and further branch into 172 fine-grained sub-specialties. Each consultation consists of two components, a description of the patient's medical condition and conversations between the patient and doctor [Zeng et al., 2020](#schloss2020). This dataset is freely accessible and has been widely adopted in medical NLP research, making it a reliable resource for our project. The detailed patient condition descriptions serve as essential context for generating structured medical summaries in the SOAP note format.

The Zenodo dataset consists of English-language transcripts of psychiatric consultations, specifically created for training machine learning models to generate psychiatric case notes from doctor-patient conversations [Kazi et al., 2020](#zeng2020). This dataset is structured in JSON format, with each transcript containing doctor-patient interactions along with corresponding case notes (Kazi et al., 2020). Its clear annotations, structured dialogue format, and focus on psychiatric consultations make it a valuable resource for our project.

The MTS-Dialog Augmented Dataset consists of 3,600 medical dialogue-summary pairs, created by augmenting the original 1,200 training samples through back translation using French and Spanish. The dataset is designed for medical conversation summarization, making it relevant to our goal [Ben Abacha et al., 2023](#kazi2020).

Each conversation is paired with a human-written summary, making it particularly useful for training dialogue summarization models. To enhance linguistic diversity and improve model generalization, the dataset was expanded through back translation, where English dialogues were translated into French and Spanish and then back into English (Ben Abacha et al., 2023). This augmentation technique helps create more varied sentence structures and phrasing, ensuring that models trained on this dataset are more robust and adaptable to real-world medical conversations.

The VRBot (KaMed) dataset is a Chinese medical dialogue corpus sourced from ChunyuDoctor, an online medical consultation platform. It contains long-form, multi-turn conversations spanning over 100 hospital departments and incorporates external medical knowledge from CMeKG, China's largest medical knowledge graph [Li et al., 2021](#benabacha2023). Since our model operates in English, we would need to translate this dataset using MarianMT or similar machine translation models. However, its inclusion in our training pipeline is conditional. We will evaluate its impact on model performance and integrate it only if it provides measurable improvements to SOAP note generation.

# 4 Approach

    Our broad baseline algorithm is that of Unsupervised Hierarchical Clustering for topic annotation in medical consultation transcripts.

    We define our problem statement as follows: Given a raw speech transcript dataset D (English) from a doctor-patient consultation, we process it using the following pipeline to generate tabulated doctor notes N as our result.

    1. **Extraction of data**: Our raw speech transcript dataset D can be in a variety of forms, spanning CSV files to JSON formats. Our first step will be to extract all of them to a common CSV where every entry T is a multi-turn conversation between the doctor and the patient during a particular medical consultation.

    2. **Spoken Language Normalization**: Given a speech transcript T, we aim to transform colloquial spoken English into a more formal written format by eliminating fillers and pauses. Additionally, we plan to ground the transcript against a medical terminology database to enhance contextual accuracy and domain-specific coherence. At the end of this exercise, we have an enhanced transcript T′, with meaningful and concise sentences.

       Following the recommendation of Aliero et al [Aliero et al., 2023](#falcetta2023), we will utilize a hybrid text normalization technique known as a rule-based multihead attention model. We plan to use an AI agent system with an open-source LLM like phi4 to normalize transcripts. For our model's runtime environment, we'll use Ollama, and LangChain. LangChain additionally supports various rule-based text normalization functions which we plan to utilize before and after the use of our LLM. The LLM will have access to a ChromaDB database representing the standard academic style it should translate the medical transcripts to. This data will be effectively relayed to the LLM as context in its translation via LangChain.

       We will be running this step on the cloud, likely on google colab or similar, as this offers more processing power than we have locally and better supports collaboration. Application of LangChain's rule-based normalization capabilities, proper preprocessing of our medical terminology database, and effective prompt engineering for our base model will all be essential for this step.

    3. **Key-Phrase Extraction**: At this point, we extract a set of key phrases K from our transcript T′ in preparation for clustering in the next step.

       Note that we also maintain a separate set Kp of the dialogues spoken exclusively by the patient, which will be used for further analysis in the next step.

    4. **Topic Categorization**: Given the set K (and Kp) of key phrases corresponding to the transcript T′, we employ hierarchical clustering to group phrases pertaining to the same topic together hierarchically, such that we finally end up with 4 main clusters corresponding to the SOAP format for clinical notes (SOAP stands for Subjective, Objective, Assessment, Plan).

    5. **Generation of Doctor Notes**: We generate doctor notes N in the tabular format according to the SOAP standard for clinical notes, with provisions for more fine-grained categorization within the 4 broad segments.′, with meaningful and concise sentences.

Figure 2 provides a diagrammatic description of our entire pipeline, illustrating the flow from raw transcript processing through normalization, key-phrase extraction, and topic categorization, to the final generation of structured SOAP notes.

![Our proposed pipeline for automated clinical documentation](/images/scribingpipeline1.png)

*Figure 2: Our proposed pipeline for automated clinical documentation generation from doctor-patient conversations. The system processes raw transcripts through multiple stages including normalization, key-phrase extraction, topic categorization using hierarchical clustering, and finally generates structured SOAP notes.*

Let's now delve into the intricacies of every aspect of our approach, complete with the tooling and methods we plan to implement.

## 4.1 Spoken Language Normalization

### 4.1.1 Input and Output

Given a speech transcript T, the goal is to transform colloquial spoken English into a more formal written format by eliminating fillers, pauses, and irregular speech patterns. Additionally, the transcript is grounded against a medical terminology database to enhance contextual accuracy and domain-specific coherence. The output is an enhanced transcript T′ with meaningful and concise sentences, facilitating further downstream processing.

### 4.1.2 Plan

Following the recommendation of (Aliero et al., 2023), we employ a hybrid text normalization approach based on a rule-based multihead attention model. Specifically, we use an AI agent system with an open-source LLM like Phi-4 to perform spoken-to-written text normalization. The model is provided with a ChromaDB knowledge base containing medical and academic language standards. LangChain facilitates structured data retrieval from ChromaDB, ensuring context-aware normalization. Additionally, LangChain's rule-based text normalization functions are applied before and after the LLM processing to refine the output further.

### 4.1.3 Evaluation

The effectiveness of the normalised transcripts can be evaluated using topic coherence assessment metrics [Stammbach et al., 2023](#li2021), which measure how semantically meaningful and consistent the identified topics are within the medical context.

## 4.2 Key-Phrase Extraction

### 4.2.1 Input and Output

We will use the transcript T′ as input in the key phrase extraction step. The output of this step is a set of key phrases K = k1, k2, ..., km where each ki represents a significant thematic element within the corpus of transcripts. These key phrases serve as semantic anchors for topic categorization.

### 4.2.2 Plan

The (Kapoor et al., 2024) approach takes advantage of the contextual understanding and clustering algorithms of LLM to identify relevant key phrases from text documents. Although the original paper implements multiple clustering methods, including K-Means, the following algorithm focuses specifically on the hierarchical clustering component for key phrase extraction for medical dialogues.

Our plan for key-phrase extraction follows a structured approach that leverages both the semantic understanding capabilities of large language models and the organizational power of hierarchical clustering. We first extract candidate phrases from each transcript using an LLM and then verify their coherence to filter out potential hallucinations. Next, we compute semantic similarities between the remaining phrases and apply hierarchical clustering to identify natural groupings. Finally, we select exemplar terms from each cluster to serve as our definitive key phrases. This approach maintains the semantic richness of manual annotation while providing a scalable and automated alternative.

The hierarchical clustering approach offers several advantages over alternative methods. Unlike partitional clustering techniques that require a predefined number of clusters, hierarchical clustering discovers the natural structure within the data. This property is particularly valuable for transcript analysis where the optimal number of topics is rarely known a priori. Additionally, the resulting dendrogram provides insights into the relationships between different topics, enabling multi-level topic exploration if desired. The algorithm below is adapted from the QualIT approach presented by (Kapoor et al., 2024), with modifications to specifically handle medical dialogue transcripts and incorporate hallucination checks for clinical accuracy. The complete algorithm is detailed in Algorithm 1.

![Key-Phrase Extraction via LLM and Hierarchical Clustering](/images/scribingsentence.png)

**Algorithm 1: Key-Phrase Extraction via LLM, Hallucination Check, and Hierarchical Clustering**

**Require**: Set of transcripts T′ = {t1, t2, ..., tn}, coherence threshold θ, embedding model E, large language model LLM
**Ensure**: Set of key phrases K = {k1, k2, ..., km}
**Initialize**: P ← ∅ {All candidate phrases}

**Step 1**: Key Phrase Extraction via LLM
\\`\\`\\`
for each transcript
ti ∈ T′ do
    Pi ← LLM(ti, "Extract key phrases from this transcript")
P ← P ∪ Pi
{
    Accumulate
    key
    phrase
    candidates
}
end
for
    \\`\\`\\`

**Step 2**: Hallucination Check / Coherence Filtering
\\`\\`\\`
P′ ← ∅ {
    Filtered
    set
    of
    phrases
}
for each phrase
p ∈ P
do
    Compute coherence
score:
    Cp = (1 / n) * Σ(j = 1
to
n
)
[E(p) · E(tj) / ( || E(p) || · ||
E(tj) ||
)]
if Cp ≥
θ
then
P′ ← P′ ∪ {
    p
}
{
    Keep
    phrases
    above
    threshold
}
end
if
    end for
    \\`\\`\\`

**Step 3**: Construct Similarity Matrix
\\`\\`\\`
V ← ∅ {
    Store
    embeddings
    for all filtered
    phrases
}
for each phrase
p ∈ P′ do
    vp ← E(p)
V ← V ∪ {
    vp
}
end
for
    Compute similarity
matrix
S
where:
    Sij = vi · vj / ( || vi || || vj ||
)
Convert
to
distance
matrix
D
where:
    Dij = 1 − Sij
\\`\\`\\`

**Step 4**: Hierarchical Clustering
\\`\\`\\`
H ← HierarchicalClustering(D, "complete")
{
    Build
    cluster
    tree
    using a
    linkage
    method, e.g., 'complete'
}
Use
Silhouette
score
to
find
optimal
cluster
count
mopt:
    s(i) = (b(i) − a(i)
) /
max(a(i), b(i)),
if |
Ci | > 1
    = 0,
if |
Ci | = 1
mopt ← DetermineBestClusterCount(H, S)
G ← CutTree(H, mopt)
{
    Obtains
    mopt
    clusters, G = {G1, G2, ..., Gmopt}
}
\\`\\`\\`

**Step 5**: Exemplar (Centroid) Selection
\\`\\`\\`
K ← ∅ {
    Final
    set
    of
    key
    phrases
}
for each cluster
Gi ∈ G
do
    Compute centroid
:
ci = (1 / | Gi |) * Σv∈Gi
v
Find
exemplar:
    ei = arg
min(pj ∈ Gi
) ||
E(pj) − ci ||²
    K ← K ∪ {
    ei
}
end
for
    \\`\\`\\`

**Output**: K = {k1, k2, ..., kmopt} {Final set of extracted key phrases}

### 4.2.3 Evaluation

We will evaluate the key-phrase extraction algorithm using both intrinsic and extrinsic metrics. For clustering quality assessment, we will employ the Silhouette Coefficient and Calinski-Harabasz Index to measure intra-cluster cohesion and inter-cluster separation. We will also compute ROUGE-L and BLEU scores to compare our automatically extracted phrases against manually annotated reference phrases from a subset of the corpus. For hallucination detection performance, we will calculate precision, recall, and F1 scores using a test set of deliberately injected non-coherent phrases.

## 4.3 Topic Categorization

### 4.3.1 Input and Output

We use the output of the of key-phrase extraction step as input to the topic categorization step. ie., all the key phrases extracted from the transcript are used as input to the topic categorization step.

### 4.3.2 Plan

This step transforms the clustered key phrases into a comprehensive, medically accurate SOAP note by generating coherent prose for each section. The process follows a modular approach similar to the Cluster2Sent algorithm210, where semantically related key phrases guide the generation of individual sentences that are then combined into section-specific narratives.

We first process each SOAP section independently, using the corresponding categorized key phrases as semantic anchors. For each section, we employ an abstractive summarization approach that preserves medical accuracy while ensuring the generated text adheres to the distinct writing styles characteristic of each SOAP component. The Subjective and Objective sections typically present concise, factual statements drawn directly from patient-reported information and clinical observations, while the Assessment section synthesizes this information into diagnostic conclusions, and the Plan section articulates actionable treatment recommendations.

By generating each section separately, we maintain the structure and purpose of clinical documentation while ensuring the faithful representation of the transcript content. This modular approach helps prevent information hallucination and ensures that the generated notes maintain clinical accuracy and relevance The generation process follows Algorithm 2:

![Pipeline Visual Overview](/images/scribingpipeline2.png)

**Algorithm 2: SOAP Note Generation from Categorized Key Phrases**

**Require**: Categorized key phrase clusters CS, CO, CA, CP; fine-tuned section-specific models MS, MO, MA, MP
**Ensure**: Complete SOAP note N = NS, NO, NA, NP
\\`\\`\\`
for each section
i ∈ S, O, A, P
do
    C′i ← OrderPhrasesByRelevance(Ci)
{
    Order
    phrases
    by
    clinical
    relevance
}
prompti ← ConstructPrompt(C′i
)
{
    Create
    section - specific
    prompt
}
Ni ← Mi(prompti)
{
    Generate
    section
    text
    using appropriate
    model
}
Ni ← PostProcess(Ni)
{
    Ensure
    clinical
    consistency
    and
    coherence
}
end
for
    return N = NS, NO, NA, NP
\\`\\`\\`

### 4.3.3 Evaluation

The effectiveness of these automated approaches can be evaluated using topic coherence assessment metrics (Stammbach et al., 2023), which measure how semantically meaningful and consistent the identified topics are within the medical context. We will evaluate topic categorization using multiple coherence metrics tailored to the SOAP format. For each category (S, O, A, P), we will calculate normalized pointwise mutual information (NPMI) between key phrases within the same cluster, measuring statistical coherence based on co-occurrence patterns. Semantic coherence is assessed by computing the average cosine similarity between phrase embeddings within each SOAP section using clinical domain-specific models such as ClinicalBERT. This approach evaluates semantic relationships rather than just term co-occurrence. For external validation, we can compare automatically generated SOAP categorizations with a gold standard datasets of manually categorized transcripts like (Zeng et al., 2020) and [Finley et al., 2018](#stammbach2023), calculating precision, recall, and F1 scores for each SOAP section independently.

# 5 Schedule

Our project is divided into several key phases, with estimated time allocations for each. Responsibilities will be distributed among team members based on expertise, and certain tasks will be completed collaboratively.

- **Data Acquisition and Preprocessing (2 weeks)**
  - Collect and clean medical dialogue datasets (MedDialog-EN, Zenodo, MTS-Dialog, and potentially VRBot).
  - Convert all datasets into a common format.
  - Perform spoken language normalization, including paraphrasing colloquial expressions, grounding terms in medical terminology, and handling fillers and pauses.
  - Conduct initial data quality assessment.

- **Key-Phrase Extraction and Topic Categorization (2 weeks)**
  - Implement key-phrase extraction techniques to identify important medical information from transcripts.
  - Apply hierarchical clustering to categorize extracted phrases into SOAP note sections.
  - Tune clustering parameters and evaluate topic coherence using relevant metrics.

- **Doctor Note Generation (1 week)**
  - Develop a model to structure extracted information into SOAP-format doctor notes.
  - Implement summarization techniques to improve coherence and readability.
  - Validate model outputs against human-written notes.

- **Model Evaluation and Error Analysis (3 weeks)**
  - Analyze the performance of generated SOAP notes.
  - Identify common model errors and refine clustering/summarization approaches.
  - Compare results with existing medical documentation methods.

- **Final Report and Documentation (1 week)**
  - Compile findings and results into a structured report.
  - Document methodologies, datasets, and evaluation metrics.
  - Prepare a presentation if required.

# 6 Tools

- LangChain for creating AI agents for steps like spoken language normalization and implementation of RAG
- Vector database like ChromaDB
- Ollama for downloading and running models
- Selenium for any necessary web scraping
- Google Colab for GPUs
- Phi4, a SOTA 14b llm by Microsoft
- Deepseek R1, a SOTA 14b llm by Deepseek with COT
- Sklearn for common ML algorithms like random forest
- UnityHPC and Colab for GPUs

# 7 Estimation of API Credits

We use LLMs in 3 major steps of our pipeline, namely the spoken language normalisation, key phrase extraction and topic categorisation.

Our MedDialog dataset consists of 300,000 transcripts, and we can safely assume 10-20 words per transcript, which translates to roughly 15-20 tokens (courtesy TikTokeniser) Assuming an average of 20 tokens per transcript, and a GPT-4o pricing of $2.5 for every 1M input tokens, we estimate a $15 usage per stage of the pipeline. Since we have three major stages of the pipeline that relies on the usage of LLMs, we incur a total estimated cost of $45.

# References

Falcetta, F. S., De Almeida, F. K., Lemos, J. C. S., Goldim, J. R., and Da Costa, C. A. (2023). <a id="falcetta2023"></a>Automatic documentation of professional health interactions: A systematic review. Artificial Intelligence in Medicine, 137:102487.

Aliero, A., Bashir, S., Aliyu, H., Tafida, A., Kangiwa, B., and Dankolo, N. (2023). <a id="aliero2023"></a>Systematic review on text normalization techniques and its approach to non-standard words. International Journal of Computer Applications, 185:975–8887.

Kapoor, S., Gil, A., Bhaduri, S., Mittal, A., and Mulkar, R. (2024). <a id="kapoor2024"></a>Qualitative insights tool (qualit): Llm enhanced topic modeling.

Khandelwal, T. (2025). <a id="khandelwal2025"></a>Using llm-based approaches to enhance and automate topic labeling.

Wenceslao, S. J. M. C. and Estuar, M. R. J. E. (2019). <a id="wenceslao2019"></a>Using cTAKES to Build a Simple Speech Transcriber Plugin for an EMR. In Proceedings of the 3rd International Conference on Medical and Health Informatics, ICMHI '19, pages 78–86, New York, NY, USA. Association for Computing Machinery.

Khattak, F. K., Jeblee, S., Crampton, N., Mamdani, M., and Rudzicz, F. (2019). <a id="khattak2019"></a>AutoScribe: Extracting Clinically Pertinent Information from Patient-Clinician Dialogues. In MEDINFO 2019: Health and Wellbeing e-Networks for All, pages 1512–1513. IOS Press.

Soltau, H., Wang, M., Shafran, I., and Shafey, L. E. (2021). <a id="soltau2021"></a>Understanding Medical Conversations: Rich Transcription, Confidence Scores & Information Extraction. arXiv:2104.02219 [cs].

Menon, N. G., Shrivastava, A., Bhavana, N. D., and Simon, J. (2021). <a id="menon2021"></a>Deep Learning based Transcribing and Summarizing Clinical Conversations. In 2021 Fifth International Conference on I-SMAC (IoT in Social, Mobile, Analytics and Cloud) (I-SMAC), pages 358–365. ISSN: 2768-0673.

Liu, Z., Salleh, S., Krishnaswamy, P., and Chen, N. (2024). <a id="liu2024"></a>Context Aggregation with Topic-focused Summarization for Personalized Medical Dialogue Generation. In Naumann, T., Ben Abacha, A., Bethard, S., Roberts, K., and Bitterman, D., editors, Proceedings of the 6th Clinical Natural Language Processing Workshop, pages 310–321, Mexico City, Mexico. Association for Computational Linguistics.

Schloss, B. and Konam, S. (2020). <a id="schloss2020"></a>Towards an Automated SOAP Note: Classifying Utterances from Medical Conversations. In Proceedings of the 5th Machine Learning for Healthcare Conference, pages 610–631. PMLR. ISSN: 2640-3498.

Zeng, G., Yang, W., Ju, Z., Yang, Y., Wang, S., Zhang, R., Zhou, M., Zeng, J., Dong, X., Zhang, R., Fang, H., Zhu, P., Chen, S., and Xie, P. (2020). <a id="zeng2020"></a>MedDialog: Large-scale medical dialogue datasets. In Webber, B., Cohn, T., He, Y., and Liu, Y., editors, Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP), pages 9241–9250, Online. Association for Computational Linguistics.

Kazi, N., Kuntz, M., Kanewala, U., and Kahanda, I. (2020). <a id="kazi2020"></a>Dataset for automated medical transcription. The dataset contains transcripts of psychiatric doctor-patient conversations generated for training machine learning models in automated medical transcription.

Ben Abacha, A., Yim, W.-w., Fan, Y., and Lin, T. (2023). <a id="benabacha2023"></a>An empirical study of clinical note generation from doctor-patient encounters. In Proceedings of the 17th Conference of the European Chapter of the Association for Computational Linguistics, pages 2291–2302, Dubrovnik, Croatia. Association for Computational Linguistics.

Li, D., Ren, Z., Ren, P., Chen, Z., Fan, M., Ma, J., and de Rijke, M. (2021). <a id="li2021"></a>Semi-supervised variational reasoning for medical dialogue generation. arXiv preprint arXiv:2105.06071. Accepted by SIGIR 2021.

Stammbach, D., Zouhar, V., Hoyle, A., Sachan, M., and Ash, E. (2023). <a id="stammbach2023"></a>Revisiting automated topic model evaluation with large language models.

Finley, G., Edwards, E., Robinson, A., Brenndoerfer, M., Sadoughi, N., Fone, J., Axtmann, N., Miller, M., and Suendermann-Oeft, D. (2018). <a id="finley2018"></a>An automated medical scribe for documenting clinical encounters. In Liu, Y., Paek, T., and Patwardhan, M., editors, Proceedings of the 2018 Conference of the North American Chapter of the Association for Computational Linguistics: Demonstrations, pages 11–15, New Orleans, Louisiana. Association for Computational Linguistics.
\`
    }
];
Ben Abacha, A., Yim, W.-w., Fan, Y., and Lin, T. (2023). <a id="benabacha2023"></a>An empirical study of clinical note generation from doctor-patient encounters. In Proceedings of the 17th Conference of the European Chapter of the Association for Computational Linguistics, pages 2291–2302, Dubrovnik, Croatia. Association for Computational Linguistics.

Li, D., Ren, Z., Ren, P., Chen, Z., Fan, M., Ma, J., and de Rijke, M. (2021). <a id="li2021"></a>Semi-supervised variational reasoning for medical dialogue generation. arXiv preprint arXiv:2105.06071. Accepted by SIGIR 2021.

Stammbach, D., Zouhar, V., Hoyle, A., Sachan, M., and Ash, E. (2023). <a id="stammbach2023"></a>Revisiting automated topic model evaluation with large language models.

Finley, G., Edwards, E., Robinson, A., Brenndoerfer, M., Sadoughi, N., Fone, J., Axtmann, N., Miller, M., and Suendermann-Oeft, D. (2018). <a id="finley2018"></a>An automated medical scribe for documenting clinical encounters. In Liu, Y., Paek, T., and Patwardhan, M., editors, Proceedings of the 2018 Conference of the North American Chapter of the Association for Computational Linguistics: Demonstrations, pages 11–15, New Orleans, Louisiana. Association for Computational Linguistics.
`
    }
];