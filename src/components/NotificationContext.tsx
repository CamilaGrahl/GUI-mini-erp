import { createContext, useContext, useState } from "react";
import type { Notification, NotificationContextType } from "../types/types";

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);;

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
  
    const showNotification = (message: string, type: Notification["type"] = "success") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    };
  
    return (
        <NotificationContext.Provider value={{ showNotification }}>
        {children}

        {/* Contenedor visible en pantalla */}
        <div id="popup-container" className="fixed top-14 right-4 flex flex-col gap-3 z-[2000]">
            {notifications.map((n) => (
            <div
                key={n.id}
                className={`
                    px-4 py-2 rounded-lg shadow-lg text-white font-semibold transition-opacity duration-500
                    ${n.type === "success" ? "bg-green-500" : ""}
                    ${n.type === "error" ? "bg-red-500" : ""}
                `}
            >
                {n.message}
            </div>
            ))}
        </div>
        </NotificationContext.Provider>
    );
};
  
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification must be used inside NotificationProvider");
    return context;
};
