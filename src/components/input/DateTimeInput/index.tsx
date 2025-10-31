import React, { useCallback, useMemo } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { isNull, isUndefined } from 'lodash-es';

interface Props {
  type: string;
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
  className?: string;
  size?: 'small' | 'medium';
}

const DateTimeInput = ({
  className,
  type,
  value: inputValue,
  defaultValue: inputDefaultValue,
  onChange: inputOnChange,
  size = 'small',
}: Props) => {
  const value = useMemo(() => {
    if (isUndefined(inputValue)) {
      return undefined;
    }
    if (isNull(inputValue)) {
      return null;
    }
    return dayjs(inputValue);
  }, [inputValue]);

  const defaultValue = useMemo(() => {
    if (isUndefined(inputDefaultValue)) {
      return undefined;
    }
    if (isNull(inputDefaultValue)) {
      return null;
    }
    return dayjs(inputDefaultValue);
  }, [inputDefaultValue]);

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
        defaultValue={defaultValue}
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
        defaultValue={defaultValue}
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
        defaultValue={defaultValue}
        onChange={onChange}
        slotProps={{ textField: { size } }}
        value={value}
      />
    );
  }
};

export default DateTimeInput;
