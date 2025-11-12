import React from 'react';

import { isNumber, isString } from 'lodash-es';
import { useParams } from 'react-router';

import ErrorComponent from 'components/display/ErrorComponent';

import AuthPageWrapper from 'containers/auth/AuthPageWrapper';
import TeacherClassDetails from 'containers/teacher/TeacherClassDetails';
import TeacherHeader from 'containers/teacher/TeacherHeader';

const ClassDetailsPage = () => {
  const { id } = useParams();

  const classId =
    isString(id) && isNumber(parseInt(id, 10)) ? parseInt(id, 10) : undefined;

  return (
    <AuthPageWrapper isTeacherPage>
      <TeacherHeader />
      {isNumber(classId) ? (
        <TeacherClassDetails classId={classId} />
      ) : (
        <ErrorComponent className="py-10" error="Missing class ID" />
      )}
    </AuthPageWrapper>
  );
};

export default ClassDetailsPage;
