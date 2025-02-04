import React, { ChangeEvent, useEffect, useState } from 'react';
import { SoilMix } from '../../types/soilmix';
import styles from './CompositionSliders.module.scss';

interface CompositionSlidersProps {
  soilMix: SoilMix;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface CustomCSSProperties extends React.CSSProperties {
  '--thumb-image'?: string;
}

const CompositionSliders: React.FC<CompositionSlidersProps> = ({ soilMix, handleChange }) => {
  
  const [thumbImages, setThumbImages] = useState({
    soil: '/res/dirt-svgrepo-com.svg', // Path to your soil image
    perlite: '/res/perlite-transparent.png', // Path to your perlite image
    vermiculite: '/res/vermiculite-transparent.png', // Path to your vermiculite image
    peatMoss: '/res/peatmoss-transparent.png', // Path to your peatmoss image
});
  
  const getSliderClass = (key: keyof SoilMix) => {
    switch (key) {
      case 'soil':
        return styles.soilSlider;
      case 'perlite':
        return styles.perliteSlider;
      case 'vermiculite':
        return styles.vermiculiteSlider;
      case 'peatMoss':
        return styles.peatMossSlider;
      default:
        return '';
    }
  };

  useEffect(() => {
    // Update the slider thumb image based on the active slider
    Object.keys(soilMix).forEach((key) => {
      const typedKey = key as keyof SoilMix;
      const slider = document.querySelector(`.${styles[key + 'Slider']}`) as HTMLElement; // Select slider by class and cast to HTMLElement
      if (slider) {
        (slider.style as CustomCSSProperties)['--thumb-image'] = `url(${thumbImages[typedKey]})`;
      }
    });
  }, [soilMix, thumbImages]); // Re-run effect when soilMix or thumbImages change



  return (
    <div className={styles.container}>
      <h2>Set Your Soil Mix</h2>
      <div className={styles.sliders}>
        {/* {Object.keys(soilMix).map((key) => {
          const typedKey = key as keyof SoilMix;
          return (
            <div key={key}>
              <label>{key} ({soilMix[typedKey]}%)</label>
              <input
                type="range"
                name={key}
                min="0"
                max="100"
                value={soilMix[typedKey]}
                onChange={handleChange}
                // className={getSliderClass(typedKey)}
                className={getSliderClass(typedKey)}
                // style={{ '--thumb-image': `url(${thumbImages[typedKey]})` }} //Inline style for initial render
                            
              />
            </div>
          );
        })} */}
        <div>
          <label>Peat Moss ({soilMix.peatMoss}%)</label>
          <input
            type="range"
            name="peatMoss"
            min="0"
            max="100"
            value={soilMix.peatMoss}
            onChange={handleChange}
            className={getSliderClass('peatMoss')}
          />
        </div>        
        <div>
          <label>Vermiculite ({soilMix.vermiculite}%)</label>
          <input
            type="range"
            name="vermiculite"
            min="0"
            max="100"
            value={soilMix.vermiculite}
            onChange={handleChange}
            className={getSliderClass('vermiculite')}
          />
        </div>
        <div>
          <label>Perlite ({soilMix.perlite}%)</label>
          <input
            type="range"
            name="perlite"
            min="0"
            max="100"
            value={soilMix.perlite}
            onChange={handleChange}
            className={getSliderClass('perlite')}
          />
        </div>
        <div>
          <label>Soil ({soilMix.soil}%)</label>
          <input
            type="range"
            name="soil"
            min="0"
            max="100"
            value={soilMix.soil}
            onChange={handleChange}
            className={getSliderClass('soil')}
          />
        </div>
      </div>
    </div>
  );
};

export default CompositionSliders;