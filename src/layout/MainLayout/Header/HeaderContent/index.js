import { useMediaQuery, Box } from '@mui/material';

import Profile from './Profile';
import MobileSection from './MobileSection';
import Localization from './Localization';
import Chat from './Chat';

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />

      <Chat />
      <Localization />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
