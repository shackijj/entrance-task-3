import * as React from 'react';
import InputLabel from './InputLabel';
import './TextInput.css';
import * as classNames from 'classnames';

interface TextInputProps {
  value: string;
  label?: string;
  icon?: JSX.Element;
  placeholder?: string;
  classes?: string[];
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  focused?: boolean;
}

class TextInput extends React.Component<TextInputProps> {
  constructor(props: TextInputProps) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }
  render() {
    const {label, icon, placeholder, classes, value, focused} = this.props;
    return (
      <div className={classNames('TextInput', {'TextInput_focus': focused}, classes)}>
        {label ? <InputLabel>{label}</InputLabel> : ''}
        <div className="TextInput-InputContainer">
          <input 
            className="TextInput-Input"
            type="text"
            value={value}
            placeholder={placeholder}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onChange={this._handleChange}
          />
          <span className="TextInput-Icon">{icon}</span>
        </div>
      </div>
    );
  }
  private _onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.setState({focused: true});
  }
  private _onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({focused: false});
  }
  private _handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (this.props.onChange) {
      this.props.onChange(target.value);
    }
  }
}

export default TextInput;