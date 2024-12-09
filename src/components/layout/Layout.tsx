// src/components/layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationComponent } from '../notifications/NotificationComponent';

interface LayoutProps {
    userType: 'designer' | 'model';
}

export const Layout: React.FC<LayoutProps> = ({ userType }) => {
    return (
        <div>
            <NotificationComponent userType={userType} />
            <Outlet />
        </div>
    );
};