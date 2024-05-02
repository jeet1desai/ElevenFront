import React from 'react';

import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Avatar,
  Stack,
  Typography,
  useMediaQuery,
  List,
  Drawer
} from '@mui/material';

import MainCard from 'components/MainCard';

import { MenuUnfoldOutlined } from '@ant-design/icons';
import { IconPhone, IconVideo, IconExclamationCircle, IconMoodHappyFilled, IconPaperclip, IconSend } from '@tabler/icons-react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import UserList from './UserList';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  paddingLeft: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginLeft: `-320px`,
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    marginLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: 0
  })
}));

const Chat = () => {
  const theme = useTheme();

  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const drawerBG = theme.palette.mode === 'dark' ? 'dark.main' : '#fff';

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 320,
          flexShrink: 0,
          zIndex: { xs: 1100, lg: 0 },
          '& .MuiDrawer-paper': {
            height: matchDownLG ? '100%' : 'auto',
            width: 320,
            boxSizing: 'border-box',
            position: 'relative',
            border: 'none',
            borderRadius: matchDownLG ? 'none' : `8px`
          }
        }}
        variant={matchDownLG ? 'temporary' : 'persistent'}
        anchor="left"
        open={false}
        ModalProps={{ keepMounted: true }}
      >
        <MainCard
          sx={{
            bgcolor: matchDownLG ? 'transparent' : drawerBG,
            borderRadius: '8px 0 0 8px',
            borderRight: '0'
          }}
          border={!matchDownLG}
          content={false}
        >
          <Box sx={{ p: 2.5, pb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="h4">
                      Messages
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton>{/* <ExpandMoreIcon /> */}</IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <PerfectScrollbar
            style={{
              overflowX: 'hidden',
              height: matchDownLG ? 'calc(100vh - 190px)' : 'calc(100vh - 445px)',
              minHeight: matchDownLG ? 0 : 553
            }}
          >
            <Box sx={{ p: 1.5, pt: 0 }}>
              <List component="nav">
                {[1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => {
                  return <UserList key={index} />;
                })}
              </List>
            </Box>
          </PerfectScrollbar>
        </MainCard>
      </Drawer>
      <Main theme={theme} open={true}>
        <MainCard
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : '#fff',
            borderRadius: '0 8px 8px 0',
            '& .MuiCardContent-root': {
              padding: '0 !important'
            }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ padding: '14px 14px 0 14px' }}>
                <Grid container alignItems="center" spacing={0.5}>
                  <Grid item>
                    <IconButton>
                      <MenuUnfoldOutlined />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                      <Grid item>
                        <Avatar alt="Name" src="" />
                      </Grid>
                      <Grid item sm zeroMinWidth>
                        <Grid container spacing={0} alignItems="center">
                          <Grid item xs={12}>
                            <Typography variant="h4" component="div">
                              Name
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle2">Last seen</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm zeroMinWidth />
                  <Grid item>
                    <IconButton>
                      <IconPhone />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <IconVideo />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <IconExclamationCircle />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ mt: theme.spacing(2) }} />
            </Grid>
            <PerfectScrollbar style={{ width: '100%', height: 'calc(100vh - 440px)', overflowX: 'hidden', minHeight: 436 }}>
              <CardContent>
                {/* <ChartHistory theme={theme} user={user} data={data} /> */}
                {/* @ts-ignore */}
                {/* <span ref={scrollRef} /> */}
              </CardContent>
            </PerfectScrollbar>
            <Grid item xs={12}>
              <Divider sx={{ mt: theme.spacing(2) }} />
              <Box sx={{ padding: '14px' }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs zeroMinWidth>
                    <OutlinedInput
                      fullWidth
                      placeholder="Type a message"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton>
                            <IconMoodHappyFilled />
                          </IconButton>
                        </InputAdornment>
                      }
                      endAdornment={
                        <Stack direction="row" alignItems="center">
                          <IconButton>
                            <IconPaperclip />
                          </IconButton>
                          <IconButton color="primary">
                            <IconSend />
                          </IconButton>
                        </Stack>
                      }
                      sx={{ padding: '4px', '& input': { paddingLeft: '0' } }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </Main>
    </Box>
  );
};

export default Chat;
