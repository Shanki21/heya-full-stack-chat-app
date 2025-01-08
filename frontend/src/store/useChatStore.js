import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore";


export const useChatStore = create((set,get) => ({  //created function with some states for chat section 
    messages: [],  
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

      getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const res = await axiosInstance.get("/messages/users"); //get request to user
          set({ users: res.data });  //get data back and set the users with it
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isUsersLoading: false }); //resets loadings
        }
      },

      getMessages: async (userId) => {   //pass userid to know which chat we trying to fetch
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstance.get(`/messages/${userId}`);
          set({ messages: res.data });
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
          const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData); //sending msg data to the api
          set({ messages: [...messages, res.data] }); //keep the previous messages also add the very last one to the end so the UI update imidiately
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

      subscribeToMessages: () => {  //called this function in chat container
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket; //socket state
    
        socket.on("newMessage", (newMessage) => {  
          const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;
    
          set({
            messages: [...get().messages, newMessage], //to kepp all the previous msgs in history and adding new msgs in the end
          });
        });
      },
    
      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
      },

      setSelectedUser: (selectedUser) => set({ selectedUser }),

    }));
