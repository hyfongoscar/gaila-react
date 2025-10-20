import React from 'react';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import useAuth from 'containers/auth/AuthProvider/useAuth';
import StudentHeader from 'containers/student/StudentHeader';

const AnalyticsPage = () => {
  const { role } = useAuth();

  return (
    <AuthPageWrapper>
      {role === 'teacher' ? (
        <></>
      ) : (
        <>
          <StudentHeader />
          Analytics Page
        </>
      )}
    </AuthPageWrapper>
  );
};

export default AnalyticsPage;
