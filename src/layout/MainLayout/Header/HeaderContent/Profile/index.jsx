import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { IconLogout } from '@tabler/icons-react';

import { useSelector } from 'store/index';
import { ROLES } from 'utils/enum';

import useAuth from 'hooks/useAuth';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

const Profile = () => {
  const { logout } = useAuth();
  const theme = useTheme();

  const { user } = useSelector((state) => state.account);
  const { project } = useSelector((state) => state.project);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = 'grey.300';

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 0.75,
        [theme.breakpoints.down('md')]: {
          width: '100%'
        }
      }}
    >
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: '8px',
          '&:hover': { bgcolor: 'secondary.lighter' },
          [theme.breakpoints.down('md')]: {
            width: '100%'
          }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={user.profile_picture} sx={{ width: 32, height: 32 }} />
          <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle1">{`${user.first_name} ${user.last_name}`}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
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
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar alt="profile user" src={user.profile_picture} sx={{ width: 32, height: 32 }} />
                            <Stack>
                              <Typography
                                sx={{ textTransform: 'capitalize' }}
                                variant="h6"
                              >{`${user.first_name} ${user.last_name}`}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {ROLES[project?.user_role]}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton color="secondary" onClick={logout}>
                            <IconLogout />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize',
                                backgroundColor: 'white !important',
                                '&.Mui-selected': {
                                  backgroundColor: 'white !important'
                                }
                              }}
                              icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                              label="Profile"
                              {...a11yProps(0)}
                            />
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize',
                                backgroundColor: 'white !important',
                                '&.Mui-selected': {
                                  backgroundColor: 'white !important'
                                }
                              }}
                              icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                              label="Setting"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab setOpen={setOpen} handleLogout={logout} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <SettingTab setOpen={setOpen} />
                        </TabPanel>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
