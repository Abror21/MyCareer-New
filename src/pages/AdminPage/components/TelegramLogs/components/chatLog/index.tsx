import React, { useEffect, useRef, useState } from 'react';
import { StyledChatLog } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { BackButton, Button } from 'ui';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { Spin } from 'antd';
import { QueryParams } from '../..';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatText from '../chatText';
import { routes } from 'config/config';
import { UpOutlined } from '@ant-design/icons';

const initialQeuryValues: QueryParams = {
  PageIndex: 1,
  PageSize: 50,
  pagesId: [],
  DateFrom: null,
  DateTo: null,
  Email: null,
  Language: null,
  Level: null,
  PhoneNumber: null,
  ProgramId: null,
};

const ChatLog = () => {
  const intl = useIntl();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQeuryValues);
  const [messages, setMessages] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isUpButtonVisible, setIsUpButtonVisible] = useState(false);

  useEffect(() => {
    const listenElement = () => {
      const scrollY = scrollRef.current?.scrollTop;
      if (scrollY && scrollY > 500 && !isUpButtonVisible) {
        setIsUpButtonVisible(true);
      }
      if (scrollY && scrollY < 500 && isUpButtonVisible) {
        setIsUpButtonVisible(false);
      }
    };
    scrollRef.current?.addEventListener('scroll', listenElement);
    return () => {
      scrollRef.current?.removeEventListener('scroll', listenElement);
    };
  }, [isUpButtonVisible]);

  const { appendData } = useQueryApiClient({
    request: {
      url: `${routes.api.backendBotUrl}/get/all/statistic/history?PageSize=${
        queryParams.PageSize
      }&statisticId=${searchParams.get('id')}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ApiKey: "qwerty43-53$",
      },
    },
    onSuccess(data) {
      setMessages((prevMessages: any) => [...prevMessages, ...data.data.items]);
      setQueryParams((prev) => ({ ...prev, PageIndex: prev.PageIndex + 1 }));
      if (data.data.items.length < 50) {
        setHasMore(false);
      }
    },
  });

  const nextMessages = () => {
    appendData(queryParams);
  };

  return (
    <StyledChatLog>
      <BackButton
        color="black"
        label={intl.messages.back && intl.formatMessage({ id: 'back' })}
        onClick={() => setSearchParams('')}
      />
      {isUpButtonVisible && (
        <Button
          className="chat-up"
          icon={<UpOutlined />}
          onClick={() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }
          }}
        />
      )}
      <div className="infinite-scroll-wrapper" id="parentScrollDiv" ref={scrollRef}>
        <InfiniteScroll
          className="infinite-scroll-content"
          dataLength={messages.length}
          next={nextMessages}
          hasMore={hasMore}
          loader={<Spin />}
          scrollableTarget="parentScrollDiv"
        >
          <div className="chat-container">
            {messages?.map((msg: any) => {
              return (
                <ChatText date={msg.date} label={msg.message} isUser={msg.isUser} isAnswerRight={msg.rightAnswer} />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </StyledChatLog>
  );
};

export default ChatLog;
