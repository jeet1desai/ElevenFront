import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  Avatar,
  AvatarGroup,
  Button,
  Grid,
  Stack,
  CardContent,
  Typography,
  CardActions,
  Divider,
  IconButton,
  OutlinedInput
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';
import ReportCard from 'components/cards/statistics/ReportCard';

import avatar from 'assets/images/users/avatar.png';

import { useSelector, useDispatch } from 'store/index';
import { checkedTodoSuccess, createTodoSuccess, deleteTodoSuccess } from 'store/slices/todo';

import { IconCalendarEvent, IconUsers, IconFileInvoice, IconFileDollar, IconPlus, IconSend, IconX, IconTrash } from '@tabler/icons-react';
import { Checkbox, FormControlLabel } from '../../../node_modules/@mui/material/index';

const StyledCrossIcon = styled(IconButton)({
  background: '#1677ff',
  color: '#ffffff',
  '&:hover': { background: '#1677ff', color: '#ffffff' }
});

const StyledPlusIcon = styled(IconButton)({
  position: 'absolute',
  bottom: '15px',
  right: '20px',
  background: '#1677ff',
  color: '#ffffff',
  '&:hover': { background: '#1677ff', color: '#ffffff' }
});

const StyledRow = styled('div')({
  alignItems: 'center',
  alignSelf: 'stretch',
  borderBottom: '1px solid #f1f1f1',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 18px',
  '&:last-child': {
    borderBottom: '0'
  }
});

const StyledColText = styled('p')({
  textAlign: 'center',
  width: '100%',
  color: '#333333',
  fontSize: '1rem',
  fontWeight: '500'
});

const DashboardDefault = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  const { todo } = useSelector((state) => state.todo);

  const [isTodoOpen, setTodoOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');

  const handleSubmitTodo = () => {
    dispatch(createTodoSuccess({ todo: { id: Math.random(), title: todoTitle, checked: false } }));

    setTodoTitle('');
    setTodoOpen((isTodoOpen) => !isTodoOpen);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoSuccess({ id }));
  };

  const handleCheckedTodo = (todo, checked) => {
    dispatch(checkedTodoSuccess({ todo, checked }));
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Home - {project?.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ReportCard secondary="Total Team Member" primary="0" iconPrimary={IconUsers} color="secondary" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ReportCard secondary="Total Tasks" primary="0" iconPrimary={IconCalendarEvent} color="error" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ReportCard secondary="Total Documents" primary="0" iconPrimary={IconFileInvoice} color="success" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ReportCard secondary="Total Invoices" primary="0" iconPrimary={IconFileDollar} color="primary" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* Todo */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Todos</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2, position: 'relative' }} content={false}>
          <PerfectScrollbar style={{ height: isTodoOpen ? 480 : 546, padding: 0 }}>
            <CardContent sx={{ p: 0 }}>
              {todo.length === 0 && (
                <StyledRow>
                  <StyledColText>No todo available</StyledColText>
                </StyledRow>
              )}
              {todo.map((todoItem, index) => {
                return (
                  <StyledRow key={index} sx={{ '& .Mui-checked + span': { textDecoration: 'line-through' } }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={todoItem.checked}
                          color="primary"
                          onChange={(e) => handleCheckedTodo(todoItem, e.target.checked)}
                          name="checkedA"
                        />
                      }
                      label={todoItem.title}
                    />
                    <IconButton color="error" onClick={() => handleDeleteTodo(todoItem.id)}>
                      <IconTrash />
                    </IconButton>
                  </StyledRow>
                );
              })}
            </CardContent>
          </PerfectScrollbar>
          {isTodoOpen ? (
            <>
              <Divider />
              <CardActions>
                <OutlinedInput
                  value={todoTitle}
                  fullWidth
                  placeholder="Add a todo"
                  onChange={(e) => setTodoTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitTodo()}
                  endAdornment={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton color="success" onClick={() => handleSubmitTodo()}>
                        <IconSend />
                      </IconButton>
                      <StyledCrossIcon onClick={() => setTodoOpen((isTodoOpen) => !isTodoOpen)}>
                        <IconX />
                      </StyledCrossIcon>
                    </Stack>
                  }
                  sx={{ padding: '4px 12px', '& input': { paddingLeft: '0' } }}
                />
              </CardActions>
            </>
          ) : (
            <StyledPlusIcon onClick={() => setTodoOpen(() => !isTodoOpen)}>
              <IconPlus />
            </StyledPlusIcon>
          )}
        </MainCard>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Feeds</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <PerfectScrollbar style={{ height: 546, padding: 0 }}>
            <CardContent>
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                  position: 'relative',
                  '&>*': {
                    position: 'relative',
                    zIndex: '5'
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 35,
                    width: 2,
                    height: '100%',
                    background: '#ebebeb',
                    zIndex: '1'
                  }
                }}
              >
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar color="success" size="sm" sx={{ top: 10 }}>
                        <IconUsers />
                      </Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Grid container spacing={0} sx={{ pt: 1 }}>
                        <Grid item xs={12}>
                          <Typography align="left" variant="caption">
                            8:50
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography align="left" variant="body2">
                            You’re getting more and more followers, keep it up!
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar color="primary" size="sm" sx={{ top: 10 }}></Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Grid container spacing={0} sx={{ pt: 1 }}>
                        <Grid item xs={12}>
                          <Typography align="left" variant="caption">
                            Sat, 5 Mar
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography align="left" variant="body2">
                            Design mobile Application
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </PerfectScrollbar>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Pending Tasks</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={4} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5"></Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 10 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar} />
                  <Avatar alt="Travis Howard" src={avatar} />
                  <Avatar alt="Cindy Baker" src={avatar} />
                  <Avatar alt="Agnes Walker" src={avatar} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => navigate('/help-support')}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
