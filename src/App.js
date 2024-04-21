import Routes from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import RTLLayout from 'layout/RTLLayout';
import Locales from 'components/Locales';
import { ConfigProvider } from 'contexts/ConfigContext';
import { JWTProvider } from 'contexts/JWTContext';

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
