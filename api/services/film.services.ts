import filmModel from '../models/films.models';
import peopleModel from '../models/people.models'

export const getFilms = async (title: string, limit: number, skip: number) => {
    const _name = new RegExp(`.*${title}.*`, 'i');

    const films = await filmModel.find({
        title: { $regex: _name }
    }).skip(skip).limit(limit).exec()
    
    return films;
}

export const getFilmCount = async () => {
    const count = await filmModel.countDocuments().exec();
    return count;
}

export const getFilmCharacterCount = async (_id: number, gender: RegExp) => {
    const count = await peopleModel.countDocuments({
        films: _id,
        gender: { $regex: gender }
    }).exec().orFail(new Error('It’s a trap!'));

    return count;
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
    }).exec().orFail(new Error('It’s a trap!'));
}