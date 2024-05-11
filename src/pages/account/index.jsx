import React, { useState } from 'react';

import { Box, Button, Typography, Grid, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IconEdit, IconTrash, IconFolders } from '@tabler/icons-react';

import MainCard from 'components/MainCard';

import { useSelector } from 'store/index';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import UpdateAccount from './UpdateAccount';

import { GENDER } from 'utils/enum';

const Account = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.account);

  const [isPasswordModalOpen, setPasswordModal] = useState(false);
  const [isDeleteAccountOpen, setDeleteAccountModal] = useState(false);
  const [isUpdateAccountOpen, setUpdateAccountModal] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h2">Account Settings</Typography>
            <IconButton sx={{ bgcolor: 'primary.lighter' }} onClick={() => navigate('/projects')}>
              <IconFolders />
            </IconButton>
          </Box>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <MainCard
                title="Profile"
                secondary={
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Button
                      onClick={() => setUpdateAccountModal(true)}
                      variant="contained"
                      color="success"
                      startIcon={<IconEdit size={18} />}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => setPasswordModal(true)} variant="contained" color="error" startIcon={<IconEdit size={18} />}>
                      Change Password
                    </Button>
                  </Box>
                }
              >
                {user && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar src={user.profile_picture} />
                        <Typography variant="body1">
                          {user.first_name} {user.last_name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                        Email
                      </Typography>
                      <Typography variant="body1">{user.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                        Gender
                      </Typography>
                      <Typography variant="body1">{GENDER[user.gender]}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                        Phone Number
                      </Typography>
                      <Typography variant="body1">
                        +{user.country_code} {user.phone_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                        Address
                      </Typography>
                      <Typography variant="body1">{user.address}</Typography>
                    </Grid>
                  </Grid>
                )}
              </MainCard>
            </Grid>
            {/* <Grid item xs={12}>
              <MainCard
                title="Region"
                secondary={
                  <Button variant="contained" color="success" startIcon={<IconEdit size={18} />}>
                    Edit
                  </Button>
                }
              ></MainCard>
            </Grid> */}
            {/* <Grid item xs={12}>
              <MainCard
                title="Status"
                secondary={
                  <Button variant="contained" color="primary">
                    Upgrade
                  </Button>
                }
              ></MainCard>
            </Grid> */}
            <Grid item xs={12}>
              <MainCard>
                <Button onClick={() => setDeleteAccountModal(true)} variant="contained" color="error" startIcon={<IconTrash size={18} />}>
                  Delete Account
                </Button>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <ChangePassword isPasswordModalOpen={isPasswordModalOpen} setPasswordModal={setPasswordModal} />

      <DeleteAccount isDeleteAccountOpen={isDeleteAccountOpen} setDeleteAccountModal={setDeleteAccountModal} />

      <UpdateAccount isUpdateAccountOpen={isUpdateAccountOpen} setUpdateAccountModal={setUpdateAccountModal} user={user} />
    </>
  );
};

export default Account;
