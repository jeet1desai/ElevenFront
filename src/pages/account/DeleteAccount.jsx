import React from 'react';

import { Button, Box, Dialog, Typography, DialogContent, Avatar, Stack } from '@mui/material';

import { IconTrash } from '@tabler/icons-react';

import { useDispatch } from 'store/index';
import { deleteAccountService } from 'services/account';

const DeleteAccount = ({ isDeleteAccountOpen, setDeleteAccountModal }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Dialog open={isDeleteAccountOpen} keepMounted>
        {isDeleteAccountOpen && (
          <Box sx={{ p: 1, py: 1.5 }}>
            <DialogContent>
              <Stack direction="column" alignItems="center" spacing={3}>
                <Avatar color="error" sx={{ width: 56, height: 56, color: '#ff4528', background: '#ffe7d3' }}>
                  <IconTrash />
                </Avatar>
                <Stack direction="column" alignItems="center" spacing={1.5}>
                  <Typography variant="h4">Delete Account</Typography>
                  <Typography variant="body">Are you sure you want to delete your account?</Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                  <Button variant="outlined" fullWidth color="secondary" onClick={() => setDeleteAccountModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => {
                      dispatch(deleteAccountService());
                      setDeleteAccountModal(false);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default DeleteAccount;
