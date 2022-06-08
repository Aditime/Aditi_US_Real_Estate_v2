import { useState } from "react";
import { Text, Input } from "@chakra-ui/react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { name, value, readOnly, type,onKeyPress, minLength, maxLength, width, height, placeholder,marginLeft ,onChange } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <>
      <Input name = {name} value = {value} type={type} minLength={minLength} maxLength={maxLength} onKeyPress={onKeyPress} readOnly={readOnly}
      width={width}/*"65%"*/ height={height} /*"7%"*/ placeholder=/*"200,000"*/ {placeholder} marginLeft={marginLeft} onChange={onChange}></Input>
        
    </>
  );
};

export default FormInput;