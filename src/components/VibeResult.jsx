import React, { useState } from 'react';
import { useAudio } from './AudioManager';
import {
  Play,
  Pause,
  BookmarkCheck,
  ArrowRight,
  Music2,
  Volume2,
  Sparkles
} from 'lucide-react';

export const VibeResult = ({ onOpenStudio }) => {
  const {
    activity,
    feeling,
    environment,
    currentTrack,
    isPlaying,
    togglePlayPause,
    ambientLayers,
    saveVibe
  } = useAudio();

  const [savedMessage, setSavedMessage] = useState(false);
  const [vibeName, setVibeName] = useState(
    `${environment} ${activity}`
  );

  const activeLayers = ambientLayers.filter(
    (layer) => layer.volume > 0 && !layer.isMuted
  );

  const handleSave = () => {
    if (!vibeName.trim()) return;

    saveVibe(vibeName.trim());
    setSavedMessage(true);

    setTimeout(() => {
      setSavedMessage(false);
    }, 2500);
  };

  return (
    <main className="vibe-result-page animate-fade-up">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <section className="vibe-result-hero">

        <div className="vibe-result-eyebrow">
          <Sparkles size={13} />
          <span>Your atmosphere is ready</span>
        </div>

        <h1>
          {environment}{' '}
          <em>{activity}</em>
        </h1>

        <p>
          A carefully selected atmosphere for your{' '}
          <strong>{feeling.toLowerCase()}</strong> state.
        </p>

      </section>


      {/* =====================================================
          MAIN CARD
          ===================================================== */}

      <section className="vibe-result-card stagger-reveal" style={{ animationDelay: '200ms' }}>

        {/* Top */}

        <div className="vibe-result-top">

          <div className="vibe-result-heading">

            <span className="vibe-result-label">
              Active Atmosphere
            </span>

            <h2>
              {environment}{' '}
              <em>{activity}</em>
            </h2>

            <p>
              {feeling} · {activeLayers.length} active atmosphere
              {activeLayers.length !== 1 ? 's' : ''}
            </p>

          </div>


          {/* Play Button */}

          <button
            onClick={togglePlayPause}
            className="vibe-play-button transition-transform active:scale-95 duration-200"
            type="button"
          >
            <span className="vibe-play-icon">

              {isPlaying ? (
                <Pause
                  size={15}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={15}
                  fill="currentColor"
                />
              )}

            </span>

            <span>
              {isPlaying
                ? 'Pause Experience'
                : 'Play Experience'}
            </span>

          </button>

        </div>


        {/* =================================================
            CONTENT GRID
            ================================================= */}

        <div className="vibe-result-grid">

          {/* MUSIC */}

          <div className="vibe-result-block space-y-3">

            <div className="vibe-block-heading">

              <Music2 size={14} />

              <span>
                Hero Music
              </span>

            </div>


            <div className="vibe-track">

              <div className="vibe-track-artwork">

                {currentTrack?.artwork ? (
                  <img
                    src={currentTrack.artwork}
                    alt=""
                  />
                ) : (
                  <Music2 size={20} />
                )}

              </div>


              <div className="vibe-track-info">

                <h3>
                  {currentTrack?.title || 'No track selected'}
                </h3>

                <p>
                  {currentTrack?.artist || 'Unknown artist'}
                </p>

              </div>


              <div className="vibe-track-status">
                <span
                  className={
                    isPlaying
                      ? 'is-playing'
                      : ''
                  }
                />

                <span>
                  {isPlaying ? 'Playing' : 'Ready'}
                </span>
              </div>

            </div>

            {/* AI Matched Context Line */}
            <div className="px-1 text-[11px] font-mono tracking-wide opacity-60" style={{ color: 'var(--champagne)' }}>
              Matched for {activity} • {feeling} • {environment}
            </div>

          </div>


          {/* ATMOSPHERE */}

          <div className="vibe-result-block">

            <div className="vibe-block-heading">

              <Volume2 size={14} />

              <span>
                Active Layers
              </span>

            </div>


            {activeLayers.length === 0 ? (

              <div className="vibe-empty-layers">
                <span>No ambient layers active.</span>
                <small>
                  Open Atmosphere Studio to add ambience.
                </small>
              </div>

            ) : (

              <div className="vibe-layer-list">

                {activeLayers.map((layer) => (

                  <div
                    key={layer.id}
                    className="vibe-layer"
                  >

                    <div className="vibe-layer-name">

                      <span className="vibe-layer-dot" />

                      <span>
                        {layer.name}
                      </span>

                    </div>

                    <span className="vibe-layer-volume">
                      {Math.round(layer.volume * 100)}%
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>


        {/* =================================================
            SAVE AREA
            ================================================= */}

        <div className="vibe-result-footer">

          <div className="vibe-save-area">

            <input
              type="text"
              value={vibeName}
              onChange={(e) =>
                setVibeName(e.target.value)
              }
              placeholder="Name this vibe"
              aria-label="Vibe name"
            />

            <button
              onClick={handleSave}
              type="button"
              className="vibe-save-button"
            >

              <BookmarkCheck size={14} />

              <span>
                Save Vibe
              </span>

            </button>

          </div>


          <button
            onClick={onOpenStudio}
            type="button"
            className="vibe-studio-button"
          >

            <span>
              Atmosphere Studio
            </span>

            <ArrowRight size={14} />

          </button>

        </div>


        {/* Saved Message */}

        {savedMessage && (

          <div className="vibe-saved-message">
            <BookmarkCheck size={13} />
            <span>
              Vibe saved successfully.
            </span>
          </div>

        )}

      </section>

    </main>
  );
};

export default VibeResult;