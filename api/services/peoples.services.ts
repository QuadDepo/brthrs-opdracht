import peopleModel from '../models/people.models'

export const getAllPeople = async (name: RegExp, gender: RegExp, hair_color: RegExp, filter: {}, limit: number, skip: number, sort: {}) => {
    return await peopleModel.find({
        ...filter,
        gender: { $regex: gender },
        hair_color: { $regex: hair_color },
        name: { $regex: name }
    }).skip(skip).limit(limit).sort(sort).exec()
}

export const getPeopleCount = async (name: RegExp, gender: RegExp, hair_color: RegExp, filter: {}) => {
    return await peopleModel.countDocuments({
        ...filter,
        hair_color: { $regex: hair_color },
        gender: { $regex: gender },
        name: { $regex: name }
    }).exec()
}

export const getPeopleById = async (_id: number) => {
    return await peopleModel.findOne({ _id }).exec()
}