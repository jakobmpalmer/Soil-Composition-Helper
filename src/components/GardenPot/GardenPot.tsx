import React, { useState, ChangeEvent } from "react";
import { PotSize } from "../../utils/gardenPotUtils";
import styles from './GardenPot.module.scss'

interface SoilMix {
  soil: number;
  perlite: number;
  vermiculite: number;
  peatMoss: number;
}

interface GardenPotProps {
  potSize: PotSize;
}

const GardenPot: React.FC<GardenPotProps> = ({ potSize }) => {

  const [soilMix, setSoilMix] = useState<SoilMix>({
    soil: 25,
    perlite: 25,
    vermiculite: 25,
    peatMoss: 25,
  });

  const normalizeSoilMix = (mix: SoilMix) => {
    const total = mix.soil + mix.perlite + mix.vermiculite + mix.peatMoss;
    const factor = 100 / total;
    return {
      soil: mix.soil * factor,
      perlite: mix.perlite * factor,
      vermiculite: mix.vermiculite * factor,
      peatMoss: mix.peatMoss * factor,
    };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseInt(value);
    const newMix = { ...soilMix, [name]: newValue };

    const total = newMix.soil + newMix.perlite + newMix.vermiculite + newMix.peatMoss;
    if (total <= 100) {
      setSoilMix(newMix);
    }
  };

  return (
    <div className="container">
      <h2 style={{textAlign: 'center'}}>Set Your Soil Mix</h2>
      <div style={{margin: '10px auto', display: 'flex', justifyContent: 'space-around'}}>
        <div style={{background: 'grey', width: '150px'}}
              onClick={() => setSoilMix({soil: 25, perlite: 25, vermiculite: 25, peatMoss: 25,})}>Default</div>
        <div style={{background: 'red', color: 'white', width: '150px'}}
              onClick={() => setSoilMix({soil: 60, perlite: 15, vermiculite: 10, peatMoss: 15,})}>Pepper Preset</div>
      </div>

      <div style={{border: '1px solid black', borderRadius: '15px', margin: '10px auto', display: 'flex', justifyContent: 'space-around'}}>
        <h3>Plant Lookup</h3>
        <input type="text" placeholder="Search for a plant" />
      </div>
      <div className="sliders">
        {Object.keys(soilMix).map((key) => (
          <div key={key}>
            <label>{key} ({soilMix[key as keyof SoilMix]}%)</label>
            <input
              type="range"
              name={key}
              min="0"
              max="100"
              value={soilMix[key as keyof SoilMix]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <div>
        <h3>Total: {soilMix.soil + soilMix.perlite + soilMix.vermiculite + soilMix.peatMoss}%</h3>
      </div>

      <div className={styles.gardenPot}>
        <div style={{ height: `${soilMix.soil}%`, background: "#8B4513" }}>Soil</div>
        <div style={{ height: `${soilMix.perlite}%`, background: "#FFFFFF", color: 'black' }}>Pearlite</div>
        <div style={{ height: `${soilMix.vermiculite}%`, background: "#D2B48C" }}>Vermiculite</div>
        <div style={{ height: `${soilMix.peatMoss}%`, background: "#654321" }}>Peat Moss</div>
      </div>

      <div>
        <h3>Recommended Dry Soil Mix: {potSize.cuFt} cuFt3</h3>
        
      </div>
    </div>
  );
};

export default GardenPot;