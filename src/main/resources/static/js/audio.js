// Audio Manager for Game Sounds
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.masterVolume = 0.5;
        this.soundEnabled = true;
        this.bgmEnabled = true;
        this.currentBGM = null;
        this.bgmGainNode = null;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Create BGM gain node
            this.bgmGainNode = this.audioContext.createGain();
            this.bgmGainNode.gain.value = 0.15 * this.masterVolume; // BGM is quieter
            this.bgmGainNode.connect(this.audioContext.destination);
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    // Play a tone with specified frequency, duration, and type
    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.soundEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Play a chord (multiple frequencies)
    playChord(frequencies, duration, type = 'sine', volume = 0.2) {
        if (!this.soundEnabled || !this.audioContext) return;

        frequencies.forEach(freq => {
            this.playTone(freq, duration, type, volume);
        });
    }

    // Success sound (ascending notes)
    playSuccess() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const notes = [523.25, 659.25, 783.99]; // C, E, G
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playTone(note, 0.2, 'sine', 0.3);
            }, index * 100);
        });
    }

    // Error sound (descending notes)
    playError() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        this.playTone(200, 0.3, 'sawtooth', 0.4);
        setTimeout(() => {
            this.playTone(150, 0.3, 'sawtooth', 0.4);
        }, 100);
    }

    // Click sound
    playClick() {
        if (!this.soundEnabled || !this.audioContext) return;
        this.playTone(800, 0.05, 'sine', 0.2);
    }

    // Game start sound
    playGameStart() {
        if (!this.soundEnabled || !this.audioContext) return;
        const notes = [440, 554.37, 659.25]; // A, C#, E
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playTone(note, 0.15, 'sine', 0.25);
            }, index * 80);
        });
    }

    // Game over sound
    playGameOver() {
        if (!this.soundEnabled || !this.audioContext) return;
        const notes = [392, 349.23, 311.13]; // G, F, Eb (descending)
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playTone(note, 0.4, 'sine', 0.3);
            }, index * 150);
        });
    }

    // Victory sound
    playVictory() {
        if (!this.soundEnabled || !this.audioContext) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (high)
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playTone(note, 0.25, 'sine', 0.3);
            }, index * 120);
        });
    }

    // Card flip sound
    playCardFlip() {
        if (!this.soundEnabled || !this.audioContext) return;
        this.playTone(600, 0.1, 'sine', 0.2);
    }

    // Match sound
    playMatch() {
        if (!this.soundEnabled || !this.audioContext) return;
        this.playChord([523.25, 659.25], 0.3, 'sine', 0.25);
    }

    // Typing sound
    playTyping() {
        if (!this.soundEnabled || !this.audioContext) return;
        this.playTone(1000, 0.05, 'square', 0.15);
    }

    // Reaction sound (high pitch)
    playReaction() {
        if (!this.soundEnabled || !this.audioContext) return;
        this.playTone(1200, 0.1, 'sine', 0.4);
    }

    // Snake eat sound
    playEat() {
        if (!this.soundEnabled || !this.audioContext) return;
        this.playTone(800, 0.1, 'sine', 0.3);
        setTimeout(() => {
            this.playTone(1000, 0.1, 'sine', 0.3);
        }, 50);
    }

    // Block break sound
    playBlockBreak() {
        if (!this.soundEnabled || !this.audioContext) return;
        this.playTone(400, 0.1, 'square', 0.25);
    }

    // Paddle hit sound
    playPaddleHit() {
        if (!this.soundEnabled || !this.audioContext) return;
        this.playTone(300, 0.1, 'sine', 0.2);
    }

    // Set master volume (0.0 to 1.0)
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        this.updateBGMVolume();
    }

    // Toggle sound on/off
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }

    // Enable sound
    enableSound() {
        this.soundEnabled = true;
    }

    // Disable sound
    disableSound() {
        this.soundEnabled = false;
    }

    // Stop current BGM
    stopBGM() {
        if (this.currentBGM) {
            this.currentBGM.stop();
            this.currentBGM = null;
        }
    }

    // Play BGM for different game types
    playBGM(gameType) {
        if (!this.bgmEnabled || !this.audioContext) return;
        
        this.stopBGM();
        
        switch(gameType) {
            case 'number-guess':
                this.playMysteryBGM();
                break;
            case 'typing':
                this.playEnergeticBGM();
                break;
            case 'quiz':
                this.playIntellectualBGM();
                break;
            case 'memory':
                this.playCalmBGM();
                break;
            case 'reaction':
                this.playTenseBGM();
                break;
            case 'snake':
                this.playRetroBGM();
                break;
            case 'math':
                this.playUpbeatBGM();
                break;
            case 'breakout':
                this.playActionBGM();
                break;
        }
    }

    // Mystery BGM (for number guess game)
    playMysteryBGM() {
        if (!this.audioContext) return;
        
        const notes = [261.63, 293.66, 329.63, 349.23]; // C, D, E, F
        let noteIndex = 0;
        
        const playNextNote = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.bgmGainNode);
            
            oscillator.frequency.value = notes[noteIndex];
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.5);
            
            noteIndex = (noteIndex + 1) % notes.length;
            
            setTimeout(playNextNote, 600);
        };
        
        playNextNote();
    }

    // Energetic BGM (for typing game)
    playEnergeticBGM() {
        if (!this.audioContext) return;
        
        const bassNotes = [130.81, 146.83, 164.81]; // C3, D3, E3
        const melodyNotes = [523.25, 587.33, 659.25, 698.46]; // C5, D5, E5, F5
        let bassIndex = 0;
        let melodyIndex = 0;
        
        const playBass = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.bgmGainNode);
            
            osc.frequency.value = bassNotes[bassIndex];
            osc.type = 'square';
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.05);
            gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.3);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.3);
            
            bassIndex = (bassIndex + 1) % bassNotes.length;
            setTimeout(playBass, 400);
        };
        
        const playMelody = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.bgmGainNode);
            
            osc.frequency.value = melodyNotes[melodyIndex];
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.06, this.audioContext.currentTime + 0.05);
            gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.2);
            
            melodyIndex = (melodyIndex + 1) % melodyNotes.length;
            setTimeout(playMelody, 200);
        };
        
        playBass();
        setTimeout(playMelody, 100);
    }

    // Intellectual BGM (for quiz game)
    playIntellectualBGM() {
        if (!this.audioContext) return;
        
        const chordProgression = [
            [261.63, 329.63, 392.00], // C major
            [293.66, 349.23, 440.00], // D minor
            [329.63, 392.00, 493.88], // E minor
            [349.23, 415.30, 523.25]  // F major
        ];
        let chordIndex = 0;
        
        const playChord = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const chord = chordProgression[chordIndex];
            chord.forEach((freq, index) => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(this.bgmGainNode);
                
                osc.frequency.value = freq;
                osc.type = 'sine';
                
                gain.gain.setValueAtTime(0, this.audioContext.currentTime);
                gain.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 0.1);
                gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.0);
                
                osc.start(this.audioContext.currentTime + index * 0.05);
                osc.stop(this.audioContext.currentTime + 1.0);
            });
            
            chordIndex = (chordIndex + 1) % chordProgression.length;
            setTimeout(playChord, 1200);
        };
        
        playChord();
    }

    // Calm BGM (for memory game)
    playCalmBGM() {
        if (!this.audioContext) return;
        
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
        let noteIndex = 0;
        
        const playNote = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.bgmGainNode);
            
            osc.frequency.value = notes[noteIndex];
            osc.type = 'triangle';
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.2);
            gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.5);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 1.5);
            
            noteIndex = (noteIndex + 1) % notes.length;
            setTimeout(playNote, 800);
        };
        
        playNote();
    }

    // Tense BGM (for reaction game)
    playTenseBGM() {
        if (!this.audioContext) return;
        
        const lowNote = 110.00; // A2
        const highNote = 220.00; // A3
        
        const playPulse = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.bgmGainNode);
            
            osc.frequency.value = lowNote;
            osc.type = 'sawtooth';
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
            gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.3);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.3);
            
            setTimeout(() => {
                if (!this.bgmEnabled || !this.audioContext) return;
                const osc2 = this.audioContext.createOscillator();
                const gain2 = this.audioContext.createGain();
                
                osc2.connect(gain2);
                gain2.connect(this.bgmGainNode);
                
                osc2.frequency.value = highNote;
                osc2.type = 'sawtooth';
                
                gain2.gain.setValueAtTime(0, this.audioContext.currentTime);
                gain2.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.05);
                gain2.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2);
                
                osc2.start();
                osc2.stop(this.audioContext.currentTime + 0.2);
            }, 150);
            
            setTimeout(playPulse, 600);
        };
        
        playPulse();
    }

    // Retro BGM (for snake game)
    playRetroBGM() {
        if (!this.audioContext) return;
        
        const bassLine = [130.81, 146.83, 164.81, 174.61]; // C3, D3, E3, F3
        const melody = [523.25, 587.33, 659.25, 698.46, 783.99];
        let bassIndex = 0;
        let melodyIndex = 0;
        
        const playBass = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.bgmGainNode);
            
            osc.frequency.value = bassLine[bassIndex];
            osc.type = 'square';
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.02);
            gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.25);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.25);
            
            bassIndex = (bassIndex + 1) % bassLine.length;
            setTimeout(playBass, 300);
        };
        
        const playMelody = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.bgmGainNode);
            
            osc.frequency.value = melody[melodyIndex];
            osc.type = 'square';
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.07, this.audioContext.currentTime + 0.01);
            gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.15);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.15);
            
            melodyIndex = (melodyIndex + 1) % melody.length;
            setTimeout(playMelody, 150);
        };
        
        playBass();
        setTimeout(playMelody, 75);
    }

    // Upbeat BGM (for math game)
    playUpbeatBGM() {
        if (!this.audioContext) return;
        
        const progression = [
            [261.63, 329.63, 392.00], // C
            [293.66, 349.23, 440.00], // Dm
            [329.63, 392.00, 493.88], // Em
            [261.63, 329.63, 392.00]  // C
        ];
        let chordIndex = 0;
        
        const playChord = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const chord = progression[chordIndex];
            chord.forEach((freq, index) => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(this.bgmGainNode);
                
                osc.frequency.value = freq;
                osc.type = 'triangle';
                
                gain.gain.setValueAtTime(0, this.audioContext.currentTime);
                gain.gain.linearRampToValueAtTime(0.06, this.audioContext.currentTime + 0.05);
                gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.4);
                
                osc.start(this.audioContext.currentTime + index * 0.02);
                osc.stop(this.audioContext.currentTime + 0.4);
            });
            
            chordIndex = (chordIndex + 1) % progression.length;
            setTimeout(playChord, 500);
        };
        
        playChord();
    }

    // Action BGM (for breakout game)
    playActionBGM() {
        if (!this.audioContext) return;
        
        const bass = [98.00, 110.00, 123.47, 130.81]; // G2, A2, B2, C3
        const lead = [392.00, 440.00, 493.88, 523.25]; // G4, A4, B4, C5
        let bassIndex = 0;
        let leadIndex = 0;
        
        const playBass = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.bgmGainNode);
            
            osc.frequency.value = bass[bassIndex];
            osc.type = 'sawtooth';
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.12, this.audioContext.currentTime + 0.03);
            gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.2);
            
            bassIndex = (bassIndex + 1) % bass.length;
            setTimeout(playBass, 250);
        };
        
        const playLead = () => {
            if (!this.bgmEnabled || !this.audioContext) return;
            
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.bgmGainNode);
            
            osc.frequency.value = lead[leadIndex];
            osc.type = 'square';
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.01);
            gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.1);
            
            leadIndex = (leadIndex + 1) % lead.length;
            setTimeout(playLead, 125);
        };
        
        playBass();
        setTimeout(playLead, 62);
    }

    // Toggle BGM
    toggleBGM() {
        this.bgmEnabled = !this.bgmEnabled;
        if (!this.bgmEnabled) {
            this.stopBGM();
        }
        return this.bgmEnabled;
    }

    // Update BGM volume
    updateBGMVolume() {
        if (this.bgmGainNode) {
            this.bgmGainNode.gain.value = 0.15 * this.masterVolume;
        }
    }
}

// Global audio manager instance
const audioManager = new AudioManager();

// Initialize audio context on user interaction (required by browsers)
document.addEventListener('click', () => {
    if (audioManager.audioContext && audioManager.audioContext.state === 'suspended') {
        audioManager.audioContext.resume();
    }
}, { once: true });

