import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import { StyledPage } from './style';
import PageContent from './PageContent';
import PageLayout from './PageLayout';
import { useUserDispatch } from 'contexts/UserContext';
import { Footer, Header } from 'components';

const { Content } = Layout;

const UserLayout = () => {
  const dispatch = useUserDispatch();
  const location = useLocation();

  return (
    <StyledPage>
      <Layout className="layout">
        {location?.pathname !== '/reset-password' && <Header />}
        <Content>
          <>
            <Outlet />
          </>
        </Content>
        {location?.pathname !== '/reset-password' && <Footer />}
      </Layout>
    </StyledPage>
  );
};

UserLayout.PageLayout = PageLayout;
UserLayout.PageContent = PageContent;

export default UserLayout;