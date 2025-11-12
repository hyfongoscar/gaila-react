import React, { useCallback, useMemo, useState } from 'react';

import dayjs from 'dayjs';
import { ArrowLeft, Eye, Search } from 'lucide-react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import Card from 'components/display/Card';
import ErrorComponent from 'components/display/ErrorComponent';
import Loading from 'components/display/Loading';
import Table from 'components/display/Table';
import Button from 'components/input/Button';
import TextInput from 'components/input/TextInput';

import { apiGetClassDetail } from 'api/class';
import getUserName from 'utils/helper/getUserName';
import tuple from 'utils/types/tuple';

type Props = {
  classId: number;
};

const ASSIGNMENT_TABLE_LIMIT = 5;

const TeacherClassDetails = ({ classId }: Props) => {
  const navigate = useNavigate();

  const [assignmentPage, setAssignmentPage] = useState(0);
  const [assignmentSearch, setAssignmentSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [teacherSearch, setTeacherSearch] = useState('');

  const {
    data: classData,
    isLoading,
    error,
  } = useQuery(
    tuple([apiGetClassDetail.queryKey, { id: classId }]),
    apiGetClassDetail,
  );

  const filteredTeachers = useMemo(() => {
    if (!classData) {
      return [];
    }
    return classData.teachers.filter(s =>
      getUserName(s).toLowerCase().includes(teacherSearch.toLowerCase()),
    );
  }, [classData, teacherSearch]);

  const filteredStudents = useMemo(() => {
    if (!classData) {
      return [];
    }
    return classData.students.filter(s =>
      getUserName(s).toLowerCase().includes(studentSearch.toLowerCase()),
    );
  }, [classData, studentSearch]);

  const filterAssignments = useMemo(() => {
    if (!classData?.assignments) {
      return [];
    }
    return classData.assignments.filter(a =>
      a.title.toLowerCase().includes(assignmentSearch.toLowerCase()),
    );
  }, [assignmentSearch, classData]);

  const handleAssignmentSearchChange = useCallback((value: string) => {
    setAssignmentSearch(value);
    setAssignmentPage(0);
  }, []);

  const onBack = useCallback(() => {
    navigate(pathnames.home());
  }, [navigate]);

  const onViewAssignment = useCallback(
    (id: number) => {
      navigate(pathnames.assignmentView(String(id)));
    },
    [navigate],
  );

  const assignmentRows = useMemo(() => {
    return filterAssignments
      .slice(
        assignmentPage * ASSIGNMENT_TABLE_LIMIT,
        (assignmentPage + 1) * ASSIGNMENT_TABLE_LIMIT,
      )
      .map(assignment => ({
        ...assignment,
        due_date: dayjs(assignment.due_date).format('MMM D,YYYY'),
        action: (
          <Button
            className="inline-flex gap-1"
            onClick={() => onViewAssignment(assignment.id)}
            size="sm"
            variant="ghost"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
        ),
      }));
  }, [assignmentPage, filterAssignments, onViewAssignment]);

  if (isLoading) {
    return <Loading />;
  }

  if (!classData || error) {
    return <ErrorComponent error={error || 'No class data found'} />;
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <Button className="gap-2 mb-4" onClick={onBack} variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Classes
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h2>{classData.name}</h2>
            <p className="text-muted-foreground mt-2">
              {classData.description}
            </p>
          </div>
        </div>
      </div>

      <Card
        className="mb-4"
        title={
          <div className="flex items-center justify-between">
            <span>Assignments</span>
            <div className="relative w-64">
              <TextInput
                className="pl-9"
                icon={<Search className=" h-4 w-4 text-muted-foreground" />}
                label="Search"
                onChange={e => handleAssignmentSearchChange(e.target.value)}
                value={assignmentSearch}
              />
            </div>
          </div>
        }
      >
        <div className="space-y-3">
          <Table
            className="mb-6"
            columns={[
              { key: 'title', title: 'Assignment Title' },
              { key: 'description', title: 'Description' },
              { key: 'due_date', title: 'Due Date' },
              { key: 'action', title: '', align: 'right' },
            ]}
            count={filterAssignments.length}
            limit={ASSIGNMENT_TABLE_LIMIT}
            onPageChange={setAssignmentPage}
            page={assignmentPage}
            placeholder="You don't have any assignments yet"
            rows={assignmentRows}
          />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card
          title={
            <div className="flex items-center justify-between">
              <div>Teachers ({classData.teachers.length})</div>
              <div className="relative w-48">
                <TextInput
                  className="pl-9"
                  icon={<Search className=" h-4 w-4 text-muted-foreground" />}
                  label="Search"
                  onChange={e => setTeacherSearch(e.target.value)}
                  value={teacherSearch}
                />
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map(teacher => (
                <div
                  className="p-2 border rounded hover:bg-accent/50 transition-colors"
                  key={teacher.id}
                >
                  <p className="text-sm">{getUserName(teacher)}</p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-muted-foreground py-4">
                No teachers found
              </div>
            )}
          </div>
        </Card>
        <Card
          title={
            <div className="flex items-center justify-between">
              <div>Students ({classData.students.length})</div>
              <div className="relative w-48">
                <TextInput
                  className="pl-9"
                  icon={<Search className=" h-4 w-4 text-muted-foreground" />}
                  label="Search"
                  onChange={e => setStudentSearch(e.target.value)}
                  value={studentSearch}
                />
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div
                  className="p-2 border rounded hover:bg-accent/50 transition-colors"
                  key={student.id}
                >
                  <p className="text-sm">{getUserName(student)}</p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-muted-foreground py-4">
                No students found
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherClassDetails;
