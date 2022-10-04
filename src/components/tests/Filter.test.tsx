import React, { useState } from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import GitlabProvider, {GitLabContext} from "../GitlabProvider";
import Filter from "../Filter";
import { FilterType, FreeDictionary, IContextDefault } from "../../util/types";
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import MockDate from 'mockdate';
import {ShallowRenderer} from 'react-test-renderer/shallow';
dayjs.extend(customParseFormat);


// inspired by https://stackoverflow.com/questions/51566816/what-is-the-best-way-to-mock-window-sessionstorage-in-jest
const mockSessionStorage = (() => {
    let store: FreeDictionary<unknown> = {};

    return {
        getItem(key: string) {
            return store[key] || null;
        },
        setItem(key: string, value: unknown) {
            store[key] = value;
        },
        removeItem(key: string) {
            delete store[key];
        },
        clear () {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage
});

// endDate: 2022-10-05T22:00:00.000Z -> 06/10/2022
// startDate: 2022-09-15T22:00:00.000Z -> 16/09/2022
describe('testing sessionstorage', () => {
    beforeEach(() => {
        window.sessionStorage.clear();
        jest.restoreAllMocks();
        MockDate.reset();
    });

    it('should not set anything in the beginning', async () => {
        render(
            <GitlabProvider>
                <Filter/>
            </GitlabProvider>
        );
        expect(window.sessionStorage.getItem("startDate")).toBeNull();
        expect(window.sessionStorage.getItem("endDate")).toBeNull();
    });

    it('should load from sessionStorage', async () => {
        window.sessionStorage.setItem("startDate", "2022-09-15T22:00:00.000Z");
        window.sessionStorage.setItem("endDate", "2022-10-05T22:00:00.000Z");

        render(
            <GitlabProvider>
                <Filter/>
            </GitlabProvider>
        );

        const startDate = screen.getByDisplayValue("16/09/2022") || null;
        const endDate = screen.getByDisplayValue("06/10/2022") || null;
        expect(startDate).not.toBeNull();
        expect(endDate).not.toBeNull();
    });

    it('should reset the sessionStorage', async () => {
        window.sessionStorage.setItem("startDate", "2022-09-15T22:00:00.000Z");
        window.sessionStorage.setItem("endDate", "2022-10-05T22:00:00.000Z");

        const renderer = render(
            <GitlabProvider>
                <Filter/>
            </GitlabProvider>
        );

        fireEvent.click(await screen.findByTestId('resetButton'));
        expect(window.sessionStorage.getItem("startDate")).toBeNull();
        expect(window.sessionStorage.getItem("endDate")).toBeNull();
    })
});