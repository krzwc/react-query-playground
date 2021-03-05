import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createGlobalStyle } from 'styled-components';
import { DesktopApps } from 'pages/desktop-apps';
import { absoluteCenter } from 'common/styles/css-mixins';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  //ant design overrides
  .ant-space > .ant-space-item:first-of-type {
    width: 100%;
  }

  .ant-space-item > .ant-form-item {
      margin-bottom: 0;
      }

  .ant-image-placeholder {
    ${absoluteCenter}
  }
`;

const queryClient = new QueryClient();

export const App: FunctionComponent = () => (
    <div id="app">
        <QueryClientProvider client={queryClient}>
            <DesktopApps />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <GlobalStyle />
    </div>
);
