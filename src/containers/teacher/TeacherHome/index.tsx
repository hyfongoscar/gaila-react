import React, { useState } from 'react';

import {
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Plus,
  Search,
  Users,
} from 'lucide-react';

import Badge from 'components/Badge';
import Button from 'components/Button';
import Card from 'components/Card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'components/Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/Table';
import TextInput from 'components/TextInput';

export function TeacherHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data - expanded for pagination
  const submissions = [
    {
      id: '1',
      studentId: 's1',
      studentName: 'Emma Thompson',
      assignment: 'Climate Change Essay',
      status: 'submitted',
      wordCount: 1050,
      grade: null,
    },
    {
      id: '2',
      studentId: 's2',
      studentName: 'James Chen',
      assignment: 'Shakespeare Analysis',
      status: 'graded',
      wordCount: 980,
      grade: 92,
    },
    {
      id: '3',
      studentId: 's3',
      studentName: 'Sarah Williams',
      assignment: 'Climate Change Essay',
      status: 'submitted',
      wordCount: 1200,
      grade: null,
    },
    {
      id: '4',
      studentId: 's4',
      studentName: 'Michael Rodriguez',
      assignment: 'Climate Change Essay',
      status: 'draft',
      wordCount: 650,
      grade: null,
    },
    {
      id: '5',
      studentId: 's5',
      studentName: 'Jessica Brown',
      assignment: 'Shakespeare Analysis',
      status: 'submitted',
      wordCount: 1150,
      grade: null,
    },
    {
      id: '6',
      studentId: 's6',
      studentName: 'David Kim',
      assignment: 'Historical Event Research',
      status: 'graded',
      wordCount: 890,
      grade: 88,
    },
    {
      id: '7',
      studentId: 's7',
      studentName: 'Maria Garcia',
      assignment: 'Climate Change Essay',
      status: 'graded',
      wordCount: 1020,
      grade: 95,
    },
    {
      id: '8',
      studentId: 's8',
      studentName: 'Alex Johnson',
      assignment: 'Shakespeare Analysis',
      status: 'submitted',
      wordCount: 760,
      grade: null,
    },
    {
      id: '9',
      studentId: 's9',
      studentName: 'Lisa Anderson',
      assignment: 'Scientific Method Report',
      status: 'graded',
      wordCount: 1100,
      grade: 90,
    },
    {
      id: '10',
      studentId: 's10',
      studentName: 'Ryan Martinez',
      assignment: 'Climate Change Essay',
      status: 'submitted',
      wordCount: 950,
      grade: null,
    },
    {
      id: '11',
      studentId: 's11',
      studentName: 'Sophie Taylor',
      assignment: 'Shakespeare Analysis',
      status: 'draft',
      wordCount: 420,
      grade: null,
    },
    {
      id: '12',
      studentId: 's12',
      studentName: 'Nathan Lee',
      assignment: 'Historical Event Research',
      status: 'submitted',
      wordCount: 1180,
      grade: null,
    },
  ];

  const filteredSubmissions = submissions.filter(
    s =>
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.assignment.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

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

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2>Class Overview</h2>
            <p className="text-muted-foreground mt-1">
              Manage assignments and track student progress
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card title="Total Students">
            <p className="text-3xl">32</p>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Pending Reviews
              </div>
            }
          >
            <p className="text-3xl">8</p>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Avg Class Score
              </div>
            }
          >
            <p className="text-3xl">86%</p>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Due This Week
              </div>
            }
          >
            <p className="text-3xl">2</p>
          </Card>
        </div>
      </div>

      {/* Submissions */}
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
                value={searchQuery}
              />
            </div>
          </div>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Words</TableHead>
              <TableHead className="text-right">Grade</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSubmissions.length > 0 ? (
              paginatedSubmissions.map(submission => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.studentName}</TableCell>
                  <TableCell>{submission.assignment}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell className="text-right">
                    {submission.wordCount}
                  </TableCell>
                  <TableCell className="text-right">
                    {submission.grade ? `${submission.grade}%` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button className="gap-1" size="sm" variant="ghost">
                      <Eye className="h-3 w-3" />
                      {submission.status === 'graded' ? 'View' : 'Grade'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="text-center text-muted-foreground"
                  colSpan={6}
                >
                  No submissions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredSubmissions.length)} of{' '}
              {filteredSubmissions.length} submissions
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  page => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                    onClick={() =>
                      setCurrentPage(p => Math.min(totalPages, p + 1))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );
}

export default TeacherHome;
