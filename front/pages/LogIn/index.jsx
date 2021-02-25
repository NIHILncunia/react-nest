import React, { useCallback, useState } from 'react';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/style';
import { Link, Redirect } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  const { data, revalidate, } = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 100000,
  });
  // swr을 이용해서 로그인 여부를 확인할 수 있다. fetcher에서 리턴되는 값을 가져올 수 있다.
  const [ email, onChangeEmail, ] = useInput('');
  const [ password, onChangePassword, ] = useInput('');
  const [ logInError, setLogInError, ] = useState(false);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3095/api/users/login', {
        email, password,
      }, {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
      })
      .catch((error) => {
        console.dir(error);
        setLogInError(error.response?.status === 401);
      });
  }, [ email, password, ]);

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
          <Label id='emeil-label'>
            <span>이메일 주소</span>
            <div>
              <Input type='email' it='email' name='email' value={email} onChange={onChangeEmail} />
            </div>
          </Label>
          <Label id='password-label'>
            <span>비밀번호</span>
            <div>
              <Input type='password' id='password' name='password' value={password} onChange={onChangePassword} />
            </div>
          </Label>
          {logInError && <Error>이메일과 비밀번호가 일치하지 않습니다.</Error>}
          <Button type='submit'>로그인</Button>
        </Form>
        <LinkContainer>
          아직 회원이 아니신가요? <Link to='/signup'>회원가입 하러가기</Link>
        </LinkContainer>
      </div>
    </>
  );
};

export default LogIn;