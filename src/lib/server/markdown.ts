export function formatArticleAsMarkdown(
	title: string,
	content: string,
	authorId: string,
	date: Date,
	coverImageUrl?: string
) {
	return `---
title: ${title}
author: ${authorId}
date: ${date.toISOString()}
coverImageUrl: ${coverImageUrl}
---

# ${title}

${content}
`;
}
