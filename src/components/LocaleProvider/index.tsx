import React, { createContext } from 'react';
import zhCN from 'locale/zh-CN';

interface Props {
  locale: Record<string, string>;
  children?: React.ReactNode;
}

export const LocaleContext = createContext<Props['locale']>(zhCN);

function LocaleProvider(props: Props) {
  const { locale, children } = props;
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export default LocaleProvider;
