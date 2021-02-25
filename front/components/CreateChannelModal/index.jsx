import React, { useCallback } from 'react';
import Modal from '@components/Modal';
import { Label, Button, Input } from '@pages/SignUp/style';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import PropTypes from 'proptypes';

const CreateChannelModal = ({ show, onCloseModal, setShowCreateChannelModal, }) => {
  const [ newChannel, onChangeNewChannel, setNewChannel, ] = useInput('');
  const { workspace, } = useParams();

  const { data: userData, } = useSWR(
    'http://localhost:3095/api/users',
    fetcher,
    {
      dedupingInterval: 100000,
    }
  );
  const { revalidate: revalidateChannel, } = useSWR(
    userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,
    // 로그인을 했을 때에만 채널에 대한 데이터를 가져올 수 있게 한다.
    fetcher
  );

  const onCreateChannel = useCallback((e) => {
    e.preventDefault();

    if (!newChannel || !newChannel.trim()) return;

    axios
      .post(`http://localhost:3095/api/workspaces/${workspace}/channels`, {
        name: newChannel,
      }, {
        withCredentials: true,
      })
      .then(() => {
        revalidateChannel();
        setShowCreateChannelModal(false);
        setNewChannel('');
      })
      .catch((error) => {
        console.dir(error);
        toast.error(error.response?.data, { position: 'bottom-center', });
      });
  }, [ newChannel, ]);
  
  return (
    <>
      <Modal show={show} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateChannel}>
          <Label id='channel-label'>
            <span>채널 이름</span>
            <Input id='channel' value={newChannel} onChange={onChangeNewChannel} />
          </Label>
          <Button type='submit'>생성하기</Button>
        </form>
      </Modal>
    </>
  );
};

CreateChannelModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  setShowCreateChannelModal: PropTypes.func.isRequired,
};

export default CreateChannelModal;