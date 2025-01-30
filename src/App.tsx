import './App.css';
import GardenPot from './components/GardenPot/GardenPot';
import { useState, ChangeEvent } from 'react';
import PotSizeModal from './components/PotSizeModal/PotSizeModal';
import { PotSize } from './utils/gardenPotUtils';
import ExpandDownIcon from './components/ExpandDownIcon';
import ExpandUpIcon from './components/ExpandUpIcon';

function App() {
  const [potSize, setPotSize] = useState<PotSize | null>(null);

  return (
    <div className="container">
      <h1>Garden Soil App</h1>
      {potSize !== null ? (
        <p>Soil Pot Size: {potSize.sizeInCm}cm</p>
      ) : (
        <div>
          <PotSizeModal onSelectSize={setPotSize} />
        </div>
      )}
      {potSize !== null && (
        <div>
          <SelectedPotSize potSize={potSize} />
          
          <GardenPot potSize={potSize} />
        </div>
      )}
    </div>
  );
}

export default App;





const SelectedPotSize = ({ potSize }: { potSize: PotSize }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const handleToggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div onClick={handleToggleDetails} style={{ cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isDetailsVisible ? <ExpandDownIcon color={'white'} /> : <ExpandUpIcon color={'white'} />}
          <h3 style={{ textAlign: 'center', margin: '0 10px' }}>Your {potSize.sizeInInches} in garden pot</h3>
        {isDetailsVisible ? <ExpandDownIcon color={'white'} /> : <ExpandUpIcon color={'white'} />}
      </div>
      {isDetailsVisible && (
        <ul>
          <li>Your {potSize.sizeInCm} cms garden pot</li>
          <li>Your {potSize.cuFt} cuFt garden pot</li>
          <li>Your {potSize.liters} liters garden pot</li>
        </ul>
      )}
    </div>
  );
};