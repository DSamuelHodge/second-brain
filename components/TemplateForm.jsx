import React, { useState } from 'react';
import { Button, Input, Select, Textarea } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

const templateTypes = {
  daily: {
    title: 'Daily Note',
    fields: [
      { name: 'date', type: 'date', label: 'Date' },
      { name: 'mainFocus', type: 'text', label: 'Main Focus' },
      { name: 'tasks', type: 'textarea', label: 'Tasks' },
      { name: 'notes', type: 'textarea', label: 'Notes & Ideas' },
    ]
  },
  project: {
    title: 'Project Note',
    fields: [
      { name: 'title', type: 'text', label: 'Project Title' },
      { name: 'objective', type: 'textarea', label: 'Project Objective' },
      { name: 'startDate', type: 'date', label: 'Start Date' },
      { name: 'targetDate', type: 'date', label: 'Target Date' },
      { name: 'deliverables', type: 'textarea', label: 'Key Deliverables' },
      { name: 'tags', type: 'text', label: 'Tags (comma-separated)' },
    ]
  },
  meeting: {
    title: 'Meeting Note',
    fields: [
      { name: 'title', type: 'text', label: 'Meeting Title' },
      { name: 'date', type: 'date', label: 'Date' },
      { name: 'participants', type: 'text', label: 'Participants' },
      { name: 'agenda', type: 'textarea', label: 'Agenda' },
      { name: 'notes', type: 'textarea', label: 'Discussion Notes' },
      { name: 'actionItems', type: 'textarea', label: 'Action Items' },
    ]
  }
};

export const TemplateForm = () => {
  const [type, setType] = useState('daily');
  const [formData, setFormData] = useState({});
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const content = generateMarkdown(type, formData);
      const path = getPath(type, formData);
      
      // Create GitHub issue with content
      await fetch('/api/github/create-note', {
        method: 'POST',
        body: JSON.stringify({ path, content }),
      });

      toast({
        title: 'Success!',
        description: 'Note created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create note',
        variant: 'destructive',
      });
    }
  };

  const generateMarkdown = (type, data) => {
    const templates = {
      daily: `---
date: ${data.date}
type: daily-note
---

# Daily Note: ${data.date}

## 🎯 Main Focus
${data.mainFocus}

## 📝 Notes & Ideas
${data.notes}

## 📋 Tasks
${data.tasks}
`,
      project: `---
project: ${data.title}
status: active
start_date: ${data.startDate}
target_date: ${data.targetDate}
tags: [${data.tags}]
---

# ${data.title}

## 🎯 Objective
${data.objective}

## 📋 Key Deliverables
${data.deliverables}
`,
      meeting: `---
title: ${data.title}
date: ${data.date}
participants: [${data.participants}]
---

# Meeting: ${data.title}

## 👥 Participants
${data.participants}

## 🎯 Agenda
${data.agenda}

## 📝 Discussion Notes
${data.notes}

## ✅ Action Items
${data.actionItems}
`
    };
    
    return templates[type];
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">{templateTypes[type].title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Template Type
          </label>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-700 text-white"
          >
            <option value="daily">Daily Note</option>
            <option value="project">Project</option>
            <option value="meeting">Meeting</option>
          </Select>
        </div>

        {templateTypes[type].fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <Textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                className="w-full bg-gray-700 text-white"
                rows={4}
              />
            ) : (
              <Input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                className="w-full bg-gray-700 text-white"
              />
            )}
          </div>
        ))}

        <Button 
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Create Note
        </Button>
      </form>
    </div>
  );
};

export default TemplateForm;