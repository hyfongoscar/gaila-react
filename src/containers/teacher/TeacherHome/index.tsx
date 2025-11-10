import React from 'react';

import ClassListing from 'containers/teacher/TeacherHome/ClassListing';
import SubmissionListing from 'containers/teacher/TeacherHome/SubmissionListing';

export function TeacherHome() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <ClassListing />
      <SubmissionListing />
    </div>
  );
}

export default TeacherHome;
