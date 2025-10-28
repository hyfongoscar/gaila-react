import React, { useCallback } from 'react';

import { isNumber, isString, parseInt } from 'lodash-es';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { pathnames } from 'routes';

import Button from 'components/input/Button';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import { AssignmentEssayEditor } from 'containers/student/AssignmentEssayEditor';
import StudentHeader from 'containers/student/StudentHeader';
import AssignmentEditor from 'containers/teacher/AssignmentEditor';

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
      <div className="p-6 max-w-full mx-auto">
        <Button className="gap-2 mb-4" onClick={onBack} variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Assignments
        </Button>

        <AssignmentEssayEditor />
      </div>
    </AuthPageWrapper>
  );
};

export default AssignmentSubmitPage;
