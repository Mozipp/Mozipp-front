// src/components/login/customer/CustomerLoginContainer.tsx
import React, { useState } from 'react';
import CustomerLoginPresentation from './CustomerLoginPresentation';

const CustomerLoginContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
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
    <CustomerLoginPresentation
      email={email}
      password={password}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default CustomerLoginContainer;
