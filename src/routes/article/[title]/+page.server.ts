import { db } from '$lib/server/db';
import { articles } from '$lib/server/db/schema';
import { decodeTitle } from '$lib/utils';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	// Take the params.title and decodeURI
	const title = decodeTitle(params.title);

	// Then look it up in db
	const article = await db.query.articles.findFirst({
		where: eq(articles.title, title)
	});

	if (!article) {
		throw error(404, 'Article not found');
	}

	return {
		article
	};
};
