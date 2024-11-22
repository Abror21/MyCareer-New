import { notification, message } from 'antd';
import { routes } from '../config/config';
import axios from 'axios';
import React from 'react';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const checkEmail = async (email: string) => {
  try {
    const response = await fetch(`${routes.api.baseUrl}/api/auth/CheckEmail?email=${email}`);
    return response.status === 200;
  } catch (err) {
    console.log('err', err);
  }
};
export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${routes.api.baseUrl}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (err) {
    console.log('err', err);
  }
};
export const getUserAllowedPages = async (token: string) => {
  try {
    const response = await axios.get(`${routes.api.baseUrl}/api/user/pages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (err) {
    console.log('err', err);
  }
};

export const openNotification = (
  type: 'success' | 'info' | 'warning' | 'error',
  description?: string,
  message?: string
) => {
  return notification[type]({
    message: message,
    description: description,
  });
};

type ScrollType = 'top' | 'left' | 'right' | 'bottom';

export const smoothScroll = (
  type: ScrollType,
  value: number = 0,
  behavior: 'auto' | 'instant' | 'smooth' = 'smooth'
): void => {
  const scrollOptions: ScrollToOptions = {
    behavior: behavior,
  };

  switch (type.toLowerCase()) {
    case 'top':
      scrollOptions.top = value;
      break;
    case 'left':
      scrollOptions.left = value;
      break;
    case 'right':
      scrollOptions.left = value;
      break;
    case 'bottom':
      scrollOptions.top = value;
      break;
    default:
      throw new Error('Invalid scroll type');
  }
  window.scrollTo(scrollOptions);
};

export const validateName = (intl: any, value: string) => {
  const nameRegex = /^[\p{L}\p{M}\s,.'-]+$/u;

  if (value && !nameRegex.test(value)) {
    return Promise.reject(new Error(intl.formatMessage({ id: 'invalidNameInputError' })));
  }

  return Promise.resolve();
};

export const validatePhoneNumber = (intl: any, value: string) => {
  const numberRegex = /^\+?\d*$/;

  if (value && !numberRegex.test(value)) {
    return Promise.reject(new Error(intl.formatMessage({ id: 'InvalidPhoneNumberError' })));
  }

  if (value && value.length < 7) {
    return Promise.reject(new Error(intl.formatMessage({ id: 'InvalidPhoneNumberError' })));
  }

  return Promise.resolve();
};

export const validateEmail = (intl: any, value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailRegex.test(value)) {
    return Promise.reject(new Error(intl.formatMessage({ id: 'InvalidEmailAddreesError' })));
  }

  if (value) {
    const [, domain] = value.split('@');
    const [domainName] = domain.split('.');
    if (domainName.length < 2) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'InvalidEmailAddreesError' })));
    }
  }

  return Promise.resolve();
};

export const disabledDate = (current: any, dateFieldName: any, form: any) => {
  const dateTo = form.getFieldValue('dateTo');
  const dateFrom = form.getFieldValue('dateFrom');

  if (dateFieldName === 'dateFrom') {
    return dateTo && current.isAfter(dateTo, 'day');
  }

  if (dateFieldName === 'dateTo') {
    return dateFrom && current.isBefore(dateFrom, 'day');
  }

  return false;
};

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const htmlToText = (html: string) => {
  if (html) {
    return html.replace(/<br\s*\/?>/gi, '\n');
  }
};

export const textToHtml = (text: string) => {
  if (text) {
    return text.replace(/\n/g, '<br>');
  }
};

export const handleAccessDeniedError = (permission: string, allowedPages: string[], dispatch: any) => {
  const filteredPages = allowedPages.filter((page) => page !== permission);

  dispatch({
    type: 'SET_USER_DATA',
    payload: { allowedPages: filteredPages },
  });
};

export function transformFileData(data: any) {
  const transformedData = {
    emailAddress: data.email_address?.value || null,
    name: data.given_names?.[0]?.value || null,
    surname: data.surnames?.[0]?.value || null,
    phoneNumber: data.phone_number?.value?.replace(/[()\- ]/g, '') || null,
    profession: data.profession?.value || null,
    address: data.address?.value || null,
    skills: data.hard_skills.length > 0 ? data.hard_skills.map((skill: any) => ({ content: skill.value })) : null,
    languages:
      data.languages.length > 0
        ? data.languages.map((language: any) => ({
            content: `${language.language}`,
            level: `${language.level || 'Unknown'}`,
          }))
        : null,
    experiences:
      data.professional_experiences.length > 0
        ? data.professional_experiences.map((experience: any) => {
            let startMonth = experience.start_month || null;
            let year = experience.start_year || null;
            let endMonth = experience.end_month || null;
            let endYear = experience.end_year || null;
            if (startMonth?.length == 4 && !isNaN(startMonth) && year?.length == 2 && !isNaN(year)) {
              startMonth = experience.start_year;
              year = experience.start_month;
            }
            if (endMonth?.length == 4 && !isNaN(endMonth) && endYear?.length == 2 && !isNaN(endYear)) {
              endMonth = experience.end_year;
              endYear = experience.end_month;
            }
            return {
              companyName: experience.employer || null,
              startMonth,
              year,
              endMonth,
              endYear,
              position: experience.role || null,
              description: experience.department || null,
            };
          })
        : null,
    certificates:
      data.certificates.length > 0
        ? data.certificates.map((certificate: any) => ({
            name: certificate.name || null,
            position: certificate.position || null,
            year: certificate.year || null,
          }))
        : null,
    educations:
      data.education.length > 0
        ? data.education.map((education: any) => ({
            educationName: education.school || null,
            year: education.start_year || null,
            startMonth: education.start_month || null,
            endMonth: education.end_month || null,
            endYear: education.end_year || null,
            degree: education.degree_type || null,
            programme: education.degree_domain || null,
          }))
        : null,
  };

  return transformedData;
}
export const parseDate = (dateString: string) => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('.').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
};
export const separateIntegratedString = (string: string | null) => {
  return string?.replace(/([A-Z][a-z]*)/g, ' $1').trim();
}
