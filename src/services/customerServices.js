import axios from "axios";
const API_URL = "https://customer-management-system-hamw.onrender.com";

export const getAllCustomers = async () => {
    const response = await axios.get(`${API_URL}/customer`);
    return response.data;
}

export const createCustomer = async (customer) => {
    const response = await axios.post(`${API_URL}/customer`, customer);
    return response;
}
export const updateCustomer = async(id, data) => {
    const response = await axios.put(`${API_URL}/customer/${id}`, data);
    return response;
}
export const deleteCustomer = async (id) => {
    const response = await axios.delete(`${API_URL}/customer/${id}`)
    return response;
}

export const deleteSelectedCustomers = async (ids) => {
    const response = await axios.delete(`${API_URL}/customer/multiple/del`, { data: { ids } });
    return response;
}