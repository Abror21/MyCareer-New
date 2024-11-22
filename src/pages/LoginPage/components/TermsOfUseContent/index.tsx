import React from 'react';
import { StyledTermsOfUseContent } from './style';
import { TermsOfUseData } from 'utils/consts';
import { useIntl } from 'react-intl';

interface Props {
  setScrollBottom: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TermsOfUseContent = ({ setScrollBottom }: Props) => {
  const intl = useIntl();
  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
    setScrollBottom(bottom);
  };

  return (
    <StyledTermsOfUseContent>
      <div className="content-box" onScroll={handleScroll}>
        {TermsOfUseData &&
          TermsOfUseData?.map((item, index) => (
            <div className="inner" key={index}>
              <h3 className="title">
                {item?.title && intl.messages[item?.title] && intl.formatMessage({ id: item?.title })}
              </h3>
              {item?.content && (
                <p
                  className={`${index === 0 && 'bold'} content`}
                  dangerouslySetInnerHTML={{
                    __html: intl.messages[item.content] && intl.formatMessage({ id: item.content }),
                  }}
                />
              )}
              <ul className={`${index === 5 && 'list-style'}`}>
                {item?.list &&
                  item?.list?.map((listItem, listIndex) => (
                    <li className="list" key={listIndex}>
                      <span className="title">
                        {listItem?.listTitle &&
                          intl.messages[listItem?.listTitle] &&
                          intl.formatMessage({ id: listItem?.listTitle })}
                      </span>
                      {listItem?.list && intl.messages[listItem?.list] && intl.formatMessage({ id: listItem?.list })}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    </StyledTermsOfUseContent>
  );
};
