import { boolean, index, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const posts = pgTable(
	'posts',
	{
		id: serial('id').primaryKey(),
		title: varchar('title', { length: 255 }).notNull(),
		content: text('content').notNull(),
		authorId: varchar('author_id', { length: 255 }).notNull(),
		published: boolean('published').default(false).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	(table) => {
		return {
			authorIdx: index('author_idx').on(table.authorId),
			titleIdx: index('title_idx').on(table.title)
		};
	}
);
