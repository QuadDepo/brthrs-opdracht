import planetsModel from '../models/planets.models';
import peopleModel from '../models/people.models'

export const getPlanets = async (name: RegExp, climate: RegExp, limit: number, skip: number) => {
    return await planetsModel.find({
        name: { $regex: name },
        climate: { $regex: climate }
    }).skip(skip).limit(limit).exec()
}

export const getPlanetsCount = async (climate: RegExp) => {
    return await planetsModel.countDocuments({ climate: { $regex: climate} }).exec();
}

export const getPlanetById = async (_id: number, hair_color: RegExp) => {    
    return await planetsModel.findOne({ _id }).populate({
        path: 'residents',
        match: {
            hair_color: {
                $regex: hair_color
            }
        },
    }).exec()
}