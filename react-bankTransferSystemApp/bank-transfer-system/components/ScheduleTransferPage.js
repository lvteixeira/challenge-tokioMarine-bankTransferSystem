import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from "@/components/Navbar.js";
import ScheduleBox from "@/components/ScheduleBox.js";
import Footer from "@/components/Footer.js";
import scheduleTransferPageStyle from "@/styles/scheduleTransferPageStyle.module.css";

export default function ScheduleTransferPage() {
    useEffect(() => {
        const currentSessionId = sessionStorage.getItem('currentSessionId');

        if (!currentSessionId) {
            const id = uuidv4();
            sessionStorage.setItem('currentSessionId', id);
        }
    }, []);

    return (
        <>
            <div className={scheduleTransferPageStyle['nav-bar']}>
                <Navbar />
            </div>
            <div className={scheduleTransferPageStyle['schedule-box']}>
                <ScheduleBox />
            </div>
            <div className={scheduleTransferPageStyle['footer']}>
                <Footer />
            </div>
        </>
    );
}