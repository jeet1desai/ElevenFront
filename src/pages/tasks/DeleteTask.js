import React from 'react';

import { Button, Box, Dialog, Typography, DialogContent, Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IconTrash } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'store/index';
import { deleteTaskService } from 'services/task';

const DeleteTask = ({ open, onClose, task, formClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectId } = useSelector((state) => state.project);

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
                  <Typography variant="h4">Delete Task</Typography>
                  <Typography variant="body">Are you sure, you want to delete {`"${task.title}"`} task that are assigned ?</Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                  <Button variant="outlined" fullWidth color="secondary" onClick={() => onClose(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => {
                      dispatch(deleteTaskService(task.id));
                      formClose(false);
                      onClose(false);
                      navigate(`/projects/${projectId}/tasks`);
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

export default DeleteTask;
