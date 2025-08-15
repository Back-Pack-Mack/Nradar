import React from 'react';

interface Tab {
    key: string;
    path: string;
    title: string;
}

interface TabContextType {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (key: string) => void;
    addTab: (path: string, title: string) => void;
    closeTab: (tabKey: string) => void;
    closeOtherTabs: (tabKey: string) => void;
    closeLeftTabs: (tabKey: string) => void;
    closeRightTabs: (tabKey: string) => void;
}

const TabContext = React.createContext<TabContextType>({
    tabs: [],
    activeTab: '',
    setActiveTab: () => {},
    addTab: () => {},
    closeTab: () => {},
    closeOtherTabs: () => {},
    closeLeftTabs: () => {},
    closeRightTabs: () => {},
});

export default TabContext;