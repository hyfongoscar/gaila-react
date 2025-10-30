import React, { useState } from 'react';

import {
  Bot,
  CheckCircle,
  ClipboardList,
  FileCheck,
  GraduationCap,
  Languages,
  Search,
  Shield,
  Sparkles,
} from 'lucide-react';

import Badge from 'components/display/Badge';
import Card from 'components/display/Card';
import Button from 'components/input/Button';
import TextInput from 'components/input/TextInput';

import useAlert from 'containers/common/AlertProvider/useAlert';

type Props = {
  getEssayContent: () => string;
};

interface DictionaryResult {
  word: string;
  translation: string;
  definition: string;
  examples: string[];
  partOfSpeech: string;
}

interface ChecklistResult {
  type: 'grammar' | 'originality' | 'academic' | 'organization';
  score: number;
  issues: { description: string; severity: 'low' | 'medium' | 'high' }[];
}

interface AutoGradeResult {
  overallScore: number;
  totalPoints: number;
  criteriaScores: {
    criteria: string;
    score: number;
    maxPoints: number;
    feedback: string;
  }[];
  overallFeedback: string;
}

const EssayEditorTools = ({ getEssayContent }: Props) => {
  const { errorMsg } = useAlert();

  // Dictionary state
  const [dictionaryWord, setDictionaryWord] = useState('');
  const [dictionaryResult, setDictionaryResult] =
    useState<DictionaryResult | null>(null);
  const [isLoadingDictionary, setIsLoadingDictionary] = useState(false);

  // Checklist state
  const [checklistResults, setChecklistResults] = useState<ChecklistResult[]>(
    [],
  );
  const [isCheckingGrammar, setIsCheckingGrammar] = useState(false);
  const [isCheckingOriginality, setIsCheckingOriginality] = useState(false);
  const [isCheckingAcademic, setIsCheckingAcademic] = useState(false);
  const [isCheckingOrganization, setIsCheckingOrganization] = useState(false);

  // Auto grading state
  const [autoGradeResult, setAutoGradeResult] =
    useState<AutoGradeResult | null>(null);
  const [isAutoGrading, setIsAutoGrading] = useState(false);
  // Dictionary functions
  const handleDictionarySearch = () => {
    if (!dictionaryWord.trim()) return;

    setIsLoadingDictionary(true);

    // Mock dictionary response
    setTimeout(() => {
      const mockResults: { [key: string]: DictionaryResult } = {
        climate: {
          word: 'climate',
          translation: '气候 (qìhòu)',
          definition:
            'The weather conditions prevailing in an area in general or over a long period.',
          examples: [
            'The climate in this region is tropical and humid.',
            'Climate change is affecting global weather patterns.',
            'Scientists study historical climate data to predict future trends.',
          ],
          partOfSpeech: 'noun',
        },
        emission: {
          word: 'emission',
          translation: '排放 (páifàng)',
          definition:
            'The production and discharge of something, especially gas or radiation.',
          examples: [
            'Carbon emissions from vehicles contribute to air pollution.',
            'The factory reduced its greenhouse gas emissions by 30%.',
            'Countries must limit emissions to combat climate change.',
          ],
          partOfSpeech: 'noun',
        },
      };

      const result = mockResults[dictionaryWord.toLowerCase()] || {
        word: dictionaryWord,
        translation: '示例 (shìlì)',
        definition: 'A representative form or pattern; an example or instance.',
        examples: [
          `This is an example sentence using "${dictionaryWord}".`,
          `The word "${dictionaryWord}" can be used in various contexts.`,
          `Understanding "${dictionaryWord}" helps improve vocabulary.`,
        ],
        partOfSpeech: 'noun',
      };

      setDictionaryResult(result);
      setIsLoadingDictionary(false);
    }, 800);
  };

  // Checklist functions
  const handleCheckGrammar = () => {
    setIsCheckingGrammar(true);
    setTimeout(() => {
      const result: ChecklistResult = {
        type: 'grammar',
        score: 87,
        issues: [
          {
            description:
              "Consider using 'have caused' instead of 'are causing' for consistency",
            severity: 'low',
          },
          {
            description:
              "The phrase 'more frequent and severe' could be 'increasingly frequent and severe'",
            severity: 'low',
          },
          {
            description:
              'Missing comma after introductory phrase in paragraph 2',
            severity: 'medium',
          },
        ],
      };
      setChecklistResults(prev => [
        ...prev.filter(r => r.type !== 'grammar'),
        result,
      ]);
      setIsCheckingGrammar(false);
    }, 1500);
  };

  const handleCheckOriginality = () => {
    setIsCheckingOriginality(true);
    setTimeout(() => {
      const result: ChecklistResult = {
        type: 'originality',
        score: 76,
        issues: [
          {
            description:
              'First paragraph shows 24% similarity to common sources',
            severity: 'high',
          },
          {
            description:
              'Some phrases are commonly used in climate change essays',
            severity: 'medium',
          },
          {
            description: 'Consider paraphrasing to improve originality',
            severity: 'medium',
          },
        ],
      };
      setChecklistResults(prev => [
        ...prev.filter(r => r.type !== 'originality'),
        result,
      ]);
      setIsCheckingOriginality(false);
    }, 2000);
  };

  const handleCheckAcademic = () => {
    setIsCheckingAcademic(true);
    setTimeout(() => {
      const result: ChecklistResult = {
        type: 'academic',
        score: 82,
        issues: [
          {
            description: "Use more formal language instead of 'we see'",
            severity: 'medium',
          },
          {
            description: 'Add more citations to support claims',
            severity: 'high',
          },
          {
            description: 'Consider using more discipline-specific terminology',
            severity: 'low',
          },
        ],
      };
      setChecklistResults(prev => [
        ...prev.filter(r => r.type !== 'academic'),
        result,
      ]);
      setIsCheckingAcademic(false);
    }, 1500);
  };

  const handleCheckOrganization = () => {
    setIsCheckingOrganization(true);
    setTimeout(() => {
      const result: ChecklistResult = {
        type: 'organization',
        score: 91,
        issues: [
          { description: 'Strong thesis statement present', severity: 'low' },
          { description: 'Good paragraph transitions', severity: 'low' },
          {
            description: 'Consider adding a counterargument section',
            severity: 'medium',
          },
        ],
      };
      setChecklistResults(prev => [
        ...prev.filter(r => r.type !== 'organization'),
        result,
      ]);
      setIsCheckingOrganization(false);
    }, 1500);
  };

  const handleAutoGrade = () => {
    const essayContent = getEssayContent();

    if (!essayContent.trim()) {
      errorMsg('Essay is empty');
      return;
    }

    setIsAutoGrading(true);

    // Simulate AI grading
    setTimeout(() => {
      const mockGradeResult: AutoGradeResult = {
        overallScore: 81,
        totalPoints: 100,
        criteriaScores: [
          {
            criteria: 'Thesis and Argument',
            score: 21,
            maxPoints: 25,
            feedback:
              'Strong thesis statement that clearly addresses the prompt. Arguments are well-structured and logical. Consider adding more nuanced counterarguments to strengthen your position.',
          },
          {
            criteria: 'Evidence and Sources',
            score: 19,
            maxPoints: 25,
            feedback:
              'Good use of examples and evidence. However, the essay lacks proper citations. Remember to include at least 5 credible sources with proper MLA formatting to meet requirements.',
          },
          {
            criteria: 'Organization and Structure',
            score: 17,
            maxPoints: 20,
            feedback:
              'Excellent paragraph structure with clear topic sentences. Smooth transitions between ideas. The conclusion could be stronger by providing more concrete calls to action.',
          },
          {
            criteria: 'Writing Quality',
            score: 16,
            maxPoints: 20,
            feedback:
              'Clear and engaging writing style. Good vocabulary usage. Watch for passive voice in some sentences. Vary sentence structure more for better flow.',
          },
          {
            criteria: 'Citations and Format',
            score: 8,
            maxPoints: 10,
            feedback:
              'Format is appropriate but missing in-text citations and a works cited page. Ensure all sources are properly documented in MLA format.',
          },
        ],
        overallFeedback:
          'This is a solid essay with a clear argument and good organization. Your main strengths are the logical structure and engaging writing style. To improve, focus on adding proper citations for all claims, incorporating more scholarly sources, and developing the conclusion with specific actionable recommendations. The essay demonstrates good understanding of the topic but needs more academic rigor in terms of evidence and documentation.',
      };

      setAutoGradeResult(mockGradeResult);
      setIsAutoGrading(false);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {/* Dictionary */}
      <Card
        classes={{
          title: 'flex items-center gap-2 text-base',
          children: 'space-y-3',
          root: '!p-4',
        }}
        title={
          <>
            <Languages className="h-4 w-4" />
            Dictionary
          </>
        }
      >
        <div className="space-y-2">
          <TextInput
            className="text-sm"
            onChange={e => setDictionaryWord(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleDictionarySearch();
              }
            }}
            placeholder="Enter a word..."
            value={dictionaryWord}
          />
        </div>
        <Button
          className="w-full gap-2"
          disabled={isLoadingDictionary}
          onClick={handleDictionarySearch}
          size="sm"
        >
          <Search className="h-4 w-4" />
          {isLoadingDictionary ? 'Searching...' : 'Search'}
        </Button>

        {dictionaryResult && (
          <div className="space-y-2 p-3 bg-secondary rounded-lg text-xs">
            <div>
              <h4 className="font-semibold">{dictionaryResult.word}</h4>
              <p className="text-muted-foreground italic">
                {dictionaryResult.partOfSpeech}
              </p>
            </div>
            <div>
              <p className="font-medium">Translation:</p>
              <p>{dictionaryResult.translation}</p>
            </div>
            <div>
              <p className="font-medium">Definition:</p>
              <p className="text-muted-foreground">
                {dictionaryResult.definition}
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Examples:</p>
              <ul className="space-y-1">
                {dictionaryResult.examples.map((example, idx) => (
                  <li
                    className="text-muted-foreground pl-2 border-l-2 border-primary"
                    key={idx}
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* Checklist */}
      <Card
        classes={{
          title: 'flex items-center gap-2 text-base',
          children: 'space-y-3',
          root: '!p-4',
        }}
        title={
          <>
            <ClipboardList className="h-4 w-4" /> Checklist
          </>
        }
      >
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="gap-1 h-auto py-2 flex-col text-xs"
            disabled={isCheckingGrammar}
            onClick={handleCheckGrammar}
            size="sm"
            variant="outline"
          >
            <CheckCircle className="h-3 w-3" />
            Grammar
          </Button>

          <Button
            className="gap-1 h-auto py-2 flex-col text-xs"
            disabled={isCheckingOriginality}
            onClick={handleCheckOriginality}
            size="sm"
            variant="outline"
          >
            <Shield className="h-3 w-3" />
            Originality
          </Button>

          <Button
            className="gap-1 h-auto py-2 flex-col text-xs"
            disabled={isCheckingAcademic}
            onClick={handleCheckAcademic}
            size="sm"
            variant="outline"
          >
            <GraduationCap className="h-3 w-3" />
            Academic
          </Button>

          <Button
            className="gap-1 h-auto py-2 flex-col text-xs"
            disabled={isCheckingOrganization}
            onClick={handleCheckOrganization}
            size="sm"
            variant="outline"
          >
            <FileCheck className="h-3 w-3" />
            Organization
          </Button>
        </div>

        {checklistResults.length > 0 && (
          <div className="max-h-[300px] overflow-auto">
            <div className="space-y-2 pr-4">
              {checklistResults.map(result => (
                <div
                  className="p-2 border rounded text-xs space-y-1.5"
                  key={result.type}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium capitalize">{result.type}</h4>
                    <Badge
                      className="text-xs"
                      variant={
                        result.score >= 80
                          ? 'primary'
                          : result.score >= 60
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {result.score}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {result.issues.slice(0, 3).map((issue, idx) => (
                      <div className="flex items-start gap-1.5" key={idx}>
                        <span
                          className={`mt-0.5 ${
                            issue.severity === 'high'
                              ? 'text-red-500'
                              : issue.severity === 'medium'
                                ? 'text-yellow-500'
                                : 'text-blue-500'
                          }`}
                        >
                          •
                        </span>
                        <span className="text-muted-foreground leading-tight">
                          {issue.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* AI Auto Grading */}
      <Card
        classes={{
          title: 'flex items-center gap-2 text-base',
          children: 'space-y-3',
          root: '!p-4',
        }}
        title={
          <>
            <Sparkles className="h-4 w-4" /> AI Auto Grading
          </>
        }
      >
        <Button
          className="w-full gap-2"
          disabled={isAutoGrading}
          onClick={handleAutoGrade}
          size="sm"
        >
          <Sparkles className="h-4 w-4" />
          {isAutoGrading ? 'Grading...' : 'Grade My Essay'}
        </Button>

        {autoGradeResult && (
          <div className="max-h-[400px] overflow-auto">
            <div className="space-y-3 pr-4">
              {/* Overall Score */}
              <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Overall Score
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {autoGradeResult.overallScore}
                    <span className="text-sm">
                      /{autoGradeResult.totalPoints}
                    </span>
                  </p>
                  <Badge
                    className="mt-2 text-xs"
                    variant={
                      autoGradeResult.overallScore >= 80
                        ? 'primary'
                        : autoGradeResult.overallScore >= 60
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {autoGradeResult.overallScore >= 80
                      ? 'Excellent'
                      : autoGradeResult.overallScore >= 60
                        ? 'Good'
                        : 'Needs Improvement'}
                  </Badge>
                </div>
              </div>

              {/* Criteria Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold">Score Breakdown</h4>
                {autoGradeResult.criteriaScores.map((criterion, idx) => (
                  <div
                    className="p-2 border rounded text-xs space-y-1.5"
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
              </div>

              {/* Overall Feedback */}
              <div className="p-2 bg-secondary rounded text-xs">
                <h4 className="font-semibold mb-1.5 flex items-center gap-1">
                  <Bot className="h-3 w-3" />
                  Overall Feedback
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {autoGradeResult.overallFeedback}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EssayEditorTools;
