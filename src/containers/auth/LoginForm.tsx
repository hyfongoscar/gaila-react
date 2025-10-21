import React, { type FormEvent, useCallback, useState } from 'react';

import { isString } from 'lodash-es';
import qs from 'query-string';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router';

import Button from 'components/Button';
import Card from 'components/Card';
import TextInput from 'components/TextInput';

import { type ServerAuthToken, apiUserLogin } from 'api/auth';

import TokenLoginRedirect from './TokenLoginRedirect';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<ServerAuthToken>();

  const { search } = useLocation();
  const { r } = qs.parse(search);
  const redirect = isString(r) ? r : undefined;

  const { mutate: loginRequest, isLoading } = useMutation(apiUserLogin, {
    onSuccess: res => {
      setToken(res);
    },
  });

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!username || !password) {
        return;
      }
      loginRequest({ username, password });
    },
    [loginRequest, password, username],
  );

  return (
    <form onSubmit={onSubmit}>
      <Card childrenClass="flex flex-col gap-4 w-md" title="Login">
        <TextInput
          label="Username"
          onChange={e => setUsername(e.target.value)}
          size="medium"
          value={username}
        />
        <TextInput
          label="Password"
          onChange={e => setPassword(e.target.value)}
          size="medium"
          type="password"
          value={password}
        />
        <Button
          disabled={!username || !password}
          loading={isLoading}
          type="submit"
        >
          Login
        </Button>
      </Card>
      {!!token && (
        <TokenLoginRedirect
          redirect={redirect ? decodeURIComponent(redirect) : undefined}
          response={token}
        />
      )}
    </form>
  );
};

export default LoginForm;
