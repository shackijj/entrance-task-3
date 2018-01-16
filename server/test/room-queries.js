const {start, stop, runQuery, clearDatabase} = require('../src/server')
const {expect} = require('chai')

describe('Room queries', () => {
  let server
  let room

  before(() => {
    return start()
      .then((instace) => {
        server = instace
        return instace
      })
      .then(clearDatabase)
      .then(() => {
        const {sequelize: {models}} = server

        const HOUR = 60 * 60 * 1000
        let now = new Date()
        let oneHourLater = new Date(now.getTime() + HOUR)
        let twoHoursLater = new Date(oneHourLater.getTime() + HOUR)

        let eventsPromise = models.Event.bulkCreate([
          {
            title: 'Event1',
            dateStart: now,
            dateEnd: oneHourLater
          },
          {
            title: 'Event2',
            dateStart: oneHourLater,
            dateEnd: twoHoursLater
          }
        ])

        let roomsPromise = models.Room.bulkCreate([
          { title: 'Room1', floor: 1, capacity: 2 },
          { title: 'Room2', floor: 1, capacity: 2 },
          { title: 'Room3', floor: 1, capacity: 2 }
        ])

        return Promise.all([roomsPromise, eventsPromise])
          .then(() => Promise.all([
            models.Room.findAll(),
            models.Event.findAll()
          ]))
          .then(([rooms, events]) => {
            let promises = []
            room = rooms[0]
            promises.push(events[0].setRoom(rooms[0]))
            promises.push(events[1].setRoom(rooms[1]))
            return Promise.all(promises)
          })
      })
  })

  after(() => {
    return stop(server)
  })

  describe('#room', () => {
    it('should return a room by given id', () => {
      return runQuery(server, `{
        room(id: "${room.id}") {
          title
          capacity
          floor
        }
      }`)
        .then(({body: {data: {room}, errors}}) => {
          expect(errors).to.equal(undefined)
          expect(room).to.eql({
            title: 'Room1',
            capacity: 2,
            floor: 1
          })
        })
    })
  })

  describe('#rooms', () => {
    it('should return an array of rooms', () => {
      return runQuery(server, `{
        rooms {
          title
          capacity
          floor
        }
      }`)
        .then(({body: {data: {rooms}, errors}}) => {
          expect(errors).to.equal(undefined)
          expect(rooms).to.eql([
            { title: 'Room1', floor: 1, capacity: 2 },
            { title: 'Room2', floor: 1, capacity: 2 },
            { title: 'Room3', floor: 1, capacity: 2 }
          ])
        })
    })

    it('should return an array of rooms with events', () => {
      return runQuery(server, `{
        rooms {
          events {
            title
          }
        }
      }`)
        .then(({body: {data: {rooms}, errors}}) => {
          expect(errors).to.equal(undefined)
          console.log(rooms)
          expect(rooms).to.eql([
            {
              events: [
                {
                  title: 'Event1'
                }
              ]
            },
            {
              events: [
                {
                  title: 'Event2'
                }
              ]
            },
            {
              events: []
            }
          ])
        })
    })
  })
})
