import React from 'react';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import TeacherAssignmentListing from 'containers/teacher/TeacherAssignmentListing';
import TeacherHeader from 'containers/teacher/TeacherHeader';

const AssignmentsPage = () => {
  return (
    <AuthPageWrapper isTeacherPage>
      <TeacherHeader />
      <TeacherAssignmentListing />
    </AuthPageWrapper>
  );
};

export default AssignmentsPage;
