import React from 'react';

import { useTheme } from '@mui/material/styles';
import { CardContent, Grid, Typography, Avatar, Stack } from '@mui/material';

import dayjs from 'dayjs';

const ChartHistory = ({ user, messages }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        {messages.map((history, index) => (
          <React.Fragment key={index}>
            {history.author.id === user.id ? (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack alignItems="flex-start" flexDirection="row" gap={1}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Stack alignItems="flex-start" justifyContent="flex-end" flexDirection="row" gap={1}>
                            <CardContent
                              sx={{ background: '#fafafb', padding: '8px !important', borderRadius: '6px', width: 'fit-content' }}
                            >
                              <Typography variant="h6" color={theme.palette.mode === 'dark' ? 'dark.900' : ''}>
                                {history.content}
                              </Typography>
                            </CardContent>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" align="right" color={theme.palette.mode === 'dark' ? 'dark.900' : ''}>
                            {dayjs(history.timestamp).format('HH:mm A')}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Avatar src={user.profile_picture} />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <Stack alignItems="flex-start" flexDirection="row" gap={1}>
                      <Avatar src={history.author.profile_picture} />
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <CardContent sx={{ background: '#fafafb', padding: '8px !important', borderRadius: '6px', width: 'fit-content' }}>
                            <Typography variant="h6" color={theme.palette.mode === 'dark' ? 'dark.900' : ''}>
                              {history.content}
                            </Typography>
                          </CardContent>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color={theme.palette.mode === 'dark' ? 'dark.900' : ''}>
                            {dayjs(history.timestamp).format('HH:mm A')}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChartHistory;
