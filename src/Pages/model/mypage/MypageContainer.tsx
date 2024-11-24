// MypageContainer.tsx
import { useState } from 'react';
import MypagePresentation from './MypagePresentation';

interface UserProfile {
  name: string;
  age: number;
  gender: '남성' | '여성';
  dogBreed: string;
  imageUrl: string;
}

const initialProfile: UserProfile = {
  name: '멍멍이',
  age: 3,
  gender: '남성',
  dogBreed: '골든리트리버',
  imageUrl: '강아지사진1.png'
};

const MypageContainer = () => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(initialProfile);

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({ ...profile });
  };

  const handleSave = async () => {
    try {
      // API 호출 로직 추가
      // const response = await updateProfile(tempProfile);
      setProfile(tempProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile(profile);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({
          ...tempProfile,
          imageUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTempProfile({
      ...tempProfile,
      [name]: name === 'age' ? parseInt(value) : value
    });
  };

  return (
    <MypagePresentation
      profile={isEditing ? tempProfile : profile}
      isEditing={isEditing}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onImageUpload={handleImageUpload}
      onInputChange={handleInputChange}
    />
  );
};

export default MypageContainer;