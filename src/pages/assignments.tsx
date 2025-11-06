import React from 'react';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import TeacherAssignments from 'containers/teacher/TeacherAssignments';
import TeacherHeader from 'containers/teacher/TeacherHeader';

const AssignmentsPage = () => {
  return (
    <AuthPageWrapper isTeacherPage>
      <TeacherHeader />
      <TeacherAssignments />
    </AuthPageWrapper>
  );
};

export default AssignmentsPage;
