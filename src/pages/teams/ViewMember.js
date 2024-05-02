import React, { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  Typography,
  DialogContent,
  Stack,
  DialogActions,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  IconButton
} from '@mui/material';

import { IconX } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'store/index';
import { updateTeamMemberRoleService } from 'services/team';

import { ROLES } from 'utils/enum';
import { MenuProps } from 'utils/utilsFn';

const ViewMember = ({ open, onClose, teamMember }) => {
  const dispatch = useDispatch();

  const { project } = useSelector((state) => state.project);

  const [permission, setPermission] = useState(0);

  useEffect(() => {
    if (teamMember) {
      setPermission(teamMember.role);
    }
  }, [teamMember]);

  return (
    <>
      <Dialog open={open} scroll="paper" fullWidth maxWidth="xs">
        {open && (
          <>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
              <Grid item>
                <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>View Details</DialogTitle>
              </Grid>
              <Grid item sx={{ mr: 1.5 }}>
                <IconButton color="secondary" onClick={onClose}>
                  <IconX />
                </IconButton>
              </Grid>
            </Grid>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Name
                  </Typography>
                  <Typography variant="body1">
                    {teamMember.user.first_name} {teamMember.user.last_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Email
                  </Typography>
                  <Typography variant="body1">{teamMember.user.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Compony
                  </Typography>
                  <Typography variant="body1">{teamMember.company.company}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Phone Number
                  </Typography>
                  <Typography variant="body1">
                    {teamMember.user.country_code && teamMember.user.phone_number
                      ? teamMember.user.country_code + ' ' + teamMember.user.phone_number
                      : 'Na'}
                  </Typography>
                </Grid>
                {project.user_role === 4 ? (
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email">Permissions</InputLabel>
                      <Select
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                        displayEmpty
                        fullWidth
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                      >
                        {Object.entries(ROLES)
                          .map(([key, value]) => ({ id: parseInt(key), label: value }))
                          .slice(0, 3)
                          .map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.label}
                            </MenuItem>
                          ))}
                      </Select>
                    </Stack>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                      Permission
                    </Typography>
                    <Typography variant="body1">{ROLES[teamMember.role]}</Typography>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ padding: '15px 24px' }}>
              <Button onClick={onClose} color="error">
                Cancel
              </Button>
              <Button
                disableElevation
                variant="contained"
                type="submit"
                onClick={() => {
                  dispatch(
                    updateTeamMemberRoleService({
                      userId: teamMember.user.id,
                      projectId: teamMember.project.id,
                      role: permission
                    })
                  );
                  onClose();
                }}
              >
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ViewMember;
