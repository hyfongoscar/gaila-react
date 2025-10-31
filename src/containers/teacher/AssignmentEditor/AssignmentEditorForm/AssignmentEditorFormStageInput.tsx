import React, { useCallback, useEffect, useState } from 'react';

import { isEmpty } from 'lodash-es';

import CheckboxInput from 'components/input/CheckboxInput';
import SwitchInput from 'components/input/SwitchInput';

import { type AssignmentStage } from 'types/assignment';

type Props = {
  formDataValue: AssignmentStage[];
  onFormDataChange: (field: string, value: any) => void;
};

const availableStages = [
  {
    stage_type: 'goal_setting',
    label: 'Goal Setting',
    tools: [
      { key: 'ideation', label: 'Ideation Chatbot' },
      { key: 'dictionary', label: 'Dictionary Chatbot' },
    ],
  },
  {
    stage_type: 'writing',
    label: 'Writing',
    tools: [
      { key: 'grammar', label: 'Grammar Chatbot' },
      { key: 'dictionary', label: 'Dictionary Chatbot' },
      { key: 'autograde', label: 'AI Auto Grading' },
      { key: 'general', label: 'General Chatbot' },
    ],
  },
  {
    stage_type: 'reflection',
    label: 'Reflection',
    tools: [
      { key: 'ideation', label: 'Ideation Chatbot' },
      { key: 'dictionary', label: 'Dictionary Chatbot' },
    ],
  },
];

const defaultStages: AssignmentStage[] = [
  {
    stage_type: 'goal_setting',
    order_index: 1,
    enabled: true,
    tools: [],
  },
  {
    stage_type: 'writing',
    order_index: 2,
    enabled: true,
    tools: [],
  },
  {
    stage_type: 'reflection',
    order_index: 3,
    enabled: true,
    tools: [],
  },
];

const AssignmentEditorFormStageInput = ({
  formDataValue,
  onFormDataChange,
}: Props) => {
  const [stages, setStages] = useState<AssignmentStage[]>(defaultStages);

  useEffect(() => {
    setStages(isEmpty(formDataValue) ? defaultStages : formDataValue);
  }, [formDataValue]);

  const onStageToggleEnable = useCallback(
    (index: number, value: boolean) => {
      const newStages = [...stages];
      newStages[index].enabled = value;
      setStages(newStages);
      onFormDataChange('stages', newStages);
    },
    [onFormDataChange, stages],
  );

  const onStageToggleTools = useCallback(
    (index: number, value: string[]) => {
      const newStages = [...stages];
      newStages[index].tools = value;
      setStages(newStages);
      onFormDataChange('stages', newStages);
    },
    [onFormDataChange, stages],
  );

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium">Stages and Tools</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Choose to include writing stages and enable tools for students
        </p>
      </div>
      <div className="grid grid-cols-3">
        {availableStages.map((stage, index) => (
          <div
            className="border-r last:border-0 border-gray-300 px-4"
            key={stage.stage_type}
          >
            <div className="flex justify-between items-center">
              <div>{stage.label}</div>
              <SwitchInput
                disabled={stage.stage_type === 'writing'}
                onChange={value => onStageToggleEnable(index, value)}
                value={stages[index].enabled}
              />
            </div>
            <CheckboxInput
              disabled={!stages[index].enabled}
              onChange={value => onStageToggleTools(index, value)}
              options={stage.tools}
              value={stages[index].tools}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentEditorFormStageInput;
