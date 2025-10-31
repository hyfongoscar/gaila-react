import React, { useCallback, useMemo } from 'react';

import { isNumber, isString, parseInt } from 'lodash-es';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { pathnames } from 'routes';

import ErrorComponent from 'components/display/ErrorComponent';
import Loading from 'components/display/Loading';
import Button from 'components/input/Button';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import { AssignmentEssayEditor } from 'containers/student/AssignmentEssayEditor';
import StudentHeader from 'containers/student/StudentHeader';

import { apiViewAssignmenProgress } from 'api/assignment';
import tuple from 'utils/types/tuple';

const AssignmentSubmitPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const assignmentId =
    isString(id) && isNumber(parseInt(id, 10)) ? parseInt(id, 10) : undefined;

  const onBack = useCallback(() => {
    navigate(pathnames.home());
  }, [navigate]);

  const {
    data: assignmentProgress,
    isLoading,
    error,
  } = useQuery(
    tuple([apiViewAssignmenProgress.queryKey, assignmentId as number]),
    apiViewAssignmenProgress,
    { enabled: isNumber(assignmentId) },
  );

  const ele = useMemo(() => {
    if (isLoading) {
      return <Loading />;
    }
    if (!assignmentId) {
      return <ErrorComponent className="py-10" error="Missing assignment ID" />;
    }
    if (error || !assignmentProgress) {
      return (
        <ErrorComponent
          className="py-10"
          error={error || 'Missing assignment'}
        />
      );
    }
    <AssignmentEssayEditor
      assignmentProgress={assignmentProgress}
      currentStage={0}
    />;
  }, [assignmentId, assignmentProgress, error, isLoading]);

  return (
    <AuthPageWrapper allowRoles={['student']}>
      <StudentHeader />
      <div className="p-6 max-w-full mx-auto">
        <Button className="gap-2 mb-4" onClick={onBack} variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to Assignments
        </Button>
      </div>
      {ele}
    </AuthPageWrapper>
  );
};

export default AssignmentSubmitPage;
