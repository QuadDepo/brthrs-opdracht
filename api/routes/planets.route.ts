import { Request, Response } from 'express'
import pagination from '../utils/pagination.util'
import * as PlanetService from '../services/planet.services';

export const getPlanets = async (req: Request, res: Response) => {
    try {
        // get default query string keys.
        // name and climate are . to have matching regex
        const { name = '.', climate = '.', limit = 30, page = 1 } = { ...req.query };
        // Create name regex to match part of the Planet title
        const _name = new RegExp(`.*${name}.*`, 'i');
        const _climate = new RegExp(`^${climate}`, 'i');
        // Get total count of documents with current filters for pagination
        const total = await PlanetService.getPlanetsCount(_climate, _name);

        // Create pagination
        const {
            startIndex,
            next,
            prev,
        } = pagination(+limit, +page, +total);

        const results = await PlanetService.getPlanets(_name, _climate, +limit, +startIndex);

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
        // Default hair_color to be "." so it will match the RegEx and can't be undefined.
        const { hair_color = '.' } = { ...req.query };
        // Create hair_color Regex with case insensitive matching.
        const _hair_color: RegExp = new RegExp(`${hair_color}`, 'i');
        // Be sure _id is a number and not a string
        const results = await PlanetService.getPlanetById(+id, _hair_color);

        res.send(results);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}