import { Alert, Fade, Grow, IconButton, Slide } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';

import { CloseOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'store';
import { closeSnackbar } from 'store/slices/snackbar';

function TransitionSlideLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

const animation = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const { anchorOrigin, alert, close, message, open, transition, variant } = snackbar;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      {variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          TransitionComponent={animation[transition]}
          action={
            <>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} sx={{ mt: 0.25 }}>
                <CloseOutlined fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}

      {variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={animation[transition]}
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant={alert.variant}
            color={alert.color}
            action={
              <>
                {close !== false && (
                  <IconButton sx={{ color: 'background.paper' }} size="small" aria-label="close" onClick={handleClose}>
                    <CloseOutlined fontSize="small" />
                  </IconButton>
                )}
              </>
            }
            sx={{
              ...(alert.variant === 'outlined' && {
                bgcolor: 'background.paper'
              })
            }}
          >
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;
