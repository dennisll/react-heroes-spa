

import queryString from 'query-string'
import { useForm } from '../../hooks/useForm'
import { useLocation, useNavigate } from 'react-router-dom';
import { getHeroByName } from '../helpers';
import { HeroCard } from '../components';

export const Search = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;

  const { searchText, onInputChange, onResetForm } = useForm({
    searchText: q
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();
    //if(searchText.trim().length <= 1) return;

    //navega a la misma pagina con el criterio de busqueda indicado
    navigate(`?q=${searchText}`); 
  }

  return (
    <>
      <div className=' row mt-2'>
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form aria-label ='form' onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder='Searc a hero'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={onInputChange}
            />

            <button
              className='btn btr-outline-primary mt-2'

            >Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/*  { (q === '')  
          ? (<div className="alert alert-primary">Search a hero</div>) 
          : (heroes.length === 0) &&
          (<div className="alert alert-danger">There is not hero with <b> {q}</b></div>)
          } 
          */}

          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? '' : 'none' }}
          >Search a hero</div>

          <div
          aria-label='displayNone'
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? '' : 'none' }}
          >There is not hero with <b> {q}</b></div>

          {heroes.map(hero => (<HeroCard key={hero.id} {...hero} />))}
        </div>
      </div>
    </>
  )
}


