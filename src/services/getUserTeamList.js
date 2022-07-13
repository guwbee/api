import TeamModel from '../models/team.model.js'

export default async (_id) => {
  const teams = await TeamModel.find({
    users: {
      $elemMatch: {
        user: _id,
      },
    },
  })
    .populate('users.user')
    .lean()

  return teams
}
