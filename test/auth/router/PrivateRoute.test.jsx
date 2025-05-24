import { expect, describe, test, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { PrivateRoute } from '../../../src/router/PrivateRoute';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';


describe('test en Private Route', () => {

    test('debe de mostrar el children si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: { id: 'rfbf', name: 'vfugftgu' }
        }
        
        //sobreescribimos el setItem del localStorage por una funcion de prueba, 
        // asi comprobamos luego que haya sido llamada y con que argumentos
        Storage.prototype.setItem = jest.fn();

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Private Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Private Route')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
    });
});
