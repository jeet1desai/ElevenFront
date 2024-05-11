import React from 'react';

import { Button, Box, Dialog, Typography, DialogContent, Avatar, Stack } from '@mui/material';

import { IconTrash } from '@tabler/icons-react';

import { useDispatch } from 'store/index';
import { removeTeamMemberService } from 'services/team';

const RemoveMember = ({ open, onClose, teamMember }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Dialog open={open} keepMounted>
        {open && (
          <Box sx={{ p: 1, py: 1.5 }}>
            <DialogContent>
              <Stack direction="column" alignItems="center" spacing={3}>
                <Avatar color="error" sx={{ width: 56, height: 56, color: '#ff4528', background: '#ffe7d3' }}>
                  <IconTrash />
                </Avatar>
                <Stack direction="column" alignItems="center" spacing={1.5}>
                  <Typography variant="h4">Remove Member</Typography>
                  <Typography variant="body">
                    Are you sure you want to remove{' '}
                    {teamMember.user.first_name && teamMember.user.last_name
                      ? `'${teamMember.user.first_name} ${teamMember.user.last_name}'`
                      : "'Na'"}{' '}
                    from your team members?
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                  <Button variant="outlined" fullWidth color="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => {
                      dispatch(removeTeamMemberService(teamMember.id, teamMember.project.id, teamMember.user.id));
                      onClose();
                    }}
                  >
                    Remove
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

export default RemoveMember;
