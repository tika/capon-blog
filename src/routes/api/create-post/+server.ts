import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';

export const POST = async ({
	locals,
	request
}: {
	locals: { auth: { userId: string } };
	request: Request;
}) => {
	const { userId } = locals.auth;

	if (!userId) {
		throw error(401, 'Unauthorized');
	}

	const { title, content } = await request.json();

	if (!title?.trim() || !content?.trim()) {
		throw error(400, 'Title and content are required');
	}

	try {
		const post = await db
			.insert(posts)
			.values({
				title,
				content,
				authorId: userId
			})
			.returning();

		return new Response(JSON.stringify(post[0]));
	} catch (e) {
		console.error('Failed to create post:', e);
		throw error(500, 'Failed to create post');
	}
};
