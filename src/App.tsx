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
    { label: 'Peppers', soilMix: { soil: 25, perlite: 25, vermiculite: 25, peatMoss: 25 } },
    { label: 'Carrots', soilMix: { soil: 30, perlite: 20, vermiculite: 30, peatMoss: 20 } },
    { label: 'Tomatoes', soilMix: { soil: 40, perlite: 20, vermiculite: 20, peatMoss: 20 } },
  ];

  const handleSelect = (value: SoilMix) => {
    setSoilMix(value)
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, minHeight: '100vh' }}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
      </button>
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
