import React, { useCallback, useMemo, useState } from 'react';

import dayjs from 'dayjs';
import { isNumber } from 'lodash-es';
import { Eye, Search } from 'lucide-react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import Badge from 'components/display/Badge';
import Card from 'components/display/Card';
import Table from 'components/display/Table';
import Button from 'components/input/Button';
import TextInput from 'components/input/TextInput';

import { apiGetSubmisssionListing } from 'api/assignment';
import type { AssignmentSubmissionListingItem } from 'types/assignment';
import getStageTypeLabel from 'utils/helper/getStageTypeLabel';
import getUserName from 'utils/helper/getUserName';
import tuple from 'utils/types/tuple';

const getStatusBadge = (submission: AssignmentSubmissionListingItem) => {
  if (isNumber(submission.score))
    return <Badge className="bg-green-600">Graded</Badge>;
  if (submission.is_final) return <Badge>Pending</Badge>;
  return <Badge variant="secondary">Draft</Badge>;
};

const AssignmentSubmissionListing = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data } = useQuery(
    tuple([
      apiGetSubmisssionListing.queryKey,
      { assignment_id: 1, page, limit, filter: searchQuery },
    ]),
    apiGetSubmisssionListing,
  );
  const submissions = data?.value;

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      setSearchTimer(
        setTimeout(() => {
          setSearchQuery(value);
          setPage(1);
        }, 500),
      );
    },
    [searchTimer],
  );

  const onViewSubmission = useCallback(
    (id: number) => {
      // FIXME: grading page
      navigate(pathnames.home());
    },
    [navigate],
  );

  const submissionRows = useMemo(() => {
    if (!submissions?.length) {
      return [];
    }
    return submissions.map(submission => ({
      id: submission.id,
      name: getUserName(submission.student),
      stage: getStageTypeLabel(submission.stage),
      status: getStatusBadge(submission),
      submitted_at: dayjs(submission.submitted_at).format('MMM D, YYYY'),
      grade: isNumber(submission.score) ? submission.score : '-',
      action: (
        <Button
          className="inline-flex gap-1"
          onClick={() => onViewSubmission(Number(submission.id))}
          size="sm"
          variant="ghost"
        >
          <Eye className="h-3 w-3" />
          {submission.is_final && !isNumber(submission.score)
            ? 'Grade'
            : 'View'}
        </Button>
      ),
    }));
  }, [submissions, onViewSubmission]);

  return (
    <>
      {/* <Card>
        <div>
          <h3 className="font-medium mb-3">Submission Progress</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Total Students
              </p>
              <p className="text-2xl font-medium">{assignment.totalStudents}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Submitted</p>
              <p className="text-2xl font-medium">{assignment.submitted}</p>
              <div className="mt-2 w-full bg-background rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${getProgressPercentage(assignment.submitted, assignment.totalStudents)}%`,
                  }}
                />
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Graded</p>
              <p className="text-2xl font-medium">{assignment.graded}</p>
              <div className="mt-2 w-full bg-background rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${getProgressPercentage(assignment.graded, assignment.submitted)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div> 
      </Card>*/}
      <Card
        title={
          <div className="flex items-center justify-between">
            <div>Student Submissions</div>
            <div className="relative w-64">
              <TextInput
                className="pl-9"
                icon={<Search className=" h-4 w-4 text-muted-foreground" />}
                label="Search"
                onChange={e => handleSearchChange(e.target.value)}
                value={searchValue}
              />
            </div>
          </div>
        }
      >
        <Table
          className="min-h-[300px]"
          columns={[
            { key: 'name', title: 'Student' },
            { key: 'stage', title: 'Writing Stage' },
            { key: 'status', title: 'Status' },
            { key: 'submitted_at', title: 'Submitted Date' },
            { key: 'grade', title: 'Grade' },
            { key: 'action', title: 'Action', align: 'right' },
          ]}
          count={submissionRows.length}
          limit={limit}
          onPageChange={page => setPage(page + 1)}
          onRowsPerPageChange={setLimit}
          page={page - 1}
          rows={submissionRows.slice((page - 1) * limit, page * limit)}
        />
      </Card>
    </>
  );
};

export default AssignmentSubmissionListing;
