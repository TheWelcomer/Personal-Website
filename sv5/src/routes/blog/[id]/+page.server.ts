// /src/routes/blog/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Assuming your blog posts are defined in this file
// You'll need to create this file if it doesn't exist
import { BLOG_POSTS } from '$lib/data/blogData';

export const load: PageServerLoad = ({ params }) => {
    try {
        const post = BLOG_POSTS.find(p => String(p.id) === String(params.id));

        if (!post) {
            throw error(404, {
                message: 'Post not found'
            });
        }

        // Get recent articles, sorted by date (newest first)
        const recentArticles = [...BLOG_POSTS]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10) // Limit to 10 most recent articles
            .map(article => ({
                id: article.id,
                title: article.title,
                date: article.date
            }));

        return {
            post,
            totalArticles: BLOG_POSTS.length,
            recentArticles
        };
    } catch (e) {
        console.error('Error in blog post server load:', e);
        throw error(500, {
            message: 'Error loading blog post'
        });
    }
};