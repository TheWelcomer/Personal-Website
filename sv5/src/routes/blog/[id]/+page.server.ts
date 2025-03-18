// /src/routes/blog/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { BLOG_POSTS } from '$lib/data/blogData';

export const load: PageServerLoad = ({ params }) => {
    try {
        const post = BLOG_POSTS.find(p => String(p.id) === String(params.id));

        if (!post) {
            throw error(404, {
                message: 'Post not found'
            });
        }

        return {
            post
        };
    } catch (e) {
        console.error('Error in blog post server load:', e);
        throw error(500, {
            message: 'Error loading blog post'
        });
    }
};