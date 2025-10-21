import React, { useCallback, useMemo, useState } from 'react';

import { Plus, Save, X } from 'lucide-react';

import Button from 'components/Button';
import Card from 'components/Card';
import DateTimeInput from 'components/DateTimeInput';
import Label from 'components/Label';
import SelectInput from 'components/SelectInput';
import Separator from 'components/Separator';
import TextInput from 'components/TextInput';

interface AssignmentCreatorProps {
  assignmentId?: string;
  onBack: () => void;
}

interface RubricItem {
  criteria: string;
  description: string;
  points: number;
}

function AssignmentCreator({ assignmentId, onBack }: AssignmentCreatorProps) {
  const isEditing = !!assignmentId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [essayType, setEssayType] = useState('argumentative');
  const [instructions, setInsturctions] = useState('');
  const [minWords, setMinWords] = useState(500);
  const [maxWords, setMaxWords] = useState(1000);
  const [dueDate, setDueDate] = useState<number | null>(null);
  const [rubric, setRubric] = useState<RubricItem[]>([
    { criteria: 'Content', description: '', points: 7 },
    { criteria: 'Grammar', description: '', points: 7 },
    { criteria: 'Organization', description: '', points: 7 },
  ]);

  const handleAddRubricItem = useCallback(() => {
    setRubric([...rubric, { criteria: '', description: '', points: 0 }]);
  }, [rubric]);

  const handleRemoveRubricItem = useCallback(
    (index: number) => {
      setRubric(rubric.filter((_, i) => i !== index));
    },
    [rubric],
  );

  const handleRubricChange = useCallback(
    (index: number, field: keyof RubricItem, value: string | number) => {
      const newRubric = [...rubric];
      let newValue = value;
      if (field === 'points') {
        newValue = parseInt(value as string) || 0;
      }
      newRubric[index] = { ...newRubric[index], [field]: newValue };
      setRubric(newRubric);
    },
    [rubric],
  );

  const totalPoints = useMemo(() => {
    return rubric.reduce((sum, item) => sum + (item.points || 0), 0);
  }, [rubric]);

  const handleSave = useCallback(() => {}, []);

  return (
    <div className="space-y-6">
      <Card
        childrenClass="space-y-6"
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

        <Separator />

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

        <Separator />

        {/* Requirements */}
        <div className="space-y-4">
          <h3 className="font-medium">Requirements</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minWords">Minimum Words</Label>
              <TextInput
                id="minWords"
                onChange={e => {
                  setMinWords(parseInt(e.target.value) || 0);
                }}
                type="number"
                value={String(minWords)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxWords">Maximum Words</Label>
              <TextInput
                id="maxWords"
                onChange={e => setMaxWords(parseInt(e.target.value) || 0)}
                type="number"
                value={String(maxWords)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Rubric */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Grading Rubric</h3>
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
            {rubric.map((item, index) => (
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
                    <div className="w-24">
                      <TextInput
                        onChange={e =>
                          handleRubricChange(index, 'points', e.target.value)
                        }
                        placeholder="Points"
                        type="number"
                        value={item.points}
                      />
                    </div>
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
                  disabled={rubric.length === 1}
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

        <Separator />

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            Cancel
          </Button>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            {isEditing ? 'Update Assignment' : 'Create Assignment'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
export default AssignmentCreator;
