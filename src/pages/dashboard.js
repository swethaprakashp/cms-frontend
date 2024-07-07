import React, { useEffect, useState } from 'react'
import '../App.css'
import Header from '../components/header';
import Edit from '../assets/edit.svg';
import Delete from '../assets/delete.svg';
import { getAllCustomers } from '../services/customerServices';
import DeleteModal from '../components/deleteModal';
import UpdateCustomerModal from '../components/updateCustomerModal';

const Dashboard = () => {

    const [checked, setChecked] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [updatePopup, setUpdatePopup] = useState(false);

    const getAllCustomerData = async () => {
        try {
            const response = await getAllCustomers();
            setData(response);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    useEffect(() => {
        setLoading(true);
        getAllCustomerData();
    }, [])

    const handleCheckboxChange = (id) => {
        setChecked((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((i) => i !== id)
                : [...prevSelected, id],
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allData = data.map(item => item.id);
            setChecked(allData);
        }
        else {
            setChecked([]);
        }
    };

    return (
        <div className='content'>
            {
                !loading ? (
                    <>
                        <Header isChecked={checked && checked.length > 0 ? true : false} checked={checked} setChecked={setChecked} />
                        {
                            data && data.length > 0 ? (
                                <div className='table-wrapper'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        checked={checked.length === data.length}
                                                        onChange={(e) => handleSelectAll(e)}
                                                    />
                                                </th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>City</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={checked.includes(item.id)}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                        />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.city}</td>
                                                    <td className='action-col'>
                                                        <img src={Edit} alt="edit" style={{ marginLeft: 10, marginRight: 20, cursor: 'pointer' }} onClick={()=> {setUpdatePopup(true); setCustomerData(item);}}/>
                                                        <img src={Delete} alt="delete" style={{ cursor: 'pointer' }} onClick={()=> {setDeletePopup(true); setDeleteId(item.id)}} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : <div className='container'>
                                <h1 className='header-title'>No Data Found</h1>
                            </div>
                        }
                    </>
                ) : <div className='container'>
                    <h1 className='header-title'>Loading...</h1>
                </div>
            }
            <>
                {
                    deletePopup && (
                        <DeleteModal modalIsOpen={deletePopup} closeModal={() => setDeletePopup(false)} deleteId={deleteId} setDeleteId={setDeleteId}/>
                    )
                }
            </>
            <>
                {
                    updatePopup && (
                        <UpdateCustomerModal modalIsOpen={updatePopup} setIsOpen={setUpdatePopup} closeModal={() => setUpdatePopup(false)} customerData={customerData} />
                    )
                }
            </>
        </div>
    )
}

export default Dashboard;
