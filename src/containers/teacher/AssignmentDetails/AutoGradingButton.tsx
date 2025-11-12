import React, { useState } from 'react';

import { Loader2, Sparkles } from 'lucide-react';

import Button from 'components/input/Button';

import useAlert from 'containers/common/AlertProvider/useAlert';

type Props = {
  assignmentId: number;
};

const submissions = [
  {
    id: '1',
    studentId: 's1',
    studentName: 'Emma Thompson',
    status: 'submitted',
    wordCount: 1050,
    grade: null,
    submittedDate: '2025-10-18',
  },
  {
    id: '2',
    studentId: 's2',
    studentName: 'James Chen',
    status: 'graded',
    wordCount: 980,
    grade: 92,
    submittedDate: '2025-10-17',
    feedback:
      'Excellent analysis with strong supporting evidence. Your thesis is clear and well-developed throughout the essay.',
  },
  {
    id: '3',
    studentId: 's3',
    studentName: 'Sarah Williams',
    status: 'submitted',
    wordCount: 1200,
    grade: null,
    submittedDate: '2025-10-19',
  },
  {
    id: '4',
    studentId: 's4',
    studentName: 'Michael Rodriguez',
    status: 'draft',
    wordCount: 650,
    grade: null,
    submittedDate: '',
  },
  {
    id: '5',
    studentId: 's5',
    studentName: 'Jessica Brown',
    status: 'graded',
    wordCount: 1150,
    grade: 88,
    submittedDate: '2025-10-16',
    feedback:
      'Strong argumentation and good use of sources. Minor issues with citation format.',
  },
  {
    id: '6',
    studentId: 's6',
    studentName: 'David Kim',
    status: 'graded',
    wordCount: 890,
    grade: 85,
    submittedDate: '2025-10-15',
    feedback:
      'Good essay overall. Could benefit from more detailed analysis in some sections.',
  },
  {
    id: '7',
    studentId: 's7',
    studentName: 'Maria Garcia',
    status: 'graded',
    wordCount: 1020,
    grade: 95,
    submittedDate: '2025-10-17',
    feedback:
      'Outstanding work! Comprehensive research, excellent writing, and strong critical thinking.',
  },
  {
    id: '8',
    studentId: 's8',
    studentName: 'Alex Johnson',
    status: 'submitted',
    wordCount: 760,
    grade: null,
    submittedDate: '2025-10-18',
  },
  {
    id: '9',
    studentId: 's9',
    studentName: 'Lisa Anderson',
    status: 'graded',
    wordCount: 1100,
    grade: 90,
    submittedDate: '2025-10-16',
    feedback:
      'Well-structured essay with compelling arguments. Excellent integration of sources.',
  },
  {
    id: '10',
    studentId: 's10',
    studentName: 'Ryan Martinez',
    status: 'submitted',
    wordCount: 950,
    grade: null,
    submittedDate: '2025-10-19',
  },
  {
    id: '11',
    studentId: 's11',
    studentName: 'Sophie Taylor',
    status: 'draft',
    wordCount: 420,
    grade: null,
    submittedDate: '',
  },
  {
    id: '12',
    studentId: 's12',
    studentName: 'Nathan Lee',
    status: 'graded',
    wordCount: 1180,
    grade: 87,
    submittedDate: '2025-10-18',
    feedback:
      'Solid essay with good research. Some transitions could be smoother.',
  },
  {
    id: '13',
    studentId: 's13',
    studentName: 'Olivia Martin',
    status: 'submitted',
    wordCount: 1090,
    grade: null,
    submittedDate: '2025-10-19',
  },
  {
    id: '14',
    studentId: 's14',
    studentName: 'Ethan White',
    status: 'graded',
    wordCount: 940,
    grade: 82,
    submittedDate: '2025-10-17',
    feedback:
      'Good effort. Argument could be stronger with more specific evidence.',
  },
  {
    id: '15',
    studentId: 's15',
    studentName: 'Ava Davis',
    status: 'graded',
    wordCount: 1050,
    grade: 91,
    submittedDate: '2025-10-16',
    feedback:
      'Excellent analysis and strong critical thinking. Well-cited sources.',
  },
  {
    id: '16',
    studentId: 's16',
    studentName: 'Noah Wilson',
    status: 'submitted',
    wordCount: 880,
    grade: null,
    submittedDate: '2025-10-18',
  },
  {
    id: '17',
    studentId: 's17',
    studentName: 'Isabella Moore',
    status: 'graded',
    wordCount: 1130,
    grade: 89,
    submittedDate: '2025-10-15',
    feedback: 'Very good work. Strong thesis and well-organized structure.',
  },
  {
    id: '18',
    studentId: 's18',
    studentName: 'Liam Taylor',
    status: 'graded',
    wordCount: 990,
    grade: 84,
    submittedDate: '2025-10-17',
    feedback: 'Good essay. Could benefit from deeper analysis in some areas.',
  },
  {
    id: '19',
    studentId: 's19',
    studentName: 'Mia Anderson',
    status: 'submitted',
    wordCount: 1070,
    grade: null,
    submittedDate: '2025-10-19',
  },
  {
    id: '20',
    studentId: 's20',
    studentName: 'William Thomas',
    status: 'graded',
    wordCount: 1010,
    grade: 86,
    submittedDate: '2025-10-16',
    feedback: 'Well-written with good supporting evidence. Nice work!',
  },
  {
    id: '21',
    studentId: 's21',
    studentName: 'Charlotte Jackson',
    status: 'graded',
    wordCount: 1150,
    grade: 93,
    submittedDate: '2025-10-15',
    feedback:
      'Exceptional essay! Thorough research and compelling arguments throughout.',
  },
  {
    id: '22',
    studentId: 's22',
    studentName: 'Benjamin Harris',
    status: 'submitted',
    wordCount: 920,
    grade: null,
    submittedDate: '2025-10-18',
  },
  {
    id: '23',
    studentId: 's23',
    studentName: 'Amelia Clark',
    status: 'graded',
    wordCount: 1080,
    grade: 88,
    submittedDate: '2025-10-17',
    feedback: 'Strong essay with good analysis. Minor formatting issues.',
  },
  {
    id: '24',
    studentId: 's24',
    studentName: 'Lucas Lewis',
    status: 'graded',
    wordCount: 960,
    grade: 85,
    submittedDate: '2025-10-16',
    feedback: 'Good work overall. Some arguments could be developed further.',
  },
  {
    id: '25',
    studentId: 's25',
    studentName: 'Harper Walker',
    status: 'graded',
    wordCount: 1120,
    grade: 90,
    submittedDate: '2025-10-15',
    feedback: 'Excellent research and writing. Well-structured and persuasive.',
  },
  {
    id: '26',
    studentId: 's26',
    studentName: 'Henry Hall',
    status: 'submitted',
    wordCount: 1040,
    grade: null,
    submittedDate: '2025-10-19',
  },
  {
    id: '27',
    studentId: 's27',
    studentName: 'Evelyn Allen',
    status: 'graded',
    wordCount: 1000,
    grade: 87,
    submittedDate: '2025-10-17',
    feedback: 'Good essay with solid arguments. Citations are well-done.',
  },
  {
    id: '28',
    studentId: 's28',
    studentName: 'Sebastian Young',
    status: 'graded',
    wordCount: 1090,
    grade: 91,
    submittedDate: '2025-10-16',
    feedback: 'Very strong work. Excellent use of evidence to support claims.',
  },
  {
    id: '29',
    studentId: 's29',
    studentName: 'Ella King',
    status: 'draft',
    wordCount: 380,
    grade: null,
    submittedDate: '',
  },
  {
    id: '30',
    studentId: 's30',
    studentName: 'Jack Wright',
    status: 'submitted',
    wordCount: 1160,
    grade: null,
    submittedDate: '2025-10-19',
  },
  {
    id: '31',
    studentId: 's31',
    studentName: 'Scarlett Scott',
    status: 'draft',
    wordCount: 520,
    grade: null,
    submittedDate: '',
  },
  {
    id: '32',
    studentId: 's32',
    studentName: 'Daniel Green',
    status: 'graded',
    wordCount: 1075,
    grade: 89,
    submittedDate: '2025-10-18',
    feedback: 'Strong analytical essay with good source integration.',
  },
];

const AutoGradingButton = ({ assignmentId }: Props) => {
  const { alertMsg, successMsg } = useAlert();

  const [isGrading, setIsGrading] = useState(false);
  const [gradingProgress, setGradingProgress] = useState(0);
  const [showGradingDialog, setShowGradingDialog] = useState(false);

  const handleAutoGrade = async () => {
    setShowGradingDialog(false);
    setIsGrading(true);
    setGradingProgress(0);

    const pendingSubmissions = submissions.filter(
      s => s.status === 'submitted',
    );

    if (pendingSubmissions.length === 0) {
      alertMsg('No pending submissions to grade');
      setIsGrading(false);
      return;
    }

    // Simulate AI grading with progress
    const totalToGrade = pendingSubmissions.length;
    let gradedCount = 0;

    for (const submission of pendingSubmissions) {
      // TODO: api
      gradedCount++;
      setGradingProgress(Math.round((gradedCount / totalToGrade) * 100));
    }

    setIsGrading(false);
    successMsg(
      `Successfully graded ${totalToGrade} submission${totalToGrade > 1 ? 's' : ''} with AI!`,
    );
  };

  const pendingCount = submissions.filter(s => s.status === 'submitted').length;

  return (
    <div>
      {pendingCount > 0 && (
        <Button
          className="gap-2"
          disabled={isGrading}
          onClick={() => setShowGradingDialog(true)}
          variant="outline"
        >
          {isGrading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Grading... {gradingProgress}%
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Auto-Grade with AI ({pendingCount})
            </>
          )}
        </Button>
      )}
      {/* AI Grading Dialog */}
      {/* <AlertDialog onOpenChange={setShowGradingDialog} open={showGradingDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Auto-Grade Pending Submissions with AI?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will automatically grade {pendingCount} pending submission
              {pendingCount > 1 ? 's' : ''} using AI analysis. Each essay will
              receive a grade and detailed feedback based on the assignment
              rubric.
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm">
                  <strong>Note:</strong> AI-generated grades and feedback should
                  be reviewed before finalizing. You can still edit individual
                  grades and feedback after auto-grading.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAutoGrade}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* Grading Progress Overlay */}
      {/* {isGrading && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">AI Grading in Progress...</p>
                <p className="text-sm text-muted-foreground">
                  {gradingProgress}%
                </p>
              </div>
              <Progress className="h-2" value={gradingProgress} />
              <p className="text-sm text-muted-foreground">
                Analyzing submissions and generating feedback...
              </p>
            </div>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
};

export default AutoGradingButton;
