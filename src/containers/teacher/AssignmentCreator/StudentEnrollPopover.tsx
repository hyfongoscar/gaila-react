import React, { useCallback, useState } from 'react';

import { isNumber } from 'lodash-es';
import { Check, UserPlus, Users, X } from 'lucide-react';
import { useQuery } from 'react-query';

import Button from 'components/Button';
import Label from 'components/Label';
import Popover from 'components/Popover';
import Command, { CommandItem } from 'components/Popover/Command';

import { apiGetClassOptions, apiGetStudentOptions } from 'api/user';
import type { UserOption } from 'types/user';
import tuple from 'utils/types/tuple';

type Props = {
  isEditing?: boolean;
  enrolledClassIds: number[];
  setEnrolledClassIds: React.Dispatch<React.SetStateAction<number[]>>;
  enrolledStudentIds: number[];
  setEnrolledStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const StudentEnrollPopover = ({
  isEditing,
  enrolledClassIds: enrolledClasses,
  setEnrolledClassIds: setEnrolledClasses,
  enrolledStudentIds: enrolledStudents,
  setEnrolledStudentIds: setEnrolledStudents,
}: Props) => {
  const [selectedClassForStudents, setSelectedClassForStudents] = useState<
    number | null
  >(null);

  const { data: availableClasses } = useQuery(
    tuple([apiGetClassOptions.queryKey]),
    apiGetClassOptions,
  );

  const { data: availableStudents } = useQuery(
    tuple([
      apiGetStudentOptions.queryKey,
      { classId: selectedClassForStudents as number },
    ]),
    apiGetStudentOptions,
    { enabled: isNumber(selectedClassForStudents) },
  );

  const handleAddClass = useCallback(
    (classId: number) => {
      if (!enrolledClasses.includes(classId)) {
        setEnrolledClasses([...enrolledClasses, classId]);
      }
    },
    [enrolledClasses, setEnrolledClasses],
  );

  const handleRemoveClass = useCallback(
    (classId: number) => {
      setEnrolledClasses(enrolledClasses.filter(id => id !== classId));
    },
    [enrolledClasses, setEnrolledClasses],
  );

  const handleAddStudent = useCallback(
    (studentId: number) => {
      if (!enrolledStudents.includes(studentId)) {
        setEnrolledStudents([...enrolledStudents, studentId]);
      }
    },
    [enrolledStudents, setEnrolledStudents],
  );

  const handleRemoveStudent = useCallback(
    (studentId: number) => {
      setEnrolledStudents(enrolledStudents.filter(id => id !== studentId));
    },
    [enrolledStudents, setEnrolledStudents],
  );

  const getStudentName = useCallback((student: UserOption) => {
    if (student.firstName && student.lastName) {
      return `${student.firstName} ${student.lastName}`;
    }
    return student.username;
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Popover
          buttonText={
            <>
              <Users className="h-4 w-4" />
              Add Class
            </>
          }
          childClass="w-[300px] p-0"
        >
          <Command
            emptyPlaceholder="No classes found."
            includeSearch
            searchPlaceholder="Search classes..."
          >
            {availableClasses?.map(cls => (
              <CommandItem
                disabled={enrolledClasses.includes(cls.id)}
                key={cls.id}
                onSelect={() => handleAddClass(cls.id)}
                value={cls.name}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {enrolledClasses.includes(cls.id) && (
                      <Check className="h-4 w-4" />
                    )}
                    <div>
                      <p className="text-sm">{cls.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {cls.numStudents}{' '}
                        {cls.numStudents === 1 ? 'student' : 'students'}
                      </p>
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </Command>
        </Popover>

        <Popover
          buttonText={
            <>
              <UserPlus className="h-4 w-4" />
              Add Individual Student
            </>
          }
          childClass="w-[300px] p-0"
        >
          {!selectedClassForStudents ? (
            <Command
              emptyPlaceholder="No classes found."
              includeSearch
              searchPlaceholder="Select a class first..."
            >
              {availableClasses?.map(cls => (
                <CommandItem
                  key={cls.id}
                  onSelect={() => setSelectedClassForStudents(cls.id)}
                  value={cls.name}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{cls.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {cls.numStudents} students
                      </p>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </Command>
          ) : (
            <Command
              emptyPlaceholder="No students found."
              extra={
                <div className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {
                        availableClasses?.find(
                          c => c.id === selectedClassForStudents,
                        )?.name
                      }
                    </span>
                  </div>
                  <Button
                    onClick={() => setSelectedClassForStudents(null)}
                    size="sm"
                    variant="ghost"
                  >
                    Change
                  </Button>
                </div>
              }
              includeSearch
              searchPlaceholder="Select a students first..."
            >
              {availableStudents?.map(student => (
                <CommandItem
                  disabled={enrolledStudents.includes(student.id)}
                  key={student.id}
                  onSelect={() => handleAddStudent(student.id)}
                  value={getStudentName(student)}
                >
                  <div className="flex items-center gap-2">
                    {enrolledStudents.includes(student.id) && (
                      <Check className="h-4 w-4" />
                    )}
                    <div>
                      <p className="text-sm">{getStudentName(student)}</p>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </Command>
          )}
        </Popover>
      </div>

      {enrolledClasses.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Enrolled Classes
          </Label>
          <div className="space-y-2">
            {enrolledClasses.map(classId => {
              const classInfo = availableClasses?.find(c => c.id === classId);
              if (!classInfo) return null;
              return (
                <div
                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                  key={classId}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{classInfo.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {classInfo.numStudents} students
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemoveClass(classId)}
                    size="icon"
                    variant="ghost"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Enrolled Individual Students */}
      {enrolledStudents.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Individual Students
          </Label>
          <div className="space-y-2">
            {enrolledStudents.map(studentId => {
              const student = availableStudents?.find(s => s.id === studentId);
              if (!student) return null;
              return (
                <div
                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                  key={studentId}
                >
                  <div>
                    <p className="text-sm font-medium">
                      {getStudentName(student)}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleRemoveStudent(studentId)}
                    size="icon"
                    variant="ghost"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {enrolledClasses.length === 0 && enrolledStudents.length === 0 && (
        <div className="p-4 border border-dashed rounded-md text-center">
          <p className="text-sm text-muted-foreground">
            No classes or students enrolled yet. Add at least one class or
            student to continue.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentEnrollPopover;
