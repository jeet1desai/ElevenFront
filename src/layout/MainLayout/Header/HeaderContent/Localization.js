import { useEffect, useRef, useState } from 'react';
import {
  Box,
  IconButton,
  Popper,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Transitions from 'components/@extended/Transitions';

import { TranslationOutlined } from '@ant-design/icons';
import useConfig from 'hooks/useConfig';

const Localization = () => {
  const { locale, onChangeLocale } = useConfig();

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(locale);
  const anchorRef = useRef(null);

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, lng) => {
    setLanguage(lng);
    onChangeLocale(lng);
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  const iconBackColorOpen = 'grey.300';

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          disableRipple
          color="secondary"
          sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : '', borderRadius: '8px' }}
          ref={anchorRef}
          onClick={handleToggle}
        >
          <TranslationOutlined />
        </IconButton>
      </Box>

      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={matchesXs ? 'top-left' : 'top-center'} in={open} {...TransitionProps}>
              <Paper elevation={16}>
                {open && (
                  <List
                    component="nav"
                    sx={{
                      width: '100%',
                      minWidth: 200,
                      maxWidth: 280,
                      borderRadius: '8px',
                      p: 0,
                      [theme.breakpoints.down('md')]: {
                        maxWidth: 250
                      },
                      bgcolor: theme.palette.background.paper
                    }}
                  >
                    <ListItemButton selected={language === 'hn'} onClick={(event) => handleListItemClick(event, 'hn')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Hindi</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (India)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'gj'} onClick={(event) => handleListItemClick(event, 'gj')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Gujarati</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (India)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'en'} onClick={(event) => handleListItemClick(event, 'en')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">English</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (UK)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </List>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default Localization;
