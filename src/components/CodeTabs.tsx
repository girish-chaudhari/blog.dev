"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

const Tabs = ({ children, defaultTab = 0 }:
  {
    children: any[];
    defaultTab?: number;
  }
) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex gap-4 border-b tabs_block">
        {children.map((child: any, index: number) => (
          <button
            key={index}
            className={cn(
              "py-2 px-4 font-medium transition-all duration-200",
              activeTab === index
                ? "border-b-2 border-primary text-primary"
                : "text-primary/55 hover:text-primary"
            )}
            onClick={() => handleTabClick(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div >
        {children[activeTab]}
      </div>
    </div>
  );
};

const Tab = ({ children }: {children:React.ReactNode}) => {
  return <div>{children}</div>;
};

export { Tab, Tabs };