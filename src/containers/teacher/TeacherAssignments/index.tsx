import React, { useCallback, useState } from 'react';

import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import Button from 'components/Button';
import TextInput from 'components/TextInput';

import AssignmentCard from 'containers/teacher/TeacherAssignments/AssignmentCard';

import type { TeacherAssignment } from 'types/assignment';

export function TeacherAssignments() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  // Mock assignments data
  const assignments: TeacherAssignment[] = [
    {
      id: '1',
      title: 'Climate Change Impact Essay',
      description:
        'Write an argumentative essay analyzing the impact of climate change on global ecosystems.',
      dueDate: 0,
      totalStudents: 32,
      submitted: 28,
      graded: 24,
      avgScore: 86,
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Shakespeare Analysis',
      description:
        'Analyze the themes and character development in Romeo and Juliet.',
      dueDate: 0,
      totalStudents: 32,
      submitted: 15,
      graded: 15,
      avgScore: 88,
      status: 'in-progress',
    },
    {
      id: '3',
      title: 'Historical Event Research',
      description:
        'Research and write about a significant historical event from the 20th century.',
      dueDate: 0,
      totalStudents: 32,
      submitted: 0,
      graded: 0,
      avgScore: null,
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Personal Narrative Essay',
      description:
        'Write a personal narrative about a transformative experience.',
      dueDate: 0,
      totalStudents: 32,
      submitted: 32,
      graded: 32,
      avgScore: 84,
      status: 'past-due',
    },
    {
      id: '5',
      title: 'Scientific Method Report',
      description:
        'Document your experiment using proper scientific methodology.',
      dueDate: 0,
      totalStudents: 32,
      submitted: 30,
      graded: 28,
      avgScore: 82,
      status: 'in-progress',
    },
  ];

  const filteredAssignments = assignments.filter(
    a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const onCreateAssignment = useCallback(() => {
    navigate(pathnames.assignmentCreate());
  }, [navigate]);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2>Assignments</h2>
            <p className="text-muted-foreground mt-1">
              Manage and track all essay assignments
            </p>
          </div>
          <Button className="gap-2" onClick={onCreateAssignment}>
            <Plus className="h-4 w-4" />
            Create New Assignment
          </Button>
        </div>

        <TextInput
          className="pl-9 w-md"
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
          label="Search assignments"
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.map(assignment => (
          <AssignmentCard assignment={assignment} key={assignment.id} />
        ))}
      </div>
    </div>
  );
}
export default TeacherAssignments;
