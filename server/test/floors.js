const {start, stop, runQuery, clearDatabase} = require('../src/server')
const {expect} = require('chai')

describe('#floors', () => {
  let server

  before(() => {
    return start()
      .then((instace) => {
        server = instace
        return instace
      })
      .then(clearDatabase)
      .then(() => {
        const {sequelize: {models}} = server
        return Promise.all([
          models.Room.bulkCreate([
            { title: 'Room1', capacity: 2 },
            { title: 'Room2', capacity: 2 },
            { title: 'Room3', capacity: 2 }
          ]),
          models.Floor.bulkCreate([
            {
              floor: 1
            },
            {
              floor: 2
            },
            {
              floor: 3
            }
          ])
        ])
      })
      .then((rooms, floors) => {
        const promises = []
        promises.push(rooms[0].setFloor(floors[0]))
        promises.push(rooms[1].setFloor(floors[1]))
        promises.push(rooms[2].setFloor(floors[2]))

        return Promise.all(promises)
      })
  })

  after(() => {
    return stop(server)
  })

  it('should get a list of floors', () => {
    return runQuery(server, `{
      floors(order: ASC) {
        floor
        rooms {
          title
        }
      }
    }`)
      .then((result) => {
        const {body: {data: {floors}, errors}} = result
        expect(errors).to.equal(undefined)
        expect(floors).to.eql([
          {
            floor: 1,
            rooms: [
              {
                title: 'Room1'
              }
            ]
          },
          {
            floor: 2,
            rooms: [
              {
                title: 'Room2'
              }
            ]
          },
          {
            floor: 3,
            rooms: [
              {
                title: 'Room3'
              }
            ]
          }
        ])
      })
  })
})
