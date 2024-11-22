import React from 'react';
import { Form, Select as AntdSelect, ConfigProvider } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { StyledSelect } from './style';
import { useLanguage } from 'contexts/LanguageContext';
import ru_RU from 'antd/locale/ru_RU';
import en_En from 'antd/locale/en_US';
import uz_UZ from './locale';

export interface SelectProps {
  placeholder?: string;
  children?: React.ReactNode;
  defaultValue?: string | number | React.ReactText[];
  style?: React.CSSProperties;
  onChange?: any;
  size?: 'large' | 'middle' | 'small';
  mode?: 'multiple' | 'tags';
  value?: number | string | string[];
  showSearch?: boolean;
  maxTagCount?: number | 'responsive';
  allowClear?: boolean;
  loading?: boolean;
  optionLabelProp?: string;
  label?: string;
  name?: (string | number)[] | string | number;
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  tagRender?: (props: CustomTagProps) => React.ReactElement;
  rules?: Rule[];
  initialValue?: string | string[] | number | number[];
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  noStyle?: boolean;
  disabled?: boolean;
  className?: string;
  formItemClassName?: string;
  variant?: 'outlined' | 'borderless' | 'filled';
  labelInValue?: boolean;
  filterOption?: any;
  options?: any;
}

const { Option } = AntdSelect;

export const SelectOption = Option;

export const Select = ({
  disabled,
  placeholder,
  className,
  children,
  onChange,
  defaultValue,
  style,
  size = 'large',
  value,
  mode,
  showSearch = true,
  maxTagCount,
  allowClear,
  loading,
  optionLabelProp,
  label,
  name,
  dropdownRender,
  tagRender,
  rules,
  initialValue,
  placement,
  noStyle,
  variant,
  labelInValue,
  formItemClassName,
  filterOption,
  options,
}: SelectProps) => {
  const { language } = useLanguage();

  const handlefilterOption = (input: any, option: any) =>
    option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <ConfigProvider locale={language === 'uz' ? uz_UZ : language === 'ru' ? ru_RU : en_En}>
      <Form.Item
        label={label}
        name={name}
        initialValue={initialValue}
        noStyle={noStyle}
        rules={rules}
        className={formItemClassName}
      >
        <StyledSelect
          disabled={disabled}
          placeholder={placeholder}
          className={className}
          getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
          onChange={onChange}
          defaultValue={defaultValue}
          style={style}
          size={size}
          value={value}
          mode={mode}
          showSearch={showSearch}
          maxTagCount={maxTagCount}
          allowClear={allowClear}
          loading={loading}
          optionLabelProp={optionLabelProp}
          dropdownRender={dropdownRender}
          tagRender={tagRender}
          placement={placement}
          variant={variant}
          labelInValue={labelInValue}
          filterOption={handlefilterOption}
          options={options}
        >
          {children}
        </StyledSelect>
      </Form.Item>
    </ConfigProvider>
  );
};
