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
     - Content starts below the fixed Navbar.
     - Builder/Studio navigation is inside Navbar.
     - No separate mobile navigation here.
     - Bottom padding remains for PersistentPlayer.
  ========================================================= */

  return (
    <div
      className="
        min-h-screen
        transition-colors
        duration-500
        pt-20
        md:pt-0
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

          Mobile:
          pt-20 above keeps this content below the fixed Navbar.

          Desktop:
          md:pt-0 means NO CHANGE to PC layout.
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