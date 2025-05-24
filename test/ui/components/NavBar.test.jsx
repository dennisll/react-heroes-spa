import { expect, describe, test, beforeEach } from "@jest/globals";
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { AppRouter } from "../../../src/router/AppRouter";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

// aca sobreescribimos solo el useNavigate de la libreria  react-router-dom
jest.mock('react-router-dom', () => (
    {
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUseNavigate,
    }
));

describe('test on NavBar component', () => {

    const logoutMock = jest.fn();

    const contextValue = {
        logged: true,
        user: { id: '123', name: 'dennis' },
        logout: logoutMock
    }

    beforeEach(() => jest.clearAllMocks);

    test('debe de mostrar el navbar si esta autenticado', () => {

        render(

            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>

        );

        expect(screen.getByText('dennis')).toBeTruthy();
    });

    test('debe de llamar la funcion de logout', () => {

        render(

            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>

        );

        const boton = screen.getByLabelText('log');

        fireEvent.click(boton);
        expect(logoutMock).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
    });

});
