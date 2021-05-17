import planetsModel from '../models/planets.models';
import peopleModel from '../models/people.models'

export const getPlanets = async (name: RegExp, climate: RegExp, limit: number, skip: number) => {
    return await planetsModel.find({
        name: { $regex: name },
        climate: { $regex: climate }
    }).skip(skip).limit(limit).exec()
}

export const getPlanetsCount = async (climate: RegExp, name: RegExp) => {
    return await planetsModel.countDocuments({ climate: { $regex: climate }, name: { $regex: name } }).exec();
}

export const getPlanetById = async (_id: number) => {
    return await planetsModel.findOne({ _id }).exec()
}