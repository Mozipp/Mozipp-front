// src/components/notifications/useNotifications.ts
import { useEffect, useState, useRef } from 'react';

interface Notification {
    id: number;
    type: 'request' | 'accepted' | 'rejected';
    message: string;
    timestamp: Date;
}

export const useNotifications = (userType: 'designer' | 'model') => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const idRef = useRef<number>(0);

    useEffect(() => {
        console.log('Creating EventSource');
        const eventSource = new EventSource(
            `https://api.multi-learn.com/api/products/notifications/subscribe-${userType}`,
            {
                withCredentials: true, // 쿠키 전송을 위해 필요
            }
        );

        const addNotification = (type: 'request' | 'accepted' | 'rejected', message: string) => {
            const newId = idRef.current + 1;
            idRef.current = newId;
            const newNotification: Notification = {
                id: newId,
                type,
                message,
                timestamp: new Date(),
            };
            setNotifications(prev => [...prev, newNotification]);

            // 5초 후에 알림을 제거
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== newId));
            }, 5000);
        };

        eventSource.addEventListener('connected', (event) => {
            console.log('SSE Connected:', event.data);
        });

        eventSource.addEventListener('reservation-request', (event) => {
            const message = event.data;
            addNotification('request', message);
        });

        eventSource.addEventListener('reservation-accepted', (event) => {
            const message = event.data;
            addNotification('accepted', message);
        });

        eventSource.addEventListener('reservation-rejected', (event) => {
            const message = event.data;
            addNotification('rejected', message);
        });

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [userType]);

    return notifications;
};