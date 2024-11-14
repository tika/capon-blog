import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { GitHubService } from '$lib/server/github';
import { formatPostAsMarkdown } from '$lib/server/markdown';

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

		const github = new GitHubService();
		const date = new Date();
		const fileName = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;

		await github.createFile({
			path: `posts/${fileName}`,
			content: formatPostAsMarkdown(title, content, userId, date),
			message: `Add blog post: ${title}`
		});

		return new Response(JSON.stringify(post[0]));
	} catch (e) {
		console.error('Failed to create post:', e);
		throw error(500, 'Failed to create post');
	}
};
