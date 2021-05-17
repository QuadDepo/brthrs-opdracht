import { Router } from 'express'
import * as PeopleController from '../controllers/peoples.controller';

const Peoples = Router();

Peoples.get('/', PeopleController.getAllPeople);
Peoples.get('/:id', PeopleController.getPeopleById);
// is :films to match Model name
Peoples.get('/film/:films', PeopleController.getAllPeople);
/// is :homeworld to match Model name
Peoples.get('/planet/:homeworld', PeopleController.getAllPeople);



export default Peoples;