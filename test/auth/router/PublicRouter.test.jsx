import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { PublicRoute } from '../../../src/router/PublicRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('test on PublicRouter', () => {

    test('debe de mostrar el children si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Public Route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Public Route')).toBeTruthy();
    });

    test('debe ir a la ruta/marvel si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {id: 'rfbf', name: 'vfugftgu'}
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route
                            path='login' element={
                                <PublicRoute>
                                    <h1>Public Route</h1>
                                </PublicRoute>
                            }
                        />
                        <Route path='marvel' element={<h1>Marvel Page</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug();

        expect(screen.getByText('Marvel Page')).toBeTruthy();
    });

});
