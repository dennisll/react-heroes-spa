import { expect, describe, test } from "@jest/globals";
import { render, screen } from '@testing-library/react';
import { AppRouter } from "../../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth";

describe('test on AppRoutes', () => {
    test('deberia ir a la pagina de login', () => {

        const contextValue = {
            logged: false,
            //user: { id: 'rfbf', name: 'vfugftgu' }
        }

        render(

            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        );
        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('debe de mostrar el componente de marvel si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: { id: 'rfbf', name: 'vfugftgu' }
        }

        render(

            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        );

        screen.debug();
        expect(screen.getByText('Clinton Francis Barton')).toBeTruthy();
    });

})
