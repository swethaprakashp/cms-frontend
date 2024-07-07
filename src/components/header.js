import React, { useState } from 'react'
import '../App.css'
import AddCustomerModal from './addCustomerModal';
import { deleteSelectedCustomers } from '../services/customerServices';


const Header = ({ isChecked, checked, setChecked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [allDeleteLoading, setAllDeleteLoading] = useState(false);

    const onCloseModal = () => {
        setIsOpen(false);
    }
    const deleteSelected = async (ids) => {
        setAllDeleteLoading(true);
        try {
            await deleteSelectedCustomers(ids);
            setAllDeleteLoading(false);
            setChecked([]);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='header'>
            <h1 className='header-title'>Customer List</h1>
            <div className='btn-container'>
                {
                    isChecked &&
                    <div className='button' onClick={() => deleteSelected(checked)}>
                        <h1 className='btn-txt'>{allDeleteLoading ? 'Deleting...' : 'Delete'}</h1>
                    </div>
                }
                <div className='button' onClick={() => setIsOpen(true)}>
                    <h1 className='btn-txt'>Add customer</h1>
                </div>
            </div>
            <AddCustomerModal modalIsOpen={isOpen} closeModal={onCloseModal} setIsOpen={setIsOpen} />
        </div>
    )
}

export default Header;
