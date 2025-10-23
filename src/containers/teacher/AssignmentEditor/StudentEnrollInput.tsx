import React, { useCallback, useMemo, useState } from 'react';

import { isNumber } from 'lodash-es';
import { Check, UserPlus, Users, X } from 'lucide-react';
import { useQuery } from 'react-query';

import Badge from 'components/Badge';
import Button from 'components/Button';
import Label from 'components/Label';
import Popover from 'components/Popover';
import Command, { CommandItem } from 'components/Popover/Command';

import { apiGetClassOptions, apiGetStudentOptions } from 'api/user';
import type { ClassOption } from 'types/class';
import type { UserOption } from 'types/user';
import tuple from 'utils/types/tuple';

type Props = {
  viewOnly?: boolean;
  enrolledClasses: ClassOption[];
  setEnrolledClasses: React.Dispatch<React.SetStateAction<ClassOption[]>>;
  enrolledStudents: UserOption[];
  setEnrolledStudents: React.Dispatch<React.SetStateAction<UserOption[]>>;
};

const StudentEnrollInput = ({
  viewOnly,
  enrolledClasses,
  setEnrolledClasses,
  enrolledStudents,
  setEnrolledStudents,
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
    (cls: ClassOption) => {
      if (!enrolledClasses.some(c => c.id === cls.id)) {
        setEnrolledClasses([...enrolledClasses, cls]);
      }
    },
    [enrolledClasses, setEnrolledClasses],
  );

  const handleRemoveClass = useCallback(
    (classId: number) => {
      setEnrolledClasses(enrolledClasses.filter(c => c.id !== classId));
    },
    [enrolledClasses, setEnrolledClasses],
  );

  const handleAddStudent = useCallback(
    (student: UserOption) => {
      if (!enrolledStudents.some(s => s.id === student.id)) {
        setEnrolledStudents([...enrolledStudents, student]);
      }
    },
    [enrolledStudents, setEnrolledStudents],
  );

  const handleRemoveStudent = useCallback(
    (studentId: number) => {
      setEnrolledStudents(enrolledStudents.filter(s => s.id !== studentId));
    },
    [enrolledStudents, setEnrolledStudents],
  );

  const getStudentName = useCallback((student: UserOption) => {
    if (student.first_name && student.last_name) {
      return `${student.first_name} ${student.last_name}`;
    }
    return student.username;
  }, []);

  const totalStudents = useMemo(() => {
    const classStudentsCount = enrolledClasses.reduce((acc, enrolledClass) => {
      const classDetail = availableClasses?.find(
        cls => cls.id === enrolledClass.id,
      );
      return acc + (classDetail?.num_students || 0);
    }, 0);
    const studentCount = enrolledStudents.length;
    return classStudentsCount + studentCount;
  }, [availableClasses, enrolledClasses, enrolledStudents.length]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium after:text-destructive after:content-['*']">
            Student Enrollment
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Assign this essay to classes or individual students
          </p>
        </div>
        <Badge className="gap-1" variant="secondary">
          <Users className="h-3 w-3" />
          {totalStudents} total students
        </Badge>
      </div>
      <div className="space-y-3">
        {!viewOnly && (
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
                {availableClasses?.map(cls => {
                  const isClassAdded = enrolledClasses.some(
                    c => c.id === cls.id,
                  );
                  return (
                    <CommandItem
                      disabled={isClassAdded}
                      key={cls.id}
                      onSelect={() => handleAddClass(cls)}
                      value={cls.name}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          {isClassAdded && <Check className="h-4 w-4" />}
                          <div>
                            <p className="text-sm">{cls.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {cls.num_students}{' '}
                              {cls.num_students === 1 ? 'student' : 'students'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
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
                            {cls.num_students} students
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
                  searchPlaceholder="Search students..."
                >
                  {availableStudents?.map(student => {
                    const isStudentAdded = enrolledStudents.some(
                      s => s.id === student.id,
                    );
                    return (
                      <CommandItem
                        disabled={isStudentAdded}
                        key={student.id}
                        onSelect={() => handleAddStudent(student)}
                        value={getStudentName(student)}
                      >
                        <div className="flex items-center gap-2">
                          {isStudentAdded && <Check className="h-4 w-4" />}
                          <div>
                            <p className="text-sm">{getStudentName(student)}</p>
                          </div>
                        </div>
                      </CommandItem>
                    );
                  })}
                </Command>
              )}
            </Popover>
          </div>
        )}

        {enrolledClasses.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Enrolled Classes
            </Label>
            <div className="space-y-2">
              {enrolledClasses.map(cls => {
                const classInfo = availableClasses?.find(c => c.id === cls.id);
                if (!classInfo) return null;
                return (
                  <div
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                    key={classInfo.id}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{classInfo.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {classInfo.num_students} students
                        </p>
                      </div>
                    </div>
                    {!viewOnly && (
                      <Button
                        onClick={() => handleRemoveClass(classInfo.id)}
                        size="icon"
                        variant="ghost"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
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
              {enrolledStudents.map(student => {
                const studentInfo = availableStudents?.find(
                  s => s.id === student.id,
                );
                if (!studentInfo) return null;
                return (
                  <div
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                    key={studentInfo.id}
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {getStudentName(studentInfo)}
                      </p>
                    </div>
                    {!viewOnly && (
                      <Button
                        onClick={() => handleRemoveStudent(studentInfo.id)}
                        size="icon"
                        variant="ghost"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
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
    </div>
  );
};

export default StudentEnrollInput;
