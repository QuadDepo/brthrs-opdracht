import { Request, Response } from 'express'
import pagination from '../utils/pagination.util'
import * as peoplesService from '../services/peoples.services';

export const getAllPeople = async (req: Request, res: Response) => {
    try {
        // Create filter object from params
        const filter = req?.params;

        // get default query string keys.
        // gender, name, hair_color are . to have matching regex;
        const { limit = 30, page = 1, gender = '.', name = '.', sorting = 'name:desc', hair_color = '.' } = { ...req.query };
        // Split sort string into key and value
        const [sortKey, sortValue] = sorting.split(':')
        // Create with SortKey as key
        const sort: { [key: string]: string } = { [sortKey]: sortValue };
        // Create hair_color Regex with case insensitive matching.
        const _hair_color: RegExp = new RegExp(`${hair_color}`, 'i');

        // Create name Regex
        const _name: RegExp = new RegExp(`.*${name}.*`, 'i');

        // Create gender Regex
        const _gender: RegExp = new RegExp(`^${gender}`, 'i');

        // Get total count of documents with current filters for pagination
        const total = await peoplesService.getPeopleCount(_gender, _name, _hair_color, filter);

        // Create pagination
        const {
            startIndex,
            next,
            prev,
        } = pagination(+limit, +page, +total);

        const results = await peoplesService.getAllPeople(_name, _gender, _hair_color, filter, +limit, +startIndex, sort);

        res.send({
            count: results.length,
            total,
            next,
            prev,
            results
        });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

export const getPeopleById = async (req: Request, res: Response) => {
    try {
        // Get people ID from URL
        const { id } = req.params;

        // Make sure id is a Number type
        const results = await peoplesService.getPeopleById(+id);

        res.send(results);

    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}