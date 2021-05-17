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

export const getFilmCharacterCount = async (_id: number, gender: RegExp) => {
    return await peopleModel.countDocuments({
        films: _id,
        gender: { $regex: gender }
    }).exec()
}

export const getFilmById = async (_id: number, limit: number, skip: number, gender: RegExp) => {
    return await filmModel.findOne({ _id }).populate({
        path: 'characters',
        match: {
            gender: {
                $regex: gender
            }
        },
        options: {
            skip,
            limit
        },
    }).exec()
}