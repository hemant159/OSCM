import { Menu } from '@mui/material';
import React from 'react'

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu open anchorE1={anchorE1}>
        <div 
            style={{
                width: "10rem"
            }}
        >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Nesciunt natus quas ipsam voluptate, magni et commodi provident 
            perspiciatis, corporis quam nisi quibusdam tempore fugiat
            laboriosam praesentium omnis dolorem atque tempora?
        </div>
    </Menu>
  )
}

export default FileMenu;