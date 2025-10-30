import React, { useCallback } from 'react';

import { isNumber, isString, parseInt } from 'lodash-es';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { pathnames } from 'routes';

import ErrorComponent from 'components/display/ErrorComponent';
import Button from 'components/input/Button';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import { AssignmentEssayEditor } from 'containers/student/AssignmentEssayEditor';
import StudentHeader from 'containers/student/StudentHeader';

const AssignmentSubmitPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const assignmentId =
    isString(id) && isNumber(parseInt(id, 10)) ? parseInt(id, 10) : undefined;

  const onBack = useCallback(() => {
    navigate(pathnames.home());
  }, [navigate]);

  return (
    <AuthPageWrapper allowRoles={['student']}>
      <StudentHeader />
      {assignmentId ? (
        <div className="p-6 max-w-full mx-auto">
          <Button className="gap-2 mb-4" onClick={onBack} variant="ghost">
            <ArrowLeft className="h-4 w-4" />
            Back to Assignments
          </Button>

          <AssignmentEssayEditor assignmentId={assignmentId} currentStage={0} />
        </div>
      ) : (
        <ErrorComponent className="py-10" error="Missing assignment ID" />
      )}
    </AuthPageWrapper>
  );
};

export default AssignmentSubmitPage;
