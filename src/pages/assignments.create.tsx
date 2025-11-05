import React, { useCallback } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import Button from 'components/input/Button';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import AssignmentEditor from 'containers/teacher/AssignmentEditor';
import TeacherHeader from 'containers/teacher/TeacherHeader';

const AssignmentCreatePage = () => {
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    navigate(pathnames.assignments());
  }, [navigate]);

  return (
    <AuthPageWrapper allowRoles={['teacher', 'admin']}>
      <TeacherHeader />
      <div className="p-6 max-w-full mx-auto mb-10">
        <Button className="gap-2 mb-4" onClick={onBack} variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Assignments
        </Button>

        <AssignmentEditor onBack={onBack} />
      </div>
    </AuthPageWrapper>
  );
};

export default AssignmentCreatePage;
