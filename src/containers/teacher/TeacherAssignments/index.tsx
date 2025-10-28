import React, { useCallback, useState } from 'react';

import { Plus, Search } from 'lucide-react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import Button from 'components/input/Button';
import { Pagination } from 'components/input/Pagination';
import TextInput from 'components/input/TextInput';

import AssignmentCard from 'containers/teacher/TeacherAssignments/AssignmentCard';

import { apiGetAssignments } from 'api/assignment';
import type { TeacherAssignmentListingItem } from 'types/assignment';
import tuple from 'utils/types/tuple';

export function TeacherAssignments() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const { data } = useQuery(
    tuple([
      apiGetAssignments.queryKey,
      { page: 1, limit: 10, filter: searchQuery },
    ]),
    apiGetAssignments,
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
        {data?.value.map(assignment => (
          <AssignmentCard
            assignment={assignment as TeacherAssignmentListingItem}
            key={assignment.id}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
export default TeacherAssignments;
