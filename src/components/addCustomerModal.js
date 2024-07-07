import React, { useState } from 'react'
import Modal from 'react-modal';
import Close from '../assets/close.svg';
import './modal.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCustomer } from '../services/customerServices';


const AddCustomerModal = ({ modalIsOpen, closeModal, setIsOpen }) => {
  const [loading, setLoading] = useState(false);

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
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Phone is required'),
      city: Yup.string()
        .required('City is required'),
    }),
    onSubmit: values => {
      createCustomerData(values)
    },
    enableReinitialize: true
  });
  const createCustomerData = async (values) => {
    setLoading(true);
    try {
      const response = await createCustomer(values);
      if (response.status === 200) {
        setLoading(false);
        setIsOpen(false);
        formik.resetForm();
        window.location.reload();
        
      }
    } catch (err) {
      setLoading(false);
      console.log(err)
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
      <div>
        <div className='modal-content'>
          <h2>Add Customer</h2>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={formik.touched.phone && formik.errors.phone ? 'error' : ''}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error-message">{formik.errors.phone}</div>
              ) : null}
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

            <button type="submit">{loading?'Loading..':'Submit'}</button>

          </form>
        </div>
      </div>
    </Modal>
  )
}

export default AddCustomerModal;
