import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import React, { useState } from 'react'
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';


const Search = () => {

  console.log("hi there from search")

  const search = useInputValidation("");

  let isLoadingSendFriendRequest = false;

  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = (id) => {
    console.log(id);
  }

  return ( 
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField 
          label="" 
          value={search.value} 
          onChange={search.changeHandler}
          variant='outlined'
          color='black'
          size='small'
          InputProps={{
            startadornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem 
              user={i} 
              key={i._id} 
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest} 
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;