import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { CheckCircle, FileText, Save } from 'lucide-react';
import { useQuery } from 'react-query';

import Badge from 'components/display/Badge';
import Card from 'components/display/Card';
import ErrorComponent from 'components/display/ErrorComponent';
import Loading from 'components/display/Loading';
import Button from 'components/input/Button';
import Clickable from 'components/input/Clickable';
import TextInput from 'components/input/TextInput';
import Tabs from 'components/navigation/Tabs';

import EssayEditorAIChat from 'containers/student/AssignmentEssayEditor/EssayEditorAIChat';
import EssayEditorInput from 'containers/student/AssignmentEssayEditor/EssayEditorInput';
import EssayEditorRequirements from 'containers/student/AssignmentEssayEditor/EssayEditorRequirements';
import EssayEditorTools from 'containers/student/AssignmentEssayEditor/EssayEditorTools';

import { apiViewAssignmenProgress } from 'api/assignment';
import tuple from 'utils/types/tuple';

interface EssayEditorProps {
  assignmentId: number;
  currentStage: number;
}

type WordCountStatus = {
  color: string;
  text: string;
};

export function AssignmentEssayEditor({
  assignmentId,
  currentStage,
}: EssayEditorProps) {
  const {
    data: assignmentProgress,
    isLoading,
    error,
  } = useQuery(
    tuple([apiViewAssignmenProgress.queryKey, assignmentId]),
    apiViewAssignmenProgress,
  );

  const [assignment, teacherGrade, isGraded] = useMemo(() => {
    const grade = assignmentProgress?.stages[currentStage]?.grade;
    return [assignmentProgress?.assignment, grade, !!grade];
  }, [assignmentProgress, currentStage]);

  const [title, setTitle] = useState('');
  const essayContent = useRef('');
  const [wordCountStatus, setWordCountStatus] = useState<WordCountStatus>({
    color: '',
    text: '',
  });

  const getEssayContent = useCallback(() => {
    return essayContent.current;
  }, []);

  const getWordCountStatus = useCallback(
    (essayContent: string) => {
      const wordCount = essayContent
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0).length;

      const min = assignment?.requirements?.min_word_count || 0;
      const max = assignment?.requirements?.max_word_count || 0;

      if (!min && !max) {
        return {
          color: 'text-gray-600',
          text: `${wordCount} word${wordCount === 1 ? '' : 's'}`,
        };
      }

      if (wordCount < min) {
        return {
          color: 'text-orange-600',
          text: `${wordCount} / ${min}-${max} words (${min - wordCount} more needed)`,
        };
      } else if (wordCount > max) {
        return {
          color: 'text-red-600',
          text: `${wordCount} / ${min}-${max} words (${wordCount - max} over limit)`,
        };
      } else {
        return {
          color: 'text-green-600',
          text: `${wordCount} / ${min}-${max} words (good!)`,
        };
      }
    },
    [
      assignment?.requirements?.max_word_count,
      assignment?.requirements?.min_word_count,
    ],
  );

  const updateWordCountStatus = useCallback(() => {
    setWordCountStatus(getWordCountStatus(essayContent.current));
  }, [essayContent, getWordCountStatus]);

  useEffect(() => {
    if (!assignmentProgress) {
      return;
    }
    const submission = assignmentProgress?.stages[currentStage]?.submissions[0];
    setTitle(submission?.title || '');
    essayContent.current = submission?.essayContent || '';
    setWordCountStatus(getWordCountStatus(submission?.essayContent || ''));
  }, [assignmentProgress, currentStage, getWordCountStatus]);

  const [sidebarWidth, setSidebarWidth] = useState(350);
  const isResizing = useRef(false);

  const handleMouseDown = useCallback(() => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX - 48;
    if (newWidth > 250 && newWidth < 600) {
      setSidebarWidth(newWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (isLoading) {
    return <Loading className="py-10" />;
  }

  if (!assignment || error) {
    return <ErrorComponent error={error || 'No Assignment'} />;
  }

  console.log('rerender');

  return (
    <div className="space-y-6">
      {/* Graded Status Alert */}
      {isGraded && teacherGrade && (
        <Card
          className="border-purple-200 bg-purple-50"
          classes={{
            title: 'flex items-center gap-2 text-base text-purple-900',
          }}
          title={
            <>
              <CheckCircle className="h-5 w-5" />
              Essay Graded
            </>
          }
        >
          <p className="text-sm text-purple-800">
            This essay has been graded by {teacherGrade.gradedBy} on{' '}
            {teacherGrade.gradedDate}. You can view your grade in the
            Requirements tab, but editing and tools are now disabled. You can
            still use the AI Chat for learning purposes.
          </p>
        </Card>
      )}

      <div className="relative flex h-full">
        {/* Main Editor */}
        <Box
          className="space-y-6"
          sx={{ width: `calc(100% - ${sidebarWidth}px)` }}
        >
          <Card
            action={
              <Button className="gap-2 w-full sm:w-auto" disabled={isGraded}>
                <Save className="h-4 w-4" />
                Save
              </Button>
            }
            classes={{
              title: 'flex  gap-4',
            }}
            description={assignment.description}
            title={
              <>
                <FileText className="h-5 w-5" />
                {assignment.title}
              </>
            }
          >
            <TextInput
              className="text-base sm:text-lg font-semibold !mb-4"
              disabled={isGraded}
              label="Essay Title"
              onBlur={updateWordCountStatus}
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Badge
                className={`px-2 py-1 text-xs sm:text-sm ${wordCountStatus.color}`}
                variant="outline"
              >
                {wordCountStatus.text}
              </Badge>

              {!!assignment.due_date && (
                <Badge
                  className="px-2 py-1 text-xs sm:text-sm"
                  variant="outline"
                >
                  Due: {dayjs(assignment.due_date).format('MMM D, YYYY')}
                </Badge>
              )}
            </div>
          </Card>

          <Card
            classes={{ description: 'text-xs text-purple-600' }}
            description={
              isGraded
                ? 'This essay has been graded and can no longer be edited.'
                : null
            }
            title="Essay Content"
          >
            <EssayEditorInput
              essayContent={essayContent}
              isGraded={isGraded}
              updateWordCountStatus={updateWordCountStatus}
            />
          </Card>
        </Box>

        <Clickable
          className="absolute flex justify-center w-8 !cursor-col-resize"
          onMouseDown={handleMouseDown}
        >
          <div className="h-full w-[1px] !bg-gray-200" />
        </Clickable>

        {/* Sidebar with Tabs */}
        <Box className="space-y-6" sx={{ width: sidebarWidth }}>
          <Tabs
            tabs={[
              {
                key: 'requirements',
                title: isGraded ? 'Grade' : 'Requirements',
                content: (
                  <EssayEditorRequirements
                    assignment={assignment}
                    grade={teacherGrade}
                  />
                ),
              },
              {
                key: 'tools',
                title: 'Tools',
                content: <EssayEditorTools getEssayContent={getEssayContent} />,
              },
              {
                key: 'chat',
                title: 'AI Chat',
                content: <EssayEditorAIChat />,
              },
            ]}
          />
        </Box>
      </div>
    </div>
  );
}
