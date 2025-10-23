import React, { useCallback } from 'react';

import { isNumber, isString, parseInt } from 'lodash-es';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { pathnames } from 'routes';

import Button from 'components/Button';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import AssignmentEditor from 'containers/teacher/AssignmentEditor';
import TeacherHeader from 'containers/teacher/TeacherHeader';

const AssignmentEditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const assignmentId =
    isString(id) && isNumber(parseInt(id, 10)) ? parseInt(id, 10) : undefined;

  const onBack = useCallback(() => {
    navigate(pathnames.assignments());
  }, [navigate]);

  return (
    <AuthPageWrapper allowRoles={['teacher', 'admin']}>
      <TeacherHeader />
      <div className="p-6 max-w-5xl mx-auto">
        <Button className="gap-2 mb-4" onClick={onBack} variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Assignments
        </Button>

        <AssignmentEditor assignmentId={assignmentId} onBack={onBack} />
      </div>
    </AuthPageWrapper>
  );
};

export default AssignmentEditPage;
