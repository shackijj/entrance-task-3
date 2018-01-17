const GraphQLDate = require('graphql-date')

const query = require('./query')
const mutation = require('./mutation')

module.exports = function resolvers () {
  return {
    Query: query,

    Mutation: mutation,

    Room: {
      events ({id}, _, {sequelize: {Event}}) {
        return Event.findAll({
          where: {
            roomId: id
          }
        })
      },
      floor (room) {
        return room.getFloor()
      }
    },

    User: {
      floor (user) {
        return user.getFloor()
      }
    },

    Event: {
      users (event) {
        return event.getUsers()
      },
      room (event) {
        return event.getRoom()
      }
    },

    Date: GraphQLDate
  }
}
