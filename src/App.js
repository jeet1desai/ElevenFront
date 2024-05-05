import Routes from 'routes';
import ThemeCustomization from 'themes';

import dayjs from 'dayjs';

import ScrollTop from 'components/ScrollTop';
import RTLLayout from 'layout/RTLLayout';
import Locales from 'components/Locales';
import { ConfigProvider } from 'contexts/ConfigContext';
import { JWTProvider } from 'contexts/JWTContext';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const App = () => {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <RTLLayout>
          <Locales>
            <ScrollTop>
              <JWTProvider>
                <Routes />
              </JWTProvider>
            </ScrollTop>
          </Locales>
        </RTLLayout>
      </ThemeCustomization>
    </ConfigProvider>
  );
};

export default App;
