<!-- src/lib/components/ui/CodeBlock/CodeBlock.svelte -->
<script context="module">
  import { createHighlighterCoreSync } from 'shiki/core';
  import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
  // Themes
  import themeDarkPlus from 'shiki/themes/dark-plus.mjs';
  import themeGithubLight from 'shiki/themes/github-light.mjs';
  // Languages
  import console from 'shiki/langs/console.mjs';
  import html from 'shiki/langs/html.mjs';
  import css from 'shiki/langs/css.mjs';
  import js from 'shiki/langs/javascript.mjs';
  import ts from 'shiki/langs/typescript.mjs';
  import svelte from 'shiki/langs/svelte.mjs';
  import markdown from 'shiki/langs/markdown.mjs';
  // Add Scala language support
  import scala from 'shiki/langs/scala.mjs';

  // Create the highlighter with all supported languages
  const shiki = createHighlighterCoreSync({
    engine: createJavaScriptRegexEngine(),
    themes: [themeDarkPlus, themeGithubLight],
    langs: [console, html, css, js, ts, svelte, markdown, scala]
  });
</script>

<script lang="ts">
    import type { CodeBlockProps } from './types';

    export let code: string = '';
    export let lang: CodeBlockProps['lang'] = 'console';
    export let theme: CodeBlockProps['theme'] = 'dark-plus';
    // Base Style Props
    export let base: string = 'overflow-hidden';
    export let rounded: string = 'rounded-lg';
    export let shadow: string = 'shadow-md';
    export let classes: string = '';
    // Pre Style Props
    export let preBase: string = '';
    export let prePadding: string = '[&>pre]:p-4';
    export let preClasses: string = '';

    // Safe language fallback in case of unsupported languages
    function getSafeLanguage(requestedLang: string): string {
        // Define a mapping of language aliases to their supported versions
        const langMap: Record<string, string> = {
            'js': 'javascript',
            'ts': 'typescript',
            'shell': 'console',
            'bash': 'console',
            'text': 'console'
        };

        // Default to 'text' for unknown languages
        if (!requestedLang || requestedLang === '') return 'text';

        // Check if we have a mapping for this language
        const mappedLang = langMap[requestedLang.toLowerCase()];
        if (mappedLang) return mappedLang;

        // Return the original language if it's directly supported
        return requestedLang;
    }

    // Handle code highlighting with error handling
    let generatedHtml = '';
    try {
        // Get a safe language for highlighting
        const safeLang = getSafeLanguage(lang);
        generatedHtml = shiki.codeToHtml(code, { lang: safeLang, theme });
    } catch (error) {
        // Fallback to basic formatting if syntax highlighting fails
        console.warn(`Syntax highlighting failed for language: ${lang}. Falling back to plain text.`, error);
        generatedHtml = `<pre class="p-4 font-mono text-sm"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    }
</script>

<div class="{base} {rounded} {shadow} {classes} {preBase} {prePadding} {preClasses}">
  <!-- Output Shiki's Generated HTML -->
  {@html generatedHtml}
</div>