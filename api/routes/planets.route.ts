import { Request, Response } from 'express'
import pagination from '../utils/pagination.util'
import * as PlanetService from '../services/planet.services';

export const getPlanets = async (req: Request, res: Response) => {
    try {
        const { name = '.', climate = '.', limit = 30, page = 1 } = { ...req.query };
        const _name = new RegExp(`.*${name}.*`, 'i');
        const _climate: RegExp = new RegExp(`^${climate}`, 'i');
        const total = await PlanetService.getPlanetsCount(_climate);

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
        const { hair_color = '.' } = { ...req.query };
        const _hair_color: RegExp = new RegExp(`^${hair_color}$`, 'i');

        const results = await PlanetService.getPlanetById(+id, _hair_color);

        res.send(results);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}