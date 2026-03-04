// Type declarations for Web Speech API
// This file provides type definitions for speech recognition and synthesis

/* eslint-disable @typescript-eslint/no-explicit-any */
export { };

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
        webkitSpeechSynthesis: any;
    }
}
