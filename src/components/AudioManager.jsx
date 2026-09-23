import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* =========================================================
   VIBESPACE AUDIO DATABASE
   ========================================================= */

export const MUSIC_DATABASE = [
  {
    id: "deep-sleep",
    title: "Deep Sleep",
    artist: "VibeSpace",
    src: "/audio/deep sleep.mp3",
    tags: ["sleeping", "deep sleep", "peaceful", "relax", "night"],
    artwork: "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "lofi-song",
    title: "Lofi Song",
    artist: "VibeSpace",
    src: "/audio/lofi-song.mp3",
    tags: ["coding", "deep focus", "study", "relax"],
    artwork: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "peaceful-music",
    title: "Peaceful Music",
    artist: "VibeSpace",
    src: "/audio/peaceful-music-.mp3",
    tags: ["relax", "peaceful", "calm"],
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "road-trp",
    title: "Road Trip",
    artist: "VibeSpace",
    src: "/audio/road trp.mp3",
    tags: ["driving", "chilling", "relax"],
    artwork: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "alone",
    title: "Alone",
    artist: "VibeSpace",
    src: "/audio/alone.mp3",
    tags: ["night", "dreamy", "melancholic"],
    artwork: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "taly-coffee",
    title: "Taly Coffee Music",
    artist: "VibeSpace",
    src: "/audio/taly-coffee-music.mp3",
    tags: ["coffee", "reading", "study", "cozy"],
    artwork: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "evening-sun",
    title: "Evening Sun",
    artist: "VibeSpace",
    src: "/audio/evening-sun.mp3",
    tags: ["sunset", "relax", "calm"],
    artwork: "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dreamy-evening",
    title: "Dreamy Evening",
    artist: "VibeSpace",
    src: "/audio/dreamy-evening.mp3",
    tags: ["dreamy", "creative", "relax"],
    artwork: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "deep-focus",
    title: "Deep Focus",
    artist: "VibeSpace",
    src: "/audio/deep-focus.mp3",
    tags: ["focus", "coding", "studying"],
    artwork: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "study-music1",
    title: "Study Music 1",
    artist: "VibeSpace",
    src: "/audio/study-music1.mp3",
    tags: ["study", "reading", "focus"],
    artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "study-music",
    title: "Study Music",
    artist: "VibeSpace",
    src: "/audio/study-music.mp3",
    tags: ["study", "quiet"],
    artwork: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "night-piano",
    title: "Night Piano Midnight",
    artist: "VibeSpace",
    src: "/audio/night-piano-midnight.mp3",
    tags: ["midnight", "piano", "sleep", "relax"],
    artwork: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "lofi-midnight",
    title: "Lofi Midnight",
    artist: "VibeSpace",
    src: "/audio/lofi-midnight.mp3",
    tags: ["midnight", "coding", "relax"],
    artwork: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "relax-music-1",
    title: "Relax Music",
    artist: "VibeSpace",
    src: "/audio/relax-music-1.mp3",
    tags: ["relax", "calm", "sleep"],
    artwork: "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=300&q=80",
  },
];

/* =========================================================
   AMBIENT SOUND DATABASE
   ========================================================= */

const AMBIENT_DATABASE = [
  {
    id: "rain",
    name: "Rain",
    src: "/audio/mixkit-long-rain-ambience-1247.wav",
  },
  {
    id: "coffee",
    name: "Coffee Shop",
    src: "/audio/mixkit-restaurant-crowd-talking-ambience-444.wav",
  },
  {
    id: "fireplace",
    name: "Fireplace",
    src: "/audio/mixkit-night-forest-with-insects-2414.wav",
  },
  {
    id: "wind",
    name: "Wind",
    src: "/audio/mixkit-wind-blowing-ambience-2658.wav",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    src: "/audio/mixkit-sea-waves-loop-1196.wav",
  },
  {
    id: "forest",
    name: "Forest",
    src: "/audio/mixkit-wind-in-the-forest-1237.wav",
  },
  {
    id: "birds",
    name: "Birds",
    src: "/audio/mixkit-forest-birds-singing-1212.wav",
  },
  {
    id: "thunder",
    name: "Thunder",
    src: "/audio/mixkit-thunder-rumble-during-a-storm-2395.wav",
  },
  {
    id: "city",
    name: "City Traffic",
    src: "/audio/mixkit-city-traffic-background-ambience-2930.wav",
  },
];

/* =========================================================
   CONTEXT & PROVIDER
   ========================================================= */

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [activity, setActivity] = useState("Coding");
  const [feeling, setFeeling] = useState("Deep Focus");
  const [environment, setEnvironment] = useState("Rainy Window");
  const [intensity, setIntensity] = useState("Balanced");

  const [hasSubmittedSituation, setHasSubmittedSituation] = useState(false);

  // Dynamic Theme State (Dark / Light Mode Toggle)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("vibespace-theme") !== "light";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("vibespace-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("vibespace-theme", "light");
    }
  }, [isDarkMode]);

  // Custom User Presets State
  const [savedMixes, setSavedMixes] = useState(() => {
    try {
      const saved = localStorage.getItem("vibespace-custom-mixes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const heroAudioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(MUSIC_DATABASE[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [masterVolume, setMasterVolumeState] = useState(1);

  const ambientRefs = useRef({});
  const [ambientLayers, setAmbientLayers] = useState(() =>
    AMBIENT_DATABASE.map((item) => ({
      ...item,
      volume: 0,
      isMuted: false,
    }))
  );

  const log = (...args) => console.log("[VibeSpace Audio]", ...args);
  const errorLog = (...args) => console.error("[VibeSpace Audio]", ...args);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    heroAudioRef.current = audio;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setTimeout(() => playNextTrack(), 300);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (event) => errorLog("AUDIO ERROR", event);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      heroAudioRef.current = null;
    };
  }, []);

  // Global Keyboard Shortcuts (Space for Play/Pause, Arrow keys for skipping tracks)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        playNextTrack();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        playPreviousTrack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (!heroAudioRef.current) return;
    heroAudioRef.current.volume = volume * masterVolume;
  }, [volume, masterVolume]);

  const loadTrack = async (track, shouldPlay = false) => {
    const audio = heroAudioRef.current;
    if (!audio || !track) return false;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.src = track.src;
      audio.volume = volume * masterVolume;
      audio.load();
      setCurrentTrack(track);
      setCurrentTime(0);
      setDuration(0);

      if (shouldPlay) {
        await audio.play();
        setIsPlaying(true);
        return true;
      }
      return true;
    } catch (error) {
      errorLog("Track load/play failed:", track.title, error);
      return false;
    }
  };

  const playTrack = async (track) => {
    if (!track) return;
    const audio = heroAudioRef.current;
    if (!audio) return;

    if (currentTrack?.id === track.id && audio.src) {
      try {
        await audio.play();
        setIsPlaying(true);
        return;
      } catch (error) {
        errorLog("Resume failed:", error);
      }
    }
    await loadTrack(track, true);
  };

  const togglePlayPause = async () => {
    const audio = heroAudioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        if (!audio.src) {
          await loadTrack(currentTrack, true);
          return;
        }
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      errorLog("Play/Pause error:", error);
    }
  };

  const playNextTrack = async () => {
    if (!currentTrack) return;
    const index = MUSIC_DATABASE.findIndex((track) => track.id === currentTrack.id);
    const nextIndex = index === -1 ? 0 : (index + 1) % MUSIC_DATABASE.length;
    await loadTrack(MUSIC_DATABASE[nextIndex], true);
  };

  const playPreviousTrack = async () => {
    if (!currentTrack) return;
    const index = MUSIC_DATABASE.findIndex((track) => track.id === currentTrack.id);
    const previousIndex = index <= 0 ? MUSIC_DATABASE.length - 1 : index - 1;
    await loadTrack(MUSIC_DATABASE[previousIndex], true);
  };

  const seekTo = (time) => {
    const audio = heroAudioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    try {
      audio.currentTime = Math.max(0, Math.min(time, audio.duration || time));
      setCurrentTime(audio.currentTime);
    } catch (error) {
      errorLog("Seek error:", error);
    }
  };

  const setVolume = (value) => {
    const safeValue = Math.max(0, Math.min(1, Number(value)));
    setVolumeState(safeValue);
    if (heroAudioRef.current) {
      heroAudioRef.current.volume = safeValue * masterVolume;
    }
  };

  const setMasterVolume = (value) => {
    const safeValue = Math.max(0, Math.min(1, Number(value)));
    setMasterVolumeState(safeValue);

    if (heroAudioRef.current) {
      heroAudioRef.current.volume = volume * safeValue;
    }

    Object.entries(ambientRefs.current).forEach(([id, audio]) => {
      const layer = ambientLayers.find((item) => item.id === id);
      if (!layer || !audio) return;
      audio.volume = layer.volume * safeValue * (layer.isMuted ? 0 : 1);
    });
  };

  useEffect(() => {
    AMBIENT_DATABASE.forEach((layer) => {
      const audio = new Audio();
      audio.preload = "auto";
      audio.loop = true;
      audio.volume = 0;
      audio.src = layer.src;
      ambientRefs.current[layer.id] = audio;
    });

    return () => {
      Object.values(ambientRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
        audio.load();
      });
      ambientRefs.current = {};
    };
  }, []);

  const setAmbientVolume = async (id, value) => {
    const safeValue = Math.max(0, Math.min(1, Number(value)));
    const layer = ambientLayers.find((item) => item.id === id);
    const audio = ambientRefs.current[id];
    if (!layer || !audio) return;

    setAmbientLayers((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, volume: safeValue, isMuted: safeValue === 0 ? item.isMuted : false }
          : item
      )
    );

    audio.volume = safeValue * masterVolume * (layer.isMuted ? 0 : 1);

    if (safeValue > 0) {
      try {
        await audio.play();
      } catch (error) {
        errorLog(`Ambient play failed: ${layer.name}`, error);
      }
    } else {
      audio.pause();
    }
  };

  const toggleAmbientMute = async (id) => {
    const layer = ambientLayers.find((item) => item.id === id);
    const audio = ambientRefs.current[id];
    if (!layer || !audio) return;

    const newMuted = !layer.isMuted;
    setAmbientLayers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isMuted: newMuted } : item))
    );

    if (newMuted) {
      audio.volume = 0;
    } else {
      audio.volume = layer.volume * masterVolume;
      if (layer.volume > 0) {
        try {
          await audio.play();
        } catch (error) {
          errorLog(`Ambient resume failed: ${layer.name}`, error);
        }
      }
    }
  };

  const saveCustomMix = (mixName) => {
    const activeMixData = ambientLayers.map(l => ({ id: l.id, volume: l.volume }));
    const newMix = {
      id: Date.now(),
      name: mixName || `Custom Mix ${savedMixes.length + 1}`,
      layers: activeMixData,
    };
    const updated = [...savedMixes, newMix];
    setSavedMixes(updated);
    localStorage.setItem("vibespace-custom-mixes", JSON.stringify(updated));
  };

  const loadCustomMix = async (mix) => {
    for (const savedLayer of mix.layers) {
      await setAmbientVolume(savedLayer.id, savedLayer.volume);
    }
  };

  const deleteCustomMix = (id) => {
    const updated = savedMixes.filter(m => m.id !== id);
    setSavedMixes(updated);
    localStorage.setItem("vibespace-custom-mixes", JSON.stringify(updated));
  };

  const submitSituation = (newActivity, newFeeling, newEnvironment, newIntensity) => {
    if (newActivity) setActivity(newActivity);
    if (newFeeling) setFeeling(newFeeling);
    if (newEnvironment) setEnvironment(newEnvironment);
    if (newIntensity) setIntensity(newIntensity);
    setHasSubmittedSituation(true);
  };

  const recommendedTrack = useMemo(() => {
    const words = [activity, feeling, environment, intensity].join(" ").toLowerCase();
    let bestTrack = MUSIC_DATABASE[0];
    let bestScore = -1;

    MUSIC_DATABASE.forEach((track) => {
      let score = 0;
      track.tags.forEach((tag) => {
        if (words.includes(tag.toLowerCase())) score += 2;
      });
      if (score > bestScore) {
        bestScore = score;
        bestTrack = track;
      }
    });

    return bestTrack;
  }, [activity, feeling, environment, intensity]);

  useEffect(() => {
    if (!hasSubmittedSituation || !recommendedTrack) return;
    if (!isPlaying && currentTrack?.id !== recommendedTrack.id) {
      setCurrentTrack(recommendedTrack);
    }
  }, [hasSubmittedSituation, recommendedTrack]);

  const saveVibe = (name) => {
    try {
      const existing = JSON.parse(localStorage.getItem("vibespace-saved-vibes") || "[]");
      const vibe = {
        id: Date.now(),
        name: name || `${environment} ${activity}`,
        activity,
        feeling,
        environment,
        intensity,
        track: currentTrack?.title || "",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("vibespace-saved-vibes", JSON.stringify([...existing, vibe]));
    } catch (error) {
      errorLog("Could not save vibe:", error);
    }
  };

  const surpriseMe = () => {
    const activities = ["Studying", "Coding", "Working", "Reading", "Sleeping", "Relaxing"];
    const feelings = ["Calm", "Deep Focus", "Dreamy", "Cozy", "Peaceful"];
    const environments = ["Rainy Window", "Coffee Shop", "Midnight City", "Forest Cabin", "Ocean"];
    const intensities = ["Quiet", "Balanced", "Immersive"];

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const newActivity = random(activities);
    const newFeeling = random(feelings);
    const newEnvironment = random(environments);
    const newIntensity = random(intensities);

    setActivity(newActivity);
    setFeeling(newFeeling);
    setEnvironment(newEnvironment);
    setIntensity(newIntensity);

    return { activity: newActivity, feeling: newFeeling, environment: newEnvironment, intensity: newIntensity };
  };

  const value = {
    activity, setActivity,
    feeling, setFeeling,
    environment, setEnvironment,
    intensity, setIntensity,
    hasSubmittedSituation, setHasSubmittedSituation,
    submitSituation,
    surpriseMe,
    currentTrack, setCurrentTrack,
    isPlaying,
    playTrack, togglePlayPause,
    nextTrack: playNextTrack,
    prevTrack: playPreviousTrack,
    currentTime, duration, seekTo,
    volume, setVolume,
    ambientLayers, setAmbientVolume, toggleAmbientMute,
    masterVolume, setMasterVolume,
    recommendedTrack,
    saveVibe,
    savedMixes, saveCustomMix, loadCustomMix, deleteCustomMix,
    isDarkMode, setIsDarkMode,
    MUSIC_DATABASE,
    AMBIENT_DATABASE,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used inside AudioProvider");
  }
  return context;
};

export default AudioProvider;