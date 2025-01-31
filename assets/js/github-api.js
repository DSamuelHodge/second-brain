async function createGitHubIssue(path, content) {
  const token = localStorage.getItem('github_token');
  if (!token) {
    throw new Error('GitHub token not found. Please set your token in settings.');
  }

  const response = await fetch(`https://api.github.com/repos/DSamuelHodge/second-brain/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Add note: ${path}`,
      content: btoa(content),
      branch: 'main'
    })
  });

  return response;
}

async function saveGitHubToken(token) {
  localStorage.setItem('github_token', token);
}

// Add this to window object for global access
window.createGitHubIssue = createGitHubIssue;
window.saveGitHubToken = saveGitHubToken;