import React, { type RefObject, useCallback } from 'react';

import TextInput from 'components/input/TextInput';

type Props = {
  isGraded: boolean;
  essayContent: RefObject<string>;
  updateWordCountStatus: () => void;
  handleSave: (isFinal: boolean, isManual: boolean) => void;
};

const EssayEditorInput = ({
  isGraded,
  essayContent,
  updateWordCountStatus,
  handleSave,
}: Props) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      essayContent.current = e.target.value;
      updateWordCountStatus();
    },
    [essayContent, updateWordCountStatus],
  );

  return (
    <TextInput
      defaultValue={essayContent.current}
      disabled={isGraded}
      multiline
      onBlur={() => handleSave(false, false)}
      onChange={onChange}
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
    />
  );
};

export default EssayEditorInput;
