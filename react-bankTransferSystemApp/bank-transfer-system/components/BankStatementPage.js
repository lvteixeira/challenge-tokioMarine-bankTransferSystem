import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar.js";
import StatementTable from "@/components/StatementTable.js";
import Footer from "@/components/Footer.js";

import bankStatementPageStyle from "@/styles/bankStatementPageStyle.module.css";

export default function BankStatementPage() {
    const[currentSessionId, setCurrentSessionId] = useState("");
    const router = useRouter();

    useEffect(() => {
        const currentSessionId = sessionStorage.getItem('currentSessionId');

        if (!currentSessionId) {
            router.push("/");
        } else {
            setCurrentSessionId(currentSessionId);
        }
    }, []);

    return (
        <>
            <div className={bankStatementPageStyle['nav-bar']}>
                <Navbar />
            </div>
            <div className={bankStatementPageStyle['statement-table']}>
                <StatementTable userId={currentSessionId}/>
            </div>
            <div className={bankStatementPageStyle['footer']}>
                <Footer />                
            </div>                        
        </>
    );
}