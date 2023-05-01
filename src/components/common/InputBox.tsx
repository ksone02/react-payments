import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  textType: 'text' | 'number';
  textSecurity?: boolean;
  inputValues: string;
  setInputValues: (val: string) => void;
}

interface InputBoxProps {
  inputs: InputType[];
  align: string;
  separator?: string;
  isFullWidth?: boolean;
}

const InputBox = ({ inputs, align, separator, isFullWidth = false }: InputBoxProps) => {
  const onChangeInput = (props: InputType, index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.textType === 'number' && isNaN(Number(e.target.value))) {
      return;
    }

    props.setInputValues(e.target.value);
  };

  return (
    <InputsBoxWrapper isFullWidth={isFullWidth} align={align}>
      {inputs.map((props, index) => (
        <>
          {index > 0 && <Separator>{separator}</Separator>}
          <Input
            {...props}
            type="text"
            value={props.inputValues}
            onChange={onChangeInput(props, index)}
            minLength={props.required ? props.maxLength : 0}
            align={align}
          />
        </>
      ))}
    </InputsBoxWrapper>
  );
};

export default InputBox;

const InputsBoxWrapper = styled.div<{ isFullWidth?: boolean; align?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'flex-start')};
  align-items: center;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'min-content')};
  height: 48.75px;
  box-sizing: border-box;

  border: none;
  padding: 0 14px;

  background: #ecebf1;
  border-radius: 7px;

  color: #000000;
  font-size: 20px;
`;

const Separator = styled.span`
  text-align: center;
  font-size: 16px;
`;

const Input = styled.input<{ align: string; textSecurity?: boolean }>`
  width: ${({ maxLength }) => maxLength! * 16}px;
  max-width: 100%;
  height: 16px;
  border: none;
  background-color: transparent;

  color: #000000;
  font-size: 16px;
  text-align: ${({ align }) => align};
  outline: none;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ${({ textSecurity }) => textSecurity && '-webkit-text-security: disc'};
`;
