import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
export default function About() {

  const Navigate = useNavigate();
  const [userdata,setuserdata] = useState({});
   async function  callAboutpage(){
     try{
       const res = await  fetch("/about",{
         method:"GET",
         headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
         },
         credentials:"include"
       })
      const data = await res.json()
      setuserdata(data)
      if(!res.status===200){
        const error = new Error(res.error);
        throw error
      }     
     }
     catch(err){
       Navigate('/login')
     }
   }


  useEffect(() => {
    callAboutpage() ;                                        
  })
  
  return (
    <>
     <div>{userdata.name}</div>
     <div>{userdata.email}</div>
     <div>{userdata.phone}</div>
     <div>{userdata.work}</div>

    </>
  )
}
