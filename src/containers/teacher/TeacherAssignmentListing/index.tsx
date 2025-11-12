import React, { useCallback, useState } from 'react';

import { FileText, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import InfiniteList from 'components/display/InfiniteList';
import Button from 'components/input/Button';
import TextInput from 'components/input/TextInput';

import AssignmentCard from 'containers/teacher/TeacherAssignmentListing/AssignmentCard';

import { apiGetAssignments } from 'api/assignment';
import type { TeacherAssignmentListingItem } from 'types/assignment';

export function TeacherAssignmentListing() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputTimer, setSearchInputTimer] = useState<NodeJS.Timeout>();

  const onCreateAssignment = useCallback(() => {
    navigate(pathnames.assignmentCreate());
  }, [navigate]);

  const onTextFilterChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      if (searchInputTimer) {
        clearTimeout(searchInputTimer);
      }

      setSearchInputTimer(
        setTimeout(() => {
          setSearchQuery(value);
        }, 500),
      );
    },
    [searchInputTimer],
  );

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
          onChange={e => onTextFilterChange(e.target.value)}
          value={searchInput}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfiniteList
          emptyPlaceholder={
            !searchQuery ? (
              <div className="text-center py-12 col-span-3">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No assignments match your filters
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find your
                  assignments
                </p>
              </div>
            ) : (
              <div className="text-center py-12 col-span-3">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-lg mb-2">
                  You do not have any assignments yet
                </div>
                <Button
                  className="gap-2 inline-flex"
                  onClick={onCreateAssignment}
                >
                  <Plus className="h-4 w-4" />
                  Create New Assignment
                </Button>
              </div>
            )
          }
          queryFn={apiGetAssignments}
          queryKey={[
            apiGetAssignments.queryKey,
            { page: 1, limit: 10, filter: { search: searchQuery } },
          ]}
          renderItem={assignment => (
            <AssignmentCard
              assignment={assignment as TeacherAssignmentListingItem}
              key={assignment.id}
            />
          )}
        />
      </div>
    </div>
  );
}
export default TeacherAssignmentListing;
