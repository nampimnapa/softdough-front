import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
// import Sidebar from './Sidebar'; // สมมติ Sidebar มาจาก component อื่น

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const router = useRouter();

    // Fetch all notifications from API
    const fetchAllNotifications = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }

            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchAllNotifications(); // Load notifications on mount
    }, []);

    return (
        <div className="h-screen flex bg-[#F5F1E8]">
            {/* Sidebar */}
            {/* <div className="w-1/4">
                <Sidebar />
            </div> */}

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center p-4 bg-white shadow sticky top-0">
                    <ChevronLeftIcon className="h-6 w-6 text-[#F2B461]" onClick={() => router.back()} />
                    <p className="text-[#F2B461] font-medium ml-4">การแจ้งเตือนทั้งหมด</p>
                </div>

                {/* Notifications List */}
                <div className="p-4 mx-7">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.noti_id} className="flex justify-between items-center p-4 mb-2 bg-white shadow rounded-md">
                                <div>

                                    <p className="text-[#73664B] font-medium">
                                    {notification.ind_id != null ? (
                                  notification.qty < notification.qtyminimum ? (
                                    `ถึงจุดต่ำกว่าขั้นต่ำ ${notification.ind_name} ปริมาณ ${notification.qty}/${notification.qtyminimum}`
                                  ) : (
                                    `ถึงปริมาณขั้นต่ำ ${notification.ind_name} ปริมาณ ${notification.qty}/${notification.qtyminimum}`
                                  )
                                ) : notification.pdod_id != null ? (
                                  `${notification.podde_pdname} ผลิตในวันที่ ${notification.pcreated_at} กำลังจะหมดอายุในวันที่ ${notification.dateexp}`
                                ) : notification.indlde_id != null ? (
                                    `${notification.nameindlot} ล็อต ${notification.indl_id_name} กำลังจะหมดอายุในวันที่ ${notification.indlexp}` 
                                ) : (
                                  "ไม่พบข้อมูลการแจ้งเตือน"
                                )}
                                        
                                        </p>
                                    <p className="text-xs text-gray-500">วันที่ {notification.formatted_created_at}</p>
                                
                                </div>
                                <p className="text-xs text-gray-400">{notification.timeAgo}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">ไม่มีการแจ้งเตือน</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notifications;