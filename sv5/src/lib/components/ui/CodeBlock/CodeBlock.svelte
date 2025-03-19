<!-- src/lib/components/ui/CodeBlock/CodeBlock.svelte -->
<script context="module">
  import { createHighlighterCoreSync } from 'shiki/core';
  import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
  import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
  import { codeToHtml } from 'shiki'
  // Themes
  import themeNightOwl from 'shiki/themes/night-owl.mjs';
  // Custom Rainbow Theme
  const rainbowTheme = {
    name: 'rainbow',
    colors: {
      'editor.background': 'rgba(1,22,39,255)',
      'editor.foreground': '#d6deeb'
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: {
          foreground: '#8a8a8a'
        }
      },
      {
        scope: ['constant', 'entity.name.constant', 'variable.other.constant'],
        settings: {
          foreground: '#ff9d00'  // Orange
        }
      },
      {
        scope: 'entity.name.function',
        settings: {
          foreground: '#39c8b0'  // Teal
        }
      },
      {
        scope: 'entity.name.tag',
        settings: {
          foreground: '#ff5c8f'  // Pink
        }
      },
      {
        scope: 'entity.name.class',
        settings: {
          foreground: '#ffcf1a'  // Yellow
        }
      },
      {
        scope: 'entity.other.attribute-name',
        settings: {
          foreground: '#9e86ff'  // Purple
        }
      },
      {
        scope: 'keyword',
        settings: {
          foreground: '#ff5c8f'  // Pink
        }
      },
      {
        scope: ['storage.type', 'storage.modifier'],
        settings: {
          foreground: '#ff5c8f'  // Pink
        }
      },
      {
        scope: 'string',
        settings: {
          foreground: '#7ecf4a'  // Green
        }
      },
      {
        scope: 'variable',
        settings: {
          foreground: '#5bb2ff'  // Blue
        }
      },
      {
        scope: 'variable.parameter',
        settings: {
          foreground: '#ffcf1a'  // Yellow
        }
      },
      {
        scope: 'support.function',
        settings: {
          foreground: '#39c8b0'  // Teal
        }
      },
      {
        scope: 'punctuation',
        settings: {
          foreground: '#abb2bf'  // Light Grey
        }
      },
      {
        scope: 'support.class',
        settings: {
          foreground: '#ffcf1a'  // Yellow
        }
      },
      {
        scope: 'support.type',
        settings: {
          foreground: '#39c8b0'  // Teal
        }
      },
      {
        scope: 'number',
        settings: {
          foreground: '#ff9d00'  // Orange
        }
      }
    ]
  };

  // Languages
  import console from 'shiki/langs/console.mjs';
  import html from 'shiki/langs/html.mjs';
  import css from 'shiki/langs/css.mjs';
  import js from 'shiki/langs/javascript.mjs';
  import ts from 'shiki/langs/typescript.mjs';
  import svelte from 'shiki/langs/svelte.mjs';
  import markdown from 'shiki/langs/markdown.mjs';
  import scala from 'shiki/langs/scala.mjs';
  import python from 'shiki/langs/python.mjs';
  import java from 'shiki/langs/java.mjs';
  import csharp from 'shiki/langs/csharp.mjs';
  import cpp from 'shiki/langs/cpp.mjs';
  import c from 'shiki/langs/c.mjs';
  import go from 'shiki/langs/go.mjs';
  import rust from 'shiki/langs/rust.mjs';
  import ruby from 'shiki/langs/ruby.mjs';
  import php from 'shiki/langs/php.mjs';
  import kotlin from 'shiki/langs/kotlin.mjs';
  import swift from 'shiki/langs/swift.mjs';
  import yaml from 'shiki/langs/yaml.mjs';
  import json from 'shiki/langs/json.mjs';
  import sql from 'shiki/langs/sql.mjs';
  import bash from 'shiki/langs/bash.mjs';
  import dockerfile from 'shiki/langs/dockerfile.mjs';

  // Create the highlighter with all supported languages
  const shiki = createHighlighterCoreSync({
    engine: createJavaScriptRegexEngine(),
    themes: [themeNightOwl, rainbowTheme],
    langs: [
      console, html, css, js, ts, svelte, markdown, scala, python, java,
      csharp, cpp, c, go, rust, ruby, php, kotlin, swift, yaml, json, sql,
      bash, dockerfile
    ]
  });
</script>

<script lang="ts">
    import type { CodeBlockProps } from './types';
    import { onMount } from 'svelte';

    export let code: string = '';
    export let lang: CodeBlockProps['lang'] = 'javascript';
    export let theme: CodeBlockProps['theme'] = 'night-owl';
    // Base Style Props
    export let base: string = 'relative';
    export let rounded: string = 'rounded-lg';
    export let shadow: string = 'shadow-md';
    export let classes: string = '';
    // Pre Style Props
    export let preBase: string = '';
    export let prePadding: string = '[&>pre]:p-4';
    export let preClasses: string = '';

    let copied = false;
    let copyTimeout: NodeJS.Timeout;

    // Copy to clipboard function
    function copyToClipboard() {
        navigator.clipboard.writeText(code).then(() => {
            copied = true;

            // Reset copied state after 2 seconds
            if (copyTimeout) clearTimeout(copyTimeout);
            copyTimeout = setTimeout(() => {
                copied = false;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code:', err);
        });
    }

    onMount(() => {
        return () => {
            if (copyTimeout) clearTimeout(copyTimeout);
        };
    });

    // Safe language fallback in case of unsupported languages
    function getSafeLanguage(requestedLang: string): string {
        // Define a mapping of language aliases to their supported versions
        const langMap: Record<string, string> = {
            // JavaScript family
            'js': 'javascript',
            'javascript': 'javascript',
            'jsx': 'javascript',
            'node': 'javascript',

            // TypeScript family
            'ts': 'typescript',
            'typescript': 'typescript',
            'tsx': 'typescript',

            // Command line
            'shell': 'bash',
            'sh': 'bash',
            'zsh': 'bash',
            'console': 'console',
            'terminal': 'console',
            'cmd': 'console',
            'powershell': 'console',

            // Python family
            'py': 'python',
            'python': 'python',
            'py3': 'python',

            // C family
            'c++': 'cpp',
            'cs': 'csharp',
            'c#': 'csharp',

            // Web technologies
            'markup': 'html',
            'htm': 'html',
            'xml': 'html',
            'scss': 'css',
            'sass': 'css',
            'less': 'css',

            // Data formats
            'yml': 'yaml',
            'toml': 'yaml',

            // Plain text fallback
            'text': 'markdown',
            'plain': 'markdown',
            'txt': 'markdown'
        };

        // Default to 'javascript' for unknown languages or empty strings
        if (!requestedLang || requestedLang === '') return 'javascript';

        // Check if we have a mapping for this language
        const mappedLang = langMap[requestedLang.toLowerCase()];
        if (mappedLang) return mappedLang;

        // Return the original language if it's directly supported
        return requestedLang;
    }

    // Function to add rainbow indentation highlighting
    function highlightIndentation(html) {
        return html.replace(/<span class="line">(.*?)<\/span>/g, (match, content) => {
            // Count leading whitespace accurately
            let leadingSpaces = 0;
            let inTag = false;

            for (let i = 0; i < content.length; i++) {
                const char = content[i];

                if (char === '<') {
                    inTag = true;
                } else if (char === '>') {
                    inTag = false;
                } else if (!inTag) {
                    if (char === ' ' || char === '\t') {
                        leadingSpaces++;
                    } else {
                        // Found a non-whitespace character outside of a tag
                        break;
                    }
                }
            }

            // If we found indentation
            if (leadingSpaces > 0) {
                // Create rainbow spans for each pair of spaces
                let rainbowSpaces = '';
                for (let i = 0; i < leadingSpaces; i += 2) {
                    // Calculate color index - use the same color for each pair of spaces
                    const colorIndex = Math.floor(i / 2) % 8;
                    const colorClass = `rainbow-indent-${colorIndex + 1}`;

                    // Add one or two spaces depending on how many are left
                    if (i + 1 < leadingSpaces) {
                        // Two spaces
                        rainbowSpaces += `<span class="${colorClass}">  </span>`;
                    } else {
                        // One space (last odd space)
                        rainbowSpaces += `<span class="${colorClass}"> </span>`;
                    }
                }

                // Now remove those spaces from the content and replace with our colored spans
                let cleanedContent = '';
                let spaceCount = 0;
                inTag = false;

                for (let i = 0; i < content.length; i++) {
                    const char = content[i];

                    if (char === '<') {
                        inTag = true;
                        cleanedContent += char;
                    } else if (char === '>') {
                        cleanedContent += char;
                        inTag = false;
                    } else if (inTag) {
                        cleanedContent += char;
                    } else {
                        if ((char === ' ' || char === '\t') && spaceCount < leadingSpaces) {
                            // Skip this space as we're replacing it
                            spaceCount++;
                        } else {
                            cleanedContent += char;
                        }
                    }
                }

                return `<span class="line">${rainbowSpaces}${cleanedContent}</span>`;
            }

            return match; // No indentation to process
        });
    }

    // Process HTML with just indentation (removed bracket colorization)
    function processHtml(html) {
        const withIndentation = highlightIndentation(html);
        return withIndentation;
    }

    // Handle code highlighting with error handling
    let generatedHtml = '';
    let processedHtml = '';

    $: {
        try {
            // Get a safe language for highlighting
            const safeLang = getSafeLanguage(lang);
            // Convert theme name to what shiki expects
            const themeToUse = theme === 'rainbow' ? 'rainbow' : 'night-owl';
            generatedHtml = shiki.codeToHtml(code, { lang: safeLang, theme: themeToUse, transformers: [transformerColorizedBrackets({
                    themes: {
                        'my-custom-theme': ['goldenrod', 'blueviolet', 'dodgerblue', 'crimson'],
                    },
                })] });

            // Process HTML for rainbow indentation only
            processedHtml = processHtml(generatedHtml);
        } catch (error) {
            // Fallback to basic formatting if syntax highlighting fails
            console.warn(`Syntax highlighting failed for language: ${lang}. Falling back to plain text.`, error);
            processedHtml = `<pre class="p-4 font-mono text-sm"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
        }
    }
</script>

<div class="{base} {rounded} {shadow} {classes}">
  <!-- Copy button -->
  <button
      class="absolute right-2 top-2 p-2 bg-opacity-70 hover:bg-opacity-100 text-xs font-medium z-10 transition-colors rounded-md {
            copied ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }"
      on:click={copyToClipboard}
  >
    {#if copied}
      Copied!
    {:else}
      Copy
    {/if}
  </button>

  <!-- Code container with horizontal scrolling -->
  <div class="overflow-x-auto {preBase} {prePadding} {preClasses} code-container">
    <!-- Output Shiki's Generated HTML -->
    {@html processedHtml}
  </div>
</div>

<style>
  /* Ensure pre tags have proper scrolling behavior */
  :global(pre) {
    overflow-x: auto;
    white-space: pre;
    word-wrap: normal;
  }

  /* Style scrollbar for better visibility */
  :global(pre::-webkit-scrollbar) {
    height: 8px;
  }

  :global(pre::-webkit-scrollbar-thumb) {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
  }

  :global(pre::-webkit-scrollbar-track) {
    background-color: rgba(229, 231, 235, 0.2);
  }

  /* !* Rainbow indentation color classes - more transparent now *! */
  /* :global(.rainbow-indent-1) { */
  /*   color: transparent !important; */
  /*   background-color: rgba(255, 182, 193, 0.1); !* Light Pink *! */
  /*   border-left: 2px solid rgba(255, 105, 180, 0.2); !* Hot Pink border *! */
  /* } */
  /* :global(.rainbow-indent-2) { */
  /*   color: transparent !important; */
  /*   background-color: rgba(255, 255, 102, 0.1); !* Light Yellow *! */
  /*   border-left: 2px solid rgba(255, 215, 0, 0.2); !* Gold border *! */
  /* } */
  /* :global(.rainbow-indent-3) { */
  /*   color: transparent !important; */
  /*   background-color: rgba(173, 216, 230, 0.1); !* Light Blue *! */
  /*   border-left: 2px solid rgba(30, 144, 255, 0.2); !* Dodger Blue border *! */
  /* } */
  /* :global(.rainbow-indent-4) { */
  /*   color: transparent !important; */
  /*   background-color: rgba(152, 251, 152, 0.1); !* Pale Green *! */
  /*   border-left: 2px solid rgba(50, 205, 50, 0.2); !* Lime Green border *! */
  /* } */
  /* :global(.rainbow-indent-5) { */
  /*   color: transparent !important; */
  /*   background-color: rgba(216, 191, 216, 0.1); !* Thistle *! */
  /*   border-left: 2px solid rgba(147, 112, 219, 0.2); !* Medium Purple border *! */
  /* } */
  /* :global(.rainbow-indent-6) { */
  /*   color: transparent !important; */
  /*   background-color: rgba(255, 160, 122, 0.1); !* Light Salmon *! */
  /*   border-left: 2px solid rgba(255, 69, 0, 0.2); !* Orange Red border *! */
  /* } */
  /* :global(.rainbow-indent-7) { */
  /*   color: transparent !important; */
  /*   background-color: rgba(175, 238, 238, 0.1); !* Pale Turquoise *! */
  /*   border-left: 2px solid rgba(64, 224, 208, 0.2); !* Turquoise border *! */
  /* } */
  /* :global(.rainbow-indent-8) { */
  /*   color: transparent !important; */
  /*   background-color: rgba(211, 211, 211, 0.1); !* Light Gray *! */
  /*   border-left: 2px solid rgba(169, 169, 169, 0.2); !* Dark Gray border *! */
  /* } */

  /* Full-height indentation with continuous vertical lines */
  :global(pre .line) {
    display: inline-block;
    width: 100%;
    position: relative;
    margin: 0px; /* Remove line-height gaps */
  }

  :global(.rainbow-indent-1),
  :global(.rainbow-indent-2),
  :global(.rainbow-indent-3),
  :global(.rainbow-indent-4),
  :global(.rainbow-indent-5),
  :global(.rainbow-indent-6),
  :global(.rainbow-indent-7),
  :global(.rainbow-indent-8) {
    display: inline-block;
    height: calc(100%); /* Compensate for negative margin */
    vertical-align: top;
    position: relative;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    box-sizing: border-box;
  }
</style>