import React from 'react';

import { isNumber, isString, parseInt } from 'lodash-es';
import { useParams } from 'react-router';

import ErrorComponent from 'components/display/ErrorComponent';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import AssignmentSubmissionSwitcher from 'containers/student/AssignmentSubmissionSwitcher';
import StudentHeader from 'containers/student/StudentHeader';

const AssignmentSubmitPage = () => {
  const { id } = useParams();

  const assignmentId =
    isString(id) && isNumber(parseInt(id, 10)) ? parseInt(id, 10) : undefined;

  return (
    <AuthPageWrapper allowRoles={['student']}>
      <StudentHeader />
      <div className="p-6 max-w-full mx-auto">
        {isNumber(assignmentId) ? (
          <AssignmentSubmissionSwitcher assignmentId={assignmentId} />
        ) : (
          <ErrorComponent className="py-10" error="Missing assignment ID" />
        )}
      </div>
    </AuthPageWrapper>
  );
};

export default AssignmentSubmitPage;
