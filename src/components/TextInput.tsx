import * as React from 'react';
import InputLabel from './InputLabel';
import './TextInput.css';
import * as classNames from 'classnames';

interface TextInputProps {
  label?: string;
  icon?: JSX.Element;
  placeholder?: string;
  classes?: string[];
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

const TextInput = ({label, icon, placeholder, classes, onBlur, onFocus, onChange}: TextInputProps) => {
  let _input: HTMLInputElement | null;
  let _container: HTMLElement | null;
  const _onFocus = () => {
    if (_container) {
      _container.classList.add('TextInput_focus');
    }
    if (onFocus) {
      onFocus();
    }
  };
  const _onBlur = () => {
    if (_container) {
      _container.classList.remove('TextInput_focus');
    }
    if (onBlur) {
      onBlur();
    }
  };
  return (
    <div className={classNames('TextInput', classes)} ref={div => _container = div}>
      {label ? <InputLabel>{label}</InputLabel> : ''}
      <div className="TextInput-InputContainer">
        <input 
          className="TextInput-Input"
          ref={input => _input = input}
          type="text"
          placeholder={placeholder}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onChange={onChange ? onChange : undefined}
        />
        <span className="TextInput-Icon">{icon}</span>
      </div>
    </div>
  );
};

export default TextInput;