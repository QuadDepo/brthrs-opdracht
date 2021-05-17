import { Request, Response } from 'express'
import pagination from '../utils/pagination.util'
import * as PlanetsService from '../services/planets.services';

export const getAllPlanets = async (req: Request, res: Response) => {
    try {
        // get default query string keys.
        // name and climate are . to have matching regex
        const { name = '.', climate = '.', limit = 30, page = 1 } = { ...req.query };
        // Create name regex to match part of the Planet title
        const _name: RegExp = new RegExp(`.*${name}.*`, 'i');
        const _climate: RegExp = new RegExp(`^${climate}`, 'i');
        // Get total count of documents with current filters for pagination
        const total = await PlanetsService.getPlanetsCount(_climate, _name);

        // Create pagination
        const {
            startIndex,
            next,
            prev,
        } = pagination(+limit, +page, +total);

        const results = await PlanetsService.getPlanets(_name, _climate, +limit, +startIndex);

        res.send({
            total,
            next,
            prev,
            results,
            count: results.length
        });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

export const getPlanetById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // Be sure _id is a number and not a string
        const results = await PlanetsService.getPlanetById(+id);

        res.send(results);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}