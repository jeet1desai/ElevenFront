import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';

import { StyledUploadDragIcon, StyledUploadDragSubTitle, StyledUploadDragTitle } from 'components/styled-css/DropZoneCSS';

import { getFileType, uploadDocument } from 'utils/utilsFn';

import { useDispatch, useSelector } from 'store/index';
import { addNewDocumentService } from 'services/document';

const StyledContainer = styled('div')({
  alignItems: 'center',
  background: '#fcfcfc',
  border: '1px dashed #d6d6d6',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  textAlign: 'center'
});

export const DropZone = ({ setIsDraggingFile }) => {
  const dispatch = useDispatch();

  const { projectId } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.account);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    onDragEnter: () => {
      setIsDraggingFile(true);
    },
    onDragLeave: () => {
      setIsDraggingFile(false);
    },
    onDrop: () => {
      setIsDraggingFile(false);
    },
    onDropAccepted: async ([file]) => {
      const url = await uploadDocument('eleven/document', file);
      const body = {
        name: file.name,
        url: url,
        type: getFileType(file.name),
        userId: Number(user.id),
        projectId: Number(projectId),
        is_published: false
      };
      dispatch(addNewDocumentService(body));

      setIsDraggingFile(false);
    }
  });

  return (
    <StyledContainer {...getRootProps()}>
      {isDragActive && (
        <>
          <input {...getInputProps()} />
          <StyledUploadDragIcon />
          <StyledUploadDragTitle>Upload a file</StyledUploadDragTitle>
          <StyledUploadDragSubTitle>Drag and Drop Here</StyledUploadDragSubTitle>
        </>
      )}
    </StyledContainer>
  );
};
