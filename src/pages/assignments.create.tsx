import React, { useCallback } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import Button from 'components/Button';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import AssignmentEditor from 'containers/teacher/AssignmentCreator';
import TeacherHeader from 'containers/teacher/TeacherHeader';

const CreateAssignmentPage = () => {
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <AuthPageWrapper allowRoles={['teacher', 'admin']}>
      <TeacherHeader />
      <div className="p-6 max-w-5xl mx-auto">
        <Button className="gap-2 mb-4" onClick={onBack} variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Assignments
        </Button>

        <AssignmentEditor onBack={onBack} />
      </div>
    </AuthPageWrapper>
  );
};

export default CreateAssignmentPage;
