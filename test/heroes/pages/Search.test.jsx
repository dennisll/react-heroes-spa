import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { Search } from '../../../src/heroes/pages/Search';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

// aca sobreescribimos solo el useNavigate de la libreria  react-router-dom
jest.mock('react-router-dom', () => (
    {
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUseNavigate,
    }
));

describe('test Search Page', () => {

    beforeEach(() => jest.clearAllMocks);

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <Search />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar el hero buscado', () => {

        const heroSearch = 'batman';

        render(
            <MemoryRouter initialEntries={[`/search?q=${heroSearch}`]}>
                <Search />
            </MemoryRouter>
        );

        const inputValue = screen.getByRole('textbox');
        expect(inputValue.value).toBe(heroSearch);
        const img = screen.getByRole('img');
        expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
        const div = screen.getByLabelText('displayNone');
        expect(div.style.display).toBe("none");
    });

    test('debe de mostrar un error al buscar el heroe inexistente', () => {

        const heroSearch = 'fff123';

        render(
            <MemoryRouter initialEntries={[`/search?q=${heroSearch}`]}>
                <Search />
            </MemoryRouter>
        );
        //screen.debug();
        const inputValue = screen.getByRole('textbox');
        expect(inputValue.value).toBe(heroSearch);
        const div = screen.getByLabelText('displayNone');
        expect(div.style.display).toBe("");
    });

    test('debe de ir a la pantalla del heroe', () => {

        const heroSearch = 'batman';

        render(
            <MemoryRouter initialEntries={[`/search?q=`]}>
                <Search />
            </MemoryRouter>
        );
        //screen.debug();


        const input = screen.getByRole('textbox');
        const form = screen.getByLabelText('form');

        fireEvent.input(input, { target: { value: heroSearch } });
        fireEvent.submit(form);
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${heroSearch}`); //`?q=${heroSearch}`

    });
});
