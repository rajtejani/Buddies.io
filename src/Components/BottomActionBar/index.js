import React, { useState } from 'react';
import styled from 'styled-components';
import { Fab, Menu, MenuItem, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';

const BottomActionBar = ({ }) => {
  const [anchorEl, _setAnchorEl] = useState(false);

  const handleClose = () => _setAnchorEl(false)

  return (
    <Wrapper>
      <FlexWrapper>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>

        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={() => _setAnchorEl(true)}>
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </FlexWrapper>
    </Wrapper >
  )
}

export default BottomActionBar;

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  width: 40%;
  min-width: 80px;
  max-width: 300px;
  height: 50px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, .6);
  box-shadow: 0 10px 20px 1px rgba(0,0,0,0.2);
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, .9);
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
