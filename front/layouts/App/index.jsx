import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable(() => import('@pages/LogIn'));
const Signup = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

// loadable을 사용하면 코드스플리팅이 가능하다.

const App = () => {
  return (
    <>
      <Switch>
        <Redirect exact path='/' to='/login' />
        {/* 특정 페이지에 왔을 때에 지정한 페이지로 리다이렉트시킨다. */}
        <Route path='/login' component={LogIn} />
        <Route path='/signup' component={Signup} />
        <Route path='/workspace/:workspace' component={Workspace} />
      </Switch>
    </>
  );
};

export default App;