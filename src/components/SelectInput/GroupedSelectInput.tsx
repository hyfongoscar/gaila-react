import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

type Props<T> = {
  label: string;
  groups: {
    label: string;
    options: {
      label: string;
      value: T;
    }[];
  }[];
  includeEmptyOption?: boolean;
  value?: T;
  onChange?: (value: T) => void;
} & Omit<React.ComponentProps<typeof Select>, 'onChange'>;

export function GroupedSelectInput<T extends string | number>({
  label,
  includeEmptyOption,
  groups,
  value,
  onChange,
  ...props
}: Props<T>) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel htmlFor="grouped-native-select">{label}</InputLabel>
      <Select
        label={label}
        onChange={e => onChange?.(e.target.value as T)}
        value={value}
        {...props}
      >
        {includeEmptyOption && <option aria-label="None" value="" />}
        {groups.map(group => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
    </FormControl>
  );
}

export default GroupedSelectInput;
