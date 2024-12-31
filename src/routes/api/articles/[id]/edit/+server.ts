import { db } from '$lib/server/db';
import { articles } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ params, locals, request }) {
	const { userId } = locals.auth;

	if (!userId) {
		throw error(401, 'Unauthorized');
	}

	const id = parseInt(params.id);
	const { title, content, coverImageUrl } = await request.json();

	if (!title?.trim() || !content?.trim()) {
		throw error(400, 'Title and content are required');
	}

	try {
		const article = await db
			.update(articles)
			.set({
				title,
				content,
				authorId: userId,
				coverImageUrl
			})
			.where(eq(articles.id, id))
			.returning();

		return new Response(JSON.stringify(article[0]));
	} catch (e) {
		console.error('Failed to create article:', e);
		throw error(500, 'Failed to create article');
	}
}
