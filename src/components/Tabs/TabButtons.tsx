import React from 'react';
import styles from './Tabs.module.scss';

interface TabButtonsProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabs}>
      <button
        className={activeTab === 0 ? styles.active : ''}
        onClick={() => onTabChange(0)}
      >
        Sliders
      </button>
      <button
        className={activeTab === 1 ? styles.active : ''}
        onClick={() => onTabChange(1)}
      >
        Search
      </button>
      <button
        className={activeTab === 2 ? styles.active : ''}
        onClick={() => onTabChange(2)}
      >
        Saved
      </button>
    </div>
  );
};

export default TabButtons;
