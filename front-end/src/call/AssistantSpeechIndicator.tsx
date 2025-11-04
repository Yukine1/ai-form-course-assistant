export const AssistantSpeechIndicator = ({ isSpeaking }: {isSpeaking: boolean}) => {
    return (
        <div className="assistant-speech-editor">
            <div
                className={`speech-indicator ${
                    isSpeaking ? "speaking" : "not-speaking"
                }`}
            ></div>
            <p className="speech-status">
                {isSpeaking ? "Assistant Speaking" : "Assistant Not Speaking"}
            </p>
        </div>
    );
};