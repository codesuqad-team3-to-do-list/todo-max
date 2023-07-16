import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import UserInput from '../components/UserInput';
import Button from '../components/Button';

type Type = 'login' | 'signUp';

interface Props {
  type: Type;
}

export default function Sign({ type }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateInputValue = (inputValue: string, regex: RegExp) => {
    return regex.test(inputValue);
  };

  const isEmailValid = validateInputValue(email, regex.email);
  const isPasswordValid = validateInputValue(password, regex.password);
  const isButtonActive = isEmailValid && isPasswordValid;
  const isEmptyEmail = email.length === 0;
  const isEmptyPassword = password.length === 0;

  const onSubmit = () => {
    return {
      email: email,
      password: password,
    };
  };

  return (
    <StyledLoginForm action="/" method="POST" onSubmit={onSubmit}>
      <StyledTitle type={type}>
        {type === 'login' ? '로그인' : '회원가입'}
      </StyledTitle>

      <UserInput
        type="email"
        placeholder="example@gmail.com"
        value={email}
        handleSetValue={handleSetEmail}
      />
      <StyledValidInfo>
        {!isEmailValid && !isEmptyEmail ? '올바른 이메일을 입력해주세요' : ''}
      </StyledValidInfo>

      <UserInput
        type="password"
        placeholder="소문자, 대문자, 숫자, 특수기호를 포함한 8~20자"
        value={password}
        handleSetValue={handleSetPassword}
      />
      <StyledValidInfo>
        {!isPasswordValid && !isEmptyPassword
          ? '올바른 비밀번호를 입력해주세요'
          : ''}
      </StyledValidInfo>
      <StyledSignUpLink to={'/sign-up'}>
        <Button
          role="sign-up"
          text="회원가입"
          width="100%"
          height="30px"
          shadow="up"
        />
      </StyledSignUpLink>
      <Button
        text="로그인"
        height="50px"
        disabled={!isButtonActive}
        shadow="up"
      />
    </StyledLoginForm>
  );
}

const regex = {
  // 이메일: 소문자or숫자@소문자.소문자
  // 비밀번호: 소문자, 대문자, 숫자, 특수문자 최소 1개 이상 + 8자 이상 20자 이하
  email: /^[a-z0-9]+@[a-z]+\.[a-z]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/,
};

const StyledLoginForm = styled.form`
  border-radius: ${(props) => props.theme.objectStyles.radius.m};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.floating};
  display: flex;
  flex-direction: column;
  width: 400px;
  height: auto;
  margin: 10% auto 0;
  padding: 40px;
  box-sizing: border-box;
`;

interface StyledTitleProps {
  type: Type;
}

const StyledTitle = styled.h2<StyledTitleProps>`
  font: ${(props) => props.theme.font.displayBold24};
  color: ${(props) => props.theme.colorSystem.surfaceBrand};
  text-align: ${(props) => props.type === 'signUp' && 'center'};
  margin-bottom: 20px;
`;

const StyledSignUpLink = styled(Link)`
  margin: 20px 0;

  & *:hover {
    border: 2px solid ${(props) => props.theme.colors.grey600};
  }
`;

const StyledLoginButton = styled.button`
  font: ${(props) => props.theme.font.displayBold16};
  color: ${(props) => props.theme.colorSystem.textWhiteDefault};
  background-color: ${(props) => props.theme.colorSystem.surfaceBrand};
  border-radius: ${(props) => props.theme.objectStyles.radius.s};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.up};
  height: 50px;
  margin-top: 20px;

  &:disabled {
    background-color: rgba(0, 122, 255, 0.3);
  }

  &:hover {
    background-color: rgba(0, 122, 255, 0.8);
  }
`;

const StyledValidInfo = styled.div`
  font: ${(props) => props.theme.font.displayMD12};
  color: ${(props) => props.theme.colorSystem.textDanger};
  height: 20px;
  margin-top: 5px;
  padding-left: 10px;
`;
