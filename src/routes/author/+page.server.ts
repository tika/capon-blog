import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { articles } from '../../lib/server/db/schema';

export const load = async ({ params, locals }) => {
	// Get me
	const { userId } = locals.auth;

	// Then look it up in db
	const papers = await db.query.articles.findMany({
		where: eq(articles.authorId, userId as string)
	});

	return {
		articles: papers
	};
};
