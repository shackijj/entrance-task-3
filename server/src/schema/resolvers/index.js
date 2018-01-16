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
