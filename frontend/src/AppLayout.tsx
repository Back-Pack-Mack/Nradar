import { IconFile, IconFolder, IconHome, IconSetting, IconUser } from '@douyinfe/semi-icons';
import { Breadcrumb, Layout, Nav } from '@douyinfe/semi-ui';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import TabContext from './TabContext';
import TabBar from './TabBar';
import DocumentsPage from './pages/DocumentsPage';
import FilesPage from './pages/FilesPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import UserPage from './pages/UserPage';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<Array<{ key: string; path: string; title: string }>>([]);
  const [activeTab, setActiveTab] = useState('');

  // 根据当前路径获取面包屑
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      path: `/${paths.slice(0, index + 1).join('/')}`,
      name: path.charAt(0).toUpperCase() + path.slice(1),
    }));
  };

  // 添加新标签页
  const addTab = (path: string, title: string) => {
    setTabs((prevTabs) => {
      const existingTab = prevTabs.find((tab) => tab.path === path);
      if (existingTab) {
        setActiveTab(existingTab.key);
        return prevTabs;
      }

      const newTab = { key: Date.now().toString(), path, title };
      setActiveTab(newTab.key);
      return [...prevTabs, newTab];
    });
  };

  // 关闭标签页
  const closeTab = (tabKey: string) => {
    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab.key !== tabKey);

      if (tabKey === activeTab && newTabs.length > 0) {
        const lastTab = newTabs[newTabs.length - 1];
        setActiveTab(lastTab.key);
        navigate(lastTab.path);
      } else if (newTabs.length === 0) {
        navigate('/');
      }

      return newTabs;
    });
  };

  // 关闭其他标签页
  const closeOtherTabs = (tabKey: string) => {
    setTabs((prevTabs) => {
      const tabToKeep = prevTabs.find((tab) => tab.key === tabKey);
      return tabToKeep ? [tabToKeep] : [];
    });
  };

  // 关闭左侧标签页
  const closeLeftTabs = (tabKey: string) => {
    setTabs((prevTabs) => {
      const tabIndex = prevTabs.findIndex((tab) => tab.key === tabKey);
      return prevTabs.slice(tabIndex);
    });
  };

  // 关闭右侧标签页
  const closeRightTabs = (tabKey: string) => {
    setTabs((prevTabs) => {
      const tabIndex = prevTabs.findIndex((tab) => tab.key === tabKey);
      return prevTabs.slice(0, tabIndex + 1);
    });
  };

  // 导航菜单点击处理
  const handleNavClick = (itemKey: string) => {
    navigate(itemKey);
    addTab(itemKey, itemKey.split('/').pop() || 'Home');
  };

  // 初始化时添加首页标签
  useEffect(() => {
    if (tabs.length === 0 && location.pathname === '/') {
      addTab('/', 'Home');
    }
  }, []);

  return (
    <TabContext.Provider value={{
      tabs,
      activeTab,
      setActiveTab,
      addTab,
      closeTab,
      closeOtherTabs,
      closeLeftTabs,
      closeRightTabs
    }}>
      <Layout style={{ height: '100vh' }}>
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav
            defaultSelectedKeys={[location.pathname]}
            style={{ height: '100%' }}
            items={[
              { itemKey: '/', text: 'Home', icon: <IconHome /> },
              { itemKey: '/users', text: 'Users', icon: <IconUser /> },
              { itemKey: '/settings', text: 'Settings', icon: <IconSetting /> },
              {
                text: 'Documents',
                icon: <IconFolder />,
                itemKey: '/documents',
                items: [
                  { itemKey: '/documents/files', text: 'Files', icon: <IconFile /> },
                ],
              },
            ]}
            onClick={({ itemKey }) => handleNavClick(itemKey as string)}
            footer={{
              collapseButton: true,
            }}
          />
        </Sider>
        <Layout>
          <Header style={{
            backgroundColor: 'var(--semi-color-bg-1)',
            padding: '0',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <TabBar />
            <Breadcrumb
              style={{
                margin: '16px 24px',
                paddingBottom: '16px'
              }}
              routes={getBreadcrumbs()}
              onClick={(route) => navigate(route.path as string)}
            />
          </Header>
          <Content
            style={{
              padding: '24px',
              backgroundColor: 'var(--semi-color-bg-0)',
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/documents/files" element={<FilesPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </TabContext.Provider>
  );
};

export default AppLayout;