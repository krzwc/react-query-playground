import '@testing-library/jest-dom';
import { ByRoleOptions, fireEvent, render, waitFor, within, act } from '@testing-library/react';
import { CustomRender, GetByRoleWithTextContent } from '../globals';
import React, { Fragment } from 'react';

global.render = render;
global.fireEvent = fireEvent;
global.waitFor = waitFor;
global.within = within;
global.act = act;
global.customRender = customRender;

function customRender(...args: Parameters<CustomRender>) {
    const [children] = args;

    const libRender = render(<Fragment>{children}</Fragment>);

    const predicate = (text: string): ByRoleOptions['name'] => (_, { textContent }) => textContent === text;

    const getByRoleWithTextContent: GetByRoleWithTextContent = (role: string, text: string) =>
        libRender.getByRole(role, {
            name: predicate(text),
        });

    return { ...libRender, getByRoleWithTextContent };
}
