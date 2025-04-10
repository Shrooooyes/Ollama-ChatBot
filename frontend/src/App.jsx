import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';


import './App.css'
import ChatInterface from './assets/ChatInterface'
import Signup from './assets/Signup'
import Alert from './assets/Alert'


const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome ${user.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [user])

  return (
    <div>
      {/* <Alert/> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {
        user ?
          <ChatInterface setUser={setUser} chats={user.chats} email={user.email} /> :
          <Signup setUser={setUser} />
      }
    </div>
  )
}

export default App
