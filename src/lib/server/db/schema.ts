import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	content: text('content').notNull(),
	authorId: varchar('author_id', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
