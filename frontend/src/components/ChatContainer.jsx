import { React, useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, 
  unsubscribeFromMessages

} = useChatStore();   //function for fetch messages
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {  //when the selected user id changes then useeffect called
    getMessages(selectedUser._id) //getting msg btn us and selected user _id as argument bcoz in get msg func we expecting userid so we can send it to the end point
  
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({ behavior: "smooth"});
    }
  },[messages])

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className='flex-1 overflow-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message.id}

            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
              >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt='profile pic' />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className='chat-bubble flex flex-col'>
            {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[150px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />

    </div>
  )
}

export default ChatContainer;