---
title: Git Commands Reference
category: programming
tags: [git, version-control, reference]
last_updated: 2025-01-30
---

# Git Commands Quick Reference

## Basic Commands

### Initialize and Clone
```bash
# Create new repository
git init

# Clone existing repository
git clone <repository-url>
```

### Daily Workflow
```bash
# Check status
git status

# Stage changes
git add <file>
git add .  # all files

# Commit changes
git commit -m "message"

# Push changes
git push origin main
```

## Branching

### Create and Switch
```bash
# Create new branch
git branch <branch-name>

# Switch to branch
git checkout <branch-name>

# Create and switch in one command
git checkout -b <branch-name>
```

### Merge and Delete
```bash
# Merge branch into current branch
git merge <branch-name>

# Delete branch
git branch -d <branch-name>
```

## Advanced Operations

### Stashing
```bash
# Stash changes
git stash

# List stashes
git stash list

# Apply stash
git stash apply
```

### Remote Operations
```bash
# Add remote
git remote add <name> <url>

# List remotes
git remote -v

# Update remote branches
git fetch <remote>
```

## Best Practices

1. Commit Messages
   - Use present tense
   - Be descriptive
   - Keep it concise

2. Branching Strategy
   - main/master: stable code
   - develop: integration branch
   - feature/: new features
   - hotfix/: urgent fixes

3. Regular Operations
   - Pull before push
   - Keep commits atomic
   - Review changes before commit