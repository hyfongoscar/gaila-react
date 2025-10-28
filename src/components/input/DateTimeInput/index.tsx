import React, { useCallback, useMemo } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface Props {
  type: string;
  value?: number | null;
  onChange?: (value: number | null) => void;
  className?: string;
  size?: 'small' | 'medium';
}

const DateTimeInput = ({
  className,
  type,
  value: inputValue,
  onChange: inputOnChange,
  size = 'small',
}: Props) => {
  const value = useMemo(
    () => (inputValue ? dayjs(inputValue) : null),
    [inputValue],
  );

  const onChange = useCallback(
    (value: Dayjs | null) => {
      if (!value) {
        inputOnChange?.(value);
        return;
      }
      inputOnChange?.(value.valueOf());
    },
    [inputOnChange],
  );

  if (type === 'date') {
    return (
      <DatePicker
        className={clsx(['w-full', className])}
        onChange={onChange}
        slotProps={{ textField: { size } }}
        value={value}
      />
    );
  }

  if (type === 'time') {
    return (
      <TimePicker
        className={clsx(['w-full', className])}
        onChange={onChange}
        slotProps={{ textField: { size } }}
        value={value}
      />
    );
  }

  if (type === 'datetime') {
    return (
      <DateTimePicker
        className={clsx(['w-full', className])}
        onChange={onChange}
        slotProps={{ textField: { size } }}
        value={value}
      />
    );
  }
};

export default DateTimeInput;
