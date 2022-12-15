import React, { FC } from "react";
import AsyncSelect, { AsyncProps } from "react-select/async";
import Select, { DropdownIndicatorProps, StylesConfig } from "react-select";
import Empty from "./Empty";
import Option from "./Option";
import DropdownChevron from "../icons/dropdown-chevron.svg";


export interface IEnhancedSelectProps<T> extends AsyncProps<T, any, any> {
  isAsync?: boolean;
  showDropdownIndicator?: boolean;
}

const styles: StylesConfig<any, any, any> = {
  option: (baseStyles, state) => ({
    ...baseStyles,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: state.isMulti ? 'flex-start' : 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    cursor: 'pointer',
    background: state.isFocused || state.isSelected ? 'var(--secondary)' : 'var(--white)',
    color: state.isFocused ? 'var(--purpleLight)' : 'var(--dark)',
    '&>label': {
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? 'var(--purpleLight)' : 'var(--grey4)',
    '&:hover': {
      borderColor: 'var(--purpleLight)',
      boxShadow: '0px 0px 0px 3px rgba(110, 0, 255, 0.1)'
    }
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    margin: '1px',
    padding: '4px 8px',
    background: 'var(--grey2)',
    borderRadius: '16px'
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
    fontSize: '12px',
    lineHeight: '16px'
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--superGrey)',
    cursor: 'pointer',
    padding: 0,

    '&:hover': {
      color: 'var(--dark)',
      backgroundColor: 'var(--grey2)',
    }
  })
};
const defaultComponents = {
  IndicatorSeparator: Empty,
  ClearIndicator: Empty,
  Option: Option
};

const CustomDropdownIndicator: FC<DropdownIndicatorProps<any, any, any>> = (props) => {
  const { innerProps } = props;
  return (
    <div
      style={{
        paddingTop: '4px',
        margin: '0 8px'
      }}
      {...innerProps}
    >
      <DropdownChevron />
    </div>
  );
}

function EnhancedSelect<T>({ isAsync = false, showDropdownIndicator = false, ...rest }: IEnhancedSelectProps<T>) {
  const props = {
    ...rest,
    styles,
    components: {
      ...defaultComponents,
      DropdownIndicator: showDropdownIndicator ? CustomDropdownIndicator : Empty,
      ...rest.components
    }
  };

  if (isAsync) {
    return <AsyncSelect {...props} />;
  }

  return <Select {...props} />;
}

export default EnhancedSelect;
