/* eslint-disable no-var */
import * as testLib from '@testing-library/react';
declare global {
    var render: Render;
    var waitFor: WaitFor;
    var fireEvent: FireEvent;
    var within: Within;
    var customRender: CustomRender;
    var act: Act;
}

export type Render = typeof testLib.render;
export type RenderReturnType = testLib.RenderResult<typeof import('@testing-library/dom/types/queries')>;
export type WaitFor = typeof testLib.waitFor;
export type FireEvent = typeof testLib.fireEvent;
export type Within = typeof testLib.within;
export type Act = typeof testLib.act;

type GetByRole = RenderReturnType['getByRole'];
export type GetByRoleWithTextContent = (role: string, text: string) => ReturnType<GetByRole>;

type CustomRenderResult = RenderReturnType & {
    getByRoleWithTextContent: GetByRoleWithTextContent;
};

export type CustomRender = (children: Parameters<Render>[0]) => CustomRenderResult;
