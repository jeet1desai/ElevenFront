import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

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
import PerfectScrollbar from 'react-perfect-scrollbar';

import MainCard from 'components/MainCard';
import UserList from './UserList';
import ChartHistory from './ChartHistory';
import EmojiPicker from 'components/third-party/EmojiPicker';

import { MenuUnfoldOutlined } from '@ant-design/icons';
import { IconPhone, IconExclamationCircle, IconSend, IconTrash } from '@tabler/icons-react';
// import { IconPaperclip } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'store/index';
import { getChatsService } from 'services/chat';
import { handleUserName } from 'utils/utilsFn';
import WebSocketInstance from 'utils/WebSocket/Websocket';
import { formatDate } from 'utils/format/date';

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
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { chatId, chat, chatUserList } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.account);

  const [openChatDrawer, setOpenChatDrawer] = useState(true);

  const handleDrawerOpen = () => {
    setOpenChatDrawer((prevState) => !prevState);
  };

  useEffect(() => {
    setOpenChatDrawer(!matchDownLG);
  }, [matchDownLG]);

  useEffect(() => {
    const fetchChats = () => {
      dispatch(getChatsService());
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (chatId) {
      setFriend(chat.participants[0].user.id === user.id ? chat.participants[1].user : chat.participants[0].user);

      const waitForSocketConnection = (callback) => {
        setTimeout(() => {
          if (WebSocketInstance.state() === 1) {
            console.log('Connection is secure');
            if (callback != null) {
              callback();
            }
            return;
          } else {
            console.log('Waiting for connection...');
            waitForSocketConnection(callback);
          }
        }, 100);
      };

      WebSocketInstance.addCallbacks(setMessagesCallback, addMessageCallback);
      waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(user.id, chatId);
      });
      WebSocketInstance.connect(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useLayoutEffect(() => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView();
    }
  });

  const setMessagesCallback = (newMessages) => {
    setMessages(() => [...newMessages.reverse()]);
  };

  const addMessageCallback = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessageClick = () => {
    if (messageInput !== '') {
      const messageObject = {
        content: messageInput,
        command: 'new_message',
        from: user.id,
        chatID: chatId
      };

      setMessageInput('');
      WebSocketInstance.newChatMessage(messageObject);
    }
  };

  const drawerBG = theme.palette.mode === 'dark' ? 'dark.main' : '#fff';
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : { timestamp: '', content: '' };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 320,
          flexShrink: 0,
          zIndex: { xs: 1100, lg: 0 },
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            position: 'relative',
            border: 'none',
            height: '100%',
            borderRadius: matchDownLG ? 'none' : `8px 0 0 8px`
          }
        }}
        variant={matchDownLG ? 'temporary' : 'persistent'}
        anchor="left"
        open={openChatDrawer}
        onClose={handleDrawerOpen}
        ModalProps={{ keepMounted: true }}
      >
        <MainCard
          sx={{
            bgcolor: matchDownLG ? 'transparent' : drawerBG,
            borderRadius: '8px 0 0 8px',
            height: '100%',
            borderRight: '0'
          }}
          border={!matchDownLG}
          content={false}
        >
          <Box sx={{ p: 2.5, pb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="h4">
                      Messages
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">
                      All <span style={{ color: '#d9d9d9' }}>({chatUserList.length})</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <PerfectScrollbar
            style={{
              overflowX: 'hidden',
              height: matchDownLG ? '100%' : 'calc(100vh - 445px)',
              maxHeight: matchDownLG ? 'calc(100vh - 60px)' : 0,
              minHeight: matchDownLG ? 0 : 545
            }}
          >
            <Box sx={{ p: 1.5, pt: 0 }}>
              <List component="nav">
                {chatUserList.map((user) => {
                  return <UserList userDetail={user} messages={user.messages} key={user.id} />;
                })}
              </List>
            </Box>
          </PerfectScrollbar>
        </MainCard>
      </Drawer>
      <Main theme={theme} open={openChatDrawer}>
        {chat ? (
          <MainCard
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : '#fff',
              borderRadius: openChatDrawer ? '0px 8px 8px 0px' : '8px',
              '& > .MuiCardContent-root': {
                padding: '0 !important'
              }
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ padding: '14px 14px 0 14px' }}>
                  <Grid container alignItems="center" justifyContent="space-between" spacing={0.5}>
                    <Grid item>
                      <IconButton onClick={handleDrawerOpen}>
                        <MenuUnfoldOutlined />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                        <Grid item>
                          <Avatar src={friend ? friend.profile_picture : ''} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Grid container spacing={0} alignItems="center">
                            <Grid item xs={12}>
                              <Typography variant="h4" component="div">
                                {friend ? handleUserName(friend) : ''}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle2">
                                {lastMessage.timestamp && `Last seen ${formatDate(lastMessage.timestamp)}`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm zeroMinWidth />
                    <Grid item>
                      {friend && friend.country_code && friend.phone_number && (
                        <a href={`tel:+${friend.country_code}${friend.phone_number}`}>
                          <IconButton>
                            <IconPhone />
                          </IconButton>
                        </a>
                      )}
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <IconTrash />
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
                <CardContent sx={{ pl: 4 }}>
                  <ChartHistory user={user} messages={messages} />
                  <span ref={messagesEndRef} />
                </CardContent>
              </PerfectScrollbar>
              <Grid item xs={12}>
                <Divider />
                <Box sx={{ padding: '14px' }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs zeroMinWidth>
                      <OutlinedInput
                        fullWidth
                        placeholder="Type a message"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconButton>
                              <EmojiPicker value={messageInput} setValue={setMessageInput} />
                            </IconButton>
                          </InputAdornment>
                        }
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessageClick()}
                        endAdornment={
                          <Stack direction="row" alignItems="center">
                            {/* <IconButton>
                              <IconPaperclip />
                            </IconButton> */}
                            <IconButton color="primary" onClick={() => handleSendMessageClick()}>
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
        ) : (
          <></>
        )}
      </Main>
    </Box>
  );
};

export default Chat;
