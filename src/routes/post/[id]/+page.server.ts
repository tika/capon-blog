import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const post = await db.query.posts.findFirst({
		where: eq(posts.id, parseInt(params.id))
	});
  
	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post
	};
};
