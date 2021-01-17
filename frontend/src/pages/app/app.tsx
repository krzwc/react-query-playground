import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createGlobalStyle } from 'styled-components';
import ConnectedDesktopApps from 'pages/desktop-apps/containers/connected-desktop-apps';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  .App {
    text-align: center;
  }

  .ant-space > .ant-space-item:first-of-type {
      width: 100%;
  }

  .ant-space-item > .ant-form-item {
      margin-bottom: 0;
  }
`;

const queryClient = new QueryClient();

export const App: FunctionComponent = () => {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <ConnectedDesktopApps />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <GlobalStyle />
        </div>
    );
};
