const numBars = 10;

export const VolumeLevel = ({ volume }: {volume: number}) => {
    return (
        <div className="volume-level">
            <div className="volume-bars">
                {Array.from({ length: numBars }, (_, i) => {
                    return (
                        <div
                            key={i}
                            className={`volume-bar ${i / numBars < volume ? "active" : ""}`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};