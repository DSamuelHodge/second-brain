---
layout: page
title: Create New Note
nav_order: 2
has_children: false
---

# Create New Note

Use the form below to create a new note using one of the available templates.

<div id="template-form"></div>

<script type="text/javascript">
  // Load React and other dependencies
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/react@17/umd/react.production.min.js';
  document.head.appendChild(script);

  const scriptDOM = document.createElement('script');
  scriptDOM.src = 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js';
  document.head.appendChild(scriptDOM);

  // Load the template form component
  fetch('/components/TemplateForm.jsx')
    .then(response => response.text())
    .then(component => {
      const container = document.getElementById('template-form');
      ReactDOM.render(React.createElement(TemplateForm), container);
    });
</script>

## Available Templates

1. **Daily Note**
   - Track daily tasks and thoughts
   - Record achievements and reflections
   - Plan your day

2. **Project Note**
   - Define project objectives
   - Track deliverables and milestones
   - Organize project resources

3. **Meeting Note**
   - Record attendees and agenda
   - Document discussions and decisions
   - Track action items

## Template Usage Guidelines

1. Choose the appropriate template type
2. Fill in all required fields
3. Add relevant tags for better organization
4. Review before submitting
5. Find your note in the corresponding PARA section