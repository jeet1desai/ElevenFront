import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  Dialog,
  Grid,
  DialogTitle,
  IconButton,
  DialogContent,
  Stack,
  InputLabel,
  OutlinedInput,
  RadioGroup,
  Radio,
  DialogActions,
  Button
} from '@mui/material';

import { IconX } from '@tabler/icons-react';

import { useSelector } from 'store/index';
import { useDispatch } from 'store/index';
import { inviteUserService } from 'services/team';

const RadioGroupWrapper = styled('div')({
  border: '1px solid #e6ebf1',
  borderRadius: '8px'
});

const RadioItemWrapper = styled('div')({
  padding: '12px',
  cursor: 'pointer',
  display: 'flex',
  gap: '10px',
  borderBottom: '1px solid #e6ebf1',
  alignItems: 'flex-start',
  '&:last-child': {
    borderBottom: 0
  }
});

const RadioLabelWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const AddMember = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);

  const [formValue, setFormValue] = useState({
    email: '',
    role: '1'
  });

  return (
    <>
      <Dialog open={open} scroll="paper" fullWidth>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>Add team member to {project?.name?.toLowerCase()}</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={onClose}>
              <IconX />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Enter email address</InputLabel>
                <OutlinedInput
                  value={formValue.email}
                  onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abc@company.com"
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name">Permission level</InputLabel>
                <RadioGroupWrapper>
                  <RadioGroup value={formValue.role} onChange={(e) => setFormValue({ ...formValue, role: e.target.value })}>
                    <RadioItemWrapper onClick={() => setFormValue({ ...formValue, role: '1' })}>
                      <Radio value="1" sx={{ padding: '2px 0 0 0' }} />
                      <RadioLabelWrapper>
                        <strong>Collaborator</strong>
                        <span>Can make and assign personal annotations but cannot upload or delete sheets only can view.</span>
                      </RadioLabelWrapper>
                    </RadioItemWrapper>
                    <RadioItemWrapper onClick={() => setFormValue({ ...formValue, role: '2' })}>
                      <Radio value="2" sx={{ padding: '2px 0 0 0' }} />
                      <RadioLabelWrapper>
                        <strong>Power Collaborator</strong>
                        <span>Can make personal annotations and publish to project. Cannot upload or delete sheets.</span>
                      </RadioLabelWrapper>
                    </RadioItemWrapper>
                    <RadioItemWrapper onClick={() => setFormValue({ ...formValue, role: '3' })}>
                      <Radio value="3" sx={{ padding: '2px 0 0 0' }} />
                      <RadioLabelWrapper>
                        <strong>Admin</strong>
                        <span>Has complete control over this project. Admins can upload, export, and delete sheets.</span>
                      </RadioLabelWrapper>
                    </RadioItemWrapper>
                  </RadioGroup>
                </RadioGroupWrapper>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: '15px 24px' }}>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          <Button
            disabled={!formValue.email}
            disableElevation
            variant="contained"
            type="submit"
            onClick={() => {
              dispatch(inviteUserService({ email: formValue.email, role: Number(formValue.role), projectId: project.id }));
              onClose();
            }}
          >
            Add Team Member
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMember;
