import React, { useEffect, useState } from 'react';

import MainCard from 'components/MainCard';

import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material';
import dayjs from 'dayjs';

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
import AddDocument from './AddDocument';

import { useSelector, useDispatch } from 'store/index';
import { getMyDocumentService } from 'services/document';
import { downloadFile } from 'utils/utilsFn';

const StyledRow = styled('div')({
  alignItems: 'center',
  alignSelf: 'stretch',
  borderBottom: '1px solid #f1f1f1',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '14px',
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
  const dispatch = useDispatch();

  const [isAddDocumentOpen, setAddDocumentOpen] = useState(false);
  const [documentList, setDocumentList] = useState([]);

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const { projectId } = useSelector((state) => state.project);
  const { myDocument } = useSelector((state) => state.document);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (document) => {
    downloadFile(document.url, document.name);
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

  useEffect(() => {
    if (projectId) {
      if (value === 1) {
        dispatch(getMyDocumentService(projectId));
      } else {
        setDocumentList([]);
      }
    }
  }, [dispatch, projectId, value]);

  useEffect(() => {
    setDocumentList(myDocument);
  }, [myDocument]);

  return (
    <>
      <MainCard>
        <Tabs value={value} variant="scrollable" onChange={handleChange} sx={{ px: 1, width: '100%', borderBottom: '1px solid #e6ebf1' }}>
          <Tab sx={{ textTransform: 'none' }} label="Team Documents" />
          <Tab sx={{ textTransform: 'none' }} label="My Documents" />
        </Tabs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, mx: 1 }}>
          <Typography variant="h4">
            All <span style={{ color: '#d9d9d9' }}>({documentList.length})</span>
          </Typography>
          <Button variant="contained" color="success" onClick={() => setAddDocumentOpen(true)}>
            Add Document
          </Button>
        </Box>
        <MainCard contentSX={{ p: '0 !important' }} onDragEnter={() => setIsDraggingFile(true)}>
          {value === 1 && isDraggingFile ? (
            <StyledDropZoneContainer>
              <DropZone setIsDraggingFile={setIsDraggingFile} />
            </StyledDropZoneContainer>
          ) : (
            <>
              {documentList.map((document) => {
                const Icon = IconMapping[document.type];
                return (
                  <StyledRow key={document.id}>
                    <StyledContent>
                      <IconButton
                        sx={{
                          bgcolor: IconColors[document.type],
                          color: '#ffffff',
                          '&:hover': { bgcolor: IconColors[document.type], color: '#ffffff' }
                        }}
                      >
                        <Icon />
                      </IconButton>
                      <StyledLink href={document.url} target="__blank">
                        {document.name}
                      </StyledLink>
                    </StyledContent>
                    <StyledContent>
                      <Typography variant="body2">{dayjs(document.modified_date).format('MMM DD, YYYY')}</Typography>
                      <IconButton sx={{ borderRadius: '8px' }} onClick={handleClick}>
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
                        <MenuItem onClick={() => handleDownload(document)}>
                          <IconDownload /> Download
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <IconStackPush /> {document.is_published ? 'Un Publish' : 'Publish'}
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <IconTrash /> Delete
                        </MenuItem>
                      </Menu>
                    </StyledContent>
                  </StyledRow>
                );
              })}
              {value === 0 && documentList.length === 0 && <>No Document</>}
              {value === 1 && documentList.length === 0 && <>No Document</>}
            </>
          )}
        </MainCard>
      </MainCard>

      <AddDocument open={isAddDocumentOpen} onClose={() => setAddDocumentOpen(false)} />
    </>
  );
};

export default Document;
