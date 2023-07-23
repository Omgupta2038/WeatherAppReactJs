import React, { useEffect, useRef } from 'react';

const LoopedAudio = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const handleKeyPress = (event) => {
            // Check if the pressed key is "Enter" (key code 13)
            if (event.keyCode === 13) {
                audioRef.current.play();
            }
        };

        // Add event listener for key press
        document.addEventListener('keydown', handleKeyPress);

        // Add a listener to restart the audio when it ends (looping)
        const restartAudio = () => {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        };

        audioRef.current.addEventListener('ended', restartAudio);

        // Clean up the event listeners when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            audioRef.current.removeEventListener('ended', restartAudio);
        };
    }, []);

    return (
        <div>
            <audio ref={audioRef} loop>
                <source src="/audio.mp3" type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default LoopedAudio;