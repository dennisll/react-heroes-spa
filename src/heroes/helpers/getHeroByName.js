import { heroes } from "../data/heroes"


export const getHeroByName = (superhero = '') => {

    superhero = superhero.trim().toLowerCase();
    if(superhero.length === 0) return [];
  
    return heroes.filter( hero => hero.superhero.toLowerCase().includes(superhero));
}


