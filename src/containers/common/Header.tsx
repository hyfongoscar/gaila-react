import React from 'react';

import Button from 'components/Button';

import useAuth from 'containers/auth/AuthProvider/useAuth';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  const { logoutAction } = useAuth();

  return (
    <div className="w-full flex justify-between p-6">
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <Button label="Logout" onClick={logoutAction} />
      </div>
    </div>
  );
};

export default Header;
