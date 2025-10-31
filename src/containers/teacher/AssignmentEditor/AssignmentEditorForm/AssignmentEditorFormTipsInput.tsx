import React, { useCallback, useEffect, useState } from 'react';

import { CircleCheckBig, Plus, X } from 'lucide-react';

import Button from 'components/input/Button';
import TextInput from 'components/input/TextInput';

type Props = {
  formDataValue: string[];
  onFormDataChange: (field: string, value: any) => void;
};

const AssignmentEditorFormTipsInput = ({
  formDataValue,
  onFormDataChange,
}: Props) => {
  const [tips, setTips] = useState<string[]>(['']);

  const handleAddTipsItem = useCallback(() => {
    const newTips = [...tips, ''];
    setTips(newTips);
    onFormDataChange('tips', newTips);
  }, [onFormDataChange, tips]);

  const handleRemoveTipsItem = useCallback(
    (index: number) => {
      const newTips = tips.filter((_, i) => i !== index);
      setTips(newTips);
      onFormDataChange('tips', newTips);
    },
    [onFormDataChange, tips],
  );

  const handleTipsChange = useCallback(
    (index: number, value: string) => {
      const newTips = [...tips];
      newTips[index] = value;
      setTips(newTips);
      onFormDataChange('tips', newTips);
    },
    [onFormDataChange, tips],
  );

  useEffect(() => {
    setTips(formDataValue);
  }, [formDataValue]);

  return (
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
    </div>
  );
};

export default AssignmentEditorFormTipsInput;
