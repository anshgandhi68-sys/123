/**
 * Pure Web Audio API Sound Engine.
 * Self-contained, zero external network downloads, 100% reliable across browsers.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientInterval: any = null;
  private ambientGain: GainNode | null = null;

  constructor() {
    // Audio starts muted by default per modern browser autoplay rules
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
      this.startAmbientMusic();
      this.playSparkle();
    } else {
      this.stopAmbientMusic();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Ambient warm, cozy arpeggio for background soundtrack
   */
  private startAmbientMusic(): void {
    if (this.ambientInterval) return;
    const ctx = this.initContext();
    if (!ctx) return;

    // Dreamy pentatonic notes (in Hz): C4, E4, G4, A4, C5, D5, E5, G5
    const notes = [261.63, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 392.0];
    let noteIndex = 0;

    this.ambientInterval = setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      const freq = notes[noteIndex % notes.length];
      noteIndex++;
      this.playTone(freq, 2.2, 0.028, "triangle", 0);
      
      // Add subtle harmony every few beats
      if (noteIndex % 3 === 0) {
        this.playTone(freq * 0.75, 2.5, 0.018, "sine", 0.15);
      }
    }, 850);
  }

  private stopAmbientMusic(): void {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  private playTone(
    freq: number,
    duration = 0.6,
    volume = 0.05,
    type: OscillatorType = "sine",
    delay = 0
  ): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const startTime = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2200, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {
      // Audio errors are safely suppressed
    }
  }

  /**
   * Shimmering sparkle sound effect
   */
  public playSparkle(): void {
    if (this.isMuted) return;
    const sparkleNotes = [1318.51, 1567.98, 2093.0, 2637.02, 3135.96];
    sparkleNotes.forEach((freq, idx) => {
      this.playTone(freq, 0.45, 0.03, "sine", idx * 0.06);
    });
  }

  /**
   * Candle blowing noise effect
   */
  public playCandleBlow(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.5; // 0.5s of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const decay = 1 - i / bufferSize;
        data[i] = (Math.random() * 2 - 1) * decay * decay;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Safe fallback
    }
  }

  /**
   * Magical reveal chime progression
   */
  public playMagicReveal(): void {
    if (this.isMuted) return;
    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    chords.forEach((freq, idx) => {
      this.playTone(freq, 1.8, 0.06, "triangle", idx * 0.12);
    });
  }

  /**
   * Paper rustle / envelope opening sound
   */
  public playPaperRustle(): void {
    if (this.isMuted) return;
    this.playTone(420, 0.25, 0.03, "sine", 0);
    this.playTone(680, 0.35, 0.02, "triangle", 0.08);
  }

  public destroy(): void {
    this.stopAmbientMusic();
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
  }
}

export const soundEngine = new SoundEngine();
