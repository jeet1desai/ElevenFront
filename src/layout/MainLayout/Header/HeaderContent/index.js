import { useMediaQuery, Box } from '@mui/material';

import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />

      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
