import React, { useEffect, useState, useRef } from "react";
import InfoAlert from "@/components/InfoAlert.js";
import TableRow from "@/components/TableRow.js";
import statementTableStyle from "@/styles/statementTableStyle.module.css";

export default function StatementTable(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [statements, setStatements] = useState([]);
    const effectRan = useRef(false);

    useEffect(() => {
        if (!props.userId) {
            return;
        }
        
        const fetchStatements = async () => {
            if (effectRan.current == false) {
                try {
                    let url = `http://localhost:8080/statement/${props.userId}`;
                    console.log(url);
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch');
                    }

                    const statements = await response.json();
                    setIsLoaded(true);
                    setStatements(statements);
                } catch (error) {
                    setIsLoaded(true);
                    setError(error);
                }
            }
        };

        fetchStatements();

        return () => {
            effectRan.current = true;
        }
    }, [props.userId]);

    if (error) {
        return (
            <>
                <table className={statementTableStyle['transfer-table']}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Source Account</th>
                            <th>Destination Account</th>
                            <th>Amount</th>
                            <th>Fee</th>
                            <th>Schedule Date</th>
                            <th>Transfer Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    } else if (!isLoaded) {
        return <div className="z-50 flex justify-start items-center"><InfoAlert /></div> 
    } else {
        return (
            <>
                <table className={statementTableStyle['transfer-table']}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Source Account</th>
                            <th>Destination Account</th>
                            <th>Amount</th>
                            <th>Fee</th>
                            <th>Schedule Date</th>
                            <th>Transfer Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow statements={statements} />
                    </tbody>
                </table>
            </>
        );
    }    
}