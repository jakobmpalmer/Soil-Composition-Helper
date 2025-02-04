import React, { useState } from 'react';
import styles from './Tabs.module.scss';

interface TabsProps {
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    return React.Children.toArray(children)[activeTab];
  };

  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={activeTab === 0 ? styles.active : ''}
          onClick={() => setActiveTab(0)}
        >
          Sliders
        </button>
        <button
          className={activeTab === 1 ? styles.active : ''}
          onClick={() => setActiveTab(1)}
        >
          Search
        </button>
        <button
          className={activeTab === 2 ? styles.active : ''}
          onClick={() => setActiveTab(2)}
        >
          Saved
        </button>
      </div>
      <div className={styles['tab-content']}>{renderContent()}</div>
    </div>
  );
};

export default Tabs;