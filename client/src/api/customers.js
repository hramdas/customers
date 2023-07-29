import { AXIOS_INSTANCE } from "../axios";

export const getCustomersAPI = async (page, limit) => {
  try {
    const options = {
        url: `/customers?page=${page}&limit=${limit}`,
        method: 'GET',
    }
    const { data } = await AXIOS_INSTANCE(options)
    return data
  }
  catch (error) {
      throw error
  }
};

export const updateCustomerAPI = async (id, name, email, contact, status) => {
  try {
    const options = {
      url: `/customer/${id}`,
      method: 'Patch',
      data : {name, email, contact, status}
    }
    return await AXIOS_INSTANCE(options)
  }
  catch (error) {
      throw error
  }
};

export const createCustomerAPI = async (customerDetails) => {
  try {
    const options = {
      url: `/customer`,
      method: 'POST',
      data : customerDetails
    }
    const { data, status } = await AXIOS_INSTANCE(options)
    return {status, message:  data?.messsage}
  }
  catch (error) {
    return {status: 400 , message : error?.response?.data?.message || "Error"}
  }
};

export const deleteCustomerAPI = async (customerId) => {
  try {
    const options = {
        url: `/customer/${customerId}`,
        method: 'DELETE',
    }
    const { data } = await AXIOS_INSTANCE(options)
    return data
  }
  catch (error) {
      throw error
  }
};