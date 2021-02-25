import React, { useCallback, useState } from 'react';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';
import { Redirect, Route, Switch, useParams } from 'react-router';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import { Link } from 'react-router-dom';
import {
  Header, RightMenu, ProfileImg, WorkspaceWrapper, Workspaces,
  Channels, Chats, WorkspaceName, MenuScroll, ProfileModal,
  LogOutButton, WorkspaceButton, AddButton, WorkspaceModal
} from '@layouts/Workspace/style';
import CreateChannelModal from '@components/CreateChannelModal';
import CreateWorkspaceModal from '@components/CreateWorkspaceModal';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace = () => {
  const { workspace, } = useParams();
  const [ showUserMenu, setShowUserMenu, ] = useState(false);
  const [ showCreateWorkspaceModal, setShowCreateWorkspaceModal, ] = useState(false);
  const [ showWorkspaceModal, setShowWorkspaceModal, ] = useState(false);
  const [ showCreateChannelModal, setShowCreateChannelModal, ] = useState(false);

  const { data: userData, revalidate, } = useSWR(
    'http://localhost:3095/api/users',
    fetcher,
    {
      dedupingInterval: 100000,
    }
  );
  const { data: channelData, } = useSWR(
    userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,
    // 로그인을 했을 때에만 채널에 대한 데이터를 가져올 수 있게 한다.
    fetcher
  );

  const onLogOut = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
      });
  }, []);

  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    // 자식 요소를 클릭했을 때에 부모 요소에도 영향을 주는 버블업을 막아준다.

    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  if (!userData) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData.nickname, { s: '28px', d: 'retro', })} alt={userData.nickname} />
            {showUserMenu && (
              <Menu menuStyle={{ right: 0, top: 38, }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro', })} alt={userData.nickname} />
                  <div>
                    <span id='profile-name'>{userData.nickname}</span>
                    <span id='profile-active'>Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {
            userData?.Workspaces.map(ws => {
              return (
                <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                  <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                </Link>
              );
            })
          }
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} menuStyle={{ top: 95, left: 80, }}>
              <WorkspaceModal>
                <h2>Sleact</h2>
                <button onClick={onClickAddChannel}>채널 만들기</button>
              </WorkspaceModal>
            </Menu>
            {
              channelData?.map((item) => {
                return (
                  <div key={item.id}>{item.name}</div>
                );
              })
            }
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path='/workspace/:workspace/channel/:channel' component={Channel} />
            <Route path='/workspace/:workspace/dm/:id' component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      <CreateWorkspaceModal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}
        setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
      />
      <CreateChannelModal show={showCreateChannelModal} onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
    </>
  );
};

export default Workspace;