import React, { useState } from 'react';

import MainCard from 'components/MainCard';

import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material';

import {
  IconDotsVertical,
  IconFile,
  IconFileText,
  IconFileZip,
  IconHeadphones,
  IconPhoto,
  IconPresentation,
  IconTable,
  IconDownload,
  IconTrash,
  IconStackPush,
  IconVideo
} from '@tabler/icons-react';
import { DropZone } from './DropZone';

const StyledRow = styled('div')({
  alignItems: 'center',
  alignSelf: 'stretch',
  borderBottom: '1px solid #f1f1f1',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px',
  '&:last-child': {
    borderBottom: '0'
  }
});

const StyledContent = styled('div')({
  alignItems: 'center',
  display: 'flex',
  gap: '12px'
});

const StyledLink = styled('a')({
  alignItems: 'center',
  color: '#333333',
  display: 'flex',
  textDecoration: 'none',
  '&:hover': {
    color: '#666666'
  }
});

const StyledDropZoneContainer = styled('div')({
  height: '500px',
  width: '100%'
});

const IconMapping = {
  Archive: IconFileZip,
  Audio: IconHeadphones,
  Image: IconPhoto,
  Presentation: IconPresentation,
  Spreadsheet: IconTable,
  TextDocument: IconFileText,
  Video: IconVideo,
  Other: IconFile
};

const Document = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const IconColors = {
    Archive: '#cccccc',
    Audio: '#f54bd0',
    Image: '#ffd338',
    Presentation: '#ff7222',
    Spreadsheet: '#15de8f',
    TextDocument: '#1961ed',
    Video: '#915ffd',
    Other: '#cccccc'
  };

  const Icon = IconMapping['Audio'];

  return (
    <MainCard>
      <Tabs value={value} variant="scrollable" onChange={handleChange} sx={{ px: 1, width: '100%', borderBottom: '1px solid #e6ebf1' }}>
        <Tab sx={{ textTransform: 'none' }} label="Team Documents" />
        <Tab sx={{ textTransform: 'none' }} label="My Documents" />
      </Tabs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, mx: 1 }}>
        <Typography variant="h4">
          All <span style={{ color: '#d9d9d9' }}>(3)</span>
        </Typography>
        <Button variant="contained" color="success">
          Add Document
        </Button>
      </Box>
      <MainCard contentSX={{ p: '0 !important' }} onDragEnter={() => setIsDraggingFile(true)}>
        {isDraggingFile ? (
          <StyledDropZoneContainer>
            <DropZone setIsDraggingFile={setIsDraggingFile} />
          </StyledDropZoneContainer>
        ) : (
          <>
            <StyledRow>
              <StyledContent>
                <IconButton sx={{ bgcolor: IconColors['Audio'], color: '#ffffff' }}>
                  <Icon />
                </IconButton>
                <StyledLink href={'/'} target="__blank">
                  Name
                </StyledLink>
              </StyledContent>
              <StyledContent>
                <Typography variant="body2">Document Name</Typography>
                <IconButton sx={{ bgcolor: open ? 'grey.300' : '', borderRadius: '8px' }} onClick={handleClick}>
                  <IconDotsVertical />
                </IconButton>

                <Menu
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  className="menu-list"
                >
                  <MenuItem onClick={handleClose}>
                    <IconDownload /> Download
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <IconStackPush /> Publish
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <IconTrash /> Delete
                  </MenuItem>
                </Menu>
              </StyledContent>
            </StyledRow>
          </>
        )}
      </MainCard>
    </MainCard>
  );
};

export default Document;
