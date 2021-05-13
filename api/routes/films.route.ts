import { Request, Response } from 'express'
import pagination from '../utils/pagination.util'
import * as filmService from '../services/film.services';

export const getFilms = async (req: Request, res: Response) => {
    const { title = "", limit = 30, page = 1 } = { ...req.query };
    const total = await filmService.getFilmCount()

    const {
        startIndex,
        next,
        prev,
    } = pagination(+limit, +page, +total);


    const results = await filmService.getFilms(title, +limit, +startIndex, );

    res.send({
        total,
        next,
        prev,
        results,
        count: results.length
    });
}

export const getFilmById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { limit = 30, page = 1, gender = null} = { ...req.query };
        const _gender: RegExp = gender  ? new RegExp(`^${gender}`, 'i') : new RegExp('.', 'i');
        const total = await filmService.getFilmCharacterCount(+id, _gender);

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