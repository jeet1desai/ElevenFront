import { Grid, Stack, Typography, Link } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import AuthWrapper from './AuthWrapper';
import AuthForgetPassword from './auth-forms/AuthForgetPassword';

const ForgetPassword = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Forgot Password</Typography>
          <Link variant="h6" component={RouterLink} to="/login">
            Back to Login
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthForgetPassword />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default ForgetPassword;
