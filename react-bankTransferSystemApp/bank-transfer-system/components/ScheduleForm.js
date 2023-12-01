import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import RequestSchedule from "@/components/RequestSchedule.js";
import scheduleFormStyle from "@/styles/scheduleFormStyle.module.css";

export default function ScheduleForm() {
    const [sourceAccount, setSourceAccount] = useState("");
    const [destinationAccount, setDestinationAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [dateToTransfer, setDateToTransfer] = useState("");
    const [userId, setUserId] = useState("");
    const [requestResult, setRequestResult] = useState(null);

    const scheduleDate = new Date();
    const fScheduleDate = format(scheduleDate, "dd/MM/yyyy");
    
    useEffect(() => {
        const currentSessionId = sessionStorage.getItem('currentSessionId');

        if (currentSessionId) {
            setUserId(sessionStorage.getItem('currentSessionId'));    
        }
    }, []);

    const isButtonDisabled = () => {
        // Verifica se algum dos campos mandatorios esta vazio
        return (
            userId === "" ||
            sourceAccount === "" ||
            destinationAccount === "" ||
            amount === "" ||
            dateToTransfer === ""
        );
    };

    const formatSAccountOnChange = (e) => {
        //Remove caracteres nao numericos
        const numeric = e.target.value.replace(/\D/g, "");

        //Permite somente 10 digitos
        const fAccount = numeric.slice(0, 10);

        setSourceAccount(fAccount);
    }

    const formatDAccountOnChange = (e) => {
        //Remove caracteres nao numericos
        const numeric = e.target.value.replace(/\D/g, "");

        //Permite somente 10 digitos
        const fAccount = numeric.slice(0, 10);

        setDestinationAccount(fAccount);
    }

    const formatAmountOnChange = (e) => {
        //Impede numero negativo
        const input = Math.abs(Number(e.target.value)) || "";

        //Limita double à duas casas decimais
        const fAmount = input !== "" ? Number(input).toFixed(2) : input;

        setAmount(fAmount);
    };

    const handleSchedule = () => {
        // Converte a string para um objeto Date mantendo o fuso horário
        const dateToTransferObject = new Date(`${dateToTransfer}T00:00:00`);
    
        if (isNaN(dateToTransferObject.getTime())) {
            console.error("Invalid date format");
            return;
        }
    
        const fDateToTransfer = format(dateToTransferObject, "dd/MM/yyyy");
        const payload = {
            userId,
            sourceAccount,
            destinationAccount,
            amount,
            dateToTransfer: fDateToTransfer,
            scheduleDate: fScheduleDate,
        };
    
        // Passa o payload para o componente que faz a requisição
        console.log(payload);
        setRequestResult(<RequestSchedule payload={payload} />);
    
        // Redefine os estados após 5s
        setTimeout(() => {
            setRequestResult(null);
            setSourceAccount("");
            setDestinationAccount("");
            setAmount("");
            setDateToTransfer("");
        }, 5000); // 5000 ms
    };
   
    return (
        <div className="form">
            <div className={scheduleFormStyle.inputContainer}>
                <label className={`${scheduleFormStyle.label} text-black font-semibold`}>Source</label>
                <input
                    className={`bg-neutral ${scheduleFormStyle.inputCustom}`}
                    type="text"
                    placeholder="10 digit bank account"
                    value={sourceAccount}
                    onChange={(e) => {
                        setSourceAccount(e.target.value);
                        formatSAccountOnChange(e);
                    }}
                />
            </div>

            <div className={scheduleFormStyle.inputContainer}>
                <label className={`${scheduleFormStyle.label} text-black font-semibold`}>Destination</label>
                <input
                    className={`bg-neutral ${scheduleFormStyle.inputCustom}`}
                    type="text"
                    placeholder="10 digit bank account"
                    value={destinationAccount}
                    onChange={(e) => {
                        setDestinationAccount(e.target.value);
                        formatDAccountOnChange(e);
                    }}
                />
            </div>

            <div className={scheduleFormStyle.inputContainer}>
                <label className={`${scheduleFormStyle.label} text-black font-semibold`}>Amount</label>
                <input
                    className={`bg-neutral ${scheduleFormStyle.inputCustom}`}
                    type="text"
                    placeholder="Amount to transfer in BRL"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                        formatAmountOnChange(e);
                    }}
                />
            </div>

            <div className={scheduleFormStyle.inputContainer}>
                <label className={`${scheduleFormStyle.label} text-black font-semibold`}>Date To Transfer</label>
                <input
                    className={`bg-neutral ${scheduleFormStyle.inputCustom}`}
                    type="date"
                    placeholder="Date to make the transfer"
                    value={dateToTransfer}
                    onChange={(e) => setDateToTransfer(e.target.value)}
                    min={format(new Date(), "yyyy-MM-dd")}
                />
            </div>

            <div className={scheduleFormStyle.inputContainer}>
                <label className={`${scheduleFormStyle.label} text-black font-semibold`}>Schedule Date</label>
                <input
                    className={`bg-neutral ${scheduleFormStyle.inputCustom}`}
                    type="text"
                    placeholder="Date the schedule was made"
                    value={fScheduleDate}
                    readOnly
                />
            </div>

            <div className={scheduleFormStyle.buttonContainer}>
                <button className="btn btn-primary" onClick={handleSchedule} disabled={isButtonDisabled()}>
                    SCHEDULE
                </button>
            </div>

            {requestResult}
        </div>
    );
}