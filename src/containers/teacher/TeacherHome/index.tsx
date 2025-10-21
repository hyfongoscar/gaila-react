import React from 'react';

import ClassListing from 'containers/teacher/TeacherHome/ClassListing';
import ClassStatistics from 'containers/teacher/TeacherHome/ClassStatistics';
import SubmissionListing from 'containers/teacher/TeacherHome/SubmissionListing';

export function TeacherHome() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <ClassListing />
      <ClassStatistics />
      <SubmissionListing />
    </div>
  );
}

export default TeacherHome;
