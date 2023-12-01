import React from "react";
import ScheduleForm from "@/components/ScheduleForm.js";
import scheduleBoxStyle from "@/styles/scheduleBoxStyle.module.css";

export default function ScheduleBox() {
    return (
        <>
            <div className={`card bg-gradient-to-r from-primary to-secondary text-light-grey shadow-2x1 ${scheduleBoxStyle.cardCustom}`}>
                <div className="card-body items-center">
                    <div className="mt-5 text-center text-black font-semibold">
                        <h1>TRANSFER SCHEDULER</h1>
                    </div>
                    <div className="mt-12 text-left">
                        <ScheduleForm />
                    </div>
                </div>
            </div>        
        </>
    );    
}