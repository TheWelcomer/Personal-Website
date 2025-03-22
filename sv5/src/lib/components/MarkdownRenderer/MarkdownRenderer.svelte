<!-- src/lib/components/MarkdownRenderer/MarkdownRenderer.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { mount } from 'svelte';
    import CodeBlock from '$lib/components/ui/CodeBlock/CodeBlock.svelte';

    export let markdown: string = '';
    export let isDarkMode: boolean = false;

    // State for storing extracted code blocks
    let codeBlocks: Array<{id: string, code: string, lang: string}> = [];
    let processedContent = '';

    // Process markdown when it changes
    $: if (markdown) {
        const result = processMarkdown(markdown);
        processedContent = result.html;
        codeBlocks = result.blocks;
    }

    // Process markdown content and extract code blocks
    function processMarkdown(content: string) {
        if (!content) return { html: '', blocks: [] };

        // Create an array to store code blocks
        const blocks: Array<{id: string, code: string, lang: string}> = [];

        // Extract code blocks and replace with placeholders
        let html = content.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code, index) => {
            const id = `code-block-${index}`;
            blocks.push({
                id,
                code: code.trim(),
                lang: lang || 'text'
            });
            return `<div id="${id}" class="code-block-placeholder my-4"></div>`;
        });

        // Process headings
        html = html.replace(/^# (.+)$/gm, (match, heading) => {
            const id = heading.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return `<h1 id="${id}" class="text-3xl font-bold my-6">${heading}</h1>`;
        });

        html = html.replace(/^## (.+)$/gm, (match, heading) => {
            const id = heading.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return `<h2 id="${id}" class="text-2xl font-bold my-5">${heading}</h2>`;
        });

        html = html.replace(/^### (.+)$/gm, (match, heading) => {
            const id = heading.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return `<h3 id="${id}" class="text-xl font-bold my-4">${heading}</h3>`;
        });

        // Process images - added support for Markdown image syntax
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
            '<img src="$2" alt="$1" class="w-full max-w-full h-auto rounded-lg my-6" loading="lazy" />');

        // Process inline code - removed color classes
        html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded text-sm font-mono">$1</code>');

        // Process bold and italic
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

        // Process links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-500 hover:underline">$1</a>');

        // Process lists - removed color classes
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.+<\/li>\n?)+/g, match => `<ul class="list-disc pl-5 my-4">${match}</ul>`);

        html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$1. $2</li>');
        html = html.replace(/(<li>\d+\..+<\/li>\n?)+/g, match => `<ol class="list-decimal pl-5 my-4">${match}</ol>`);

        // Process blockquotes - removed color classes
        html = html.replace(/^> (.+)$/gm, '<blockquote class="pl-4 border-l-4 border-gray-300 italic my-4">$1</blockquote>');

        // Process horizontal rule
        html = html.replace(/^---$/gm, '<hr class="my-6 border-t border-gray-300">');

        // Process paragraphs (after other elements) - removed color classes
        const paragraphs = html.split(/\n\n+/);
        html = paragraphs.map(p => {
            p = p.trim();
            if (!p) return '';
            if (p.startsWith('<h1') || p.startsWith('<h2') || p.startsWith('<h3') ||
                p.startsWith('<div id="code-block-') || p.startsWith('<ul') || p.startsWith('<ol') ||
                p.startsWith('<blockquote') || p.startsWith('<hr') || p.startsWith('<img')) {
                return p;
            }
            return `<p class="my-4">${p}</p>`;
        }).join('\n\n');

        return { html, blocks };
    }

    // Insert code blocks after DOM is ready
    onMount(() => {
        if (codeBlocks.length) {
            // Set a small delay to ensure the DOM is fully rendered
            setTimeout(() => {
                codeBlocks.forEach(block => {
                    const placeholder = document.getElementById(block.id);
                    if (placeholder) {
                        // Create a new CodeBlock component using Svelte 5's mount function
                        mount(CodeBlock, {
                            target: placeholder,
                            props: {
                                code: block.code,
                                lang: block.lang,
                                theme: isDarkMode ? 'dark-plus' : 'github-light'
                            }
                        });
                    }
                });
            }, 10);
        }
    });
</script>

<div class="markdown-content">
  {@html processedContent}
</div>

<style>
  /* General styling for markdown content */
  :global(.markdown-content h1) {
    margin: 2rem 0 1rem;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2;
    scroll-margin-top: 4rem;
  }

  :global(.markdown-content h2) {
    margin: 1.5rem 0 0.75rem;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.3;
    scroll-margin-top: 4rem;
  }

  :global(.markdown-content h3) {
    margin: 1.25rem 0 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.4;
    scroll-margin-top: 4rem;
  }

  :global(.markdown-content p) {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  :global(.markdown-content blockquote) {
    font-style: italic;
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin: 1.5rem 0;
  }

  :global(.dark .markdown-content blockquote) {
    border-left-color: #4b5563;
  }

  :global(.code-block-placeholder) {
    min-height: 50px;
  }

  /* Added image styling */
  :global(.markdown-content img) {
    margin: 1.5rem 0;
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  :global(.dark .markdown-content img) {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
</style>