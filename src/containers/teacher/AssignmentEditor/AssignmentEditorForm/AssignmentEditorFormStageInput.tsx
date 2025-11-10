import React, { useCallback, useEffect, useState } from 'react';

import { isEmpty } from 'lodash-es';

import CheckboxInput from 'components/input/CheckboxInput';
import SwitchInput from 'components/input/SwitchInput';

import type { AssignmentCreatePayload } from 'api/assignment';

type AssignmentStageEditType = AssignmentCreatePayload['stages'][number];

type Props = {
  formDataValue: AssignmentStageEditType[];
  onFormDataChange: (field: string, value: any) => void;
  isEditing: boolean;
};

const availableStages = [
  {
    stage_type: 'goal_setting',
    label: 'Goal Setting',
    tools: [{ key: 'goal_general', label: 'General Chatbot' }],
  },
  {
    stage_type: 'writing',
    label: 'Writing',
    tools: [
      { key: 'ideation', label: 'Ideation Chatbot (Outline)' },
      { key: 'autograde', label: 'AI Auto Grading (Revise)' },
      { key: 'grammar', label: 'Grammar Chatbot' },
      { key: 'dictionary', label: 'Dictionary Chatbot' },
      { key: 'writing_general', label: 'General Chatbot' },
    ],
  },
  {
    stage_type: 'reflection',
    label: 'Reflection',
    tools: [{ key: 'reflection_general', label: 'General Chatbot' }],
  },
];

const defaultStages: AssignmentStageEditType[] = [
  {
    stage_type: 'goal_setting',
    enabled: true,
    tools: [],
  },
  {
    stage_type: 'writing',
    enabled: true,
    tools: [],
  },
  {
    stage_type: 'reflection',
    enabled: true,
    tools: [],
  },
];

const AssignmentEditorFormStageInput = ({
  formDataValue,
  onFormDataChange,
  isEditing,
}: Props) => {
  const [stages, setStages] =
    useState<AssignmentStageEditType[]>(defaultStages);

  useEffect(() => {
    if (isEmpty(formDataValue)) {
      setStages(defaultStages);
      if (!isEditing) {
        onFormDataChange('stages', defaultStages);
      }
    } else {
      setStages(formDataValue);
    }
  }, [formDataValue, isEditing, onFormDataChange]);

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
      const availableTools =
        availableStages.find(
          stage => stage.stage_type === stages[index].stage_type,
        )?.tools || [];
      newStages[index].tools = availableTools.map(tool => ({
        key: tool.key,
        enabled: value.includes(tool.key),
      }));
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
              value={stages[index].tools
                .filter(tool => tool.enabled)
                .map(tool => tool.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentEditorFormStageInput;
