import React, { useCallback, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { CheckCircle, FileText, Save } from 'lucide-react';

import Badge from 'components/display/Badge';
import Card from 'components/display/Card';
import Button from 'components/input/Button';
import Clickable from 'components/input/Clickable';
import TextInput from 'components/input/TextInput';
import Tabs from 'components/navigation/Tabs';

import EssayEditorAIChat from 'containers/student/AssignmentEssayEditor/EssayEditorAIChat';
import EssayEditorRequirements from 'containers/student/AssignmentEssayEditor/EssayEditorRequirements';
import EssayEditorTools from 'containers/student/AssignmentEssayEditor/EssayEditorTools';

import type { Assignment, TeacherGrade } from 'types/assignment';

interface EssayEditorProps {
  essayId?: string;
}

export function AssignmentEssayEditor({ essayId }: EssayEditorProps) {
  const [title, setTitle] = useState('The Impact of Climate Change');
  const [essayContent, setEssayContent] =
    useState(`Climate change represents one of the most pressing challenges of our time. The scientific evidence overwhelmingly demonstrates that human activities are causing unprecedented changes to our planet's climate system.

The primary driver of climate change is the emission of greenhouse gases, particularly carbon dioxide from burning fossil fuels. These emissions trap heat in the atmosphere, leading to global warming and a cascade of environmental effects.

The impacts are already visible around the world. We see rising sea levels threatening coastal communities, more frequent and severe weather events, and shifts in precipitation patterns affecting agriculture and water resources.

However, there is hope. Renewable energy technologies are becoming more efficient and affordable. Many countries are implementing policies to reduce emissions, and individuals are making more sustainable choices in their daily lives.

The transition to a sustainable future requires collective action from governments, businesses, and individuals. We must act now to mitigate the worst effects of climate change and protect our planet for future generations.`);

  const wordCount = essayContent
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Mock assignment data - in real app, this would be fetched based on essayId
  const assignment: Assignment = {
    id: 1,
    title: 'Climate Change Impact Essay',
    due_date: 1761668316000,
    description:
      'Write an argumentative essay analyzing the impact of climate change on global ecosystems and human society.',
    min_word_count: 800,
    max_word_count: 1200,
    rubrics: [
      { criteria: 'Thesis and Argument', description: '', points: 25 },
      { criteria: 'Evidence and Sources', description: '', points: 25 },
      { criteria: 'Organization and Structure', description: '', points: 20 },
      { criteria: 'Writing Quality', description: '', points: 20 },
      { criteria: 'Citations and Format', description: '', points: 10 },
    ],
    tips: [
      'Start with a compelling hook about recent climate events',
      'Use specific data and statistics to support your arguments',
      'Address counterarguments to strengthen your position',
      'Include examples from different geographical regions',
      'Conclude with a call to action or solutions',
    ],
    status: 'in-progress',
    instructions:
      "Human activities have significantly altered Earth's climate system. Write an argumentative essay that examines the major impacts of climate change on both natural ecosystems and human society. Your essay should present a clear thesis, support your arguments with credible evidence, and address potential counterarguments. Consider both current effects and projected future consequences.",
  };

  const isGraded = assignment.status === 'graded';

  // Mock teacher grade - only available when status is "graded"
  const teacherGrade: TeacherGrade | null = isGraded
    ? {
        overallScore: 87,
        totalPoints: 100,
        criteriaScores: [
          {
            criteria: 'Thesis and Argument',
            score: 23,
            maxPoints: 25,
            feedback:
              'Excellent thesis statement with clear, well-developed arguments. Your position is strong and consistently maintained throughout the essay. Great job addressing counterarguments.',
          },
          {
            criteria: 'Evidence and Sources',
            score: 22,
            maxPoints: 25,
            feedback:
              "Good use of credible sources and evidence. You've integrated your sources well into your arguments. Consider adding one or two more recent studies to strengthen your points further.",
          },
          {
            criteria: 'Organization and Structure',
            score: 18,
            maxPoints: 20,
            feedback:
              'Well-organized essay with clear paragraph structure and smooth transitions. The logical flow of ideas is excellent. Minor point: the conclusion could tie back more explicitly to your introduction.',
          },
          {
            criteria: 'Writing Quality',
            score: 17,
            maxPoints: 20,
            feedback:
              'Strong writing with varied sentence structure and appropriate vocabulary. There are a few instances where you could tighten your language and avoid redundancy. Overall, very well written.',
          },
          {
            criteria: 'Citations and Format',
            score: 7,
            maxPoints: 10,
            feedback:
              "MLA format is mostly correct. However, you're missing a few in-text citations (particularly in paragraph 3), and the Works Cited page has some formatting inconsistencies. Please review MLA guidelines for electronic sources.",
          },
        ],
        overallFeedback:
          "This is an excellent essay that demonstrates strong understanding of the topic and effective argumentation skills. Your thesis is clear and well-supported, and your writing is engaging and sophisticated. The main areas for improvement are: 1) Adding more recent scholarly sources, 2) Ensuring all facts have proper citations, and 3) Double-checking MLA formatting in your Works Cited page. You've shown great critical thinking in addressing counterarguments. Keep up the excellent work!",
        gradedBy: 'Ms. Sarah Chan',
        gradedDate: 'October 18, 2025',
      }
    : null;

  const getWordCountStatus = () => {
    const min = assignment.min_word_count || 0;
    const max = assignment.max_word_count || 0;

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
  };

  const wordCountStatus = getWordCountStatus();

  const [sidebarWidth, setSidebarWidth] = useState(350);
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  };

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
  }, []);

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
            <TextInput
              disabled={isGraded}
              multiline
              onChange={e => setEssayContent(e.target.value)}
              placeholder="Start writing your essay here..."
              sx={{
                '& .MuiInputBase-root': {
                  padding: 1.5,
                  borderRadius: 2,
                  minHeight: 600,
                  maxHeight: 'calc(100vh - 300px)',
                  overflow: 'auto',
                  alignItems: 'flex-start',
                  fontSize: 16,
                  resize: 'none',
                },
              }}
              value={essayContent}
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
                    teacherGrade={teacherGrade}
                  />
                ),
              },
              {
                key: 'tools',
                title: 'Tools',
                content: <EssayEditorTools essayContent={essayContent} />,
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
