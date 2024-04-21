import { createContext } from 'react';
import PropTypes from 'prop-types';

import defaultConfig from '../config';
import useLocalStorage from 'hooks/useLocalStorage';

const initialState = {
  ...defaultConfig,
  onChangeLocale: () => {},
  onChangeRTL: () => {}
};

const ConfigContext = createContext(initialState);

const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useLocalStorage('eleven-config', {
    locale: initialState.locale,
    rtlLayout: initialState.rtlLayout
  });

  const onChangeLocale = (locale) => {
    setConfig({
      ...config,
      locale
    });
  };

  const onChangeRTL = (rtlLayout) => {
    setConfig({
      ...config,
      rtlLayout
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLocale,
        onChangeRTL
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

ConfigProvider.propTypes = {
  children: PropTypes.node
};

export { ConfigProvider, ConfigContext };
