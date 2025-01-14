import { routes } from 'config/config';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useHandleError from './useHandleError';
import { useEffect, useState } from 'react';
import { useUserState } from 'contexts/UserContext';
import axios, { AxiosRequestConfig } from 'axios';
import useJwt from './useJwt';
import { useLanguage } from '../contexts/LanguageContext';
import Cookies from 'js-cookie';

interface InvalidRequestResponse {
  status_code: number;
  message: string;
}

interface RequestProps {
  url: string;
  data?: any;
  method?: RequestMethod;
  mustRetry?: boolean;
  multipart?: boolean;
  enableOnMount?: boolean;
  disableOnMount?: boolean;
  baseUrl?: string;
  headers?: Record<string, string>;
}

interface UseQueryApiClientProps {
  request: RequestProps;
  onSuccess?: (response: any, passOnSuccess?: any) => void;
  onError?: (response: any) => void;
  onFinally?: () => void;
  enabled?: boolean;
}

interface ErrorProps {
  data: any;
  error: string;
  global?: boolean;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// DON'T TOUCH IF YOU DON'T UNDERSTAND
function useQueryApiClient({ request, onSuccess, onError, onFinally, enabled = true }: UseQueryApiClientProps) {
  const method = request?.method || 'GET';
  const [searchparams, setSearchparams] = useSearchParams();
  const [receivedData, setReceivedData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(enabled ? method === 'GET' && !request?.disableOnMount : false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [timeZone, setTimeZone] = useState<string>('');
  const { getHeader } = useJwt();
  const { language } = useLanguage();

  const navigate = useNavigate();
  const user = useUserState();
  const getToken = getHeader();
  const [handleError] = useHandleError();

  const enableOnMount = request?.enableOnMount; // For methods except 'GET'
  const disableOnMount = request?.disableOnMount; // For method 'GET'

  useEffect(() => {
    //Enable or disable on mount fetch
    if (!disableOnMount && (enableOnMount || method === 'GET')) {
      actualCall(
        request.url,
        request?.data,
        request?.method,
        request?.mustRetry,
        request?.multipart,
        {},
        request.baseUrl
      );
    }
  }, [enabled, disableOnMount, enableOnMount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      setTimeZone(timeZone);
    }
  }, []);

  const refetch = () => {
    setIsRefetching(true);
    actualCall(request.url, request?.data, method, request?.mustRetry, request?.multipart, {}, request.baseUrl);
  };

  const parsedError = (response: InvalidRequestResponse) => {
    return {
      status: response.status_code,
      message: response.message,
    };
  };

  const appendData = (data?: any, urlParams?: any, passOnSuccess?: any) => {
    let url = request.url;
    if (urlParams) {
      Object.entries(urlParams).forEach((entry: any) => {
        const key = entry[0];
        const value = entry[1];

        url = url.replace(':' + key, value);
      });
    }

    actualCall(url, data, request?.method, request?.mustRetry, request?.multipart, passOnSuccess, request.baseUrl);
  };

  const actualCall: any = async (
    url: string,
    data: any = {},
    method: RequestMethod = 'GET',
    mustRetry: boolean = true,
    multipart: boolean = false,
    passOnSuccess: any = {},
    baseUrl: string = ''
  ) => {
    if (!enabled) {
      return;
    }
    const tempToken = Cookies.get('temp-token');
    const isAddUserModalOpen = searchparams.get('add-user') == 'mount' || searchparams.get('add-user') == 'post';

    setIsLoading(true);

    const requestConfig: AxiosRequestConfig = {
      url: url,
      method: method,
      baseURL: baseUrl || routes.api.baseUrl,
      responseType: multipart ? 'blob' : 'json',
      paramsSerializer: {
        indexes: true,
      },
      headers: {
        Authorization: tempToken && isAddUserModalOpen ? `Bearer ${tempToken}` : getToken,
        'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
        'X-FRONTEND-ROUTE': window.location.pathname,
        ['LangCode']: language,
        'X-Timezone-Offset': timeZone,
        ...request.headers,
      },
    };

    //set data in right place
    if (method === 'GET') {
      requestConfig.params = data;
    } else {
      requestConfig.data = data;
    }

    try {
      //call request
      const response = await axios.request(requestConfig);

      const responseContent = response.data;

      //if status code is error type, throw error
      if (responseContent && responseContent.status_code > 299) {
        throw parsedError(responseContent);
      }

      setReceivedData(responseContent);
      setIsSuccess(true);
      onSuccess && onSuccess(responseContent, passOnSuccess); //Call onSuccess if set

      return responseContent;
    } catch (e: any) {
      const response = e.response;
      console.error(e);

      if (response?.status >= 500 && window.runConfig.nodeEnv === 'production') {
        navigate('/500');
      }

      setIsError(true);

      if (e?.response?.status === 401) {
        navigate('/login', { replace: true });
      }

      let actualError: ErrorProps;
      if (e.response && e.response.data instanceof Blob) {
        // If response data is a Blob, read it as text
        const blobData = await e.response.data.text();
        // Parse the text data as JSON
        const jsonData = JSON.parse(blobData);
        // Construct the error object
        actualError = {
          data: jsonData,
          error: jsonData.errors && jsonData.errors.join(', '), // Adjust as needed based on the actual structure of the errors
          global: jsonData.global,
        };
      } else {
        if (typeof response === 'object' && response.hasOwnProperty('data')) {
          actualError = response.data;
        } else {
          actualError = e;
        }
      }
      onError && onError(actualError); //Call onSuccess if set
      handleError(actualError); //hook for global handling of errors
    } finally {
      onFinally && onFinally(); //Call onFinally if set
      setIsRefetching(false);
      setIsLoading(false);
    }
  };

  return {
    data: receivedData,
    isLoading: isLoading,
    isSuccess: isSuccess,
    refetch: refetch,
    isError: isError,
    isRefetching: isRefetching,
    appendData: appendData,
  };
}

export default useQueryApiClient;
