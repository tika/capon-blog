export function formatArticleAsMarkdown(
	title: string,
	content: string,
	authorId: string,
	date: Date
) {
	return `---
title: ${title}
author: ${authorId}
date: ${date.toISOString()}
---

# ${title}

${content}
`;
}
