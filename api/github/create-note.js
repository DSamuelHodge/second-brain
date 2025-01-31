import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { path, content } = JSON.parse(req.body);
    
    // Create or update file in GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: 'DSamuelHodge',
      repo: 'second-brain',
      path,
      message: `feat: Add note - ${path}`,
      content: Buffer.from(content).toString('base64'),
      branch: 'main'
    });

    res.status(200).json({ message: 'Note created successfully' });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
}