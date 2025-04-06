import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Bell, Utensils, Droplet, ClipboardList, X, Clock } from "lucide-react";

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      message: "You have a new meal plan update!",
      type: "meal",
      timestamp: "2024-02-20T09:15:00"
    },
    {
      message: "Reminder: Drink more water today 💧",
      type: "hydration",
      timestamp: "2024-02-20T10:30:00"
    },
    {
      message: "Your weekly health report is ready!",
      type: "report",
      timestamp: "2024-02-20T11:45:00"
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "meal":
        return <Utensils size={18} className="text-emerald-600" />;
      case "hydration":
        return <Droplet size={18} className="text-blue-500" />;
      case "report":
        return <ClipboardList size={18} className="text-purple-500" />;
      default:
        return <Bell size={18} />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative">
      {/* Notification Icon */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-out hover:scale-105"
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={showNotifications}
      >
        <Bell size={24} className="text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center shadow-sm">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Dropdown (Portal) */}
      {showNotifications &&
        createPortal(
          <div className="fixed top-16 right-4 w-80 bg-white shadow-xl rounded-xl border border-gray-100 z-[1000] text-black animate-fade-slide">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNotifications([])}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {notifications.map((note, index) => (
                    <li
                      key={index}
                      className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      role="menuitem"
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 shrink-0">
                          {getNotificationIcon(note.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{note.message}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {formatTime(note.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 flex flex-col items-center gap-3 text-center">
                  <Bell size={40} className="text-gray-300" />
                  <p className="text-gray-500 text-sm">No new notifications</p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Notification;