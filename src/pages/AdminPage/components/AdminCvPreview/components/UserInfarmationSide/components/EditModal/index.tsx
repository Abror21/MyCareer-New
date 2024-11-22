import { Form, Modal } from "antd"
import { StyledModalForm } from "pages/AdminPage/components/AdminCvPreview/style";
import { CvPageInterface } from "pages/AdminPage/components/Types";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button, Checkbox, Input, Select, SelectOption, TextArea } from "ui";
import useQueryApiClient from "utils/useQueryApiClient";
import { NameProps } from "../..";
import { experienceOptions } from "utils/consts";

interface EditModalProps {
    cvData: CvPageInterface | undefined;
    refetchResume: Function;
    isModalVisible: boolean;
    modalValue: string | number;
    modalName: string | NameProps;
    modalUrl: string;
    modalTitle: string;
    setIsModalVisible: Function;
    setModalValue: Function;
    setModalName: Function;
    setModalUrl: Function;
    setModalTitle: Function;
}
const EditModal = ({
    cvData,
    refetchResume,
    isModalVisible,
    modalValue,
    modalName,
    modalTitle,
    modalUrl,
    setIsModalVisible,
    setModalValue,
    setModalName,

}: EditModalProps) => {
    const intl = useIntl();
    const [form] = Form.useForm();

    const [countryId, setCountryId] = useState<number | null>(null);
    const [otherRegion, setOtherRegion] = useState<boolean>(false);

    useEffect(() => {
        if(modalName == 'address'){
            form.setFieldsValue({
                CountryId: cvData?.address?.countryId,
                RegionId: cvData?.address?.regionId,
            })
            setCountryId(cvData?.address?.countryId ?? null);
            setOtherRegion(cvData?.address?.otherRegion ?? false);
        } else if(modalName == 'jobExperience'){
            form.setFieldValue(modalName, cvData?.jobExperience);
        } else {
          form.setFieldValue(modalName, modalValue);
        }
    }, [modalName]);

    useEffect(() => {
        if (countryId) {
            fetchRegions();
        }
    }, [countryId])

    useEffect(() => {
        if(otherRegion){
            form.setFieldValue('RegionId', null);
        }
    }, [otherRegion])
    


    const { data: desiredPositionData, isLoading: desiredPositionLoading } = useQueryApiClient({
        request: {
            url: '/api/desired-position',
            method: 'GET',
        },
    });
    const { data: countryData, isLoading: countryLoading } = useQueryApiClient({
        request: {
            url: '/api/country',
            method: 'GET',
        },
    });
    const {
        data: regionOptionData,
        isLoading: regionLoading,
        refetch: fetchRegions,
    } = useQueryApiClient({
        request: {
            url: `/api/region/get-regions-by-country-id/${countryId}`,
            method: 'GET',
        },
    });
    const { isLoading: isUpdateLoading, appendData: EditData } = useQueryApiClient({
        request: {
            url: `/api/manage-cabinets/${modalUrl}`,
            method: 'PUT',
        },
        onSuccess: () => {
            setIsModalVisible(false);
            refetchResume();
        },
    });

    const handleTabKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const isLastInput = event.currentTarget === document.activeElement;
        const isTabKey = event.key === 'Tab';

        if (isLastInput && isTabKey) {
            event.preventDefault();
        }
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setModalValue('');
        setModalName('');
    };
    const onFinish = (values: { 
        desiredPositionId?: number;
        phoneNumber?: string;
        email?: string;
    }) => {
        EditData({ ...values, id: cvData?.id, Otheregion: otherRegion });
    };
    
    return (
        <Modal
            open={isModalVisible}
            width={1000}
            onCancel={hideModal}
            footer={[
                <>
                    <Button
                        type="default"
                        key="cancel"
                        className="save-btn"
                        onClick={hideModal}
                        label={intl.messages.cancel && intl.formatMessage({ id: 'cancel' })}
                    />
                    <Button
                        loading={isUpdateLoading}
                        key="submit"
                        type="primary"
                        className="btn primary-btn save-btn"
                        onClick={() => form.submit()}
                        label={intl.messages.save && intl.formatMessage({ id: 'save' })}
                    />
                </>,
            ]}
            className="editModal"
            confirmLoading={isUpdateLoading}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <StyledModalForm>
                    {
                        modalName === 'desiredPositionId' &&
                        <Select
                            name={modalName}
                            placeholder={
                                intl.messages.desiredPositionPlaceholder && intl.formatMessage({ id: 'desiredPositionPlaceholder' })
                            }
                            loading={desiredPositionLoading}
                            label={intl.messages.desiredPositionLabel && intl.formatMessage({ id: 'desiredPositionLabel' })}
                            rules={[
                                {
                                    required: true,
                                    message: intl.messages.desiredPositionError && intl.formatMessage({ id: 'desiredPositionError' }),
                                },
                            ]}
                        >
                            {desiredPositionData?.data?.map((option: any) => (
                                <SelectOption key={option.id} value={option.id}>
                                    {option.name}
                                </SelectOption>
                            ))}
                        </Select>
                    }
                    {
                        (modalName == 'phoneNumber' || modalName == 'email') &&
                        <TextArea
                            maxLength={1000}
                            name={modalName}
                            label={modalTitle}
                            rows={6}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        intl.messages.requiredField &&
                                        intl.formatMessage({ id: 'requiredField' }),
                                },
                            ]}
                        />
                    }
                    {
                        modalName == 'address' && (
                            <>
                                <div className="input">
                                    <Select
                                        name="CountryId"
                                        placeholder={intl.messages.personalDetailCountryPlaceholder && intl.formatMessage({ id: 'personalDetailCountryPlaceholder' })}
                                        loading={countryLoading}
                                        label={intl.messages.country && intl.formatMessage({ id: 'country' })}
                                        rules={[{ required: true, message: intl.messages.personalDetailCountryError && intl.formatMessage({ id: 'personalDetailCountryError' }) }]}
                                        onChange={(e: number) => setCountryId(e)}
                                    >
                                        {countryData?.data?.map((option: any) => {
                                            return (
                                                <SelectOption key={option.name} value={option.id}>
                                                    {option.name}
                                                </SelectOption>
                                            );
                                        })}
                                    </Select>
                                </div>

                                <div className="input">
                                    <Select
                                        name="RegionId"
                                        placeholder={intl.formatMessage({ id: 'otherCity' })}
                                        disabled={!countryId || otherRegion}
                                        loading={regionLoading}
                                        label={intl.messages.city && intl.formatMessage({ id: 'city' })}
                                        rules={[{ required: !otherRegion, message: intl.messages.personalDetailCityError && intl.formatMessage({ id: 'personalDetailCityError' }) }]}
                                    >
                                        {regionOptionData?.data?.map((option: any) => (
                                            <SelectOption key={option.id} value={option.id}>
                                                {option.name}
                                            </SelectOption>
                                        ))}
                                    </Select>
                                    <Checkbox
                                        onChange={() => setOtherRegion(!otherRegion)}
                                        name="OtherRegion"
                                        checked={otherRegion}
                                        label={intl.messages.otherCity && intl.formatMessage({ id: 'otherCity' })}
                                        className="checkbox"
                                    />
                                </div>

                                <div className="input addrees-input">
                                    <Input
                                        name="Address"
                                        maxLength={100}
                                        label={intl.messages.address && intl.formatMessage({ id: 'address' })}
                                        placeholder={intl.messages.personalDetailAddressPlaceholder && intl.formatMessage({ id: 'personalDetailAddressPlaceholder' })}
                                        rules={[{ required: true, message: intl.messages.personalDetailAddressError && intl.formatMessage({ id: 'personalDetailAddressError' }) }]}
                                        onKeyDown={handleTabKeyPress}
                                    />
                                </div>
                            </>
                        )
                    }
                    {
                        modalName == 'jobExperience' && (
                            <div className="input">
                                <Select
                                    label={
                                        intl.messages.desiderPositionExperienceLabel &&
                                        intl.formatMessage({ id: 'desiderPositionExperienceLabel' })
                                    }
                                    name="jobExperience"
                                    placeholder={
                                        intl.messages.desiderPositionExperiencePlaceholder &&
                                        intl.formatMessage({ id: 'desiderPositionExperiencePlaceholder' })
                                    }
                                    rules={[
                                        {
                                        required: true,
                                        message:
                                            intl.messages.desiredPositionJobExError && intl.formatMessage({ id: 'desiredPositionJobExError' }),
                                        },
                                    ]}
                                    >
                                    {experienceOptions.map((option, index) => (
                                        <React.Fragment key={index}>
                                        {intl.messages[option.value] && (
                                            <SelectOption key={index} value={option.value}>
                                            {intl.formatMessage({ id: option.value })}
                                            </SelectOption>
                                        )}
                                        </React.Fragment>
                                    ))}
                                </Select>
                            </div>
                        )
                    }
                </StyledModalForm>
            </Form>
        </Modal>
    )
}

export default EditModal