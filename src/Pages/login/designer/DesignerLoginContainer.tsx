import React, { useState } from 'react';
import DesignerLoginPresentation from './DesignerLoginPresentation';
import { useNavigate } from 'react-router-dom';
import { click } from '@testing-library/user-event/dist/click';

const DesignerLoginContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  
  const clickHome = () => {
    navigate('/');
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
        //로그인 로직 구현
      const response = await fetch('/api/designer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('designerToken', data.token);
      alert('Designer login successful!');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <DesignerLoginPresentation
      email={email}
      password={password}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      clickHome={clickHome}
    />
  );
};

export default DesignerLoginContainer;
