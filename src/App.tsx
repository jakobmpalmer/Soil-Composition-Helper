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
import { cubicFeetToCups, litersToCups, usGallonsToCups } from './utils/gardenPotUtils';

function App() {
  const [potSize, setPotSize] = useState<PotSize | null>(null);
  const [soilMix, setSoilMix] = useState<SoilMix>({ soil: 25, 
                                                    perlite: 25, 
                                                    vermiculite: 25, 
                                                    peatMoss: 25 });


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

  const recommendedSoil = (potSize?.cuFt ?? 0) * (soilMix.soil / 100);
  const recommendedPerlite = (potSize?.cuFt ?? 0) * (soilMix.perlite / 100);
  const recommendedVermiculite = (potSize?.cuFt ?? 0) * (soilMix.vermiculite / 100);
  const recommendedPeatMoss = (potSize?.cuFt ?? 0) * (soilMix.peatMoss / 100);

  return (
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
          <div className="flex-container">
            <div className="tab-section">
              <Tabs>
                <CompositionSliders soilMix={soilMix} handleChange={handleChange} />
                <PlantLookup handleSoilMixChange={handleSoilMixChange} />
                <SearchableDropdown options={options} onSelect={handleSelect} />
              </Tabs>
            </div>
            <div className="garden-pot-section">
              <GardenPot potSize={potSize} soilMix={soilMix} />
            </div>
          </div>          
        </div>
        <div className="grid-container">
            <div className="grid-header">Component</div>
            <div className="grid-header">Recommended Quantity (cuFt)</div>
            <div className="grid-header">Recommended Cups</div>
            <div className="grid-header">Current Percentage</div>
            <div className="grid-header">Recommended Soil</div>
            <div>Soil</div>
            <div>{recommendedSoil.toFixed(2)}</div>
            <div>{cubicFeetToCups(recommendedSoil).toFixed(2)}</div>
            <div>{soilMix.soil}%</div>
            <div>{recommendedSoil.toFixed(2)} cuFt</div>
            <div>Perlite</div>
            <div>{recommendedPerlite.toFixed(2)}</div>
            <div>{cubicFeetToCups(recommendedPerlite).toFixed(2)}</div>
            <div>{soilMix.perlite}%</div>
            <div>{recommendedPerlite.toFixed(2)} cuFt</div>
            <div>Vermiculite</div>
            <div>{recommendedVermiculite.toFixed(2)}</div>
            <div>{cubicFeetToCups(recommendedVermiculite).toFixed(2)}</div>
            <div>{soilMix.vermiculite}%</div>
            <div>{recommendedVermiculite.toFixed(2)} cuFt</div>
            <div>Peat Moss</div>
            <div>{recommendedPeatMoss.toFixed(2)}</div>
            <div>{cubicFeetToCups(recommendedPeatMoss).toFixed(2)}</div>
            <div>{soilMix.peatMoss}%</div>
            <div>{recommendedPeatMoss.toFixed(2)} cuFt</div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
