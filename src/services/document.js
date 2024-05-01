import axios from 'utils/axios';
import { dispatch } from 'store/index';
import { openErrorSnackbar } from 'utils/utilsFn';
import {
  addNewDocumentSuccess,
  getMyDocumentSuccess,
  getTeamDocumentSuccess,
  hasError,
  publishDocumentSuccess,
  removeDocumentSuccess
} from 'store/slices/document';

export const addNewDocumentService = (data) => {
  return async () => {
    try {
      const response = await axios.post('documents/document', data);
      dispatch(addNewDocumentSuccess({ document: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const getTeamDocumentService = (projectId) => {
  return async () => {
    try {
      const response = await axios.get(`documents/team/${projectId}`);
      dispatch(getTeamDocumentSuccess({ documents: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const getMyDocumentService = (projectId) => {
  return async () => {
    try {
      const response = await axios.get(`documents/my/${projectId}`);
      dispatch(getMyDocumentSuccess({ documents: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const deleteDocumentService = (data) => {
  return async () => {
    try {
      const response = await axios.put(`documents/delete`, data);
      dispatch(removeDocumentSuccess({ document: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const publishDocumentService = (data) => {
  return async () => {
    try {
      const response = await axios.put(`documents/publish`, data);
      dispatch(publishDocumentSuccess({ document: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
