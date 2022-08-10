import './App.css';
import { useState,useEffect } from 'react'
import Login from './app/components/Login';
import {auth} from './utils/firebase'
import UploadFiles from './app/UploadFile';
function App() {
  const [user, setUsers] = useState(null)
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(!authUser) return setUsers(null);
        setUsers({
            ...authUser?.providerData[0]
        });
    })
    return () => {
        unsubscribe()
    }
}, [])

  return (
  
    <div className='max-w-md mx-auto bg-gray-100 p-3 h-screen flex flex-col'>
     <div className='flex items-center justify-between border-b mb-5 py-2 '>
     <h1 className='text-xl font-semibold'>Hello Mango People Chat</h1>
     {user && (
           <button
        type="button"
        className="flex items-center justify-center w-fit p-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-opacity-75 hover:bg-opacity-50"
        onClick={() => auth.signOut()}
      >
       Logout
      </button>
     )}
     </div>
    {user ? <UploadFiles user={user} /> :  <Login/>}
    </div>

  );
}

export default App;
