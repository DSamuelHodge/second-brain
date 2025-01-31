---
layout: default
title: Create Note
nav_order: 2
permalink: /new-note
---

# Create New Note

{: .important-title }
> Choose a Template
>
> Select the appropriate template for your content type. Each template is designed for specific use cases.

## Available Templates

### Daily Note
For capturing daily thoughts, tasks, and reflections.

```yaml
Type: Daily Note
Used for:
- Daily tasks and goals
- Meeting notes
- Quick thoughts
- Day-end reflections
```

### Project Note
For documenting project details and progress.

```yaml
Type: Project Note
Used for:
- Project objectives
- Milestones
- Resources
- Progress updates
```

### Meeting Note
For recording meeting details and action items.

```yaml
Type: Meeting Note
Used for:
- Attendees
- Agenda items
- Discussion points
- Action items
- Follow-ups
```

## Template Form

<div class="note-form">
<form id="noteForm">
  <div class="form-group">
    <label for="templateType">Template Type</label>
    <select id="templateType" name="templateType" class="form-select">
      <option value="daily">Daily Note</option>
      <option value="project">Project Note</option>
      <option value="meeting">Meeting Note</option>
    </select>
  </div>
  
  <div id="dynamicFields"></div>
  
  <button type="submit" class="btn">Create Note</button>
</form>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const templates = {
    daily: [
      { type: 'date', name: 'date', label: 'Date' },
      { type: 'text', name: 'mainFocus', label: 'Main Focus' },
      { type: 'textarea', name: 'tasks', label: 'Tasks' },
      { type: 'textarea', name: 'notes', label: 'Notes & Ideas' }
    ],
    project: [
      { type: 'text', name: 'title', label: 'Project Title' },
      { type: 'textarea', name: 'objective', label: 'Project Objective' },
      { type: 'date', name: 'startDate', label: 'Start Date' },
      { type: 'date', name: 'targetDate', label: 'Target Date' },
      { type: 'textarea', name: 'deliverables', label: 'Key Deliverables' },
      { type: 'text', name: 'tags', label: 'Tags (comma-separated)' }
    ],
    meeting: [
      { type: 'text', name: 'title', label: 'Meeting Title' },
      { type: 'date', name: 'date', label: 'Date' },
      { type: 'text', name: 'participants', label: 'Participants' },
      { type: 'textarea', name: 'agenda', label: 'Agenda' },
      { type: 'textarea', name: 'notes', label: 'Discussion Notes' },
      { type: 'textarea', name: 'actionItems', label: 'Action Items' }
    ]
  };

  function updateFormFields() {
    const templateType = document.getElementById('templateType').value;
    const dynamicFields = document.getElementById('dynamicFields');
    dynamicFields.innerHTML = '';

    templates[templateType].forEach(field => {
      const formGroup = document.createElement('div');
      formGroup.className = 'form-group';

      const label = document.createElement('label');
      label.htmlFor = field.name;
      label.textContent = field.label;

      let input;
      if (field.type === 'textarea') {
        input = document.createElement('textarea');
        input.className = 'form-control';
      } else {
        input = document.createElement('input');
        input.type = field.type;
        input.className = 'form-control';
      }
      input.id = field.name;
      input.name = field.name;
      input.required = true;

      formGroup.appendChild(label);
      formGroup.appendChild(input);
      dynamicFields.appendChild(formGroup);
    });
  }

  // Add event listeners
  const templateSelect = document.getElementById('templateType');
  templateSelect.addEventListener('change', updateFormFields);

  const noteForm = document.getElementById('noteForm');
  noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      const content = generateMarkdown(formData.get('templateType'), data);
      const path = getNotePath(formData.get('templateType'), data);
      
      // Create GitHub issue
      const response = await createGitHubIssue(path, content);
      
      if (response.ok) {
        e.target.reset();
        updateFormFields();
        alert('Note created successfully!');
      } else {
        throw new Error('Failed to create note');
      }
    } catch (error) {
      alert('Error creating note: ' + error.message);
    }
  });

  // Initialize form
  updateFormFields();
});
</script>

{: .note }
> Note Creation Guidelines
> 1. Choose the appropriate template type
> 2. Fill in all required fields
> 3. Add relevant tags for better organization
> 4. Review before submitting