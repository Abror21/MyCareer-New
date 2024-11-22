import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import { StyledPage } from './style';
import PageContent from './PageContent';
import PageLayout from './PageLayout';
import { useUserDispatch } from 'contexts/UserContext';
import { Footer, Header } from 'components';
import { AdminNavbar } from './AdminNavbar';
import { AdminFooter } from './AdminFooter';

const { Content } = Layout;

const AdminLayout = () => {
  const dispatch = useUserDispatch();
  const location = useLocation();

  return (
    <StyledPage>
      <Layout className="admin-layout">
        <AdminNavbar />
        <Content>
          <>
            <Outlet />
          </>
        </Content>
        <AdminFooter />
      </Layout>
    </StyledPage>
  );
};

AdminLayout.PageLayout = PageLayout;
AdminLayout.PageContent = PageContent;

export default AdminLayout;
