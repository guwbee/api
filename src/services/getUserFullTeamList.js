const UserModel = requireApp('models/user.model')
const TeamModel = requireApp('models/team.model')

module.exports = async (_id) => {
  return await TeamModel.aggregate([
    { $match: {'users.user': _id } },
    {
      '$lookup': {
        'from': UserModel.collection.name,
        'localField': 'users.user',
        'foreignField': '_id',
        'as': 'users',
      },
    },
    {
      $project: {
        name: 1,
        users: {
          $filter: {
            input: '$users',
            as: 'user',
            cond: { $ne: ['$$user._id', _id] },
          },
        },
      },
    },
    {
      $unset: [
        'users.password',
        'users.teams',
      ],
    },
  ]).lean()
}
