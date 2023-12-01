import React, { useEffect, useState } from "react";

export default function SuccessAlert() {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setShouldRender(false);
        }, 2800);

        return () => clearTimeout(timerId);
    }, []);

    return shouldRender ? (
        <div role="alert" className="alert alert-success z-50 mt-4 text-justify items-left">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Transfer scheduled successfully!</span>
        </div>
    ) : null;
}