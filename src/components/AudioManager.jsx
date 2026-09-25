import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* =========================================================
   MUSIC DATABASE
========================================================= */

export const MUSIC_DATABASE = [
  {
    id: "deep-sleep",
    title: "Deep Sleep",
    artist: "VibeSpace",
    src: "/audio/deep sleep.mp3",
    tags: ["sleeping", "sleep", "peaceful", "relax", "night", "calm"],
    artwork:
      "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "lofi-song",
    title: "Lofi Song",
    artist: "VibeSpace",
    src: "/audio/lofi-song.mp3",
    tags: ["coding", "deep focus", "study", "relax", "working"],
    artwork:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "peaceful-music",
    title: "Peaceful Music",
    artist: "VibeSpace",
    src: "/audio/peaceful-music-.mp3",
    tags: ["relax", "peaceful", "calm", "quiet", "sleeping"],
    artwork:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "road-trp",
    title: "Road Trip",
    artist: "VibeSpace",
    src: "/audio/road trp.mp3",
    tags: ["driving", "chilling", "relax", "road trip", "midnight city"],
    artwork:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "alone",
    title: "Alone",
    artist: "VibeSpace",
    src: "/audio/alone.mp3",
    tags: ["night", "dreamy", "melancholic", "alone", "midnight"],
    artwork:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "taly-coffee",
    title: "Taly Coffee Music",
    artist: "VibeSpace",
    src: "/audio/taly-coffee-music.mp3",
    tags: ["coffee", "reading", "study", "cozy", "coffee shop"],
    artwork:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "evening-sun",
    title: "Evening Sun",
    artist: "VibeSpace",
    src: "/audio/evening-sun.mp3",
    tags: ["sunset", "relax", "calm", "evening", "peaceful"],
    artwork:
      "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "dreamy-evening",
    title: "Dreamy Evening",
    artist: "VibeSpace",
    src: "/audio/dreamy-evening.mp3",
    tags: ["dreamy", "creative", "relax", "creating", "romantic"],
    artwork:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "deep-focus",
    title: "Deep Focus",
    artist: "VibeSpace",
    src: "/audio/deep-focus.mp3",
    tags: ["focus", "coding", "studying", "working", "deep focus"],
    artwork:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "study-music1",
    title: "Study Music 1",
    artist: "VibeSpace",
    src: "/audio/study-music1.mp3",
    tags: ["study", "reading", "focus", "studying", "quiet"],
    artwork:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "study-music",
    title: "Study Music",
    artist: "VibeSpace",
    src: "/audio/study-music.mp3",
    tags: ["study", "quiet", "reading", "calm"],
    artwork:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "night-piano",
    title: "Night Piano Midnight",
    artist: "VibeSpace",
    src: "/audio/night-piano-midnight.mp3",
    tags: ["midnight", "piano", "sleep", "relax", "night", "calm"],
    artwork:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "lofi-midnight",
    title: "Lofi Midnight",
    artist: "VibeSpace",
    src: "/audio/lofi-midnight.mp3",
    tags: ["midnight", "coding", "relax", "night", "deep focus"],
    artwork:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "relax-music-1",
    title: "Relax Music",
    artist: "VibeSpace",
    src: "/audio/relax-music-1.mp3",
    tags: ["relax", "calm", "sleep", "peaceful", "quiet"],
    artwork:
      "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=900&q=85",
  },
];

/* =========================================================
   AMBIENT DATABASE
========================================================= */

export const AMBIENT_DATABASE = [
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
   CONTEXT
========================================================= */

const AudioContext = createContext(null);

/* =========================================================
   PROVIDER
========================================================= */

export const AudioProvider = ({ children }) => {
  const [activity, setActivity] = useState("Coding");
  const [feeling, setFeeling] = useState("Deep Focus");
  const [environment, setEnvironment] = useState("Rainy Window");
  const [intensity, setIntensity] = useState("Balanced");

  const [hasSubmittedSituation, setHasSubmittedSituation] =
    useState(false);

  /* =======================================================
     WOW MOMENT STATE
  ======================================================= */

  const [isVibeRevealing, setIsVibeRevealing] = useState(false);

  const [vibeRevealData, setVibeRevealData] = useState(null);

  /* =======================================================
     THEME
  ======================================================= */

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem("vibespace-theme") !== "light";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("vibespace-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("vibespace-theme", "light");
      }
    } catch (error) {
      console.error(error);
    }
  }, [isDarkMode]);

  /* =======================================================
     SAVED MIXES
  ======================================================= */

  const [savedMixes, setSavedMixes] = useState(() => {
    try {
      const saved = localStorage.getItem("vibespace-custom-mixes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  /* =======================================================
     HERO AUDIO
  ======================================================= */

  const heroAudioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const currentTrackRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolumeState] = useState(0.8);
  const [masterVolume, setMasterVolumeState] = useState(1);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  /* =======================================================
     AMBIENT
  ======================================================= */

  const ambientRefs = useRef({});

  const [ambientLayers, setAmbientLayers] = useState(() =>
    AMBIENT_DATABASE.map((item) => ({
      ...item,
      volume: 0,
      isMuted: false,
    }))
  );

  /* =======================================================
     HERO AUDIO ENGINE
  ======================================================= */

  useEffect(() => {
    const audio = new Audio();

    audio.preload = "auto";
    audio.volume = volume * masterVolume;

    heroAudioRef.current = audio;

    const onLoadedMetadata = () => {
      setDuration(
        Number.isFinite(audio.duration) ? audio.duration : 0
      );
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onPlay = () => {
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);

      const track = currentTrackRef.current;

      if (!track) return;

      const index = MUSIC_DATABASE.findIndex(
        (item) => item.id === track.id
      );

      const nextIndex =
        index === -1
          ? 0
          : (index + 1) % MUSIC_DATABASE.length;

      const nextTrack = MUSIC_DATABASE[nextIndex];

      audio.pause();
      audio.removeAttribute("src");
      audio.load();

      setCurrentTrack(nextTrack);
      currentTrackRef.current = nextTrack;

      setCurrentTime(0);
      setDuration(0);

      audio.src = nextTrack.src;
      audio.volume = volume * masterVolume;

      audio.load();

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    const onError = () => {
      console.error("[VibeSpace] AUDIO ERROR", {
        src: audio.src,
        error: audio.error,
      });

      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();

      audio.removeEventListener(
        "loadedmetadata",
        onLoadedMetadata
      );
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);

      heroAudioRef.current = null;
    };
  }, []);

  /* =======================================================
     HERO VOLUME
  ======================================================= */

  useEffect(() => {
    if (!heroAudioRef.current) return;

    heroAudioRef.current.volume = volume * masterVolume;
  }, [volume, masterVolume]);

  /* =======================================================
     LOAD TRACK
  ======================================================= */

  const loadTrack = async (track, autoPlay = false) => {
    const audio = heroAudioRef.current;

    if (!audio || !track) return false;

    try {
      audio.pause();

      audio.removeAttribute("src");
      audio.load();

      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);

      audio.src = track.src;
      audio.volume = volume * masterVolume;

      setCurrentTrack(track);
      currentTrackRef.current = track;

      audio.load();

      if (autoPlay) {
        await audio.play();
        setIsPlaying(true);
      }

      return true;
    } catch (error) {
      console.error("[VibeSpace] LOAD ERROR:", error);
      setIsPlaying(false);
      return false;
    }
  };

  /* =======================================================
     FADE HERO MUSIC
  ======================================================= */

  const fadeInHeroMusic = async (
    track,
    durationMs = 1800
  ) => {
    const audio = heroAudioRef.current;

    if (!audio || !track) return;

    try {
      audio.pause();

      audio.removeAttribute("src");
      audio.load();

      setCurrentTime(0);
      setDuration(0);

      audio.src = track.src;
      audio.volume = 0;

      setCurrentTrack(track);
      currentTrackRef.current = track;

      audio.load();

      await audio.play();

      setIsPlaying(true);

      const targetVolume = volume * masterVolume;
      const steps = 36;
      const stepTime = durationMs / steps;

      for (let step = 1; step <= steps; step++) {
        await new Promise((resolve) =>
          setTimeout(resolve, stepTime)
        );

        if (!heroAudioRef.current) return;

        audio.volume =
          targetVolume * (step / steps);
      }

      audio.volume = targetVolume;
    } catch (error) {
      console.error(
        "[VibeSpace] Fade music error:",
        error
      );

      audio.volume = volume * masterVolume;

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  /* =======================================================
     PLAY TRACK
  ======================================================= */

  const playTrack = async (track) => {
    if (!track) return;

    const audio = heroAudioRef.current;

    if (!audio) return;

    try {
      if (
        currentTrackRef.current?.id === track.id &&
        audio.src &&
        audio.src !== window.location.href
      ) {
        await audio.play();
        setIsPlaying(true);
        return;
      }

      await loadTrack(track, true);
    } catch (error) {
      console.error("[VibeSpace] playTrack ERROR:", error);
      setIsPlaying(false);
    }
  };

  /* =======================================================
     PLAY / PAUSE
  ======================================================= */

  const togglePlayPause = async () => {
    const audio = heroAudioRef.current;

    if (!audio || !currentTrackRef.current) return;

    try {
      if (!audio.paused) {
        audio.pause();
        return;
      }

      if (
        !audio.src ||
        audio.src === window.location.href
      ) {
        await loadTrack(
          currentTrackRef.current,
          true
        );

        return;
      }

      await audio.play();

      setIsPlaying(true);
    } catch (error) {
      console.error("[VibeSpace] PLAY ERROR:", error);
      setIsPlaying(false);
    }
  };

  /* =======================================================
     NEXT TRACK
  ======================================================= */

  const playNextTrack = async () => {
    const current = currentTrackRef.current;

    if (!current) return;

    const index = MUSIC_DATABASE.findIndex(
      (track) => track.id === current.id
    );

    const nextIndex =
      index === -1
        ? 0
        : (index + 1) % MUSIC_DATABASE.length;

    await loadTrack(
      MUSIC_DATABASE[nextIndex],
      true
    );
  };

  /* =======================================================
     PREVIOUS TRACK
  ======================================================= */

  const playPreviousTrack = async () => {
    const current = currentTrackRef.current;

    if (!current) return;

    const index = MUSIC_DATABASE.findIndex(
      (track) => track.id === current.id
    );

    const previousIndex =
      index <= 0
        ? MUSIC_DATABASE.length - 1
        : index - 1;

    await loadTrack(
      MUSIC_DATABASE[previousIndex],
      true
    );
  };

  /* =======================================================
     SEEK
  ======================================================= */

  const seekTo = (time) => {
    const audio = heroAudioRef.current;

    if (!audio || !currentTrackRef.current) return;

    const safeTime = Math.max(
      0,
      Math.min(
        Number(time) || 0,
        Number.isFinite(audio.duration)
          ? audio.duration
          : Number(time) || 0
      )
    );

    audio.currentTime = safeTime;

    setCurrentTime(safeTime);
  };

  /* =======================================================
     VOLUME
  ======================================================= */

  const setVolume = (value) => {
    const safeValue = Math.max(
      0,
      Math.min(1, Number(value))
    );

    setVolumeState(safeValue);

    if (heroAudioRef.current) {
      heroAudioRef.current.volume =
        safeValue * masterVolume;
    }
  };

  /* =======================================================
     MASTER VOLUME
  ======================================================= */

  const setMasterVolume = (value) => {
    const safeValue = Math.max(
      0,
      Math.min(1, Number(value))
    );

    setMasterVolumeState(safeValue);

    if (heroAudioRef.current) {
      heroAudioRef.current.volume =
        volume * safeValue;
    }

    Object.entries(
      ambientRefs.current
    ).forEach(([id, audio]) => {
      const layer = ambientLayers.find(
        (item) => item.id === id
      );

      if (!layer || !audio) return;

      audio.volume =
        layer.volume *
        safeValue *
        (layer.isMuted ? 0 : 1);
    });
  };

  /* =======================================================
     AMBIENT AUDIO
  ======================================================= */

  useEffect(() => {
    const refs = {};

    AMBIENT_DATABASE.forEach((layer) => {
      const audio = new Audio();

      audio.preload = "auto";
      audio.loop = true;
      audio.volume = 0;
      audio.src = layer.src;

      audio.addEventListener("error", () => {
        console.error(
          "[VibeSpace] Ambient ERROR:",
          layer.name,
          layer.src
        );
      });

      refs[layer.id] = audio;
    });

    ambientRefs.current = refs;

    return () => {
      Object.values(refs).forEach((audio) => {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      });

      ambientRefs.current = {};
    };
  }, []);

  /* =======================================================
     AMBIENT VOLUME
  ======================================================= */

  const setAmbientVolume = async (
    id,
    value
  ) => {
    const safeValue = Math.max(
      0,
      Math.min(1, Number(value))
    );

    const audio = ambientRefs.current[id];

    if (!audio) return;

    const layer = ambientLayers.find(
      (item) => item.id === id
    );

    if (!layer) return;

    const muted =
      safeValue === 0
        ? layer.isMuted
        : false;

    setAmbientLayers((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              volume: safeValue,
              isMuted: muted,
            }
          : item
      )
    );

    audio.volume =
      safeValue *
      masterVolume *
      (muted ? 0 : 1);

    if (safeValue > 0) {
      try {
        await audio.play();
      } catch (error) {
        console.error(
          "[VibeSpace] Ambient PLAY ERROR:",
          layer.name,
          error
        );
      }
    } else {
      audio.pause();
    }
  };

  /* =======================================================
     AMBIENT MUTE
  ======================================================= */

  const toggleAmbientMute = async (id) => {
    const layer = ambientLayers.find(
      (item) => item.id === id
    );

    const audio = ambientRefs.current[id];

    if (!layer || !audio) return;

    const newMuted = !layer.isMuted;

    setAmbientLayers((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isMuted: newMuted,
            }
          : item
      )
    );

    if (newMuted) {
      audio.volume = 0;
      audio.pause();
    } else {
      audio.volume =
        layer.volume * masterVolume;

      if (layer.volume > 0) {
        try {
          await audio.play();
        } catch (error) {
          console.error(
            "[VibeSpace] Ambient RESUME ERROR:",
            error
          );
        }
      }
    }
  };

  /* =======================================================
     RECOMMENDATION
  ======================================================= */

  const getRecommendedTrack = (
    selectedActivity,
    selectedFeeling,
    selectedEnvironment,
    selectedIntensity
  ) => {
    const a = String(
      selectedActivity || ""
    ).toLowerCase();

    const f = String(
      selectedFeeling || ""
    ).toLowerCase();

    const e = String(
      selectedEnvironment || ""
    ).toLowerCase();

    const i = String(
      selectedIntensity || ""
    ).toLowerCase();

    if (a.includes("sleep")) {
      return MUSIC_DATABASE.find(
        (x) => x.id === "deep-sleep"
      );
    }

    if (
      a.includes("coding") &&
      f.includes("deep focus")
    ) {
      return MUSIC_DATABASE.find(
        (x) => x.id === "deep-focus"
      );
    }

    if (a.includes("stud")) {
      if (
        f.includes("deep focus") ||
        i.includes("immersive")
      ) {
        return (
          MUSIC_DATABASE.find(
            (x) => x.id === "deep-focus"
          ) ||
          MUSIC_DATABASE.find(
            (x) => x.id === "study-music1"
          )
        );
      }

      return (
        MUSIC_DATABASE.find(
          (x) => x.id === "study-music"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    if (
      a.includes("read") &&
      e.includes("coffee")
    ) {
      return MUSIC_DATABASE.find(
        (x) => x.id === "taly-coffee"
      );
    }

    if (a.includes("read")) {
      return (
        MUSIC_DATABASE.find(
          (x) => x.id === "study-music1"
        ) ||
        MUSIC_DATABASE.find(
          (x) => x.id === "study-music"
        )
      );
    }

    if (a.includes("driv")) {
      return MUSIC_DATABASE.find(
        (x) => x.id === "road-trp"
      );
    }

    if (a.includes("creat")) {
      return MUSIC_DATABASE.find(
        (x) => x.id === "dreamy-evening"
      );
    }

    if (e.includes("coffee")) {
      return MUSIC_DATABASE.find(
        (x) => x.id === "taly-coffee"
      );
    }

    if (
      e.includes("midnight") ||
      f.includes("melancholic")
    ) {
      return (
        MUSIC_DATABASE.find(
          (x) => x.id === "lofi-midnight"
        ) ||
        MUSIC_DATABASE.find(
          (x) => x.id === "alone"
        )
      );
    }

    if (f.includes("dreamy")) {
      return MUSIC_DATABASE.find(
        (x) => x.id === "dreamy-evening"
      );
    }

    if (
      f.includes("calm") ||
      f.includes("peaceful")
    ) {
      return (
        MUSIC_DATABASE.find(
          (x) => x.id === "peaceful-music"
        ) ||
        MUSIC_DATABASE.find(
          (x) => x.id === "relax-music-1"
        )
      );
    }

    const words =
      `${a} ${f} ${e} ${i}`;

    let bestTrack =
      MUSIC_DATABASE.find(
        (x) => x.id === "peaceful-music"
      ) || MUSIC_DATABASE[0];

    let bestScore = 0;

    MUSIC_DATABASE.forEach((track) => {
      let score = 0;

      track.tags.forEach((tag) => {
        if (
          words.includes(
            tag.toLowerCase()
          )
        ) {
          score += 2;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestTrack = track;
      }
    });

    return bestTrack;
  };

  const recommendedTrack = useMemo(() => {
    return getRecommendedTrack(
      activity,
      feeling,
      environment,
      intensity
    );
  }, [
    activity,
    feeling,
    environment,
    intensity,
  ]);

  /* =======================================================
     AMBIENT PRESETS FOR WOW MOMENT
  ======================================================= */

  const getAtmospherePreset = (
    selectedEnvironment,
    selectedIntensity
  ) => {
    const e = String(
      selectedEnvironment || ""
    ).toLowerCase();

    const immersive =
      String(selectedIntensity || "")
        .toLowerCase()
        .includes("immersive");

    const presets = {
      rain: {
        rain: immersive ? 0.55 : 0.42,
        wind: immersive ? 0.14 : 0.08,
      },

      coffee: {
        coffee: immersive ? 0.38 : 0.28,
      },

      fireplace: {
        fireplace: immersive ? 0.48 : 0.35,
      },

      ocean: {
        ocean: immersive ? 0.52 : 0.38,
        wind: 0.08,
      },

      forest: {
        forest: immersive ? 0.42 : 0.3,
        birds: 0.12,
      },

      midnight: {
        city: immersive ? 0.32 : 0.22,
        wind: 0.06,
      },

      rooftop: {
        wind: immersive ? 0.35 : 0.24,
        city: 0.14,
      },

      library: {
        wind: 0.04,
      },
    };

    if (e.includes("rain")) {
      return presets.rain;
    }

    if (e.includes("coffee")) {
      return presets.coffee;
    }

    if (e.includes("fire")) {
      return presets.fireplace;
    }

    if (e.includes("ocean")) {
      return presets.ocean;
    }

    if (e.includes("forest")) {
      return presets.forest;
    }

    if (e.includes("midnight")) {
      return presets.midnight;
    }

    if (e.includes("rooftop")) {
      return presets.rooftop;
    }

    if (e.includes("library")) {
      return presets.library;
    }

    return {};
  };

  /* =======================================================
     FADE AMBIENT LAYERS
  ======================================================= */

  const fadeInAtmosphere = async (
    preset,
    durationMs = 1800
  ) => {
    const entries = Object.entries(preset);

    if (!entries.length) return;

    const steps = 30;

    entries.forEach(([id]) => {
      const audio = ambientRefs.current[id];

      if (audio) {
        audio.volume = 0;
      }
    });

    for (const [id, target] of entries) {
      const audio = ambientRefs.current[id];

      if (!audio) continue;

      try {
        await audio.play();
      } catch (error) {
        console.error(
          "[VibeSpace] Atmosphere play error:",
          id,
          error
        );
      }

      const stepTime = durationMs / steps;

      for (let step = 1; step <= steps; step++) {
        await new Promise((resolve) =>
          setTimeout(resolve, stepTime)
        );

        if (!ambientRefs.current[id]) return;

        audio.volume =
          target *
          masterVolume *
          (step / steps);
      }

      audio.volume =
        target * masterVolume;

      setAmbientLayers((prev) =>
        prev.map((layer) =>
          layer.id === id
            ? {
                ...layer,
                volume: target,
                isMuted: false,
              }
            : layer
        )
      );
    }
  };

  /* =======================================================
     WOW MOMENT
  ======================================================= */

  const revealVibe = async ({
    activity: nextActivity,
    feeling: nextFeeling,
    environment: nextEnvironment,
    intensity: nextIntensity,
    selectedTrack,
  }) => {
    const atmospherePreset =
      getAtmospherePreset(
        nextEnvironment,
        nextIntensity
      );

    setVibeRevealData({
      activity: nextActivity,
      feeling: nextFeeling,
      environment: nextEnvironment,
      intensity: nextIntensity,
      track: selectedTrack,
    });

    setIsVibeRevealing(true);

    /*
     * Small pause before audio starts.
     * This creates the cinematic reveal feeling.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    /*
     * Start music + ambience together.
     */
    await Promise.all([
      fadeInHeroMusic(
        selectedTrack,
        1800
      ),
      fadeInAtmosphere(
        atmospherePreset,
        1800
      ),
    ]);

    /*
     * Let the visual reveal breathe.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 900)
    );

    setIsVibeRevealing(false);
  };

  /* =======================================================
     SUBMIT SITUATION
  ======================================================= */

  const submitSituation = async (
    newActivity,
    newFeeling,
    newEnvironment,
    newIntensity
  ) => {
    const finalActivity =
      newActivity || activity;

    const finalFeeling =
      newFeeling || feeling;

    const finalEnvironment =
      newEnvironment || environment;

    const finalIntensity =
      newIntensity || intensity;

    const selectedTrack =
      getRecommendedTrack(
        finalActivity,
        finalFeeling,
        finalEnvironment,
        finalIntensity
      );

    setActivity(finalActivity);
    setFeeling(finalFeeling);
    setEnvironment(finalEnvironment);
    setIntensity(finalIntensity);

    /*
     * Stop previous audio.
     */
    const audio =
      heroAudioRef.current;

    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }

    /*
     * Reset ambient layers.
     */
    Object.values(
      ambientRefs.current
    ).forEach((audio) => {
      audio.pause();
      audio.volume = 0;
    });

    setAmbientLayers((prev) =>
      prev.map((layer) => ({
        ...layer,
        volume: 0,
        isMuted: false,
      }))
    );

    /*
     * Set track before reveal.
     */
    setCurrentTrack(selectedTrack);
    currentTrackRef.current =
      selectedTrack;

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    /*
     * Move to result screen.
     */
    setHasSubmittedSituation(true);

    /*
     * Cinematic VibeSpace moment.
     */
    await revealVibe({
      activity: finalActivity,
      feeling: finalFeeling,
      environment: finalEnvironment,
      intensity: finalIntensity,
      selectedTrack,
    });
  };

  /* =======================================================
     SURPRISE ME
  ======================================================= */

  const surpriseMe = () => {
    const activities = [
      "Studying",
      "Coding",
      "Working",
      "Reading",
      "Sleeping",
      "Relaxing",
      "Creating",
      "Driving",
      "Chilling",
    ];

    const feelings = [
      "Calm",
      "Deep Focus",
      "Dreamy",
      "Cozy",
      "Peaceful",
      "Energetic",
      "Romantic",
      "Melancholic",
    ];

    const environments = [
      "Rainy Window",
      "Coffee Shop",
      "Midnight City",
      "Forest Cabin",
      "Ocean",
      "Quiet Library",
      "Fireplace",
      "Rooftop",
    ];

    const intensities = [
      "Quiet",
      "Balanced",
      "Immersive",
    ];

    const random = (array) =>
      array[
        Math.floor(
          Math.random() *
            array.length
        )
      ];

    const result = {
      activity: random(activities),
      feeling: random(feelings),
      environment: random(environments),
      intensity: random(intensities),
    };

    setActivity(result.activity);
    setFeeling(result.feeling);
    setEnvironment(result.environment);
    setIntensity(result.intensity);

    return result;
  };

  /* =======================================================
     SAVE VIBE
  ======================================================= */

  const saveVibe = (name) => {
    try {
      const existing =
        JSON.parse(
          localStorage.getItem(
            "vibespace-saved-vibes"
          ) || "[]"
        );

      const vibe = {
        id: Date.now(),

        name:
          name ||
          `${environment} ${activity}`,

        activity,
        feeling,
        environment,
        intensity,

        track:
          currentTrack?.title || "",

        createdAt:
          new Date().toISOString(),
      };

      localStorage.setItem(
        "vibespace-saved-vibes",
        JSON.stringify([
          ...existing,
          vibe,
        ])
      );
    } catch (error) {
      console.error(
        "[VibeSpace] Save error:",
        error
      );
    }
  };

  /* =======================================================
     CUSTOM MIX
  ======================================================= */

  const saveCustomMix = (mixName) => {
    const mix = {
      id: Date.now(),

      name:
        mixName ||
        `Custom Mix ${
          savedMixes.length + 1
        }`,

      layers: ambientLayers.map(
        (layer) => ({
          id: layer.id,
          volume: layer.volume,
        })
      ),
    };

    const updated = [
      ...savedMixes,
      mix,
    ];

    setSavedMixes(updated);

    localStorage.setItem(
      "vibespace-custom-mixes",
      JSON.stringify(updated)
    );
  };

  const loadCustomMix = async (mix) => {
    for (const layer of mix.layers) {
      await setAmbientVolume(
        layer.id,
        layer.volume
      );
    }
  };

  const deleteCustomMix = (id) => {
    const updated =
      savedMixes.filter(
        (mix) => mix.id !== id
      );

    setSavedMixes(updated);

    localStorage.setItem(
      "vibespace-custom-mixes",
      JSON.stringify(updated)
    );
  };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag =
        document.activeElement?.tagName;

      if (
        [
          "INPUT",
          "TEXTAREA",
          "SELECT",
        ].includes(tag)
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }

      if (e.code === "ArrowRight") {
        e.preventDefault();
        playNextTrack();
      }

      if (e.code === "ArrowLeft") {
        e.preventDefault();
        playPreviousTrack();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value = {
    /* Situation */

    activity,
    setActivity,

    feeling,
    setFeeling,

    environment,
    setEnvironment,

    intensity,
    setIntensity,

    hasSubmittedSituation,
    setHasSubmittedSituation,

    submitSituation,
    surpriseMe,

    /* WOW MOMENT */

    isVibeRevealing,
    vibeRevealData,

    /* Music */

    currentTrack,
    setCurrentTrack,

    isPlaying,

    playTrack,
    togglePlayPause,

    nextTrack: playNextTrack,
    prevTrack: playPreviousTrack,

    currentTime,
    duration,
    seekTo,

    volume,
    setVolume,

    masterVolume,
    setMasterVolume,

    /* Ambient */

    ambientLayers,
    setAmbientVolume,
    toggleAmbientMute,

    /* Recommendation */

    recommendedTrack,

    /* Saved */

    saveVibe,

    savedMixes,
    saveCustomMix,
    loadCustomMix,
    deleteCustomMix,

    /* Theme */

    isDarkMode,
    setIsDarkMode,

    /* Database */

    MUSIC_DATABASE,
    AMBIENT_DATABASE,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

/* =========================================================
   HOOK
========================================================= */

export const useAudio = () => {
  const context =
    useContext(AudioContext);

  if (!context) {
    throw new Error(
      "useAudio must be used inside AudioProvider"
    );
  }

  return context;
};

export default AudioProvider;