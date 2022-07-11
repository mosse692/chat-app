import './App.css';
import 'stream-chat-react/dist/css/index.css'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
// import { ChannelList } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelListContainer, ChannelContainer, Auth } from './components'  
import { useState } from 'react';

const cookies = new Cookies()

const apiKey = 'e7turjngbd4m';

const authToken = cookies.get('token')

const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('AvatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber')  
  }, authToken)
}


function App() {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  if(!authToken) return <Auth/>

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme="theme light">
        <ChannelListContainer 
          isCreating={isCreating} 
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType = {setCreateType}
        />
        <ChannelContainer 
          isCreating={isCreating} 
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isEditing = {isEditing}
          createType = {createType}
        />
      </Chat>
    </div>
  );
}

export default App;
