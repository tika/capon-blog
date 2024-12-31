import { db } from '$lib/server/db';
import { articles } from '$lib/server/db/schema';
import { GitHubService } from '$lib/server/github';
import { formatArticleAsMarkdown } from '$lib/server/markdown';
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

	const { title, content, coverImageUrl } = await request.json();

	if (!title?.trim() || !content?.trim()) {
		throw error(400, 'Title and content are required');
	}

	try {
		const article = await db
			.insert(articles)
			.values({
				title,
				content,
				authorId: userId,
				coverImageUrl
			})
			.returning();

		const github = new GitHubService();
		const date = new Date();
		const fileName = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;

		await github.createFile({
			path: `articles/${fileName}`,
			content: formatArticleAsMarkdown(title, content, userId, date, coverImageUrl),
			message: `Add blog article: ${title}`
		});

		return new Response(JSON.stringify(article[0]));
	} catch (e) {
		console.error('Failed to create article:', e);
		throw error(500, 'Failed to create article');
	}
};
