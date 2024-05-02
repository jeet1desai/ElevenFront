import PropTypes from 'prop-types';

import { Grid, Stack, Typography } from '@mui/material';

import MainCard from 'components/MainCard';

const ReportCard = ({ color, primary, secondary, iconPrimary }) => {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary size={32} stroke={1.5} /> : null;

  return (
    <MainCard>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Stack spacing={1}>
            <Typography variant="h3">{primary}</Typography>
            <Typography variant="body1" color="secondary">
              {secondary}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Typography variant="h2" color={color}>
            {primaryIcon}
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
};

ReportCard.propTypes = {
  color: PropTypes.string,
  primary: PropTypes.string,
  secondary: PropTypes.string
};

ReportCard.defaultProps = {
  color: 'primary'
};

export default ReportCard;
