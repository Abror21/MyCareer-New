import React from 'react';
import SvgSelector from 'assets/icons/SvgSelector';
import { Button, Spinner } from 'ui';
import { Card, Col, Row, message } from 'antd';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Link, useNavigate } from 'react-router-dom';
import { smoothScroll } from 'utils/globalFunctions';
import { TestActionModal } from 'components';
import { useTimeExpiration } from 'utils/useTimeExpiration';
import useJwt from 'utils/useJwt';
import { useUserState } from 'contexts/UserContext';

type CardData = {
  id: number;
  title: string;
  amount: number;
  priceTitle: string;
  currency: string;
  period: string;
  features: {
    id: number;
    internFeature: {
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    freelancerInternId: number;
    internFeatureId: number;
    createdAt: string;
    updatedAt: string;
  }[];
};

interface ActionModalDataType {
  type: string;
  id?: number;
  modal_type: string;
  user_status?: string;
}

export function PurchaseList() {
  const intl = useIntl();
  const { role } = useUserState();
  const { remove } = useJwt();
  const [applyType, setApplType] = useState<string>();
  const [actionModalData, setActionModalData] = useState<ActionModalDataType | undefined>(undefined);
  const { timeExpiration } = useTimeExpiration();
  const navigate = useNavigate();

  const handleOpenModal = (value: string, modalType: string, status: string) => {
    if (timeExpiration !== null) {
      setApplType('');
      message.error(intl.formatMessage({ id: 'you_can_enroll_after_five_minutes_again' }));
    } else setActionModalData({ type: value, modal_type: modalType, user_status: status });
  };

  const handleCloseModal = () => {
    setActionModalData(undefined);
  };

  const { data: lastStepData, isLoading } = useQueryApiClient({
    request: {
      url: '/api/intern-feature/get-all-intern-features',
      method: 'GET',
    },
  });

  const { appendData } = useQueryApiClient({
    request: {
      url: 'api/freelancer/change_freelancer_status_from_payment_page',
      method: 'POST',
    },
  });

  const { data: freelancerData } = useQueryApiClient({
    request: {
      url: `/api/freelancer/real-data-cv`,
      method: 'GET',
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        if (role === 'Intern') {
          remove();
          localStorage.clear();
          return;
        }
        navigate('/unauthorized');
      }
    },
  });

  const { data: userProgram } = useQueryApiClient({
    request: {
      url: `/api/learning-programs/user/programs`,
      method: 'GET',
    },
  });

  const postTestStatus = () => {
    appendData({ statusId: 28 });
  };

  const handleChangeStatus = (name: string) => {
    switch (name) {
      case 'freelancer_interns.purchasetitle_1':
        if (applyType !== name) {
          appendData({ statusId: 29 });
        }
        break;
      case 'freelancer_interns.purchasetitle_4':
        if (applyType !== name) {
          appendData({ statusId: 2 });
        }
        break;
      case 'freelancer_interns.purchasetitle_5':
        handleOpenModal('action', 'createTestModal', 'apply');
        break;
      case 'freelancer_interns.purchasetitle_2':
        if (applyType !== name) {
          appendData({ statusId: 3 });
          navigate('/trainings');
        }
        break;
      case 'freelancer_interns.purchasetitle_3':
        if (applyType !== name) {
          appendData({ statusId: 4 });
        }
        break;
      default:
        break;
    }
    if (name === 'freelancer_interns.purchasetitle_5') return;
    else setApplType(name);
  };

  useEffect(() => {
    switch (freelancerData.data?.freelancerStatus?.name) {
      case 'freelancer_interns.purchasetitle_4':
        setApplType('freelancer_interns.purchasetitle_4');
        break;
      case 'freelancer_interns.purchasetitle_2':
        setApplType('freelancer_interns.purchasetitle_2');
        break;
      case 'freelancer_interns.purchasetitle_1':
        setApplType('freelancer_interns.purchasetitle_1');
        break;
      case 'freelancer_interns.purchasetitle_5':
        setApplType('freelancer_interns.purchasetitle_5');
        break;
      case 'freelancer_interns.purchasetitle_3':
        setApplType('intern');
        break;
      default:
        break;
    }
  }, [freelancerData.data]);

  useEffect(() => {
    smoothScroll('top', 0);
  }, []);

  return (
    <div>
      <TestActionModal
        userProgram={userProgram.data}
        postTestStatus={postTestStatus}
        setApplyType={setApplType}
        actionModalData={actionModalData}
        handleCloseModal={handleCloseModal}
      />
      <SvgSelector className="create_cv_icon" id="circle1" />
      <div className="purchase-page">
        <h1 className="title">{intl.messages.whatsYourGoal && intl.formatMessage({ id: 'whatsYourGoal' })}</h1>
        <div className="purchase-modal">
          {isLoading ? (
            <Spinner spinning={true} />
          ) : (
            <div className="cards">
              <Row gutter={[16, 16]}>
                <Col span={24} lg={{ span: 24 }}>
                  <h4 className='purchase-list-title'>{intl.formatMessage({ id: 'purchase.title' })}</h4>
                  <h4 className='purchase-list-description'>{intl.formatMessage({ id: 'purchase.description' })}</h4>
                </Col>

                {lastStepData?.data?.slice(4, 5).map((card: CardData) => (
                  <Col key={card.id} lg={{ span: 12 }} span={24}>
                    <Card className={`card card-${card.id}`}>
                      <Row gutter={[16, 16]}>
                        <Col span={24} lg={24}>
                          <div className="card-title">
                            <SvgSelector id={`cv-file-icon4-svg`} className="title-icon" />
                            <h1>
                              {intl.messages[card?.title] && intl.formatMessage({ id: card.title })}
                              <br />
                              <span>
                                {intl.messages[card.priceTitle] && intl.formatMessage({ id: card.priceTitle })}
                              </span>
                            </h1>
                          </div>
                          <Button
                            className={`${applyType === card.title.toLowerCase() ? 'active-btn' : 'as'} btn apply-btn`}
                            type="primary"
                            label={
                              applyType === card.title.toLowerCase()
                                ? intl.messages.button_applied && intl.formatMessage({ id: 'button_applied' })
                                : intl.messages.button_apply && intl.formatMessage({ id: 'button_apply' })
                            }
                            onClick={() => handleChangeStatus(card.title.toLowerCase())}
                          />
                          <div className="list">
                            <h2 className="list-title">
                              {intl.messages.included && intl.formatMessage({ id: 'included' })}:
                            </h2>
                            <ul className="list-content">
                              {card?.features?.map((item) => (
                                <li className="list-item" key={item.id}>
                                  <SvgSelector id="check-mark-svg" className="check-mark-icon" />
                                  <span>
                                    {intl.messages[item?.internFeature?.name] &&
                                      intl.formatMessage({ id: item?.internFeature?.name })}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
                {lastStepData?.data?.slice(2, 3).map((card: CardData) => (
                  <Col key={card.id} lg={{ span: 12 }} span={24}>
                    <Card className={`card card-${card.id}`}>
                      <Row gutter={[16, 16]}>
                        <Col span={24} lg={24}>
                          <div className="card-title">
                            <SvgSelector id={`cv-file-icon${card.id}-svg`} className="title-icon" />
                            <h1>
                              {intl.messages[card?.title] && intl.formatMessage({ id: card.title })}
                              <br />
                              <span>
                                {intl.messages[card.priceTitle] && intl.formatMessage({ id: card.priceTitle })}
                              </span>
                            </h1>
                          </div>
                          <Button
                            className={`${applyType === card.title.toLowerCase() ? 'active-btn' : 'as'} btn apply-btn`}
                            type="primary"
                            label={
                              applyType === card.title.toLowerCase()
                                ? intl.messages.button_applied && intl.formatMessage({ id: 'button_applied' })
                                : intl.messages.button_apply && intl.formatMessage({ id: 'button_apply' })
                            }
                            onClick={() => {
                              handleChangeStatus(card.title.toLowerCase());
                            }}
                          />
                          <div className="list">
                            <h2 className="list-title">
                              {intl.messages.included && intl.formatMessage({ id: 'included' })}:
                            </h2>
                            <ul className="list-content">
                              {card?.features?.map((item) => (
                                <li className="list-item" key={item.id}>
                                  <SvgSelector id="check-mark-svg" className="check-mark-icon" />
                                  <span>
                                    {intl.messages[item?.internFeature?.name] &&
                                      intl.formatMessage({ id: item?.internFeature?.name })}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
                {lastStepData?.data?.slice(3, 4).map((card: CardData) => (
                  <Col key={card.id} span={24}>
                    <Card className={`card card-${card.id}`}>
                      <Row gutter={[16, 16]}>
                        <Col span={24} lg={12}>
                          <div className="card-title">
                            <SvgSelector id={`cv-file-icon${card.id}-svg`} className="title-icon" />
                            <h1>
                              {intl.messages[card?.title] && intl.formatMessage({ id: card?.title })}
                              <br />
                              <span>
                                {intl.messages[card?.priceTitle] && intl.formatMessage({ id: card.priceTitle })}
                              </span>
                            </h1>
                          </div>
                          <Button
                            className={`${applyType === card.title.toLowerCase() ? 'active-btn' : 'as'} btn apply-btn`}
                            type="primary"
                            label={
                              applyType === card.title.toLowerCase()
                                ? intl.messages.button_applied && intl.formatMessage({ id: 'button_applied' })
                                : intl.messages.button_apply && intl.formatMessage({ id: 'button_apply' })
                            }
                            onClick={() => handleChangeStatus(card.title.toLowerCase())}
                          />
                          <div className="list">
                            <h2 className="list-title">
                              {intl.messages.included && intl.formatMessage({ id: 'included' })}:
                            </h2>
                            <ul className="list-content">
                              {card.features.slice(0, 6).map((item) => (
                                <li className="list-item" key={item.id}>
                                  <SvgSelector id="check-mark-svg" className="check-mark-icon" />
                                  <span>
                                    {intl.messages[item?.internFeature?.name] &&
                                      intl.formatMessage({ id: item?.internFeature?.name })}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Col>
                        <Col span={24} lg={12}>
                          <ul className="list-content list-second">
                            {card.features.slice(6).map((item) => (
                              <li className="list-item" key={item.id}>
                                <SvgSelector id="check-mark-svg" className="check-mark-icon" />
                                <span>
                                  {intl.messages[item?.internFeature?.name] &&
                                    intl.formatMessage({ id: item?.internFeature?.name })}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          {applyType && !isLoading && (
            <Link to={'/profile'} onClick={() => localStorage.removeItem('currentFormIndex')}>
              <Button
                className={`btn go-cabinet-btn enabled`}
                type="primary"
                label={intl.messages.goToCabinet && intl.formatMessage({ id: 'goToCabinet' })}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
