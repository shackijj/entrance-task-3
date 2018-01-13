import * as React from 'react';
import './TextInput.css';

interface TextInputProps {
  label: string;
  icon?: JSX.Element;
  placeholder?: string;
}

const TextInput = ({label, icon, placeholder}: TextInputProps) => {
  let _input: HTMLInputElement | null;
  let _container: HTMLElement | null;
  const onFocus = () => {
    if (_container) {
      _container.classList.add('TextInput_focus');
    }
  };
  const onBlur = () => {
    if (_container) {
      _container.classList.remove('TextInput_focus');
    }
  };
  return (
    <div className={'TextInput'} ref={div => _container = div}>
      <div className="TextInput-Label">{label}</div>
      <div className="TextInput-InputContainer">
        <input 
          className="TextInput-Input"
          ref={input => _input = input}
          type="text"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className="TextInput-Icon">{icon}</span>
      </div>
    </div>
  );
};

export default TextInput;