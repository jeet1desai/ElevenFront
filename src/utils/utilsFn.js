import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store/index';

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
