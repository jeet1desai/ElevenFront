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