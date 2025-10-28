import React from 'react';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import useAuth from 'containers/auth/AuthProvider/useAuth';
import StudentHeader from 'containers/student/StudentHeader';
import StudentHome from 'containers/student/StudentHome';
import TeacherHeader from 'containers/teacher/TeacherHeader';
import TeacherHome from 'containers/teacher/TeacherHome';

const HomePage = () => {
  const { role } = useAuth();

  if (!role) {
    return <></>;
  }

  return (
    <AuthPageWrapper>
      {role === 'student' ? (
        <>
          <StudentHeader />
          <StudentHome />
        </>
      ) : (
        <>
          <TeacherHeader />
          <TeacherHome />
        </>
      )}
    </AuthPageWrapper>
  );
};

export default HomePage;
