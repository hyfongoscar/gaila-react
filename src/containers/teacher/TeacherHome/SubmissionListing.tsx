import React, { useCallback, useMemo, useState } from 'react';

import { Eye, Search } from 'lucide-react';
import { useQuery } from 'react-query';

import Badge from 'components/Badge';
import Button from 'components/Button';
import Card from 'components/Card';
import Table from 'components/Table';
import TextInput from 'components/TextInput';

import { apiGetClasses } from 'api/class';
import tuple from 'utils/types/tuple';

const SubmissionListing = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  // const { data } = useQuery(
  //   tuple([apiGetClasses.queryKey, { filter: search, page, limit }]),
  //   apiGetClasses,
  // );

  const data = [] as any;

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const getStatusBadge = (status: string) => {
    if (status === 'graded')
      return (
        <Badge className="!bg-green-600" variant="primary">
          Graded
        </Badge>
      );
    if (status === 'submitted') return <Badge variant="primary">Pending</Badge>;
    return <Badge variant="secondary">Draft</Badge>;
  };

  const rows = useMemo(() => {
    if (!data?.value) return [];
    return data.value.map(submission => ({
      ...submission,
      status: getStatusBadge(submission.status),
      grade: submission.grade ? `${submission.grade}%` : '-',
      actions: (
        <Button className="inline-flex gap-1" size="sm" variant="ghost">
          <Eye className="h-3 w-3" />
          {submission.status === 'graded' ? 'View' : 'Grade'}
        </Button>
      ),
    }));
  }, [data?.value]);

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span>Recent Submissions</span>
          <div className="relative w-64">
            <TextInput
              className="pl-9"
              icon={<Search className=" h-4 w-4 text-muted-foreground" />}
              label="Search"
              onChange={e => handleSearchChange(e.target.value)}
              value={search}
            />
          </div>
        </div>
      }
    >
      <Table
        columns={[
          { key: 'studentName', title: 'Student' },
          { key: 'assignment', title: 'Assignment' },
          { key: 'status', title: 'Status' },
          { key: 'wordCount', title: 'Words', align: 'right' },
          { key: 'grade', title: 'Grade', align: 'right' },
          { key: 'actions', title: 'Actions', align: 'right' },
        ]}
        count={data?.count}
        limit={limit}
        onPageChange={setPage}
        onRowsPerPageChange={handleLimitChange}
        page={page - 1}
        rows={rows}
      />
    </Card>
  );
};

export default SubmissionListing;
