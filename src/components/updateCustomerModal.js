import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Close from '../assets/close.svg';
import './modal.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateCustomer } from '../services/customerServices';


const UpdateCustomerModal = ({ modalIsOpen, closeModal, setIsOpen, customerData }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (customerData) {
            formik.setValues({
                name: customerData.name || '',
                email: customerData.email || '',
                phone: customerData.phone || '',
                city: customerData.city || ''
            });
        }
    }, [customerData]);

    const customStyles = {
        content: {
            fontFamily: 'Poppins, sans-serif'
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            city: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            city: Yup.string()
                .required('City is required'),
        }),
        onSubmit: values => {
            updateCustomerData(values);
        },
        enableReinitialize: true
    });

    const updateCustomerData = async (values) => {
        setLoading(true);
        try {
            const response = await updateCustomer(customerData.id, values);
            if (response.status === 200) {
                setLoading(false);
                setIsOpen(false);
                formik.resetForm();
                window.location.reload();
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className={'ReactModal-Content'}
            overlayClassName={'ReactModal-Overlay'}
        >
            <div>
                <div className='modal-content'>
                    <h2>Update Customer</h2>
                    <img src={Close} alt="close" onClick={() => { formik.resetForm(); setIsOpen(false); }} />
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={formik.touched.name && formik.errors.name ? 'error' : ''}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="error-message">{formik.errors.name}</div>
                            ) : null}
                        </div>

                        <div>
                            <label>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={formik.touched.email && formik.errors.email ? 'error' : ''}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error-message">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div>
                            <label>Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                disabled
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                        </div>

                        <div>
                            <label>City</label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                                className={formik.touched.city && formik.errors.city ? 'error' : ''}
                            />
                            {formik.touched.city && formik.errors.city ? (
                                <div className="error-message">{formik.errors.city}</div>
                            ) : null}
                        </div>

                        <button type="submit">{loading ? 'Loading..' : 'Update'}</button>

                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateCustomerModal;
