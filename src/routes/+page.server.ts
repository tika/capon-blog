import { desc } from 'drizzle-orm';
import { db } from '../lib/server/db';
import { articles } from '../lib/server/db/schema';

export const load = async () => {
	const allArticles = await db.select().from(articles).orderBy(desc(articles.createdAt));

	return {
		articles: allArticles
	};
};
