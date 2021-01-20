import nock from 'nock';
import fetch from 'node-fetch';
import { renderHook, act } from '@testing-library/react-hooks';
import { useDataProvider } from './data-provider';
import { ENTITY_TYPES, BASE_URL, REQUEST_STATUSES } from 'common/consts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

if (!globalThis.fetch) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    globalThis.fetch = fetch as any;
}

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useDataProvider', () => {
    it('should return data when API responds with 200', async () => {
        let actualData = null;
        nock(BASE_URL).persist().get('/desktop-apps').reply(200, { answer: 'mocked answer' });

        await act(async () => {
            const renderHookResult = renderHook(() => useDataProvider<{ answer: string }>(ENTITY_TYPES.DESKTOP_APPS), {
                wrapper,
            });
            const { result, unmount } = renderHookResult;

            await waitFor(() => {
                return result.current.data && result.current.status === REQUEST_STATUSES.SUCCESS;
            });
            actualData = result.current.data;
            unmount();
        });
        expect(actualData).toEqual({ answer: 'mocked answer' });
    });
});
