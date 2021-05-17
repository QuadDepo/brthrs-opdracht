import { Request, Response } from 'express'
import pagination from '../utils/pagination.util'
import * as filmsService from '../services/films.services';

export const getFilms = async (req: Request, res: Response) => {
    try {
        // get default query string keys.
        // title is . to have matching regex;
        const { title = '.', limit = 30, page = 1 } = { ...req.query };
        // Create name regex to match part of the Film title
        const _title: RegExp = new RegExp(`.*${title}.*`, 'i');
        // Get total count of documents with current filters for pagination
        const total = await filmsService.getFilmCount(_title)

        // Create pagination
        const {
            startIndex,
            next,
            prev,
        } = pagination(+limit, +page, +total);

        const results = await filmsService.getFilms(_title, +limit, +startIndex);

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

export const getFilmById = async (req: Request, res: Response) => {
    try {
        // Get films ID from URL
        const { id } = req.params;
        const results = await filmsService.getFilmById(+id);

        res.send(results)
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}