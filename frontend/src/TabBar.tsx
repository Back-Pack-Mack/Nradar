import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabPane, Tabs, Dropdown } from '@douyinfe/semi-ui';
import { IconClose } from '@douyinfe/semi-icons';
import TabContext from './TabContext';

type MenuItem = {
    node: 'item';
    name: string;
    onClick: () => void;
};

const TabBar: React.FC = () => {
    const { 
        tabs, 
        activeTab, 
        setActiveTab, 
        closeTab, 
        closeOtherTabs, 
        closeLeftTabs, 
        closeRightTabs 
    } = useContext(TabContext);
    
    const navigate = useNavigate();

    const handleTabChange = (tabKey: string) => {
        const tab = tabs.find(t => t.key === tabKey);
        if (tab) {
            navigate(tab.path);
        }
    };

    const renderTabTitle = (tab: { key: string; title: string }) => {
        const handleClose = (e: React.MouseEvent) => {
            e.stopPropagation();
            closeTab(tab.key);
        };

        const menuItems: MenuItem[] = [
            { node: 'item', name: '关闭当前', onClick: () => closeTab(tab.key) },
            { node: 'item', name: '关闭其他', onClick: () => closeOtherTabs(tab.key) },
            { node: 'item', name: '关闭左侧', onClick: () => closeLeftTabs(tab.key) },
            { node: 'item', name: '关闭右侧', onClick: () => closeRightTabs(tab.key) },
            { node: 'item', name: '关闭所有', onClick: () => closeOtherTabs('') },
        ];

        return (
            <Dropdown
                trigger="contextMenu"
                position="bottom"
                menu={menuItems}
                clickToHide
                onVisibleChange={(visible) => {
                    if (visible) {
                        setActiveTab(tab.key);
                    }
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{tab.title}</span>
                    <IconClose
                        onClick={handleClose}
                        style={{ marginLeft: 8, cursor: 'pointer' }}
                    />
                </div>
            </Dropdown>
        );
    };

    return (
        <Tabs
            type="card"
            activeKey={activeTab}
            onChange={handleTabChange}
            tabBarStyle={{ 
                margin: 0,
                padding: '0 16px',
                backgroundColor: 'var(--semi-color-bg-1)'
            }}
        >
            {tabs.map((tab) => (
                <TabPane
                    key={tab.key}
                    tab={renderTabTitle(tab)}
                    itemKey={tab.key}
                />
            ))}
        </Tabs>
    );
};

export default TabBar;