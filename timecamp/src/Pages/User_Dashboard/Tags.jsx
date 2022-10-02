import React from 'react'
import {Box,Text,Button,Input,Flex, Spinner} from "@chakra-ui/react"
import { useState } from 'react'
import { useEffect } from 'react';
import { BiPlus} from 'react-icons/bi';
import { BsArchive } from 'react-icons/bs';
import axios from "axios";
import Navbar from '../../Components/Dashboard/Navbar';
import Usermenu from './CommonNavbar';

 const Tags = () => {
  const [show, setShow] =useState(false);
  const [data, setData]=useState([]);
  const [loading, setLoading] =useState(false)
  const [value, setValue]=useState("");
  const [get, setGet]=useState(false)

  function change(){
    setShow(!show)
  }
  async function getData(){//give user id here
    // localStorage.setItem("token","63344372e20682bebf2433eb:bishal@gmail.com:no");
    let token=localStorage.getItem("token");
    let [id]=token.split(":");
    let dataa= await fetch(`http://localhost:8080/users/tags/${id}`);
    let res= await dataa.json();
    setData(res.tags)
    setTimeout(()=>{
      setLoading(true)
    },1000)
    

  }
  function addList(value){
    // localStorage.setItem("token","63344372e20682bebf2433eb:bishal@gmail.com:no");
    let token=localStorage.getItem("token");
    let [id]=token.split(":");
    axios.patch(`http://localhost:8080/users/tags/${id}`,{"tags":value})
    setGet(!get)
    setValue("")
  }


  function handleChange(e){
   setValue(e.target.value);
   console.log(value)
  }
  // console.log(data)
  useEffect(()=>{
    getData()
  },[get]);

  return (
    <Box>
      <Navbar />
        <Usermenu title="Summary"/>
        <Box style={{width:"50%",marginLeft:"50px",marginTop:"50px"}}>
            <Button style={{marginLeft:"550px",marginBottom:"20px"}} bgColor="green" color="white" onClick={change}>+Add Tag List</Button>
            <Text>Manage your tags, like list of customers or activities. All workspace members can assign tags to time entries, when they track time. Project managers can set lists of tags for projects. Reports can be filtered and grouped by tags.</Text>
         {show&&<Flex style={{marginBottom:"50px",marginTop:"50px"}}>
            <Input type="text" placeholder='New List Name' onChange={handleChange} value={value}/>
            <Flex style={{marginBottom:"50px"}}>
              <Button onClick={()=>addList(value)} style={{margin:"0px 20px"}} bgColor="green.400" color="white">Add</Button>
              <Button>Cancel</Button>
            </Flex>
            </Flex>}
            {!loading && <Spinner thickness='4px'speed='1.65s'emptyColor='gray.200'color='blue.500'size='xl'/>}
            {loading&&
              data.map((item)=>(
                <Flex key={item} bgColor="gray.100" padding="10px" borderRadius="15px" justifyContent="space-evenly" marginTop="10px">
                  <Box> <Text fontSize="18px">{item}</Text></Box>
                  <Box>
                    <Button marginRight="10px" bgColor="gray.300">
                        <BiPlus />
                    </Button>
                    <Button bgColor="gray.300"> 
                      <BsArchive />
                    </Button>
                  </Box>
                  
                </Flex>
               
              ))
            }
            <hr style={{marginTop:"50px",marginBottom:"10px"}}/>
          <Box style={{marginBottom:"50px",display:"flex"}}>
          <Button marginRight="10px" bgColor="lightgreen" color="white">Save Settings</Button>
          <Button>Back to addons list</Button>
        </Box>
        </Box>
        <hr style={{marginTop:"50px"}}/>
        
    </Box>
  )
}
export default Tags;