import React, { useEffect, useState } from 'react';

import MainCard from 'components/MainCard';

import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Menu, MenuItem } from '@szhsin/react-menu';

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
import { deleteDocumentService, getMyDocumentService, getTeamDocumentService, publishDocumentService } from 'services/document';

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

const StyledNoContent = styled('div')({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  gap: '12px',
  height: '500px',
  width: '100%'
});

const StyledNoDocumentTitle = styled('p')({
  color: '#333333',
  fontSize: '1.23rem',
  fontWeight: '500',
  lineHeight: '1.2',
  marginBottom: '8px'
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
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const { project, projectId } = useSelector((state) => state.project);
  const { myDocument, teamDocument } = useSelector((state) => state.document);

  const handleDownload = (document) => {
    downloadFile(document.url, document.name);
  };

  const handleDelete = (document) => {
    dispatch(
      deleteDocumentService({
        docId: Number(document.id),
        role: project.user_role,
        projectId: Number(projectId)
      })
    );
  };

  const handlePublish = (document) => {
    dispatch(
      publishDocumentService({
        docId: Number(document.id),
        role: project.user_role,
        projectId: Number(projectId),
        isPublish: !document.is_published
      })
    );
  };

  const handleChange = (_, newValue) => {
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
        dispatch(getTeamDocumentService(projectId));
      }
    }
  }, [dispatch, projectId, value]);

  useEffect(() => {
    if (value === 1) {
      setDocumentList(myDocument);
    }
  }, [myDocument]);

  useEffect(() => {
    if (value === 0) {
      setDocumentList(teamDocument);
    }
  }, [teamDocument]);

  return (
    <>
      <MainCard>
        <Tabs value={value} variant="scrollable" onChange={handleChange} sx={{ px: 1, width: '100%', borderBottom: '1px solid #e6ebf1' }}>
          <Tab sx={{ textTransform: 'none' }} label="Team's Published Documents" />
          <Tab sx={{ textTransform: 'none' }} label="Personal Documents" />
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
                console.log(document.is_published);
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
                      <Menu
                        className="menu-list"
                        menuButton={
                          <IconButton sx={{ borderRadius: '8px' }}>
                            <IconDotsVertical />
                          </IconButton>
                        }
                        direction="left"
                        align="start"
                      >
                        <MenuItem onClick={() => handleDownload(document)}>
                          <IconDownload /> Download
                        </MenuItem>
                        <MenuItem onClick={() => handlePublish(document)}>
                          <IconStackPush /> {document.is_published ? 'Un Publish' : 'Publish'}
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(document)}>
                          <IconTrash /> Delete
                        </MenuItem>
                      </Menu>
                    </StyledContent>
                  </StyledRow>
                );
              })}
              {(value === 0 || value === 1) && documentList.length === 0 && (
                <StyledNoContent>
                  <StyledNoDocumentTitle>No Document Found</StyledNoDocumentTitle>
                </StyledNoContent>
              )}
            </>
          )}
        </MainCard>
      </MainCard>

      <AddDocument open={isAddDocumentOpen} onClose={() => setAddDocumentOpen(false)} />
    </>
  );
};

export default Document;
