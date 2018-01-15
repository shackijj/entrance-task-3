type Room = {
  floor: number;
};

/**
 * It should be done on the server.
 */
const groupRoomsByFloor = (rooms: Room[]) => {
  const groups = {};
  rooms.forEach((room) => {
    const { floor } = room;
    if (groups[floor]) {
      groups[floor].push(room);
    } else {
      groups[floor] = [room];
    }
  });
  
  let roomGroups = [];
  for (let key in groups) {
    if (groups.hasOwnProperty(key)) {
      roomGroups.push({
        title: `${key} этаж`,
        rooms: groups[key]
      });
    }
  }
  return roomGroups;
};

export default groupRoomsByFloor;