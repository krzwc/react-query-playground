import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createGlobalStyle } from 'styled-components';
/* import { DataProvider } from 'wrappers/data-provider/data-provider';
import { TestCharacter } from 'components/test-character/test-character';
import { ENTITY_TYPES } from 'common/consts'; */
import ConnectedDesktopApps from 'pages/desktop-apps/containers/connected-desktop-apps';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  .App {
    text-align: center;
  }
`;

const queryClient = new QueryClient();

export const App: FunctionComponent = () => {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                {/* <Characters entityType={ENTITY_TYPES.CHARACTERS} /> */}
                {/* <DataProvider entityData={{ id: '1' }} entityType={ENTITY_TYPES.CHARACTER}>
                    {({ status, data }) => <TestCharacter status={status} data={data} />}
                </DataProvider>
                <DataProvider entityData={{ id: '2' }} entityType={ENTITY_TYPES.CHARACTER}>
                    {({ status, data }) => <TestCharacter status={status} data={data} />}
                </DataProvider> */}
                <ConnectedDesktopApps />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <GlobalStyle />
        </div>
    );
};
