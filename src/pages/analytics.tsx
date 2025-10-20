import React from 'react';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import useAuth from 'containers/auth/AuthProvider/useAuth';
import StudentHeader from 'containers/student/StudentHeader';
import TeacherHeader from 'containers/teacher/TeacherHeader';

const AnalyticsPage = () => {
  const { role } = useAuth();

  return (
    <AuthPageWrapper>
      {role === 'student' ? (
        <>
          <StudentHeader />
          Analytics Page
        </>
      ) : (
        <>
          <TeacherHeader />
          Analytics Page
        </>
      )}
    </AuthPageWrapper>
  );
};

export default AnalyticsPage;
