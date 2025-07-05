import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from "../components/Sidebar.jsx"
import NoChatSelected from "../components/NoChatSelected.jsx"
import ChatContainer from "../components/ChatContainer.jsx"
import { useThemeStore } from '../store/useThemeStore.js'
const HomePage = () => {
const selectedUser = useChatStore((state) => state.selectedUser);
  const { theme } = useThemeStore()

  return (
    <div data-theme={theme} className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage