import { useEffect } from 'react';
import axios from 'axios';
import { useThemeSwitchState } from 'contexts/ThemeSwitchContext';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider } from 'styled-components';
import { token, darkToken } from 'config/token';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { notification } from 'antd';
import DefaultLayout from './layouts/DefaultLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import {
  CreateCVPage,
  HomePage,
  LoginPage,
  ResetVerificationEmailPage,
  SignUpVerificationEmailPage,
  ResetPasswordPage,
  RealDataCV,
  TrainingsPage,
  TalentViewPage,
  AdminPage,
  AdminCvPreview,
  ContactPage,
  AboutUsPage,
  InternCabinetPage,
  InternCabinetCVPage,
  Logs,
  UnauthorizedPage,
  PurchasePage,
  InvoicePage,
  TestsPage,
  HiddenPage,
} from './pages';
import ProtectedUserRoute from 'routes/ProtectedUserRoutes';
import ProtectedAdminRoute from 'routes/ProtectedAdminRoutes';
import { routes } from './config/config';
import { useLanguage } from './contexts/LanguageContext';
import useSessionStorage from './utils/useSessionStorage';
import { AdminUiContent } from 'pages/AdminPage/components/AdminUiContent';
import IntlProviderWrapper from './utils/intlProviderWrapper';
import { Permissions } from './pages/AdminPage/components/Permissions';
import TelegramLogs from 'pages/AdminPage/components/TelegramLogs';
import MindeeLogs from 'pages/AdminPage/components/MindeeLogs';
import { CompanyPage } from 'pages/AdminPage/components/Company';
import ActionForm from 'pages/AdminPage/components/Company/components/Actionform';
import { HiringsPage } from 'pages/AdminPage/components/Hirings';
import PartnersPage from 'pages/PartnersPage';
import JobsPage from 'pages/JobsPage';
import { ActionModalHirings } from 'pages/AdminPage/components/Hirings/components/ActionModal';
import { ApplicantsList } from 'pages/AdminPage/components/Hirings/components';

function App() {
  const systemTheme = useThemeSwitchState();
  const { language } = useLanguage();
  const { setSessionValue: setTranslationsToSession } = useSessionStorage('translations');
  notification.config({
    placement: 'top',
    duration: 5,
  });

  useEffect(() => {
    getDictionary();
  }, [language]);

  const getDictionary = async () => {
    try {
      const res = await axios.get(`${routes.api.baseUrl}/api/uicontent/dictionary`, {
        headers: {
          ['LangCode']: language,
        },
      });
      if (res.data.data) {
        setTranslationsToSession(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: systemTheme.type !== 'default' ? {} : token,
        components: {
          Layout: {
            // headerBg: 'white',
          },
          Notification: {
            zIndexPopup: 10002,
          },
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <IntlProviderWrapper>
        <ThemeProvider theme={{ antd: systemTheme.type !== 'default' ? darkToken : token }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/trainings" element={<TrainingsPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/talents/:id" element={<TalentViewPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path="/contact-us/interview/:id" element={<ContactPage />} />
              </Route>
              <Route path="/talents" element={<HiddenPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/practice" element={<LoginPage />} />
              <Route path="/login/trainings" element={<LoginPage />} />
              <Route path="/login/create-cv" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedUserRoute permission="intern">
                    <UserLayout />
                  </ProtectedUserRoute>
                }
              >
                <Route path="/create-cv" element={<CreateCVPage />} />
                <Route path="/purchase-services" element={<PurchasePage />} />

                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<InternCabinetPage />} />
                <Route path="/profile/cv" element={<RealDataCV />} />
                <Route path="/profile/edit-cv" element={<InternCabinetCVPage />} />
              </Route>

              <Route path="/" element={<AdminLayout />}>
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute permission="system_administration">
                      <AdminPage />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/admin/translations"
                  element={
                    <ProtectedAdminRoute permission="cms_translation">
                      <AdminUiContent />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/admin/cv/:id"
                  element={
                    <ProtectedAdminRoute permission="system_administration">
                      <AdminCvPreview />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/admin/invoice/:id"
                  element={
                    <ProtectedAdminRoute permission="system_administration">
                      <InvoicePage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/logs"
                  element={
                    <ProtectedAdminRoute permission="log_files">
                      <Logs />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/permissions"
                  element={
                    <ProtectedAdminRoute permission="user_permission">
                      <Permissions />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/telegram-logs"
                  element={
                    <ProtectedAdminRoute permission="system_administration">
                      <TelegramLogs />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/mindee-logs"
                  element={
                    <ProtectedAdminRoute permission="system_administration">
                      <MindeeLogs />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/tests"
                  element={
                    <ProtectedAdminRoute permission="tests">
                      <TestsPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/partners"
                  element={
                    <ProtectedAdminRoute permission="partners">
                      <CompanyPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/partners/add-partner"
                  element={
                    <ProtectedAdminRoute permission="partners">
                      <ActionForm />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/edit-partner/:id"
                  element={
                    <ProtectedAdminRoute permission="partners">
                      <ActionForm />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/view-partner/:id"
                  element={
                    <ProtectedAdminRoute permission="partners">
                      <ActionForm />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/hirings"
                  element={
                    <ProtectedAdminRoute permission="jobs">
                      <HiringsPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/hirings/add-hiring"
                  element={
                    <ProtectedAdminRoute permission="jobs">
                      <ActionModalHirings />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/hirings/edit-hiring/:id"
                  element={
                    <ProtectedAdminRoute permission="jobs">
                      <ActionModalHirings />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/hirings/view-hiring/:id"
                  element={
                    <ProtectedAdminRoute permission="jobs">
                      <ActionModalHirings />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/hirings/copy-hiring/:id"
                  element={
                    <ProtectedAdminRoute permission="jobs">
                      <ActionModalHirings />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/applicants-list/:id"
                  element={
                    <ProtectedAdminRoute permission="jobs">
                      <ApplicantsList />
                    </ProtectedAdminRoute>
                  }
                />
              </Route>

              <Route path="/verification-email" element={<ResetVerificationEmailPage />} />
              <Route path="/verify-signup-email" element={<SignUpVerificationEmailPage />} />

              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </IntlProviderWrapper>
    </ConfigProvider>
  );
}

export default App;
