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


  /*
   * INTRO SCREEN
   */

  if (showIntro) {
    return (
      <VibeIntro
        onEnter={handleEnterSpace}
      />
    );
  }


  /*
   * MAIN APPLICATION
   */

  return (
    <div className="min-h-screen transition-colors duration-500 pb-56">

      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />


      <main>

        {/* If submitted or tab is result, show VibeResult. Otherwise show SituationBuilder */}
        {(hasSubmittedSituation || currentTab === 'result') ? (
          <VibeResult
            onOpenStudio={() => setCurrentTab('studio')}
          />
        ) : currentTab === 'builder' ? (
          <SituationBuilder
            onProceed={() => setCurrentTab('result')}
          />
        ) : currentTab === 'studio' ? (
          <AtmosphereStudio />
        ) : (
          <SituationBuilder
            onProceed={() => setCurrentTab('result')}
          />
        )}

      </main>


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