import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
// import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import { InputBox } from '../components/styles/StyledComponents';
import { grayColor } from '../constants/color';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent  from "../components/shared/MessageComponent";
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useChatDetailsQuery } from '../redux/api/api';

const user = {
  _id: "asasdsdsds",
  name: "Hemant"
}

const Chat = ({ chatId }) => {

  const containerRef = useRef(null);

  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId});
 
  const [messages, setMessage] = useState("");
  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!messages.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, messages });
    setMessage("");
  }

  // const newMessagesHandler = use 

  useEffect(() => {
    socket.on(NEW_MESSAGE, (data) => {
      console.log("data: ",data);
    });
  }, []);

  return chatDetails.isLoading ?( 
  <Skeleton /> 
    ) : (
    <>
      <Stack 
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        {
          sampleMessage.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))
        }
      </Stack>
      <form
        style={{
          height: "10%"
        }}
        onSubmit={submitHandler}
      >
        <Stack 
          direction={"row"} 
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg"
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox 
            placeholder='Message'
            value={messages}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type='submit'
            sx={{
              rotate: "-90deg",
              bgcolor: "#ea7070",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark"
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      {/* <FileMenu /> */}
    </>
  )
}

export default AppLayout()(Chat);