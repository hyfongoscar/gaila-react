import React, { useCallback, useState } from 'react';

import { Calendar, Edit, FileText, Plus, Search } from 'lucide-react';

import Badge from 'components/Badge';
import Button from 'components/Button';
import Card from 'components/Card';
import TextInput from 'components/TextInput';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  totalStudents: number;
  submitted: number;
  graded: number;
  avgScore: number | null;
  status: 'active' | 'upcoming' | 'past';
}

export function TeacherAssignments() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock assignments data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Climate Change Impact Essay',
      description:
        'Write an argumentative essay analyzing the impact of climate change on global ecosystems.',
      dueDate: '2025-10-20',
      totalStudents: 32,
      submitted: 28,
      graded: 24,
      avgScore: 86,
      status: 'active',
    },
    {
      id: '2',
      title: 'Shakespeare Analysis',
      description:
        'Analyze the themes and character development in Romeo and Juliet.',
      dueDate: '2025-10-25',
      totalStudents: 32,
      submitted: 15,
      graded: 15,
      avgScore: 88,
      status: 'active',
    },
    {
      id: '3',
      title: 'Historical Event Research',
      description:
        'Research and write about a significant historical event from the 20th century.',
      dueDate: '2025-11-05',
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
      dueDate: '2025-09-30',
      totalStudents: 32,
      submitted: 32,
      graded: 32,
      avgScore: 84,
      status: 'past',
    },
    {
      id: '5',
      title: 'Scientific Method Report',
      description:
        'Document your experiment using proper scientific methodology.',
      dueDate: '2025-10-15',
      totalStudents: 32,
      submitted: 30,
      graded: 28,
      avgScore: 82,
      status: 'active',
    },
  ];

  const filteredAssignments = assignments.filter(
    a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    if (status === 'active') return <Badge>Active</Badge>;
    if (status === 'upcoming')
      return <Badge variant="secondary">Upcoming</Badge>;
    return <Badge variant="outline">Past Due</Badge>;
  };

  const getProgressPercentage = (submitted: number, total: number) => {
    return Math.round((submitted / total) * 100);
  };

  const onCreateAssignment = useCallback(() => {}, []);
  const onViewAssignment = useCallback((id: string) => {}, []);
  const onEditAssignment = useCallback((id: string) => {}, []);

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

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <TextInput
            className="pl-9"
            label="Search assignments"
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.map(assignment => (
          <Card
            childrenClassName="space-y-4"
            className="hover:shadow-md transition-shadow"
            description={
              <>
                {getStatusBadge(assignment.status)}
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {assignment.description}
                </p>
              </>
            }
            key={assignment.id}
            title={assignment.title}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Submissions</span>
                <span className="font-medium">
                  {assignment.submitted}/{assignment.totalStudents} (
                  {getProgressPercentage(
                    assignment.submitted,
                    assignment.totalStudents,
                  )}
                  %)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${getProgressPercentage(assignment.submitted, assignment.totalStudents)}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Graded</p>
                <p className="text-sm font-medium">
                  {assignment.graded}/{assignment.submitted}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Score</p>
                <p className="text-sm font-medium">
                  {assignment.avgScore ? `${assignment.avgScore}%` : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1 gap-1"
                onClick={() => onViewAssignment(assignment.id)}
                size="sm"
                variant="outline"
              >
                <FileText className="h-3 w-3" />
                View
              </Button>
              <Button
                onClick={() => onEditAssignment(assignment.id)}
                size="sm"
                variant="ghost"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default TeacherAssignments;
