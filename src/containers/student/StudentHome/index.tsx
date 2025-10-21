import React, { useCallback, useState } from 'react';

import { Clock, Edit, FileText, Filter, Search, SortAsc } from 'lucide-react';

import Badge from 'components/Badge';
import Button from 'components/Button';
import Card from 'components/Card';
import SelectInput from 'components/SelectInput';
import TextInput from 'components/TextInput';

import type { Assignment, StudentAssignment } from 'types/assignment';

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'graded':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'draft':
      return 'Draft';
    case 'graded':
      return 'Graded';
    default:
      return 'Draft';
  }
};

// FIXME: Mock data for essays
const essays: StudentAssignment[] = [
  {
    id: '1',
    title: 'ABC College - Climate Change Impact Essay',
    description:
      'An argumentative essay about environmental issues and their global effects',
    wordCount: 850,
    lastModified: '2 hours ago',
    status: 'in-progress',
    dueDate: '2025-10-20',
  },
  {
    id: '2',
    title: 'Story Writing',
    description: 'Character analysis and themes in the classic tragedy',
    wordCount: 1200,
    lastModified: '1 day ago',
    status: 'graded',
    dueDate: '2025-10-20',
  },
  {
    id: '3',
    title: 'World War II Historical Essay',
    description: 'Causes and consequences of the Second World War',
    wordCount: 450,
    lastModified: '3 days ago',
    status: 'in-progress',
    dueDate: '2025-10-20',
  },
  {
    id: '4',
    title: 'The Geography of Urban Development',
    description:
      'Analysis of urbanization patterns and their environmental impact',
    wordCount: 920,
    lastModified: '5 days ago',
    status: 'in-progress',
    dueDate: '2025-10-20',
  },
  {
    id: '5',
    title: 'Political Philosophy in Modern Democracy',
    description: 'Examining democratic principles and their implementation',
    wordCount: 300,
    lastModified: '1 week ago',
    status: 'in-progress',
    dueDate: '2025-10-20',
  },
  {
    id: '6',
    title: 'The Ethics of Artificial Intelligence',
    description: 'Moral implications of AI development and deployment',
    wordCount: 1100,
    lastModified: '2 weeks ago',
    status: 'in-progress',
    dueDate: '2025-10-20',
  },
];

export function StudentHome() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('modified');

  const hasFilter =
    searchTerm ||
    subjectFilter !== 'all' ||
    statusFilter !== 'all' ||
    sortBy !== 'modified';

  const onEditEssay = useCallback((id: string, status: string) => {
    console.log(id, status);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSubjectFilter('all');
    setStatusFilter('all');
    setSortBy('modified');
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">My Essays</h2>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            Manage your essays and track your writing progress
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card
        className="mb-6"
        title={
          <div className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filter & Search Essays
          </div>
        }
      >
        <TextInput
          className="pl-10"
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
          label="Search"
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <SelectInput
            emptyOption="All Statuses"
            onChange={setStatusFilter}
            options={[
              {
                label: 'Draft',
                value: 'draft',
              },
              {
                label: 'In Progress',
                value: 'in-progress',
              },
              {
                label: 'Completed',
                value: 'completed',
              },
              {
                label: 'Graded',
                value: 'graded',
              },
            ]}
            value={statusFilter}
          />
          <SelectInput
            emptyOption="Sort by"
            onChange={setSortBy}
            options={[
              {
                label: 'Last Modified',
                value: 'modified',
              },
              {
                label: 'Title',
                value: 'title',
              },
              {
                label: 'Subject',
                value: 'subject',
              },
              {
                label: 'Word Count',
                value: 'wordCount',
              },
              {
                label: 'Status',
                value: 'status',
              },
            ]}
            value={sortBy}
          />

          <Button
            className="gap-2 w-full"
            onClick={clearFilters}
            variant="outline"
          >
            <SortAsc className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>

        {(searchTerm ||
          subjectFilter !== 'all' ||
          statusFilter !== 'all' ||
          sortBy !== 'modified') && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Showing {essays.length} of {essays.length} essays
            </p>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge className="text-xs" variant="secondary">
                  Search: &quot;{searchTerm}&quot;
                </Badge>
              )}
              {subjectFilter !== 'all' && (
                <Badge className="text-xs" variant="secondary">
                  Subject: {subjectFilter}
                </Badge>
              )}
              {statusFilter !== 'all' && (
                <Badge className="text-xs" variant="secondary">
                  Status: {getStatusText(statusFilter)}
                </Badge>
              )}
              {sortBy !== 'modified' && (
                <Badge className="text-xs" variant="secondary">
                  Sort: {sortBy}
                </Badge>
              )}
            </div>
          </div>
        )}
      </Card>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {essays.map(essay => (
          <Card
            className="hover:shadow-md transition-shadow"
            description={essay.description}
            footer={
              <Button
                className="flex-1 gap-2 text-sm"
                onClick={() => onEditEssay(essay.id, essay.status)}
                variant="outline"
              >
                <Edit className="h-4 w-4 inline" />
                {essay.status === 'graded' ? 'View' : 'Edit'}
              </Button>
            }
            key={essay.id}
            status={getStatusText(essay.status)}
            statusClass={getStatusClass(essay.status)}
            title={essay.title}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                {essay.wordCount} words
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                {essay.lastModified}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {essays.length === 0 && !hasFilter && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            You are not assigned any essays yet
          </h3>
        </div>
      )}

      {essays.length === 0 && hasFilter && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            No essays match your filters
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters to find your essays
          </p>
          <Button className="gap-2" onClick={clearFilters} variant="outline">
            <SortAsc className="h-4 w-4" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default StudentHome;
