import React, { useState, ChangeEvent } from "react";
import { PotSize} from "../../types/potsize";
import { SoilMix } from "../../types/soilmix";
import styles from './GardenPot.module.scss'
import { cubicFeetToCups, usGallonsToCups } from '../../utils/gardenPotUtils';
import { SelectedPotSize } from "../SelectedPotSize/SelectedPotSize";
import Tooltip from "../Tooltip/Tooltip";


interface GardenPotProps {
  potSize: PotSize;
  soilMix?: SoilMix;
}

const GardenPot: React.FC<GardenPotProps> = ({ potSize, soilMix = { soil: 25, perlite: 25, vermiculite: 25, peatMoss: 25 } }) => {

  return (
    <div className={styles.container}>
      <h2 style={{textAlign: 'center'}}>Set Your Soil Mix</h2>  
      <div style={{backgroundColor: 'grey', borderRadius: '10px'}}>
        <SelectedPotSize potSize={potSize} />   
        <div className={styles.gardenPot}>
          {/* <Tooltip label={`Soil (${soilMix.soil}%)`}> */}
            <div style={{ height: `${soilMix.soil}%`, background: '#8B4513' }}>Soil ({soilMix.soil}%)</div>
          {/* </Tooltip> */}
          <div style={{ height: `${soilMix.perlite}%`, background: "#FFFFFF", color: 'black' }}>Perlite ({soilMix.perlite}%)</div>
          <div style={{ height: `${soilMix.vermiculite}%`, background: "#D2B48C" }}>Vermiculite ({soilMix.vermiculite}%)</div>
          <div style={{ height: `${soilMix.peatMoss}%`, background: "#654321" }}>Peat Moss ({soilMix.peatMoss}%)</div>
        </div>
      </div>
      {/* <div>
        <p>Recommended Dry Soil Mix: {potSize.cuFt} cuFt3</p>
        <p>Recommended Cups of Soil: {cubicFeetToCups(potSize.cuFt)}</p>
        <p>Recommended Cups of Soil: {usGallonsToCups(potSize.usGallons)}</p>        
      </div> */}
    </div>
  );
};

export default GardenPot;