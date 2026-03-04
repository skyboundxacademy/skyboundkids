// Speech utility for Xtreme Kids Academy
// Uses Web Speech API for voice input and output

export interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
}

export interface SpeechRecognitionError {
    error: string;
    message: string;
}

// Check if browser supports speech recognition
export function isSpeechRecognitionSupported(): boolean {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

// Get speech recognition API
function getSpeechRecognition(): SpeechRecognition | null {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    return SpeechRecognition ? new SpeechRecognition() : null;
}

// Create speech recognition instance
export function createSpeechRecognition(): SpeechRecognition | null {
    if (!isSpeechRecognitionSupported()) {
        console.warn('Speech recognition is not supported in this browser');
        return null;
    }

    const recognition = getSpeechRecognition();
    if (!recognition) return null;

    // Configure recognition
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    return recognition;
}

// Speech recognition hook for React components
export interface UseSpeechRecognitionReturn {
    transcript: string;
    isListening: boolean;
    error: string | null;
    startListening: () => void;
    stopListening: () => void;
    supported: boolean;
}

// Text-to-Speech function
export function speak(text: string, onEnd?: () => void): void {
    if (!('speechSynthesis' in window)) {
        console.warn('Text-to-speech is not supported in this browser');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice settings
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.1; // Slightly higher pitch, friendly
    utterance.volume = 1;

    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
        (voice) => voice.lang.startsWith('en') && voice.name.includes('Female')
    ) || voices.find((voice) => voice.lang.startsWith('en'));

    if (englishVoice) {
        utterance.voice = englishVoice;
    }

    // Set language
    utterance.lang = 'en-US';

    if (onEnd) {
        utterance.onend = onEnd;
    }

    window.speechSynthesis.speak(utterance);
}

// Stop speaking
export function stopSpeaking(): void {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

// Check if currently speaking
export function isSpeaking(): boolean {
    return 'speechSynthesis' in window && window.speechSynthesis.speaking;
}

// Get available voices (useful for preload)
export function getVoices(): SpeechSynthesisVoice[] {
    if ('speechSynthesis' in window) {
        return window.speechSynthesis.getVoices();
    }
    return [];
}

// Load voices (needed for some browsers)
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
        const voices = getVoices();
        if (voices.length > 0) {
            resolve(voices);
        } else {
            // Some browsers need this event
            (window as any).speechSynthesis.onvoiceschanged = () => {
                resolve(getVoices());
            };
        }
    });
}

// Voice command patterns for common actions
export const voiceCommands = {
    GREETING: ['hello', 'hi', 'hey'],
    YES: ['yes', 'yeah', 'yep', 'ok', 'okay', 'sure'],
    NO: ['no', 'nope', 'nah', 'not'],
    NEXT: ['next', 'continue', 'go on'],
    REPEAT: ['again', 'repeat', 'say again', 'what'],
    STOP: ['stop', 'wait', 'hold on'],
    HELP: ['help', 'help me', 'what is this'],
    PLAY_GAME: ['play game', 'game', 'lets play'],
    LESSON: ['start lesson', 'learn', 'teach me'],
};

// Check if transcript matches any command
export function matchesCommand(
    transcript: string,
    commands: string[]
): boolean {
    const lowerTranscript = transcript.toLowerCase();
    return commands.some((cmd) => lowerTranscript.includes(cmd.toLowerCase()));
}
