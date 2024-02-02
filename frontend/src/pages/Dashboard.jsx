import React,{useState,useEffect} from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'
const Dashboard = () => {


  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [balance, setBalance] = useState(0);


  useEffect(() => {
      
    const res = axios.get("http://localhost:8080/api/v1/accounts/balance",
             {
              headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json"
             },
        }
      );
    
    
     console.log(res.data);
    
    // setFirstName(res.data.firstName)
    // setLastName(res.data.lastName)
    // setBalance(res.data.balance)
     
      
    }, []);

  


  return (
    <div>
      <Appbar  />
    
      <div className="m-8">
        <Balance  value={10}/>
        <Users/>
      </div>
    </div>
  )
}

export default Dashboard