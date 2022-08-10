import React, { useEffect, useRef, useState } from "react";
import { db, timestamp } from "../../utils/firebase";

function Chat({ user }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const endOffMeassage = useRef(null)


  useEffect(() => {
    const unsub =  db.collection('chats')
    .orderBy('timestamp', 'desc')
    .limit(50)
    .onSnapshot(snapshot => {
      setMessages(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        );
        scrollToBottom()
    })
    return () => {
      unsub()
    }
  }, []);

  const renderChat = (chat) => {
    const byMe = chat.email === user?.email
    if(byMe) return(
              <div key={chat.id}
          className={`bg-green-200 text-black max-w-[80%] w-fit p-2 rounded  self-end `}
        >
          {chat.text}
        </div>
    )
    return(
      
        <div key={chat.id} className={` flex  bg-indigo-200 text-black max-w-[80%] w-fit p-2 rounded  `}>
          <img className="w-10 h-10 rounded-full object-cover" src={chat?.image} alt="" />
         <div className="flex-1 pl-2">
         {chat.text}
          <div key={chat.id} className="text-indigo-600 font-bold text-right mt-1">
            {chat?.name}
          </div>
         </div>
        </div>
    )
  }
  
  const sendMessage = (e) => {
    if(!message) return
    e.preventDefault();
    const data ={
      text: message,
      image: user?.photoURL,
      name: user?.displayName,
      email: user?.email,
      timestamp,
      
    }
    db.collection('chats').add(data)
    setMessage("")
  }

  const scrollToBottom = () => {
    if(!endOffMeassage.current) return
    endOffMeassage.current.scrollIntoView({behavior: "smooth"})
  }
  return (
    <div className="flex-grow h-[80vh] bg-gray-50 justify-between rounded-md flex flex-col ">
      <div className="flex-1 flex overflow-y-auto gap-y-2 p-2 flex-col-reverse">
        <div ref={endOffMeassage}></div>
        {messages?.map(chat => renderChat(chat))}
      </div>
      <div className="h-20 bg-gray-100 pt-3">
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leader-tight focus:outline-none focus:bg-white focus-within:border-purple-500"
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button onClick={sendMessage} className=" ml-3 flex items-center justify-center w-fit p-3 border border-transparent text-sm font-medium rounded-md  bg-indigo-300 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-opacity-75 hover:bg-opacity-50">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
