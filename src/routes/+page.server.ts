import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
	const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

	return {
		posts: allPosts
	};
}; 
