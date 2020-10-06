const db_data_roomRowExample = {
  label: 'Первый заголовок',
  roomName: 'Poker Room',
  loadSum: '300',
  prevData: [
    { date: "27.06.20", roomName: 'Poker Room', loadSum: '200' },    
    { date: "13.08.20", roomName: 'Poker Room', loadSum: '400' }
  ]
}

const db_data_roomRowExample_2 = {
  label: 'Заголовок 2',
  roomName: 'Go Poker',
  loadSum: '',
  prevData: [
    { date: "27.06.20", roomName: 'Go Poker', loadSum: '200' },    
    { date: "22.08.20", roomName: 'Go Poker', loadSum: '1300' },   
    { date: "11.09.20", roomName: 'Go Poker', loadSum: '100' },   
    { date: "01.10.20", roomName: 'Go Poker', loadSum: '400' }
  ]
}

export const reportForm = {
  value: [db_data_roomRowExample, db_data_roomRowExample_2],
  isEditable: true
}