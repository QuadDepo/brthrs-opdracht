import filmModel from '../models/films.models';
import peopleModel from '../models/people.models'

export const getFilms = async (title: RegExp, limit: number, skip: number) => {
    const films = await filmModel.find({
        title: { $regex: title }
    }).skip(skip).limit(limit).exec()
    
    return films;
}

export const getFilmCount = async (title: RegExp) => {
    return await filmModel.countDocuments({
        title: { $regex: title }
    }).exec();
}

export const getFilmById = async (_id: number) => {
    return await filmModel.findOne({ _id }).exec()
}