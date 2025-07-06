import {create} from 'zustand';

import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from './useAuthStore.js';
export const useChatStore=create((set,get)=>({
  messages:[],
  users:[],
  selectedUser:null,
  isUsersLoading:false,
  isMessagesLoading:false,

  getUsers:async()=>{
    set({isUsersLoading:true})
    try {
     const res=await axiosInstance.get("/messages/users")
     console.log("API /messages/users response:", res.data);

    set({ users: Array.isArray(res.data.filteredUsers) ? res.data.filteredUsers : [] })
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users")
    } finally {
      set({isUsersLoading:false})
    }
  },
  getMessages:async(userId)=>{
    set({isMessagesLoading:true})
    try {
      // const res = await axiosInstance.get(`/messages/${userId}`);
      const res = await axiosInstance.get(`/messages/chat/${userId}`);
      console.log("API /messages/:userId response:", res.data);

      set({ messages: Array.isArray(res.data?.filteredMessages) ? res.data.filteredMessages : (Array.isArray(res.data?.messages) ? res.data.messages : []) });
    // If the response contains user info (like avatar), update selectedUser with latest data
    if (res.data?.user) {
      set({ selectedUser: res.data.user });
    }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage:async(messageData)=>{
    const {selectedUser, messages} = get();
    if (!selectedUser || !selectedUser._id) {
      toast.error("No user selected to send message");
      return;
    }
    try {
      console.log("Sending message to:", `/messages/send/${selectedUser._id}`, "with data:", messageData);
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      if (res && res.data) {
        set({ messages: [ ...(Array.isArray(messages) ? messages : []), res.data ] });
      } else {
        toast.error("Failed to send message: No response data");
        console.error("No response data from send message API:", res);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },
  subscribeToMessages:()=>{
    const {selectedUser}=get();
    if(!selectedUser)return;
    
    const socket=useAuthStore.getState().socket;



    socket.on("newMessage",(newMessage)=>{
      const isMessageFromSelectedFromUser=newMessage.senderId===selectedUser._id;
      if(!isMessageFromSelectedFromUser)return;
      set((state)=>({
        messages:[...state.messages,newMessage]
      }))
    })
  },

  unsubscribeFromMessages:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))