import { db } from '$lib/server/db';
import { articles } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const article = await db.query.articles.findFirst({
		where: eq(articles.id, parseInt(params.id))
	});

	if (!article) {
		error(404, {
			message: 'Article not found'
		});
	}

	return { article };
};
