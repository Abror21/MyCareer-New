import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Card, Col, Form, Row, Table, Typography, message } from 'antd';
import dayjs from 'dayjs';

import { InvoiceData } from 'types/InvoiceData';
import {
  currencyFormatter,
  handleAccessDeniedError,
  htmlToText,
  openNotification,
  textToHtml,
} from 'utils/globalFunctions';
import { StyledInvoice } from './style';
import { Button, TextArea } from 'ui';
import { useIntl } from 'react-intl';
import useQueryApiClient from '../../utils/useQueryApiClient';
import { useUserDispatch, useUserState } from '../../contexts/UserContext';
import fileDownload from 'js-file-download';
import { InputNumber } from '../../ui/InputNumber';

const { Title, Text } = Typography;

type InvoiceProps = {
  data: InvoiceData;
  isEditMode?: boolean;
  setIsEditMode?: any;
};

type DataSourceItem = {
  key: string;
  description: string;
};

// Notes: this component will not be translated, only English is used

export const Invoice = ({ data, isEditMode = false, setIsEditMode }: InvoiceProps) => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();

  const {
    id,
    invoiceNumber,
    invoiceDate,
    dueDate,
    mcRequisite,
    internName,
    internSurname,
    internTelephone,
    address,
    subTotal,
    tax,
  } = data;
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [form] = useForm();
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [paymentDetails, setPaymentDetails] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showEditBtn, setShowEditBtn] = useState<boolean>(true);

  const discountField = Form.useWatch('discount', form);

  const { isLoading: isUpdating, appendData: saveChanges } = useQueryApiClient({
    request: {
      url: `/api/invoice/update`,
      method: 'PUT',
    },
    onSuccess: (response) => {
      setDiscount(response.data.discount);
      setPaymentDetails(response.data.paymentDetail);
      setNotes(response.data.notes);

      form.setFieldsValue({
        discount: response.data.discount,
        paymentDetail: htmlToText(response.data.paymentDetail),
        notes: htmlToText(response.data.notes),
      });

      setIsEditMode(false);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { isLoading: isSending, appendData: sendInvoice } = useQueryApiClient({
    request: {
      url: `/api/invoice/send-email`,
      method: 'POST',
    },
    onSuccess: () => {
      openNotification('success', 'The invoice has been successfully sent!');
      setShowEditBtn(false);
    },
    onError: (error) => {
      console.log(error);
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { refetch: downloadInvoice } = useQueryApiClient({
    request: {
      url: `api/invoice/${id}/download`,
      method: 'GET',
      disableOnMount: true,
      multipart: true,
    },
    onSuccess: (response) => {
      fileDownload(response, `Invoice_${invoiceNumber}_${dayjs(invoiceDate).format('DD MMM, YYYY')}.docx`);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  useEffect(() => {
    if (data) {
      setDataSource([
        {
          key: '1',
          description: intl.messages[`${data.description}`] && intl.formatMessage({ id: data.description }),
        },
      ]);

      form.setFieldsValue({
        discount: data.discount,
        paymentDetail: htmlToText(data.paymentDetail),
        notes: htmlToText(data.notes),
      });

      setDiscount(data.discount);
      setPaymentDetails(data.paymentDetail);
      setNotes(data.notes);
      setTotal(data.subTotal - (data.subTotal * data.discount) / 100);
      if (data.invoiceStatus === 'Approved') {
        setShowEditBtn(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (discountField !== undefined) setTotal((prevState) => (prevState = subTotal - (subTotal * discountField) / 100));
  }, [discountField]);

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (value: string) => <div>Service in MyCareer platform &quot;{value && value}&quot;</div>,
    },
  ];

  const onFinish = async (values: any) => {
    const postData = {
      invoiceId: id,
      discount: values.discount,
      notes: textToHtml(values.notes),
      paymentDetail: textToHtml(values.paymentDetail),
    };

    saveChanges(postData);
  };

  const invoiceSendHandler = () => {
    sendInvoice({ invoiceId: id });
  };

  const invoiceDownloadHandler = () => {
    downloadInvoice();
  };
  const handleCancel = () => {
    setTotal(data.subTotal - (data.subTotal * data.discount) / 100)
    setIsEditMode(false)
  }

  return (
    <StyledInvoice>
      <Form form={form} onFinish={onFinish}>
        <Card bordered={false} className="invoice">
          <Row justify={'space-between'} align={'top'}>
            <Col span={12}>
              <Title level={2}>
                Invoice No.&nbsp;<span className="invoice__no">{invoiceNumber && invoiceNumber}</span>
              </Title>
            </Col>

            <Col>
              <p className="logo">MyCareer</p>
            </Col>
          </Row>
          <Row gutter={24} className="invoice__requisites">
            <Col span={6}>
              <Text strong>Issued</Text>
              <div className="invoice__text invoice__date">
                {invoiceDate && dayjs(invoiceDate).format('DD MMM, YYYY')}
              </div>
              <Text strong>Due</Text>
              <div className="invoice__text">{dueDate && dayjs(dueDate).format('DD MMM, YYYY')}</div>
            </Col>
            <Col span={8}>
              <Text strong>From</Text>
              <div className="invoice__text">
                <div>{mcRequisite && mcRequisite.companyName}</div>
                <div>{mcRequisite && mcRequisite.addressLine1}</div>
                <div>{mcRequisite && mcRequisite.addressLine2}</div>
                <div>Bank account&nbsp;{mcRequisite && mcRequisite.account}</div>
                <div>
                  Bank INN&nbsp;{mcRequisite && mcRequisite.bankINN}&nbsp;MFO&nbsp;{mcRequisite && mcRequisite.mfo}
                </div>
                <div>
                  INN&nbsp;{mcRequisite && mcRequisite.companyINN}&nbsp;OKED&nbsp;{mcRequisite && mcRequisite.oked}
                </div>

                <div>Bank name&nbsp;{mcRequisite && mcRequisite.bankName}</div>
              </div>
            </Col>
            <Col span={8}>
              <Text strong>Billed to</Text>
              <div className="invoice__text">
                <div>
                  {internName && internName}&nbsp;{internSurname && internSurname}
                </div>
                <div>
                  {address && address.country.name},&nbsp;{address && address.region && address.region.name}&nbsp;
                  {address && address.street}
                </div>
                <div>{internTelephone && internTelephone}</div>
              </div>
            </Col>
          </Row>
          <Table
            className="invoice__description"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
          />
          <Row justify="end">
            <Col span={8}>
              <Row>
                <Col span={12}>
                  <Text strong>Subtotal:</Text>
                </Col>
                <Col span={12} className="align-right">
                  <Text className="text-align-right">{subTotal && currencyFormatter.format(subTotal)}&nbsp;UZS</Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text strong>Tax:</Text>
                </Col>
                <Col span={12} className="align-right">
                  <Text>{tax && tax}&nbsp;%</Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text strong>Discount:</Text>
                </Col>
                <Col span={12} className="align-right">
                  <Row wrap={false}>
                    {isEditMode && (
                      <InputNumber
                        name="discount"
                        className="discount-input"
                        size="small"
                        type="number"
                        min={0}
                        max={100}
                        rules={[
                          {
                            required: true,
                            message: '',
                          },
                        ]}
                      />
                    )}
                    <Text>{!isEditMode && discount && discount}&nbsp;%</Text>
                  </Row>
                </Col>
              </Row>
              <Row className="invoice-total">
                <Col span={12}>
                  <Text strong>Total:</Text>
                </Col>
                <Col span={12} className="align-right">
                  <Text>{total && currencyFormatter.format(total)}&nbsp;UZS</Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row justify="start" className="payment-details">
            <Col span={8}>
              <Text strong>Payment details:</Text>
              {isEditMode ? (
                <TextArea rules={[{ required: true, message: "" }]}  name="paymentDetail" />
              ) : (
                <p className="invoice__text" dangerouslySetInnerHTML={{ __html: paymentDetails && paymentDetails }}></p>
              )}
            </Col>
          </Row>
          <Row justify="start" className="notes">
            <Col span={8}>
              <Text strong>Notes:</Text>
              {isEditMode ? (
                <TextArea rules={[{ required: true, message: "" }]} name="notes" />
              ) : (
                <p className="invoice__text" dangerouslySetInnerHTML={{ __html: notes && notes }}></p>
              )}
            </Col>
          </Row>
        </Card>

        <Row justify="end" className="invoice__footer">
          {isEditMode ? (
            <>
              <Button
                type="default"
                label="Cancel"
                className="admin-default-btn"
                onClick={handleCancel}
              />
              <Button
                htmlType="submit"
                type="primary"
                label="Save"
                className="admin-primary-btn admin-primary-btn--large"
                loading={isUpdating}
              />
            </>
          ) : (
            <>
              {showEditBtn && (
                <Button
                  type="primary"
                  label="Edit"
                  className="admin-primary-btn admin-primary-btn--large"
                  onClick={() => setIsEditMode(true)}
                />
              )}
              <Button
                loading={isSending}
                type="default"
                label="Send"
                className="admin-default-btn"
                onClick={invoiceSendHandler}
              />
              <Button type="default" label="Download" className="admin-default-btn" onClick={invoiceDownloadHandler} />
            </>
          )}
        </Row>
      </Form>
    </StyledInvoice>
  );
};
