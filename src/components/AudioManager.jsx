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
    tags: ["sleeping", "sleep", "peaceful", "relax", "night", "calm"],
    artwork:
      "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "lofi-song",
    title: "Lofi Song",
    artist: "VibeSpace",
    src: "/audio/lofi-song.mp3",
    tags: ["coding", "deep focus", "study", "relax", "working"],
    artwork:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "peaceful-music",
    title: "Peaceful Music",
    artist: "VibeSpace",
    src: "/audio/peaceful-music-.mp3",
    tags: ["relax", "peaceful", "calm", "quiet", "sleeping"],
    artwork:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "road-trp",
    title: "Road Trip",
    artist: "VibeSpace",
    src: "/audio/road trp.mp3",
    tags: ["driving", "chilling", "relax", "road trip", "midnight city"],
    artwork:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "alone",
    title: "Alone",
    artist: "VibeSpace",
    src: "/audio/alone.mp3",
    tags: ["night", "dreamy", "melancholic", "alone", "midnight"],
    artwork:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "taly-coffee",
    title: "Taly Coffee Music",
    artist: "VibeSpace",
    src: "/audio/taly-coffee-music.mp3",
    tags: ["coffee", "reading", "study", "cozy", "coffee shop"],
    artwork:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "evening-sun",
    title: "Evening Sun",
    artist: "VibeSpace",
    src: "/audio/evening-sun.mp3",
    tags: ["sunset", "relax", "calm", "evening", "peaceful"],
    artwork:
      "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "dreamy-evening",
    title: "Dreamy Evening",
    artist: "VibeSpace",
    src: "/audio/dreamy-evening.mp3",
    tags: ["dreamy", "creative", "relax", "creating", "romantic"],
    artwork:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "deep-focus",
    title: "Deep Focus",
    artist: "VibeSpace",
    src: "/audio/deep-focus.mp3",
    tags: ["focus", "coding", "studying", "working", "deep focus"],
    artwork:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "study-music1",
    title: "Study Music 1",
    artist: "VibeSpace",
    src: "/audio/study-music1.mp3",
    tags: ["study", "reading", "focus", "studying", "quiet"],
    artwork:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "study-music",
    title: "Study Music",
    artist: "VibeSpace",
    src: "/audio/study-music.mp3",
    tags: ["study", "quiet", "reading", "calm"],
    artwork:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "night-piano",
    title: "Night Piano Midnight",
    artist: "VibeSpace",
    src: "/audio/night-piano-midnight.mp3",
    tags: ["midnight", "piano", "sleep", "relax", "night", "calm"],
    artwork:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "lofi-midnight",
    title: "Lofi Midnight",
    artist: "VibeSpace",
    src: "/audio/lofi-midnight.mp3",
    tags: ["midnight", "coding", "relax", "night", "deep focus"],
    artwork:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "relax-music-1",
    title: "Relax Music",
    artist: "VibeSpace",
    src: "/audio/relax-music-1.mp3",
    tags: ["relax", "calm", "sleep", "peaceful", "quiet"],
    artwork:
      "https://images.unsplash.com/photo-1532763303805-529d595877c5?auto=format&fit=crop&w=300&q=80",
  },
];

/* =========================================================
   AMBIENT SOUND DATABASE
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
  /* -------------------------------------------------------
     SITUATION STATE
  ------------------------------------------------------- */

  const [activity, setActivity] = useState("Coding");
  const [feeling, setFeeling] = useState("Deep Focus");
  const [environment, setEnvironment] = useState("Rainy Window");
  const [intensity, setIntensity] = useState("Balanced");

  const [hasSubmittedSituation, setHasSubmittedSituation] =
    useState(false);

  /* -------------------------------------------------------
     THEME
  ------------------------------------------------------- */

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
      console.error("[VibeSpace Theme]", error);
    }
  }, [isDarkMode]);

  /* -------------------------------------------------------
     SAVED MIXES
  ------------------------------------------------------- */

  const [savedMixes, setSavedMixes] = useState(() => {
    try {
      const saved = localStorage.getItem("vibespace-custom-mixes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  /* -------------------------------------------------------
     HERO AUDIO
  ------------------------------------------------------- */

  const heroAudioRef = useRef(null);

  /*
    IMPORTANT:
    Do NOT make Deep Sleep the automatic playing track.

    It can remain the initial selected track because the player
    needs a track object, but isPlaying stays false.
  */

  const [currentTrack, setCurrentTrack] = useState(
    MUSIC_DATABASE[0]
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolumeState] = useState(0.8);
  const [masterVolume, setMasterVolumeState] = useState(1);

  /* -------------------------------------------------------
     AMBIENT AUDIO
  ------------------------------------------------------- */

  const ambientRefs = useRef({});

  const [ambientLayers, setAmbientLayers] = useState(() =>
    AMBIENT_DATABASE.map((item) => ({
      ...item,
      volume: 0,
      isMuted: false,
    }))
  );

  /* -------------------------------------------------------
     DEBUG HELPERS
  ------------------------------------------------------- */

  const log = (...args) => {
    console.log("[VibeSpace Audio]", ...args);
  };

  const errorLog = (...args) => {
    console.error("[VibeSpace Audio]", ...args);
  };

  /* =========================================================
     HERO AUDIO ELEMENT
     ========================================================= */

  useEffect(() => {
    const audio = new Audio();

    audio.preload = "metadata";

    heroAudioRef.current = audio;

    const handleLoadedMetadata = () => {
      log(
        "Audio metadata loaded:",
        audio.src,
        "duration:",
        audio.duration
      );

      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);

      setTimeout(() => {
        playNextTrack();
      }, 300);
    };

    const handlePlay = () => {
      log("Hero audio PLAY event");
      setIsPlaying(true);
    };

    const handlePause = () => {
      log("Hero audio PAUSE event");
      setIsPlaying(false);
    };

    const handleError = (event) => {
      errorLog("HERO AUDIO ERROR:", {
        event,
        src: audio.src,
        error: audio.error,
      });
    };

    const handleCanPlay = () => {
      log("Hero audio can play:", audio.src);
    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener("ended", handleEnded);

    audio.addEventListener("play", handlePlay);

    audio.addEventListener("pause", handlePause);

    audio.addEventListener("error", handleError);

    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.pause();

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener("ended", handleEnded);

      audio.removeEventListener("play", handlePlay);

      audio.removeEventListener("pause", handlePause);

      audio.removeEventListener("error", handleError);

      audio.removeEventListener("canplay", handleCanPlay);

      heroAudioRef.current = null;
    };
  }, []);

  /* =========================================================
     KEYBOARD SHORTCUTS
     ========================================================= */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          document.activeElement?.tagName
        )
      ) {
        return;
      }

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

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [currentTrack, isPlaying]);

  /* =========================================================
     HERO VOLUME
     ========================================================= */

  useEffect(() => {
    if (!heroAudioRef.current) return;

    heroAudioRef.current.volume =
      volume * masterVolume;
  }, [volume, masterVolume]);

  /* =========================================================
     LOAD TRACK
     ========================================================= */

  const loadTrack = async (
    track,
    shouldPlay = false
  ) => {
    const audio = heroAudioRef.current;

    if (!audio || !track) {
      errorLog("Cannot load track:", {
        audioExists: !!audio,
        track,
      });

      return false;
    }

    try {
      log("Loading track:", track.title);
      log("Audio path:", track.src);

      audio.pause();

      audio.currentTime = 0;

      audio.src = track.src;

      audio.volume =
        volume * masterVolume;

      audio.load();

      setCurrentTrack(track);

      setCurrentTime(0);

      setDuration(0);

      /*
        IMPORTANT:
        shouldPlay=false only selects the track.
        It does NOT start audio.
      */

      if (shouldPlay) {
        log("Attempting to play:", track.title);

        await audio.play();

        setIsPlaying(true);

        log("Playback started:", track.title);

        return true;
      }

      return true;
    } catch (error) {
      errorLog(
        "Track load/play failed:",
        track.title,
        error
      );

      setIsPlaying(false);

      return false;
    }
  };

  /* =========================================================
     PLAY TRACK
     ========================================================= */

  const playTrack = async (track) => {
    if (!track) return;

    const audio = heroAudioRef.current;

    if (!audio) {
      errorLog("Hero audio element not ready.");
      return;
    }

    if (
      currentTrack?.id === track.id &&
      audio.src
    ) {
      try {
        log("Resuming:", track.title);

        await audio.play();

        setIsPlaying(true);

        return;
      } catch (error) {
        errorLog(
          "Resume failed:",
          track.title,
          error
        );

        setIsPlaying(false);
      }
    }

    await loadTrack(track, true);
  };

  /* =========================================================
     PLAY / PAUSE
     ========================================================= */

  const togglePlayPause = async () => {
    const audio = heroAudioRef.current;

    if (!audio) {
      errorLog("Audio element missing.");
      return;
    }

    try {
      if (audio.paused) {
        /*
          If current track has not been loaded yet,
          load it first.
        */

        if (!audio.src) {
          await loadTrack(currentTrack, true);
          return;
        }

        log(
          "Play button clicked:",
          currentTrack?.title
        );

        log("Source:", audio.src);

        await audio.play();

        setIsPlaying(true);
      } else {
        log("Pause button clicked");

        audio.pause();

        setIsPlaying(false);
      }
    } catch (error) {
      errorLog(
        "Play/Pause error:",
        error
      );

      setIsPlaying(false);
    }
  };

  /* =========================================================
     NEXT TRACK
     ========================================================= */

  const playNextTrack = async () => {
    if (!currentTrack) return;

    const index =
      MUSIC_DATABASE.findIndex(
        (track) =>
          track.id === currentTrack.id
      );

    const nextIndex =
      index === -1
        ? 0
        : (index + 1) %
          MUSIC_DATABASE.length;

    await loadTrack(
      MUSIC_DATABASE[nextIndex],
      true
    );
  };

  /* =========================================================
     PREVIOUS TRACK
     ========================================================= */

  const playPreviousTrack = async () => {
    if (!currentTrack) return;

    const index =
      MUSIC_DATABASE.findIndex(
        (track) =>
          track.id === currentTrack.id
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

  /* =========================================================
     SEEK
     ========================================================= */

  const seekTo = (time) => {
    const audio = heroAudioRef.current;

    if (
      !audio ||
      !Number.isFinite(time)
    ) {
      return;
    }

    try {
      audio.currentTime = Math.max(
        0,
        Math.min(
          time,
          audio.duration || time
        )
      );

      setCurrentTime(
        audio.currentTime
      );
    } catch (error) {
      errorLog(
        "Seek error:",
        error
      );
    }
  };

  /* =========================================================
     HERO VOLUME
     ========================================================= */

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

  /* =========================================================
     MASTER VOLUME
     ========================================================= */

  const setMasterVolume = (value) => {
    const safeValue = Math.max(
      0,
      Math.min(1, Number(value))
    );

    setMasterVolumeState(
      safeValue
    );

    if (heroAudioRef.current) {
      heroAudioRef.current.volume =
        volume * safeValue;
    }

    Object.entries(
      ambientRefs.current
    ).forEach(([id, audio]) => {
      const layer =
        ambientLayers.find(
          (item) => item.id === id
        );

      if (!layer || !audio) return;

      audio.volume =
        layer.volume *
        safeValue *
        (layer.isMuted ? 0 : 1);
    });
  };

  /* =========================================================
     CREATE AMBIENT AUDIO ELEMENTS
     ========================================================= */

  useEffect(() => {
    AMBIENT_DATABASE.forEach(
      (layer) => {
        const audio = new Audio();

        audio.preload = "auto";

        audio.loop = true;

        audio.volume = 0;

        audio.src = layer.src;

        audio.addEventListener(
          "error",
          (event) => {
            errorLog(
              `Ambient audio error: ${layer.name}`,
              {
                src: layer.src,
                event,
                error: audio.error,
              }
            );
          }
        );

        ambientRefs.current[
          layer.id
        ] = audio;
      }
    );

    return () => {
      Object.values(
        ambientRefs.current
      ).forEach((audio) => {
        audio.pause();

        audio.src = "";

        audio.load();
      });

      ambientRefs.current = {};
    };
  }, []);

  /* =========================================================
     AMBIENT VOLUME
     ========================================================= */

  const setAmbientVolume = async (
    id,
    value
  ) => {
    const safeValue = Math.max(
      0,
      Math.min(1, Number(value))
    );

    const layer =
      ambientLayers.find(
        (item) => item.id === id
      );

    const audio =
      ambientRefs.current[id];

    if (!layer || !audio) return;

    setAmbientLayers((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              volume: safeValue,
              isMuted:
                safeValue === 0
                  ? item.isMuted
                  : false,
            }
          : item
      )
    );

    audio.volume =
      safeValue *
      masterVolume *
      (layer.isMuted ? 0 : 1);

    if (safeValue > 0) {
      try {
        await audio.play();
      } catch (error) {
        errorLog(
          `Ambient play failed: ${layer.name}`,
          error
        );
      }
    } else {
      audio.pause();
    }
  };

  /* =========================================================
     AMBIENT MUTE
     ========================================================= */

  const toggleAmbientMute = async (
    id
  ) => {
    const layer =
      ambientLayers.find(
        (item) => item.id === id
      );

    const audio =
      ambientRefs.current[id];

    if (!layer || !audio) return;

    const newMuted =
      !layer.isMuted;

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
    } else {
      audio.volume =
        layer.volume *
        masterVolume;

      if (layer.volume > 0) {
        try {
          await audio.play();
        } catch (error) {
          errorLog(
            `Ambient resume failed: ${layer.name}`,
            error
          );
        }
      }
    }
  };

  /* =========================================================
     SAVED CUSTOM MIX
     ========================================================= */

  const saveCustomMix = (
    mixName
  ) => {
    const activeMixData =
      ambientLayers.map((layer) => ({
        id: layer.id,
        volume: layer.volume,
      }));

    const newMix = {
      id: Date.now(),

      name:
        mixName ||
        `Custom Mix ${
          savedMixes.length + 1
        }`,

      layers: activeMixData,
    };

    const updated = [
      ...savedMixes,
      newMix,
    ];

    setSavedMixes(updated);

    localStorage.setItem(
      "vibespace-custom-mixes",
      JSON.stringify(updated)
    );
  };

  /* =========================================================
     LOAD CUSTOM MIX
     ========================================================= */

  const loadCustomMix = async (
    mix
  ) => {
    for (
      const savedLayer of mix.layers
    ) {
      await setAmbientVolume(
        savedLayer.id,
        savedLayer.volume
      );
    }
  };

  /* =========================================================
     DELETE CUSTOM MIX
     ========================================================= */

  const deleteCustomMix = (
    id
  ) => {
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

  /* =========================================================
     RECOMMENDATION ENGINE
     ========================================================= */

  const getRecommendedTrack = (
    selectedActivity,
    selectedFeeling,
    selectedEnvironment,
    selectedIntensity
  ) => {
    const activityValue =
      String(
        selectedActivity || ""
      ).toLowerCase();

    const feelingValue =
      String(
        selectedFeeling || ""
      ).toLowerCase();

    const environmentValue =
      String(
        selectedEnvironment || ""
      ).toLowerCase();

    const intensityValue =
      String(
        selectedIntensity || ""
      ).toLowerCase();

    /*
      Explicit priority rules.

      These make sure common situations don't accidentally
      fall back to Deep Sleep.
    */

    /* SLEEP */
    if (
      activityValue.includes("sleep")
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "deep-sleep"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* CODING / DEEP FOCUS */
    if (
      activityValue.includes(
        "coding"
      ) &&
      feelingValue.includes(
        "deep focus"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "deep-focus"
        ) ||
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "lofi-song"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* STUDY */
    if (
      activityValue.includes(
        "stud"
      )
    ) {
      if (
        feelingValue.includes(
          "deep focus"
        ) ||
        intensityValue.includes(
          "immersive"
        )
      ) {
        return (
          MUSIC_DATABASE.find(
            (track) =>
              track.id ===
              "deep-focus"
          ) ||
          MUSIC_DATABASE.find(
            (track) =>
              track.id ===
              "study-music1"
          ) ||
          MUSIC_DATABASE[0]
        );
      }

      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "study-music"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* READING + COFFEE */
    if (
      activityValue.includes(
        "read"
      ) &&
      environmentValue.includes(
        "coffee"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "taly-coffee"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* READING */
    if (
      activityValue.includes(
        "read"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "study-music1"
        ) ||
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "study-music"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* DRIVING */
    if (
      activityValue.includes(
        "driv"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "road-trp"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* CREATING */
    if (
      activityValue.includes(
        "creat"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "dreamy-evening"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* COFFEE SHOP */
    if (
      environmentValue.includes(
        "coffee"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "taly-coffee"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* MIDNIGHT */
    if (
      environmentValue.includes(
        "midnight"
      ) ||
      feelingValue.includes(
        "melancholic"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "lofi-midnight"
        ) ||
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "alone"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* DREAMY */
    if (
      feelingValue.includes(
        "dreamy"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "dreamy-evening"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* CALM / PEACEFUL */
    if (
      feelingValue.includes(
        "calm"
      ) ||
      feelingValue.includes(
        "peaceful"
      )
    ) {
      return (
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "peaceful-music"
        ) ||
        MUSIC_DATABASE.find(
          (track) =>
            track.id ===
            "relax-music-1"
        ) ||
        MUSIC_DATABASE[0]
      );
    }

    /* =====================================================
       FALLBACK TAG MATCHING
    ===================================================== */

    const words = [
      activityValue,
      feelingValue,
      environmentValue,
      intensityValue,
    ].join(" ");

    let bestTrack =
      MUSIC_DATABASE.find(
        (track) =>
          track.id ===
          "peaceful-music"
      ) || MUSIC_DATABASE[0];

    let bestScore = 0;

    MUSIC_DATABASE.forEach(
      (track) => {
        let score = 0;

        track.tags.forEach(
          (tag) => {
            const cleanTag =
              tag.toLowerCase();

            if (
              words.includes(
                cleanTag
              )
            ) {
              score += 2;
            }
          }
        );

        if (
          score > bestScore
        ) {
          bestScore = score;
          bestTrack = track;
        }
      }
    );

    return bestTrack;
  };

  /* =========================================================
     CURRENT RECOMMENDED TRACK
  ========================================================= */

  const recommendedTrack =
    useMemo(() => {
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

  /* =========================================================
     SUBMIT SITUATION
     
     THIS IS THE IMPORTANT FIX.
     
     We calculate recommendation using the NEW values
     immediately instead of waiting for React state updates.
  ========================================================= */

  const submitSituation = (
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
      newEnvironment ||
      environment;

    const finalIntensity =
      newIntensity || intensity;

    log(
      "Submitting situation:",
      {
        activity: finalActivity,
        feeling: finalFeeling,
        environment:
          finalEnvironment,
        intensity: finalIntensity,
      }
    );

    /* Update situation state */

    setActivity(
      finalActivity
    );

    setFeeling(
      finalFeeling
    );

    setEnvironment(
      finalEnvironment
    );

    setIntensity(
      finalIntensity
    );

    /*
      IMPORTANT:
      Calculate using the NEW values,
      not the old React state.
    */

    const selectedTrack =
      getRecommendedTrack(
        finalActivity,
        finalFeeling,
        finalEnvironment,
        finalIntensity
      );

    log(
      "Recommended track:",
      selectedTrack?.title
    );

    /*
      Only SELECT the track.

      DO NOT PLAY IT.

      User will press Play.
    */

    setCurrentTrack(
      selectedTrack
    );

    /*
      Reset player state because we changed
      the recommended track.
    */

    if (heroAudioRef.current) {
      heroAudioRef.current.pause();

      heroAudioRef.current.currentTime = 0;

      heroAudioRef.current.src =
        "";

      setCurrentTime(0);

      setDuration(0);
    }

    setIsPlaying(false);

    /*
      Finally move to Result page.
    */

    setHasSubmittedSituation(
      true
    );
  };

  /* =========================================================
     KEEP THIS FOR EXTERNAL STATE CHANGES
     
     This does NOT automatically play.
  ========================================================= */

  useEffect(() => {
    if (
      !hasSubmittedSituation ||
      !recommendedTrack
    ) {
      return;
    }

    /*
      If another component changes situation
      directly, keep current track synced.

      Never autoplay here.
    */

    if (
      currentTrack?.id !==
      recommendedTrack.id
    ) {
      setCurrentTrack(
        recommendedTrack
      );

      if (heroAudioRef.current) {
        heroAudioRef.current.pause();

        heroAudioRef.current.currentTime = 0;

        heroAudioRef.current.src =
          "";

        setCurrentTime(0);

        setDuration(0);
      }

      setIsPlaying(false);
    }
  }, [
    hasSubmittedSituation,
    recommendedTrack,
  ]);

  /* =========================================================
     SAVE VIBE
  ========================================================= */

  const saveVibe = (
    name
  ) => {
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
          currentTrack?.title ||
          "",

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
      errorLog(
        "Could not save vibe:",
        error
      );
    }
  };

  /* =========================================================
     SURPRISE ME
  ========================================================= */

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

    const random = (arr) =>
      arr[
        Math.floor(
          Math.random() *
            arr.length
        )
      ];

    const newActivity =
      random(activities);

    const newFeeling =
      random(feelings);

    const newEnvironment =
      random(environments);

    const newIntensity =
      random(intensities);

    setActivity(
      newActivity
    );

    setFeeling(
      newFeeling
    );

    setEnvironment(
      newEnvironment
    );

    setIntensity(
      newIntensity
    );

    return {
      activity:
        newActivity,

      feeling:
        newFeeling,

      environment:
        newEnvironment,

      intensity:
        newIntensity,
    };
  };

  /* =========================================================
     CONTEXT VALUE
  ========================================================= */

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

    /* Hero music */

    currentTrack,
    setCurrentTrack,

    isPlaying,

    playTrack,

    togglePlayPause,

    nextTrack:
      playNextTrack,

    prevTrack:
      playPreviousTrack,

    currentTime,

    duration,

    seekTo,

    volume,

    setVolume,

    /* Ambience */

    ambientLayers,

    setAmbientVolume,

    toggleAmbientMute,

    /* Master */

    masterVolume,

    setMasterVolume,

    /* Recommendation */

    recommendedTrack,

    /* Saved vibes */

    saveVibe,

    /* Saved mixes */

    savedMixes,

    saveCustomMix,

    loadCustomMix,

    deleteCustomMix,

    /* Theme */

    isDarkMode,

    setIsDarkMode,

    /* Databases */

    MUSIC_DATABASE,

    AMBIENT_DATABASE,
  };

  return (
    <AudioContext.Provider
      value={value}
    >
      {children}
    </AudioContext.Provider>
  );
};

/* =========================================================
   HOOK
   ========================================================= */

export const useAudio = () => {
  const context =
    useContext(
      AudioContext
    );

  if (!context) {
    throw new Error(
      "useAudio must be used inside AudioProvider"
    );
  }

  return context;
};

export default AudioProvider;