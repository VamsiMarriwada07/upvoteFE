import { React, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import ItemCards from "./itemcard";
import '../styles/products.css';
import Lottie from "lottie-react";
import Doubt from "../assets/doubt.json";
import Modal from "./modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


export default function Cart() {
  axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState(false);
  const [items, setItems] = useState([]);
  const [name,setName] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input1, setInput1] = useState("");
  

  const notify = () => {
    toast.error("Please login to continue",{
      position: "top-center"
  });
  }
  const handleAddNew = () => {
    const newItem = input1;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add`,{newItem,name})
        .then(res=>{
            console.log(res);
            window.location.reload();
        })
    closeModal();
  };


  useEffect(() => {
    const token = Cookies.get('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}`,{token}).then((res) => {
      if (res.data.Status === "Success") {
        setName(res.data.name);
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  }, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/retrieve`,{name})
        .then((res) => {
          const data = JSON.parse(res.data);
          setItems(data);
        })
        .catch((err) => {
          console.log(err);
        });
    
  }, [name]);

  const openModal = () => {
    if(!auth){
      notify();
    }
    else{
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e, inputNumber) => {
    const inputValue = e.target.value;
    setInput1(inputValue);
  };
  const handleUpvote = (id,itemName) => {
    if(!auth){
      notify();
    }
    else{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/upvote`,{id,itemName,name})
    .then(res => {
      console.log(res);
      window.location.reload(true)
    })
    .catch(error => {
      console.error("Error updating votes:", error);
    });
  };
}
  const handleDownvote = (itemName) =>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/downvote`,{itemName,name})
    .then(res => {
      console.log(res);
      window.location.reload(true)
    })
    .catch(error => {
      console.error("Error updating votes:", error);
    });
  }
 if(!isModalOpen){
  return (
    <div>
      <Navbar auth={auth} name={name}/>
      <div className="flex justify-end items-center mt-14 mr-[30%]">
        <button className=" font-semibold border-[1px] rounded-[10px] border-black h-8 w-24 hover:border-green-600 hover:text-green-600 hover:border-[3px] hover:shadow-xl ease-out duration-40" onClick={openModal}>New +</button>
      </div>
      <div className="flex justify-center flex-col items-center mt-5">
        {items.map((item, index) => (
          <div key={index}>
            <ItemCards item={item} user={name} handleUpvote={handleUpvote} handleDownvote={handleDownvote}/>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-14">
          <p className="text-xl font-bold mr-5">Ask your doubts</p>
          <Lottie animationData={Doubt} style={{height:150}}></Lottie>
      </div>
      <div>
        <Footer />
        
      </div>
      <ToastContainer />
    </div>
        
  );

 }
 if(isModalOpen){
  console.log(isModalOpen);
  return(
    <Modal
        isAuth={auth}
        isOpen={isModalOpen}
        onClose={closeModal}
        onInputChange={handleInputChange}
        onAddNew={handleAddNew}
    />
  );
  
 }
  
}
