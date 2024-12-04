import axios from "axios";


const apiUrl = "https://localhost:7206/";
//const apiUrl = "http://senior.ecommerce.local.api/";

/* Accounts */
export const userLogin = async (email, password) => {
  try {
    debugger;
    const resp = await axios.post(apiUrl + "api/Authetication/Login", {
      email: email,
      password: password,
    });
    if (resp.data.id > 0) {
      localStorage.setItem("user", JSON.stringify(resp.data));
    }
    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const GetContractor = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Project/GetContractor");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
//Product ko get karna ka lia 
export const GetProducts = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Product/GetEquipment");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const GetActiveProducts = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Product/GetActiveEquipment");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const GetUnactiveProducts = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Product/GetUnactiveEquipment");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
// project ko get karna ka lia 
export const GetProject = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Project/GetProject");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
//Labour ko get karna ka lia 
export const GetLabour = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Labour/GetLabour");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
//Prders ko get karna ka lia 
export const GetOrders = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Order/GetOrders");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

export const GetProjectEquipment = async (projectId) => {
  try {
    // Check that projectId is being sent correctly
    console.log("Making API call with projectId:", projectId);
    const resp = await axios.get(apiUrl+"api/Project/GetProjectEquipment", {
      params: {
        projectId: projectId,
      },
    });
    
    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const GetProjectLabour = async (projectId) => {
  try {
    // Check that projectId is being sent correctly
    console.log("Making API call with projectId:", projectId);
    const resp = await axios.get(apiUrl+"api/Project/GetProjectLabour", {
      params: {
        projectId: projectId,
      },
    });
    
    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

export const assignEquipmentToProject = async (equipmentId, projectId) => {
  try {
    const response = await axios.post(apiUrl+"api/Project/AssignEquipment", {
      equipmentId,
      projectId,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded but with an error status
      console.error("Error Response:", error.response.data);
    } else if (error.request) {
      // Request was sent but no response received
      console.error("No Response:", error.request);
    } else {
      // Other errors
      console.error("Error:", error.message);
    }
    throw error;
  }
};

export const assignLabourToProject = async (labourId, projectId) => {
  try {
    const response = await axios.post(apiUrl+"api/Project/AssignLabour", {
      labourid: labourId,
      projectid: projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error assigning labour to project:", error);
    throw error;
  }
};

export const RemoveProjectEquipment = async (equipmentId) => {
  try {
    const response = await axios.delete(apiUrl+"api/Project/RemoveProjectEquipment",
      {
        params: {
          request: equipmentId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing project equipment:", error);
    throw error;
  }
};
export const RemoveProjectLabour = async (labourId) => {
  try {
    const response = await axios.delete(apiUrl+"api/Project/RemoveProjectLabour",
      {
        params: {
          request: labourId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing project equipment:", error);
    throw error;
  }
};
//Labours ki request ko get karna ka lia 
export const GetLabourRequest = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/LabourRequest/GetLabourRequest");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
// tmaam users ko get karna ka lia 
export const GetUsers = async (data) => {
  try {
    const resp = await axios.get(apiUrl + "api/Authetication/GetAllUsers");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
// jaab contractor request dala ga equipment ka lia 
export const OrderPlace = async (
  productId,
  userId,
  address,
  productName,
  customerName,
  email
) => {
  try {
    const resp = await axios.post(apiUrl + "api/Order/PlaceOrders", {
      productId: productId,
      userId: userId,
      address: address,
      productName: productName,
      customerName: customerName,
      customerEmail: email,
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return err.response;
  }
};


// jab conttractor request dala ga labours ka lia 
export const LabourRequest = async (
  labourId,
  userId,
  address,
  firstName,
  lastName,
  customerName,
  email
) => {
  try {
    const resp = await axios.post(apiUrl + "api/LabourRequest/PlaceLabourRequest", {
      labourId: labourId,
      userId: userId,
      address: address,
      firstName: firstName,
      lastName: lastName,
      customerName: customerName,
      customerEmail: email,
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
// request ko check akrna ka lia 
export const CheckMyOrders = async (id) => {
  try {
    const resp = await axios.get(apiUrl + "api/Order/MyOrders", {
      params: {
        id: id,
      },
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const MyProject = async (id) => {
  try {
    const resp = await axios.get(apiUrl + "api/Project/GetMyProject", {
      params: {
        id: id,
      },
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
// labour ki request ko check karna ka lia 
export const CheckMyLabourRequest = async (id) => {
  try {
    const resp = await axios.get(apiUrl + "api/LabourRequest/MyLabourRequest", {
      params: {
        id: id,
      },
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
// jaab admin ya project manager request ko respond kara ga equipment ki  
export const UpdateStatus = async (id, status) => {
  try {
    const resp = await axios.put(apiUrl + "api/Order/ChangeStatus", {
      id: id,
      status: status,
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
 // jaab admin ya project manager request ko respond kara ga labour ki
export const UpdateRequestStatus = async (id, status) => {
  try {
    const resp = await axios.put(apiUrl + "api/LabourRequest/ChangeStatus", {
      id: id,
      status: status,
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
// new user add karna ka lia 
export const RegisterUser = async (
  firstName,
  lastName,
  email,
  password,
  gender
) => {
  try {
    const resp = await axios.post(apiUrl + "api/Authetication/Register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender,
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

// purana equipment ma changes karna ka lia
export const UpdateProducts = async (
  Id,
  ProductName,
  price,
  quantity,
  description,
  image
) => {

    const formData = new FormData();
    formData.append("Id", Id);
    formData.append("image", image);
    formData.append("ProductName", ProductName);
    formData.append("Price", price);
    formData.append("Quantity", quantity);
    formData.append("Description", description);

  await axios({
    method: "put",
    url: apiUrl + "api/Product/UpdateEquipment",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then((response) => {
   
    return (response)

  }) 

  };
  
// purana equipment ma changes karna ka lia
export const UpdateProject = async (
  Id,
  title,
  description,
  location,
  startDate,
  endDate,
  expectedBudget,
  ContractorName,
  userid
  
) => {

    const formData = new FormData();
    formData.append("Id", Id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("expectedBudget",expectedBudget);
    formData.append("ContractorName",ContractorName);
    formData.append("userid",userid);

  await axios({
    method: "put",
    url: apiUrl + "api/Project/UpdateProject",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then((response) => {
   
    return (response)

  }) 

  };



  // purana labour ki details change karna ka lia 
export const UpdateLabour = async (
  Id,
  FirstName,
  LastName,
  charges,
  Speciality,
  Address,
  PhNumber,
  image
) => {

    const formData = new FormData();
    formData.append("Id", Id);
    formData.append("image", image);
    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    formData.append("PhNumber", PhNumber)
    formData.append("Charges", charges);
    formData.append("Address", Address);
    formData.append("Speciality", Speciality);

  await axios({
    method: "put",
    url: apiUrl + "api/Labour/UpdateLabour",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then((response) => {
   
    return (response)

  }) 

  };
// equipment ko system ma save karna kaa lia 
export const UploadProducts = async (
  ProductName,
  price,
  quantity,
  description,
  image
) => {

    
    const formData = new FormData();
    formData.append("image", image);
    formData.append("ProductName", ProductName);
    formData.append("Price", price);
    formData.append("Quantity", quantity);
    formData.append("Description", description);




    await axios({
    method: "post",
    url: apiUrl + "api/Product/AddEquipment",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then((response) => {
   
    return (response)

  })

  };
  //Project naya banane ka lia 
  export const UploadProject = async (
    title,
    description,
    location,
    startDate,
    endDate,
    expectedBudget,
    ContractorName,
    userid
  ) => {
   const payload={
      title:title,
      description:description,
      location:location,
      startDate:startDate,
      endDate:endDate,
      expectedBudget:expectedBudget,
      ContractorName:ContractorName,
      userid:userid
    }
    try {
      const response = await axios.post(apiUrl + "api/Project/AddProject", payload);
      return response;
    } catch (error) {
      console.error("Error uploading project:", error);
      throw error; // Re-throw the error for higher-level handling
    }
  };
  // labour ko system ma save karna ka lia 
export const UploadLabour = async (
  firstName,
  lastName,
  speciality,
  address,
  phNumber,
  charges,
  image
) => {

    
    const payload = {
      firstName:firstName,
      lastName:lastName,
      speciality:speciality,
      address:address,
      phNumber:phNumber,
      charges:charges,
      image:image
    }


    try {
      const response = await axios.post(apiUrl + "api/Labour/AddLabour", payload);
      return response;
    } catch (error) {
      console.error("Error uploading project:", error);
      throw error; // Re-throw the error for higher-level handling
    }
  };
// naya user banane ka lia 
  export const CreateUser = async (
    firstName,
    lastName,
    email,
    password,
    gender,role
  ) => {
    try {
      const resp = await axios.post(apiUrl + "api/Authetication/AddAdmin", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        role:role,
      });
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
  // user ko change karna ka lia 
  export const ChangeUser = async (
    id,
    firstName,
    lastName,
    email,
    password,
    gender,
    role,

  ) => {
    try {
      const resp = await axios.put(apiUrl + "api/Authetication/UpdateUser", {
        id:id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        role:role,
      });
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
  
// requewst ma changes karna ka lia 
  export const ChangeOrder = async (
    id,
    customerName,
    customerEmail,
    address,
  
   



  ) => {
    try {
      const resp = await axios.put(apiUrl + "api/Order/UpdateOrder", {
        id:id,
        address:address,
        customerName:customerName,
        customerEmail:customerEmail,
      });
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
// labour ki request ma changes karna ka lia 

  export const ChangeLabourRequest = async (
    id,
    customerName,
    customerEmail,
    address,
  
   



  ) => {
    try {
      const resp = await axios.put(apiUrl + "api/LabourRequest/UpdateLabourRequest", {
        id:id,
        address:address,
        customerName:customerName,
        customerEmail:customerEmail,
      });
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };

// kisi user ko delete karna ka lia 
  export const RemoveUser = async (id) => {
    try {
      const resp = await axios.put(apiUrl + "api/Authetication/RemoveUser", {
    
          id:id,
 
      });
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
 // kisi equipment ko delete karna ka lia 
  export const RemoveProduct = async (id) => {
    try {
      const resp = await axios.put(apiUrl + "api/Product/UnactiveEquipment", {
        
  
          id: id

        
      });
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
  
 
  //kisi project ko remove karna ka lia 
  export const RemoveProject = async (id) => {
    try {
      const resp = await axios.put(apiUrl + "api/Project/RemoveProject", {
        
  
          id: id

        
      });
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
  export const RemoveLabour = async (id) => {
    try {
      const resp = await axios.put(apiUrl + "api/Labour/RemoveLabour", {
        
  
          id: id

        
      });
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
  export const ActivateProducts = async (id) => {
    try {
      // Make the API request to activate the product
      const resp = await axios.put(apiUrl + "api/Product/ActiveEquipment", {
        id: id
      });
  
      // Check if the response status code is in the 2xx range (success)
      if (resp.status >= 200 && resp.status < 300) {
        return { success: true, data: resp.data }; // Return data if request is successful
      } else {
        // Return a standardized error object if the status is not in the success range
        return { success: false, message: 'Failed to activate product. Please try again.' };
      }
    } catch (err) {
      // Handle the error and provide a meaningful message
      if (err.response) {
        // Server responded with an error status
        return { success: false, message: err.response.data.message || 'An error occurred while activating the product.' };
      } else if (err.request) {
        // The request was made but no response was received
        return { success: false, message: 'No response from server. Please check your internet connection.' };
      } else {
        // Something else happened during the setup of the request
        return { success: false, message: 'An unexpected error occurred. Please try again later.' };
      }
    }
  };