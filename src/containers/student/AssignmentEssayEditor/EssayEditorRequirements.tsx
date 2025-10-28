import React from 'react';

import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  ClipboardList,
  GraduationCap,
  Star,
} from 'lucide-react';

import Badge from 'components/display/Badge';
import Card from 'components/display/Card';
import Divider from 'components/display/Divider';

import type { Assignment, TeacherGrade } from 'types/assignment';

type Props = {
  teacherGrade: TeacherGrade | null;
  assignment: Assignment;
};

const EssayEditorRequirements = ({ teacherGrade, assignment }: Props) => {
  return (
    <div className="space-y-4">
      {/* Teacher Grade - Only show when graded */}
      {!!teacherGrade && (
        <Card
          classes={{
            root: 'border-purple-200 bg-gradient-to-br from-purple-50 to-white !p-4',
            title: 'flex items-center gap-2 text-base',
            children: 'space-y-4',
          }}
          title={
            <>
              <Star className="h-5 w-5 text-purple-600" />
              Your Grade
            </>
          }
        >
          {/* Overall Score */}
          <div className="text-center p-3 bg-white rounded-lg border-2 border-purple-200">
            <p className="text-xs text-muted-foreground mb-1">Final Score</p>
            <p className="text-3xl font-bold text-purple-600">
              {teacherGrade.overallScore}
              <span className="text-lg text-muted-foreground">
                /{teacherGrade.totalPoints}
              </span>
            </p>
            <Badge className="mt-2 bg-purple-600 text-xs">
              {Math.round(
                (teacherGrade.overallScore / teacherGrade.totalPoints) * 100,
              )}
              %
            </Badge>
          </div>

          {/* Criteria Breakdown */}
          <div className="max-h-[400px] overflow-auto">
            <div className="space-y-2 pr-4">
              <h4 className="text-xs font-semibold">Score Breakdown</h4>
              {teacherGrade.criteriaScores.map((criterion, idx) => (
                <div
                  className="p-2 bg-white border rounded text-xs space-y-1.5"
                  key={idx}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{criterion.criteria}</span>
                    <Badge className="text-xs" variant="outline">
                      {criterion.score}/{criterion.maxPoints}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {criterion.feedback}
                  </p>
                </div>
              ))}

              {/* Overall Feedback */}
              <div className="p-2 bg-white border rounded text-xs mt-2">
                <h4 className="font-semibold mb-1.5 flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  Teacher Feedback
                </h4>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  {teacherGrade.overallFeedback}
                </p>
                <Divider className="my-2" />
                <div className="flex flex-col gap-1 text-muted-foreground">
                  <span>Graded by: {teacherGrade.gradedBy}</span>
                  <span>{teacherGrade.gradedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Assignment Prompt */}
      <Card
        classes={{
          children: 'space-y-3',
          title: 'flex items-center gap-2 text-base',
          root: '!p-4',
        }}
        title={
          <>
            <BookOpen className="h-4 w-4" />
            Instructions
          </>
        }
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          {assignment.instructions}
        </p>
      </Card>

      <Card
        classes={{
          children: 'space-y-3',
          title: 'flex items-center gap-2 text-base',
          root: '!p-4',
        }}
        title={
          <>
            <ClipboardList className="h-4 w-4" /> Requirements
          </>
        }
      >
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Word Count:</span>
            <span>
              {assignment.min_word_count}-{assignment.max_word_count}
            </span>
          </div>
        </div>
      </Card>

      {!!assignment.rubrics?.length && (
        <Card
          classes={{
            children: 'space-y-2',
            title: 'flex items-center gap-2 text-base',
            root: '!p-4',
          }}
          title={
            <>
              <Star className="h-4 w-4" />
              Grading Rubric
            </>
          }
        >
          {assignment.rubrics.map((item, index) => (
            <div
              className="flex items-center justify-between text-sm"
              key={index}
            >
              <span className="text-muted-foreground">{item.criteria}</span>
              <Badge className="text-xs" variant="outline">
                {item.points}pts
              </Badge>
            </div>
          ))}
          <Divider />
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Total</span>
            <Badge className="text-xs">
              {assignment.rubrics.reduce(
                (total, item) => total + item.points,
                0,
              )}
              pts
            </Badge>
          </div>
        </Card>
      )}

      {!!assignment.tips?.length && (
        <Card
          classes={{
            children: 'space-y-2',
            title: 'flex items-center gap-2 text-base',
            root: '!p-4',
          }}
          title={
            <>
              <AlertCircle className="h-4 w-4" />
              Writing Tips
            </>
          }
        >
          {assignment.tips.map((tip, index) => (
            <div className="flex items-start gap-2 text-sm" key={index}>
              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-muted-foreground">{tip}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default EssayEditorRequirements;
