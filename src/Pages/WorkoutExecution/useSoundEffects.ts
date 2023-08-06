import React from "react";

function useSoundEffect() {
    const audioCtx = React.useRef<AudioContext | null>(null);
    const shortBeepBuffer = React.useRef<AudioBuffer | null>(null);
    const longBeepBuffer = React.useRef<AudioBuffer | null>(null);

    const fetchAudio = async (audioUrl: string) => {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        return arrayBuffer;
    };

    const playSound = (buffer: AudioBuffer) => {
        if (!audioCtx.current) return;

        const source = audioCtx.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.current.destination);
        source.start();
    };

    const loadAudios = async () => {
        audioCtx.current = new AudioContext();

        const shortBeepAudioBuffer = await fetchAudio(
            "/assets/sounds/beep-short.mp3"
        );
        shortBeepBuffer.current = await audioCtx.current.decodeAudioData(
            shortBeepAudioBuffer
        );

        const longBeepAudioBuffer = await fetchAudio(
            "/assets/sounds/beep-long.mp3"
        );
        longBeepBuffer.current = await audioCtx.current.decodeAudioData(
            longBeepAudioBuffer
        );
    };

    const playShortBeep = () => {
        if (shortBeepBuffer.current) playSound(shortBeepBuffer.current);
    };

    const playLongBeep = () => {
        if (longBeepBuffer.current) playSound(longBeepBuffer.current);
    };

    return {
        loadAudios,
        playShortBeep,
        playLongBeep,
    };
}

export default useSoundEffect;
