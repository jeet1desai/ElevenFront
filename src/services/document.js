import axios from 'utils/axios';
import { dispatch } from 'store/index';
import { openErrorSnackbar } from 'utils/utilsFn';
import { addNewDocumentSuccess, getMyDocumentSuccess, hasError } from 'store/slices/document';

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
