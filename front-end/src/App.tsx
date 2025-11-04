import "./index.css";
import {useEffect, useState} from "react";
import {startAssistant, stopAssistant, vapi} from "./ai.ts";
import * as React from "react";
import {ActiveCallDetails} from "./call/ActiveCallDetails.tsx";

interface CallResultProps {
    analysis: {
        structuredData: {
            is_qualified: boolean;
        }
    };
    summary: string;
}

function App() {
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);
    const [callId, setCallId] = useState<string|undefined>("");
    const [callResult, setCallResult] = useState<CallResultProps|null>(null);
    const [loadingResult, setLoadingResult] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        vapi.on("call-start", () => {
            setLoading(false);
            setStarted(true);
        }).on('call-end', () => {
            setLoading(false);
            setStarted(false);
        }).on('speech-start', () => {
            setAssistantIsSpeaking(true);
        }).on('speech-end', () => {
            setAssistantIsSpeaking(false);
        }).on('volume-level', (value) => {
            setVolumeLevel(value);
        })
    }, []);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>
    ) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    }

    const handleStart = async () => {
        setLoading(true);
        const data = await startAssistant({firstName, lastName, phoneNumber ,email});
        setCallId(data?.id);
    }

    const handleStop = async () => {
        await stopAssistant();
        getCallDetails();
    }

    const getCallDetails = (interval: number = 3000) => {
        setLoadingResult(true);
        fetch("/call-details?call_id=" + callId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.analysis && data.summary) {
                console.log(data);
                setCallResult(data);
                setLoadingResult(false);
            } else {
                setTimeout(() => getCallDetails(interval), interval);
            }
        }).catch((error) => {
            alert(error.message);
        })
    }

    const showForm = !loading && !started && !loadingResult && !callResult;
    const allFieldsFilled = firstName && lastName && phoneNumber && email;

    return (
        <div className="app-container">
            {showForm && <>
                <h1>Contact Details (required)</h1>
                <input type="text" className="input-field" value={firstName}
                       onChange={handleInputChange(setFirstName)} placeholder="Enter first name"/>
                <input type="text" className="input-field" value={lastName}
                       onChange={handleInputChange(setLastName)} placeholder="Enter last name"/>
                <input type="text" className="input-field" value={email}
                       onChange={handleInputChange(setEmail)} placeholder="Enter email"/>
                <input type="text" className="input-field" value={phoneNumber}
                       onChange={handleInputChange(setPhoneNumber)} placeholder="Enter phone number"/>
                {!started && (
                    <button
                    disabled={!allFieldsFilled}
                    onClick={handleStart}
                    className="button"
                    >
                        Start Application Call
                    </button>
                )}
            </>
            }
            {loadingResult && <p>Loading call details, please wait!...</p>}
            {!loadingResult && callResult && (<div className="call-result">
                <p>Qualified: {callResult.analysis.structuredData.is_qualified}</p>
                <p>{callResult.summary}</p>
            </div>)}
            {(loading || loadingResult) && (<div className='loading'></div>)}
            {started && (<ActiveCallDetails assistantIsSpeaking={assistantIsSpeaking} volumeLevel={volumeLevel} endCallCallback={handleStop}/>)}
        </div>
    )
}

export default App
