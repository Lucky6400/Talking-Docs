import React from 'react'
import FixedNavbar from '../components/common/Navbar'
import ChatsList from '../components/chat/ChatsList'
import ChatBox from '../components/chat/ChatBox'

const Chats: React.FC = () => {
  
  return (
    <>
      <FixedNavbar />
      <div className="flex gap-3 w-full justify-around">
        <ChatsList />
        <ChatBox />
      </div>
    </>
  )
}

export default Chats