import React, { useState, useEffect, useRef } from "react";
import ErrorAlert from "@/components/ErrorAlert.js";
import SuccessAlert from "@/components/SuccessAlert.js";
import InfoAlert from "@/components/InfoAlert.js";

export default function RequestSchedule({payload}) {
    const [error, setError] = useState(null);
    const [isScheduled, setIsScheduled] = useState(null); 
    const effectRan = useRef(false);

    useEffect(() => {
        const request = async () => {
            if (effectRan.current == false) {           
                try {
                    const response = await fetch('http://localhost:8080/transfer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to schedule transfer.');
                    }
                    setIsScheduled(true);
                } catch (error) {
                    setIsScheduled(false);
                    setError(error);
                }
            }
        };

        request();

        return () => {
            effectRan.current = true;
        }
    }, []);

    if (error) {
        return <div className="z-50 container flex justify-center items-center"><ErrorAlert /></div>
    } else if (isScheduled) {
        return <div className="z-50 flex justify-center items-center"><SuccessAlert /></div>
    } else {
        return <div className="z-50 flex justify-center items-center"><InfoAlert /></div>
    }
    
}