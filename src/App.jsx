import React, { useState } from 'react';

import { AudioProvider, useAudio } from './components/AudioManager';
import { Navbar } from './components/Navbar';
import { SituationBuilder } from './components/SituationBuilder';
import { VibeResult } from './components/VibeResult';
import { AtmosphereStudio } from './components/AtmosphereStudio';
import { PersistentPlayer } from './components/PersistentPlayer';
import VibeIntro from './components/VibeIntro';


function MainContent() {
  const [currentTab, setCurrentTab] = useState('builder');

  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem('vibespace-intro-seen') !== 'true';
  });

  const { hasSubmittedSituation } = useAudio();


  const handleEnterSpace = () => {
    setShowIntro(false);
    sessionStorage.setItem('vibespace-intro-seen', 'true');
  };


  /* =========================================================
     INTRO SCREEN
  ========================================================= */

  if (showIntro) {
    return (
      <VibeIntro
        onEnter={handleEnterSpace}
      />
    );
  }


  /* =========================================================
     MAIN APPLICATION

     Desktop:
     - Existing desktop layout remains unchanged.

     Mobile:
     - Bottom padding remains for the fixed player.
     - Mobile Builder/Studio navigation is handled by Navbar.
     - No extra fixed/sticky navigation is created here.
  ========================================================= */

  return (
    <div
      className="
        min-h-screen
        transition-colors
        duration-500
        pb-44
        md:pb-44
      "
    >

      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}

      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main>

        {currentTab === 'builder' && (
          !hasSubmittedSituation ? (
            <SituationBuilder
              onProceed={() =>
                setCurrentTab('result')
              }
            />
          ) : (
            <VibeResult
              onOpenStudio={() =>
                setCurrentTab('studio')
              }
            />
          )
        )}


        {currentTab === 'result' && (
          <VibeResult
            onOpenStudio={() =>
              setCurrentTab('studio')
            }
          />
        )}


        {currentTab === 'studio' && (
          <AtmosphereStudio />
        )}

      </main>


      {/* =====================================================
          FIXED BOTTOM PLAYER

          PersistentPlayer is the ONLY component that should
          remain fixed at the bottom of the viewport.
      ===================================================== */}

      <PersistentPlayer />

    </div>
  );
}


export default function App() {
  return (
    <AudioProvider>
      <MainContent />
    </AudioProvider>
  );
}