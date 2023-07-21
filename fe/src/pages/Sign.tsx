import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import UserInput from '../components/UserInput';
import { useNavigate } from 'react-router-dom';

type Type = 'login' | 'signUp';

interface Props {
  type: Type;
  setUserAccessToken?: (accessToken: string) => void;
  isLogin?: boolean;
}

export default function Sign({ type, setUserAccessToken, isLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (isLogin) {
    navigate('/main');
  }

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
  const isEmptyEmail = email.length === 0;
  const isEmptyPassword = password.length === 0;

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const tokens = await authenticateUser(email, password);
      storeTokenInLocalStorage(tokens.data);
      if (setUserAccessToken) {
        setUserAccessToken(tokens.data.accessToken);
      }
      navigate('/');
    } catch (error) {
      console.error('An error occurred during authentication:', error);
    }
  };

  return (
    <StyledLoginForm action="/" method="POST" onSubmit={onLogin}>
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

      <StyledButton type="login">로그인</StyledButton>

      <StyledSignUpLink to={'/sign-up'}>
        <StyledButton type="signUp">회원가입</StyledButton>
      </StyledSignUpLink>
    </StyledLoginForm>
  );
}

const regex = {
  email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/,
};

const authenticateUser = async (email: string, password: string) => {
  const url = new URL('/api/login', import.meta.env.VITE_APP_BASE_URL);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('로그인 실패');
  }

  const data = await response.json();

  return data;
};

const storeTokenInLocalStorage = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  Object.entries(tokens).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

const StyledLoginForm = styled.form`
  border-radius: ${(props) => props.theme.objectStyles.radius.m};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.floating};
  display: flex;
  flex-direction: column;
  width: 400px;
  height: auto;
  margin: 30px auto 0;
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
  display: block;
  margin: 20px 0;

  & *:hover {
    border: 2px solid ${(props) => props.theme.colors.grey600};
  }
`;

interface StyledButton {
  type: 'login' | 'signUp';
  disabled?: boolean;
}

const StyledButton = styled.button<StyledButton>`
  height: ${(props) => (props.type === 'login' ? '50px' : '40px')};
  color: ${(props) =>
    props.type === 'login'
      ? props.theme.colorSystem.textWhiteDefault
      : props.theme.colorSystem.textDefault};
  background-color: ${(props) =>
    props.type === 'login'
      ? props.theme.colorSystem.surfaceBrand
      : props.theme.colorSystem.surfaceDefault};
  font: ${(props) => props.theme.font.displayBold16};
  border-radius: ${(props) => props.theme.objectStyles.radius.s};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.normal};
  width: 100%;
  margin-top: 20px;

  &:disabled {
    opacity: ${(props) => props.theme.opacity.disabled};
  }

  &:hover {
    opacity: ${(props) => props.theme.opacity.hover};
  }
`;

const StyledValidInfo = styled.div`
  font: ${(props) => props.theme.font.displayMD12};
  color: ${(props) => props.theme.colorSystem.textDanger};
  height: 20px;
  margin-top: 5px;
  padding-left: 10px;
`;
