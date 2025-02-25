import './App.css';
import GardenPot from './components/GardenPot/GardenPot';
import { useState, ChangeEvent } from 'react';
import PotSizeModal from './components/PotSizeModal/PotSizeModal';
import { PotSize } from './types/potsize' 
import { SoilMix } from './types/soilmix';
import CompositionSliders from './components/CompositionSliders/CompositionSliders';
import PlantLookup from './components/PlantLookup/PlantLookup';
import SearchableDropdown from './components/SearchableDropdown/SearchableDropdown';
import Tabs from './components/Tabs/Tabs';
import TabButtons from './components/Tabs/TabButtons';
// import { cubicFeetToCups, litersToCups, usGallonsToCups } from './utils/gardenPotUtils';
import SoilMixGrid from './components/SoilMixGrid/SoilMixGrid';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [potSize, setPotSize] = useState<PotSize | null>(null);
  const [soilMix, setSoilMix] = useState<SoilMix>({ soil: 25, 
                                                    perlite: 25, 
                                                    vermiculite: 25, 
                                                    peatMoss: 25 });
  const [activeTab, setActiveTab] = useState(0);  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseInt(value);
    const newMix = { ...soilMix, [name]: newValue };

    const total = newMix.soil + newMix.perlite + newMix.vermiculite + newMix.peatMoss;
    if (total <= 100) {
      setSoilMix(newMix);
    }
  };

  const handleSoilMixChange = (composition: { soil: number; perlite: number; vermiculite: number; peatmoss: number }) => {
    setSoilMix({
      soil: composition.soil,
      perlite: composition.perlite,
      vermiculite: composition.vermiculite,
      peatMoss: composition.peatmoss,
    });
  };

  const options = [
    { label: 'Balanced', soilMix: { soil: 25, perlite: 25, vermiculite: 25, peatMoss: 25 } },
    { label: 'Peppers', soilMix: { soil: 25, perlite: 25, vermiculite: 25, peatMoss: 25 } },
    { label: 'Carrots', soilMix: { soil: 30, perlite: 20, vermiculite: 30, peatMoss: 20 } },
    { label: 'Tomatoes', soilMix: { soil: 40, perlite: 20, vermiculite: 20, peatMoss: 20 } },
  ];

  const handleSelect = (value: SoilMix) => {
    setSoilMix(value)
  };

  const { theme, toggleTheme } = useTheme();

  const moonIcon = <svg viewBox="0 0 24 24" focusable="false" className="themeIcon"><path fill="currentColor" d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"></path></svg>
  const sunIcon = <svg viewBox="0 0 24 24" focusable="false" className="themeIcon"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></g></svg>

  return (
    // <div style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, minHeight: '100vh' }}></div>
    <div style={{ 
      backgroundColor: `var(--background-color)`, 
      color: `var(--text-color)`, 
      minHeight: '100vh',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    }}>
      <div style={{textAlign: 'right', padding: '10px'}}>
        <button onClick={toggleTheme} style={{ backgroundColor: `var(--text-color)`, color: `var(--background-color)`}}>
          {theme === 'dark' ? sunIcon : moonIcon}
        </button>
      </div>
      
      <div className="container">
        <div style={{textAlign: 'center'}}>
          <img src="/res/logo/logo_with-transparent.small.png" width={150} alt="Garden Soil" />
          <h1 style={{ marginTop: 0 }}>Soil Composition Helper</h1>      
        </div>
        {potSize == null ? (
          <div>
            <PotSizeModal onSelectSize={setPotSize} />
          </div>
        ) : (
          <div>
            <div className="mainContent">
              <div className="grid-layout">
                <div className="header-row">
                  <TabButtons activeTab={activeTab} onTabChange={setActiveTab} />
                  <h2>Your Garden Pot Mix</h2>
                </div>
                <div className="content-row">
                  <Tabs activeTab={activeTab}>
                    <CompositionSliders soilMix={soilMix} handleChange={handleChange} />
                    <PlantLookup handleSoilMixChange={handleSoilMixChange} />
                    <SearchableDropdown options={options} onSelect={handleSelect} />
                  </Tabs>
                  <GardenPot potSize={potSize} soilMix={soilMix} />
                </div>
              </div>
            </div>
            <SoilMixGrid soilMix={soilMix} potSizeCuFt={potSize?.cuFt ?? 0} />
          </div>
        )}
      </div>
    </div>
  );
}

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
