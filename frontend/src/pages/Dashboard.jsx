import React,{useState,useEffect} from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'
const Dashboard = () => {


      
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [balance, setBalance] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://paytm-tu3l.onrender.com/api/v1/accounts/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        );

        const accountData = response.data;
        setFirstName(accountData.firstName);
        setLastName(accountData.lastName);
        setBalance(accountData.balance);
      } catch (error) {
        console.error('Error fetching account balance:', error);
      }
    };

    fetchData(); 

  }, []); 

  

  return (
    <div>
      <Appbar firstName={firstName} />
    
      <div className="m-8">
        <Balance  value={balance}/>
        <Users />
      </div>
    </div>
  )
}

export default Dashboard