import React, { useState } from 'react';
import styles from './Tabs.module.scss';
import TabButtons from './TabButtons';      

interface TabsProps {
  children: React.ReactNode;
  activeTab: number;
}

const Tabs: React.FC<TabsProps> = ({ children, activeTab }) => {
  // const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    return React.Children.toArray(children)[activeTab];
  };

  return (
    <div>
      {/* <TabButtons activeTab={activeTab} onTabChange={setActiveTab} /> */}
      <div className={styles['tab-content']}>{renderContent()}</div>
    </div>
  );
};

export default Tabs;