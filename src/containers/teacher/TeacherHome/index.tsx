import React from 'react';

import AssignmentSubmissionListing from 'containers/teacher/AssignmentDetails/AssignmentSubmissionListing';
import ClassListing from 'containers/teacher/TeacherHome/ClassListing';

export function TeacherHome() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <ClassListing />
      <AssignmentSubmissionListing isRecent />
    </div>
  );
}

export default TeacherHome;
