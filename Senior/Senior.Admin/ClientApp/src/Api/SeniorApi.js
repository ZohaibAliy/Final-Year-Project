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
    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
//Labours ki request ko get karna ka lia 
export const GetLabourRequest = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/LabourRequest/GetLabourRequest");

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    if (resp.status == 200) {
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

    
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Speciality", speciality);
    formData.append("Address", address);
    formData.append("PhNumber", phNumber);
    formData.append("Charges",charges);
    formData.append("image",image)
    




    await axios({
    method: "post",
    url: apiUrl + "api/Labour/AddLabour",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then((response) => {
   
    return (response)

  })

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
  
      if (resp.status == 200) {
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
  
      if (resp.status == 200) {
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
  
      if (resp.status == 200) {
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
  
      if (resp.status == 200) {
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
      const resp = await axios.put(apiUrl + "api/Authetication/RemoveEquipment", {
    
          id:id,
 
      });
  
      if (resp.status == 200) {
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
      const resp = await axios.put(apiUrl + "api/Product/RemoveEquipment", {
        
  
          id: id

        
      });
  
      if (resp.status == 200) {
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
  
      if (resp.status == 200) {
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
  
      if (resp.status == 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };