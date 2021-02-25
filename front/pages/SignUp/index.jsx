import React, { useState, useCallback } from 'react';
import { Form, Header, Label, Input, Button, LinkContainer, Error, Success } from '@pages/SignUp/style';
// 스타일드 컴포넌트는 다른 파일로 빼두는 게 좋다. 코드량이 많아지기 때문이다.
import useInput from '@hooks/useInput';
// 커스텀 훅을 만들어 사용하면 중복을 줄일 수 있다.

import axios from 'axios';
// 액시오스로 다른 서버와의 통신을 한다.

import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
// 라우터에서 링크 컴포넌트를 지원한다.

const Signup = () => {
  const { data, revalidate, } = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 100000,
  });
  
  const [ email, onChangeEmail, ] = useInput('');
  const [ nickname, onChangeNickname, ] = useInput('');
  const [ password, setPassword, ] = useState('');
  const [ passwordCheck, setPasswordCheck, ] = useState('');
  const [ mismatchError, setMismatchError, ] = useState(false);
  const [ signUpSuccess, setSignUpSuccess, ] = useState(false);
  const [ signUpError, setSignUpError, ] = useState(false);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setMismatchError(passwordCheck !== e.target.value);
    console.log(mismatchError);
  }, [ passwordCheck, ]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setMismatchError(password !== e.target.value);
    console.log(mismatchError);
  }, [ password, ]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    setSignUpSuccess(false);
    setSignUpError(false);

    if (!mismatchError) {
      axios
        .post('http://localhost:3095/api/users', {
          email,
          nickname,
          password,
        })
        .then(() => {
          revalidate();
          setSignUpSuccess(true);
        })
        .catch((error) => {
          setSignUpError(error.response?.statusCode === 403);
        });
    }
  }, [ email, nickname, password, mismatchError, ]);

  if (data === undefined) {
    return <div>로딩중입니다..</div>;
  }

  if (data) {
    return <Redirect to='/workspace/sleact/channel/일반' />;
  }

  return (
    <>
      <div id='container'>
        <Header>Sleact</Header>
        <Form onSubmit={onSubmit}>
          <Label id='email-label'>
            <span>이메일 주소</span>
            <div>
              <Input type='email' id='email' name='email' value={email} onChange={onChangeEmail} required />
            </div>
          </Label>
          <Label id='nickname-label'>
            <span>닉네임</span>
            <div>
              <Input type='text' id='nickname' name='nickname' value={nickname} onChange={onChangeNickname} required />
            </div>
          </Label>
          <Label id='password-label'>
            <span>비밀번호</span>
            <div>
              <Input type='password' id='password' name='password' value={password} onChange={onChangePassword} required />
            </div>
          </Label>
          <Label id='password-check-label'>
            <span>비밀번호 확인</span>
            <div>
              <Input type='password' id='password-check' name='password-check'
                value={passwordCheck} onChange={onChangePasswordCheck} required
              />
            </div>
          </Label>

          {!email && <Error>이메일을 입력하지 않았습니다.</Error>}
          {!nickname && <Error>닉네임을 입력하지 않았습니다.</Error>}
          {!password && <Error>비밀번호를 입력하지 않았습니다.</Error>}
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}

          <Button type='submit'>회원가입</Button>
        </Form>
        <LinkContainer>
          이미 회원이신가요? <Link to='/login'>로그인 하러가기</Link>
        </LinkContainer>
      </div>
    </>
  );
};

export default Signup;