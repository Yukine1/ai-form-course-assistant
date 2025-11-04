import {AssistantSpeechIndicator} from "./AssistantSpeechIndicator";
import {VolumeLevel} from "./VolumeLevel";

export const ActiveCallDetails = ({
                                      assistantIsSpeaking,
                                      volumeLevel,
                                      endCallCallback,
                                  }: {
    assistantIsSpeaking: boolean;
    volumeLevel: number;
    endCallCallback: () => void;

}) => {
    return (
        <div className="active-call-detail">
            <div className="call-info">
                <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking}/>
                <VolumeLevel volume={volumeLevel}/>
            </div>
            <div className="end-call-button">
                <button onClick={endCallCallback}>End Call</button>
            </div>
        </div>
    );
};