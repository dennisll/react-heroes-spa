import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Navigate, useParams } from 'react-router-dom';
import { HeroPage } from '../../../src/heroes/pages';

const mockedUseNavigate = jest.fn();

const heroId = 'dc-batman';
jest.mock('react-router-dom', () => (
    {
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({id: heroId}), //({ id: heroId })
        useNavigate: () => mockedUseNavigate,
    }
)); 

describe('test on HeroPage', () => {

    beforeEach(() => jest.clearAllMocks);

    test('deberia de mostrar la informacion de un heroe ', () => {

        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>
        );

        const img = screen.getByRole('img');
        expect(img.src).toContain("/assets/heroes/dc-batman.jpg");

        const boton = screen.getByRole('button');
        fireEvent.click(boton);

        expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    }); 
});


