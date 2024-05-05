import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store/index';
import { FileExtensionMapping } from './enum';
import dayjs from 'dayjs';

export const openErrorSnackbar = (message, type) => {
  dispatch(
    openSnackbar({
      open: true,
      message: message,
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      transition: 'SlideUp',
      variant: 'alert',
      alert: { color: type },
      close: true
    })
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 4px',
      border: '1px solid #e6ebf1',
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

export const getFileType = (fileName) => {
  const fileExtension = fileName.split('.').at(-1);
  if (!fileExtension) {
    return 'Other';
  }
  return FileExtensionMapping[fileExtension.toLowerCase()] ?? 'Other';
};

export const uploadDocument = (folder, file) => {
  return new Promise((resolve, reject) => {
    if (file === null) {
      resolve('');
    }

    const imageRef = ref(storage, `${folder}/${file.name} + ${Date.now()}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            resolve(url);
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

export const downloadFile = (fullPath, fileName) => {
  try {
    const url = fullPath;
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = fullPath;
    a.target = '__blank';
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

export const isDatePastDueDateColor = (end_date) => {
  const endDate = new Date(end_date);
  const isDateInPast = (date) => {
    return dayjs(date).isBefore(dayjs(), 'day');
  };
  const endDateIsPast = isDateInPast(endDate);
  return endDateIsPast ? 'red' : 'inherit';
};
