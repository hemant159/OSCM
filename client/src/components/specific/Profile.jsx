import { Avatar, Stack, Typography } from '@mui/material';
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon } from "@mui/icons-material";
import moment from "moment";
import React from 'react'

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
        <Avatar 
            sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginBottom: "1rem",
                border: "5px solid white",
            }}
        />
        <ProfileCard 
            text={"Hemant"} 
            heading={"Name"} 
            Icon={<FaceIcon />} 
        />
        <ProfileCard 
            text={"@hemant"} 
            heading={"Username"} 
            Icon={<UserNameIcon />} 
        />
        <ProfileCard 
            text={moment('2023-11-04TB18:30:00.000Z').fromNow()} 
            heading={"Joined"} 
            Icon={<CalenderIcon />} 
        />
    </Stack>
  )
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        color={"white"}
        textAlign={"center"}
    >
        {Icon && Icon}

        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography color='gray' variant='capption'>{heading}</Typography>
        </Stack>

    </Stack>
);

export default Profile;