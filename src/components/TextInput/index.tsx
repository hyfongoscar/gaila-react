import React from 'react';

import TextField from '@mui/material/TextField';

type Props = React.ComponentProps<typeof TextField>;

const TextInput = (props: Props) => {
  return <TextField {...props} />;
};

export default TextInput;
