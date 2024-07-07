import React, { useState } from 'react'
import './modal.css';
import Modal from 'react-modal';
import { deleteCustomer } from '../services/customerServices';

const DeleteModal = ({modalIsOpen,closeModal, deleteId, setDeleteId}) => {
    const [deleteLoading, setDeleteLoading] = useState(false);

    const customStyles = {
        content: {
          fontFamily: 'Poppins, sans-serif'
        }
      };
      const handleDelete = async (id) => {
        console.log('id',id)
        try {
            setDeleteLoading(true);
            await deleteCustomer(id);
            setDeleteLoading(false);
            closeModal();
            setDeleteId(null);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
            setDeleteLoading(false);
            closeModal();
        }

    }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={'ReactModal-Content'}
      overlayClassName={'ReactModal-Overlay'}
    >
 <div style={{ width: '100%' }}>
      <div>
        <h1 style={{ fontWeight: 500 }}>
          Are you sure you want to remove this customer?
        </h1>
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            onClick={() => handleDelete(deleteId)}
            style={{
              marginRight: '1rem',
              borderRadius: '6px',
              backgroundColor: '#036FED',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '24px',
              color: 'white'
            }}
          >
            {deleteLoading ? 'Loading..' : 'Confirm'}
          </button>
          <button
            onClick={closeModal}
            style={{
              borderRadius: '6px',
              borderWidth: '1px',
              borderColor: '#E4E5E8',
              backgroundColor: 'white',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '24px',
              color: 'black'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </Modal>
  )
}

export default DeleteModal
