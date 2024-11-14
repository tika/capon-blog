import { db } from '$lib/server/db';
import { articles } from '$lib/server/db/schema';
import { GitHubService } from '$lib/server/github';
import { formatArticleAsMarkdown } from '$lib/server/markdown';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function PUT({ params, request, locals }) {
	const { userId } = locals.auth;
	if (!userId) throw error(401, 'Unauthorized');

	const { title, content } = await request.json();
	if (!title?.trim() || !content?.trim()) {
		throw error(400, 'Title and content are required');
	}

	const article = await db.query.articles.findFirst({
		where: eq(articles.id, parseInt(params.id))
	});

	if (!article) throw error(404, 'Article not found');
	if (article.authorId !== userId) throw error(403, 'Forbidden');

	try {
		// Update in database
		const [updated] = await db
			.update(articles)
			.set({ title, content, updatedAt: new Date() })
			.where(eq(articles.id, parseInt(params.id)))
			.returning();

		// Update in GitHub
		const github = new GitHubService();
		const oldPath = `articles/${article.createdAt.getFullYear()}-${String(article.createdAt.getMonth() + 1).padStart(2, '0')}-${String(article.createdAt.getDate()).padStart(2, '0')}-${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
		console.log(oldPath);
		const file = await github.getFile(oldPath);

		if (file) {
			await github.updateFile({
				path: oldPath,
				content: formatArticleAsMarkdown(title, content, userId, article.createdAt),
				message: `Update article: ${title}`,
				sha: file.sha
			});
		}

		return new Response(JSON.stringify(updated));
	} catch (e) {
		console.error('Failed to update article:', e);
		throw error(500, 'Failed to update article');
	}
}

export async function DELETE({ params, locals }) {
	const { userId } = locals.auth;
	if (!userId) throw error(401, 'Unauthorized');

	const article = await db.query.articles.findFirst({
		where: eq(articles.id, parseInt(params.id))
	});

	if (!article) throw error(404, 'Article not found');
	if (article.authorId !== userId) throw error(403, 'Forbidden');

	try {
		// Delete from database
		await db.delete(articles).where(eq(articles.id, parseInt(params.id)));

		// Delete from GitHub
		const github = new GitHubService();
		const path = `articles/${article.createdAt.getFullYear()}-${String(article.createdAt.getMonth() + 1).padStart(2, '0')}-${String(article.createdAt.getDate()).padStart(2, '0')}-${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
		const file = await github.getFile(path);

		if (file) {
			await github.deleteFile({
				path,
				message: `Delete article: ${article.title}`,
				sha: file.sha
			});
		}

		return new Response(null, { status: 204 });
	} catch (e) {
		console.error('Failed to delete article:', e);
		throw error(500, 'Failed to delete article');
	}
}
