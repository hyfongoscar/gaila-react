import React from 'react';

import { CheckCircle, Clock, FileText } from 'lucide-react';

import Card from 'components/Card';

const ClassStatistics = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card title="Total Students">
        <p className="text-3xl">32</p>
      </Card>

      <Card
        title={
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Pending Reviews
          </div>
        }
      >
        <p className="text-3xl">8</p>
      </Card>

      <Card
        title={
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> Avg Class Score
          </div>
        }
      >
        <p className="text-3xl">86%</p>
      </Card>

      <Card
        title={
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Due This Week
          </div>
        }
      >
        <p className="text-3xl">2</p>
      </Card>
    </div>
  );
};

export default ClassStatistics;
