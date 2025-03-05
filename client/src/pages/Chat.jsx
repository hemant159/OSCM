import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import React, { useRef } from 'react';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import { InputBox } from '../components/styles/StyledComponents';
import { grayColor } from '../constants/color';

const Chat = () => {

  const containerRef = useRef(null);

  return (
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
    </Stack>
    <form
      style={{
        height: "10%"
      }}
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
          ref={fileMenuRef}
        >
          <AttachFileIcon />
        </IconButton>
        <InputBox placeholder='Message' />
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

    <FileMenu />

    </>
  )
}

export default AppLayout()(Chat);