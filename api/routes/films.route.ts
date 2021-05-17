import { Request, Response } from 'express'
import pagination from '../utils/pagination.util'
import * as filmService from '../services/film.services';

export const getFilms = async (req: Request, res: Response) => {
    try {
        // get default query string keys.
        // title is . to have matching regex;
        const { title = '.', limit = 30, page = 1 } = { ...req.query };
        // Create name regex to match part of the Film title
        const _title = new RegExp(`.*${title}.*`, 'i');
        // Get total count of documents with current filters for pagination
        const total = await filmService.getFilmCount(_title)

        // Create pagination
        const {
            startIndex,
            next,
            prev,
        } = pagination(+limit, +page, +total);

        const results = await filmService.getFilms(_title, +limit, +startIndex);

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
        // get default query string keys.
        // gender is . to have matching regex;
        const { limit = 30, page = 1, gender = '.'} = { ...req.query };
        // Create gender Regex
        const _gender: RegExp = new RegExp(`^${gender}`, 'i');
        // Get total count of documents with current filters for pagination
        const total = await filmService.getFilmCharacterCount(+id, _gender);

        // Create pagination
        const {
            startIndex,
            next,
            prev,
        } = pagination(+limit, +page, +total);

        const results = await filmService.getFilmById(+id, +limit, +startIndex, _gender);

        res.send({
            total,
            next,
            prev,
            results,
        });

    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}