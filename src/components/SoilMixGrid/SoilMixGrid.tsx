import React from 'react';
import { cubicFeetToCups } from '../../utils/gardenPotUtils';
import { SoilMix } from '../../types/soilmix';

interface SoilMixGridProps {
  soilMix: SoilMix;
  potSizeCuFt: number;
}

const SoilMixGrid: React.FC<SoilMixGridProps> = ({ soilMix, potSizeCuFt }) => {
  const recommendedSoil = potSizeCuFt * (soilMix.soil / 100);
  const recommendedPerlite = potSizeCuFt * (soilMix.perlite / 100);
  const recommendedVermiculite = potSizeCuFt * (soilMix.vermiculite / 100);
  const recommendedPeatMoss = potSizeCuFt * (soilMix.peatMoss / 100);

  return (
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
  );
};

export default SoilMixGrid;
