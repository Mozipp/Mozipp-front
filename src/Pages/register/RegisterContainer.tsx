import React, { useState } from 'react';
import RegisterPresentation from './RegisterPresentation';

const RegisterContainer: React.FC = () => {
    const [formData, setFormData] = useState<{
        id: string;
        username: string;
        email: string;
        password: string;
        age: number;
        sex: 'male' | 'female';
        confirmPassword: string;
      }>({
        id: '',
        username: '',
        email: '',
        password: '',
        age: 0,
        sex: 'male',
        confirmPassword: '',
      });
      
    const [errors, setErrors] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // 입력값을 관리하는 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSexChange = (sex: 'male' | 'female') => {
        setFormData((prevData) => ({
            ...prevData,
            sex,
        }));
    };

    // 폼 유효성 검사를 수행하는 함수
    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // 사용자 이름 유효성 검사
        if (formData.username.length < 3) {
            newErrors.username = '사용자 이름은 3글자 이상이어야 합니다.';
            isValid = false;
        } else {
            newErrors.username = '';
        }

        // 이메일 유효성 검사
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '유효한 이메일 주소를 입력해주세요.';
            isValid = false;
        } else {
            newErrors.email = '';
        }

        // 비밀번호 유효성 검사
        if (formData.password.length < 6) {
            newErrors.password = '비밀번호는 6글자 이상이어야 합니다.';
            isValid = false;
        } else {
            newErrors.password = '';
        }

        // 비밀번호 확인 유효성 검사
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
            isValid = false;
        } else {
            newErrors.confirmPassword = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    // 폼 제출을 처리하는 함수
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
        }
    };

    return (
        <RegisterPresentation
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleSexChange={handleSexChange}
        />
    );
};

export default RegisterContainer;
