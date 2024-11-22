import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { StyledPage } from './style';
import PageContent from './PageContent';
import PageLayout from './PageLayout';

import { Header, Footer } from 'components';

const { Content } = Layout;
const DefaultLayout = () => {
  return (
    <StyledPage>
      <Layout className="layout">
        <Header />
        <Content>
          <>
            <Outlet />
          </>
        </Content>
        <Footer />
      </Layout>
    </StyledPage>
  );
};

DefaultLayout.PageLayout = PageLayout;
DefaultLayout.PageContent = PageContent;

export default DefaultLayout;
