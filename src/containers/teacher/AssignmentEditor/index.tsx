import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { CircleCheckBig, Plus, Save, X } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import Card from 'components/display/Card';
import Divider from 'components/display/Divider';
import ErrorComponent from 'components/display/ErrorComponent';
import Label from 'components/display/Label';
import Button from 'components/input/Button';
import DateTimeInput from 'components/input/DateTimeInput';
import NumberInput from 'components/input/NumberInput';
import SelectInput from 'components/input/SelectInput';
import TextInput from 'components/input/TextInput';

import useAlert from 'containers/common/AlertProvider/useAlert';
import StudentEnrollInput from 'containers/teacher/AssignmentEditor/StudentEnrollInput';

import {
  type AssignmentCreatePayload,
  apiCreateAssignment,
  apiUpdateAssignment,
  apiViewAssignment,
} from 'api/assignment';
import type { RubricItem } from 'types/assignment';
import type { ClassOption } from 'types/class';
import type { UserOption } from 'types/user';
import isObjEmpty from 'utils/helper/isObjEmpty';
import tuple from 'utils/types/tuple';

interface AssignmentCreatorProps {
  assignmentId?: number;
  onBack: () => void;
}

function AssignmentEditor({ assignmentId, onBack }: AssignmentCreatorProps) {
  const navigate = useNavigate();
  const { successMsg, errorMsg } = useAlert();
  const queryClient = useQueryClient();

  const { data: assignmentData, error } = useQuery(
    tuple([apiViewAssignment.queryKey, assignmentId as number]),
    apiViewAssignment,
    {
      enabled: !!assignmentId,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: createAssignment, isLoading: createAssignmentLoading } =
    useMutation(apiCreateAssignment, {
      onSuccess: res => {
        successMsg('Assignment created successfully');
        navigate(pathnames.assignmentEditDetails(String(res.id)));
      },
      onError: error => {
        errorMsg(error);
      },
    });

  const { mutate: updateAssignment, isLoading: updateAssignmentLoading } =
    useMutation(apiUpdateAssignment, {
      onSuccess: async () => {
        successMsg('Assignment saved successfully');
        setEdited(false);
        await queryClient.invalidateQueries([
          apiViewAssignment.queryKey,
          assignmentId as number,
        ]);
      },
      onError: error => {
        errorMsg(error);
      },
    });

  const isEditing = !!assignmentId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [essayType, setEssayType] = useState('argumentative');
  const [instructions, setInsturctions] = useState('');
  const [minWordCount, setMinWordCount] = useState<number | null>(500);
  const [maxWordCount, setMaxWordCount] = useState<number | null>(1000);
  const [dueDate, setDueDate] = useState<number | null>(null);
  const [rubrics, setRubrics] = useState<RubricItem[]>([
    { criteria: 'Content', description: '', points: 7 },
    { criteria: 'Grammar', description: '', points: 7 },
    { criteria: 'Organization', description: '', points: 7 },
  ]);
  const [tips, setTips] = useState<string[]>(['']);
  const [enrolledClasses, setEnrolledClasses] = useState<ClassOption[]>([]);
  const [enrolledStudents, setEnrolledStudents] = useState<UserOption[]>([]);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (!assignmentData) {
      return;
    }

    setTitle(assignmentData.title);
    setDescription(assignmentData.description || '');
    setEssayType(assignmentData.type || '');
    setInsturctions(assignmentData.instructions || '');
    setMinWordCount(assignmentData.requirements?.min_word_count || null);
    setMaxWordCount(assignmentData.requirements?.max_word_count || null);
    setDueDate(assignmentData.due_date || null);
    setRubrics(assignmentData.rubrics || []);
    setEnrolledClasses(assignmentData.enrolled_classes);
    setEnrolledStudents(assignmentData.enrolled_students);
  }, [assignmentData]);

  const handleAddTipsItem = useCallback(() => {
    setTips([...tips, '']);
  }, [tips]);

  const handleRemoveTipsItem = useCallback(
    (index: number) => {
      setTips(tips.filter((_, i) => i !== index));
    },
    [tips],
  );

  const handleTipsChange = useCallback(
    (index: number, value: string) => {
      const newTips = [...tips];
      newTips[index] = value;
      setTips(newTips);
    },
    [tips],
  );

  const handleAddRubricItem = useCallback(() => {
    setRubrics([...rubrics, { criteria: '', description: '', points: 0 }]);
  }, [rubrics]);

  const handleRemoveRubricItem = useCallback(
    (index: number) => {
      setRubrics(rubrics.filter((_, i) => i !== index));
    },
    [rubrics],
  );

  const handleRubricChange = useCallback(
    (index: number, field: keyof RubricItem, value: string | number | null) => {
      const newRubric = [...rubrics];
      let newValue = value;
      if (field === 'points' && newValue === null) {
        newValue = 1;
      }
      newRubric[index] = { ...newRubric[index], [field]: newValue };
      setRubrics(newRubric);
    },
    [rubrics],
  );

  const totalPoints = useMemo(() => {
    return rubrics.reduce((sum, item) => sum + (item.points || 0), 0);
  }, [rubrics]);

  // TODO: not triggering for select box, date input, student enrollment
  const onEdit = useCallback(() => {
    setEdited(true);
  }, []);

  const handleSave = useCallback(() => {
    const assignmentPayload: AssignmentCreatePayload = {
      title,
      description,
      type: essayType,
      instructions,
      requirements: {
        min_word_count: minWordCount,
        max_word_count: maxWordCount,
      },
      due_date: dueDate || undefined,
      rubrics: isObjEmpty(rubrics) ? undefined : rubrics,
      tips: isObjEmpty(tips) ? undefined : tips,
      enrolled_class_ids: enrolledClasses.map(c => c.id),
      enrolled_student_ids: enrolledStudents.map(c => c.id),
    };

    if (isEditing) {
      updateAssignment({
        id: assignmentId as number,
        ...assignmentPayload,
      });
      return;
    }
    createAssignment(assignmentPayload);
  }, [
    assignmentId,
    createAssignment,
    description,
    dueDate,
    enrolledClasses,
    enrolledStudents,
    essayType,
    instructions,
    isEditing,
    maxWordCount,
    minWordCount,
    rubrics,
    tips,
    title,
    updateAssignment,
  ]);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <form
      className="w-full"
      onChange={onEdit}
      onSubmit={e => e.preventDefault()}
    >
      <Card
        classes={{ children: 'space-y-6' }}
        title={isEditing ? 'Edit Assignment' : 'Create New Assignment'}
      >
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" required>
              Assignment Title
            </Label>
            <TextInput
              id="title"
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Unit 4 - Climate Change Impact Essay"
              value={title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" required>
              Description
            </Label>
            <TextInput
              id="description"
              multiline
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of the essay assignment"
              rows={3}
              value={description}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="essayType">Essay Type</Label>
              <SelectInput
                className="w-full"
                fullWidth
                onChange={setEssayType}
                options={[
                  { value: 'argumentative', label: 'Argumentative' },
                  { value: 'narrative', label: 'Narrative' },
                  { value: 'expository', label: 'Expository' },
                  { value: 'descriptive', label: 'Descriptive' },
                ]}
                value={essayType}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" required>
                Due Date
              </Label>
              <DateTimeInput
                onChange={setDueDate}
                type="date"
                value={dueDate}
              />
            </div>
          </div>
        </div>

        <Divider />

        {/* Essay Prompt */}
        <div className="space-y-2">
          <Label htmlFor="prompt">Instructions</Label>
          <TextInput
            id="instructions"
            multiline
            onChange={e => setInsturctions(e.target.value)}
            placeholder="Instructions for the assignment (e.g. tools, reference materials, etc.)"
            rows={6}
            value={instructions}
          />
        </div>

        <Divider />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Writing tips for students</h4>
            <Button
              className="gap-2"
              onClick={handleAddTipsItem}
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Add Tips
            </Button>
          </div>

          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div className="flex gap-2 items-start" key={index}>
                <div className="flex-1 space-y-2 flex gap-2 items-center">
                  <CircleCheckBig className="mb-0" color="green" />
                  <TextInput
                    className="flex-1"
                    onChange={e => handleTipsChange(index, e.target.value)}
                    placeholder="e.g. Use active voice in a speech / Start with a compelling hook / Refer to textbook P. 124"
                    value={tip}
                  />
                </div>
                <Button
                  disabled={tips.length === 1}
                  onClick={() => handleRemoveTipsItem(index)}
                  size="icon"
                  variant="ghost"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <p className="text-sm text-muted-foreground">
              Total Points:{' '}
              <span className="font-medium text-foreground">{totalPoints}</span>
            </p>
          </div>
        </div>

        <Divider />

        {/* Requirements */}
        <div className="space-y-4">
          <h4 className="font-medium">Requirements</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minWords">Minimum Words</Label>
              <NumberInput
                id="minWords"
                onChange={setMinWordCount}
                value={minWordCount}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxWords">Maximum Words</Label>
              <NumberInput
                id="maxWords"
                onChange={setMaxWordCount}
                value={maxWordCount}
              />
            </div>
          </div>
        </div>

        <Divider />

        {/* Rubrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Grading Rubric</h4>
            <Button
              className="gap-2"
              onClick={handleAddRubricItem}
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Add Criteria
            </Button>
          </div>

          <div className="space-y-4">
            {rubrics.map((item, index) => (
              <div className="flex gap-2 items-start" key={index}>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2 items-start">
                    <div className="flex-1">
                      <TextInput
                        onChange={e =>
                          handleRubricChange(index, 'criteria', e.target.value)
                        }
                        placeholder="Criteria name"
                        value={item.criteria}
                      />
                    </div>
                    <NumberInput
                      inputClass="!w-24"
                      min={1}
                      onChange={value =>
                        handleRubricChange(index, 'points', value)
                      }
                      size="sm"
                      value={item.points}
                    />
                  </div>
                  <TextInput
                    minRows={2}
                    multiline
                    onChange={e =>
                      handleRubricChange(index, 'description', e.target.value)
                    }
                    placeholder="Detailed description of the criteria, what content is expected at each score"
                    value={item.description}
                  />
                </div>
                <Button
                  disabled={rubrics.length === 1}
                  onClick={() => handleRemoveRubricItem(index)}
                  size="icon"
                  variant="ghost"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <p className="text-sm text-muted-foreground">
              Total Points:{' '}
              <span className="font-medium text-foreground">{totalPoints}</span>
            </p>
          </div>
        </div>

        <Divider />

        <StudentEnrollInput
          enrolledClasses={enrolledClasses}
          enrolledStudents={enrolledStudents}
          setEnrolledClasses={setEnrolledClasses}
          setEnrolledStudents={setEnrolledStudents}
        />

        <Divider />

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            Cancel
          </Button>
          <Button
            className="gap-2"
            disabled={isEditing ? !edited : false}
            loading={createAssignmentLoading || updateAssignmentLoading}
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            {isEditing ? 'Update Assignment' : 'Create Assignment'}
          </Button>
        </div>
      </Card>
    </form>
  );
}
export default AssignmentEditor;
