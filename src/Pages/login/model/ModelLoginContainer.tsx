import React, { useState } from 'react';
import ModelLoginPresentation from './ModelLoginPresentation';
import { useNavigate } from 'react-router-dom';

const ModelLoginContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const clickHome = () => {
    navigate('/');
  }

  const clickDesigner = () => {
    navigate('/designer/login');
  }

  const clickResgisterModel = () => {
    navigate('register/model');
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
        //로그인 로직 구현
      const response = await fetch('/api/customer/login', {
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
      localStorage.setItem('customerToken', data.token);
      alert('Customer login successful!');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <ModelLoginPresentation
      email={email}
      password={password}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      clickHome={clickHome}
      clickDesigner={clickDesigner}
      clickResgisterModel={clickResgisterModel}
    />
  );
};

export default ModelLoginContainer;
