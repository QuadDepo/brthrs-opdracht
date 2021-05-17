import { Router } from 'express'
import * as PlanetsController from '../controllers/planets.controller';
import * as PeopleController from '../controllers/peoples.controller';

const Planets = Router();

Planets.get('/', PlanetsController.getAllPlanets);
// is :films to match Model name matching
Planets.get('/:id', PlanetsController.getPlanetById);
// is :films to match Model name matching
Planets.get('/:homeworld/residents', PeopleController.getAllPeople);


export default Planets;