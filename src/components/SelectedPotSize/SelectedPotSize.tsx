import { useState } from 'react';
import ExpandDownIcon from '../../components/ExpandDownIcon';
import ExpandUpIcon from '../../components/ExpandUpIcon';
import { PotSize } from '../../types/potsize';


export const SelectedPotSize = ({ potSize }: { potSize: PotSize }) => {
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
          <div style={{textAlign: 'center'}}>
            <p>{potSize.sizeInCm} cms</p>
            {/* <p>{potSize.cuFt} cuFt</p> */}
            <p>{potSize.liters} liters</p>
          </div>
        )}
      </div>
    );
  };