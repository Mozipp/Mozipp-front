import React, { useState } from 'react';
import DesignerLoginPresentation from './DesignerLoginPresentation';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../Apis/designer/DesignerApi';

const DesignerLoginContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  
  const clickHome = () => {
    navigate('/');
  }

  const clickModel = () => {
    navigate('/model/login');
  }

  const clickRegisterDesigner = () => {
    navigate('/designer/register');
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
        await login(email, password);
      

      alert('Designer login successful!');
      navigate('/');
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
      clickModel={clickModel}
      clickRegisterDesigner={clickRegisterDesigner}
    />
  );
};

export default DesignerLoginContainer;
