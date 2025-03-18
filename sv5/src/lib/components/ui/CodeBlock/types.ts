// src/lib/components/CodeBlock/types.ts
export interface CodeBlockProps {
    code?: string;
    lang?: 'console' | 'html' | 'css' | 'js' | 'javascript' | 'typescript' | 'ts' | 'svelte' | 'markdown';
    theme?: 'dark-plus' | 'github-light';
    // Base Style Props
    base?: string;
    rounded?: string;
    shadow?: string;
    classes?: string;
    // Pre Style Props
    preBase?: string;
    prePadding?: string;
    preClasses?: string;
}