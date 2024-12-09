// src/components/notifications/NotificationComponent.tsx
import React from 'react';
import { useNotifications } from './useNotifications';
import './styles.css';

interface NotificationComponentProps {
    userType: 'designer' | 'model';
}

export const NotificationComponent: React.FC<NotificationComponentProps> = ({ userType }) => {
    const notifications = useNotifications(userType);

    return (
        <div className="notifications-container">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`notification-item ${notification.type}`}
                >
                    <p>{notification.message}</p>
                    <small>{notification.timestamp.toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};