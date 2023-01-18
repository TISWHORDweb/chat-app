import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:7000')

export default socket