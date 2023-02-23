import React, {useState} from "react";

export const CustomerForm = ({original, onSubmit}) => {
  const [customer, setCustomer] = useState(original);

  const handleChange = ({target}) => 
    setCustomer(customer => ({
      ...customer,
      [target.name]: target.value
    }))

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(customer);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input 
        type="text" 
        name="firstName"
        id="firstName"
        value={customer.firstName}
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last Name</label>
      <input 
        type="text"
        name="lastName"
        id="lastName"
        value={customer.lastName}
        onChange={handleChange}
      />
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={customer.phoneNumber}
        readOnly
        onChange={handleChange}
      />
      <input type="submit" value="Add"/>
    </form>
  )
};