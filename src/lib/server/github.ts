import { env } from '$env/dynamic/private';

interface GitHubFile {
	path: string;
	content: string;
	message: string;
}

export class GitHubService {
	private baseUrl = 'https://api.github.com';
	private owner: string;
	private repo: string;
	private token: string;

	constructor() {
		this.owner = env.GITHUB_OWNER as string;
		this.repo = env.GITHUB_REPO as string;
		this.token = env.GITHUB_TOKEN as string;

		if (!this.owner || !this.repo || !this.token) {
			throw new Error('GitHub configuration is incomplete');
		}
	}

	async createFile({ path, content, message }: GitHubFile) {
		const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${path}`;

		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${this.token}`,
				'Content-Type': 'application/json',
				Accept: 'application/vnd.github.v3+json',
				'X-GitHub-Api-Version': '2022-11-28'
			},
			body: JSON.stringify({
				message,
				content: Buffer.from(content).toString('base64')
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`GitHub API error: ${error.message}`);
		}

		return response.json();
	}
}
