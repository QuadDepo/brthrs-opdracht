import { Router } from 'express'
import * as FilmsController from '../controllers/films.controller';
import * as PeopleController from '../controllers/peoples.controller';

const Films = Router();

Films.get('/', FilmsController.getFilms);
Films.get('/:id', FilmsController.getFilmById);
// is :films to match Model name matching
Films.get('/:films/characters', PeopleController.getAllPeople);


export default Films;