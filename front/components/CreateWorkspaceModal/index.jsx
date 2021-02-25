import React, { useCallback } from 'react';
import Modal from '@components/Modal';
import { Label, Button, Input } from '@pages/SignUp/style';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import PropTypes from 'proptypes';

const CreateWorkspaceModal = ({ show, onCloseModal, setShowCreateWorkspaceModal, }) => {
  const [ newWorkspace, onChangeNewWorkspace, setNewWorkspace, ] = useInput('');
  const [ newUrl, onChangeNewUrl, setNewUrl, ] = useInput('');

  const { revalidate, } = useSWR(
    'http://localhost:3095/api/users',
    fetcher,
    {
      dedupingInterval: 100000,
    }
  );

  const onCreateWorkspace = useCallback((e) => {
    e.preventDefault();

    if (!newWorkspace || !newWorkspace.trim()) return;
    if (!newUrl || !newUrl.trim()) return;

    axios
      .post('http://localhost:3095/api/workspaces', {
        workspace: newWorkspace,
        url: newUrl,
      }, {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
        setShowCreateWorkspaceModal(false);
        setNewWorkspace('');
        setNewUrl('');
      })
      .catch((error) => {
        console.dir(error);
        toast.error(error.response?.data, { position: 'bottom-center', });
      });
  }, [ newWorkspace, newUrl, ]);
  
  return (
    <>
      <Modal show={show} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id='workspace-label'>
            <span>워크스페이스 이름</span>
            <Input id='workspace' value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id='workspace-url-label'>
            <span>워크스페이스 주소</span>
            <Input id='workspace-url' value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type='submit'>생성하기</Button>
        </form>
      </Modal>
    </>
  );
};

CreateWorkspaceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  setShowCreateWorkspaceModal: PropTypes.func.isRequired,
};

export default CreateWorkspaceModal;