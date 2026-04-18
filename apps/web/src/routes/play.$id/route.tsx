import { useEffect, useEffectEvent, useState } from 'react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { io, Socket } from 'socket.io-client'
import { env } from '@/env'

import type {
  ServerToClientEvents,
  ClientToServerEvents
} from '@stopgame/schemas/socket'
import type { RoomModel } from '@stopgame/schemas/room'
import type { PlayerModel } from '@stopgame/schemas/player'
import { RoomContext } from '@/contexts/room-context'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  env.VITE_API_URL,
  { autoConnect: false }
)

interface ExtendedError extends Error {
  data?: string
}

export const Route = createFileRoute('/play/$id')({
  component: Play,
  beforeLoad: ({ params }) => {
    const uppercase = params.id.toUpperCase()
    if (params.id !== uppercase)
      throw redirect({
        to: '/play/$id',
        params: { id: uppercase },
        replace: true
      })
  },
  loader: async ({ params }) => {
    const token = localStorage.getItem(`token_${params.id}`)
    if (!token)
      throw redirect({
        to: '/join/$id',
        params,
        replace: true
      })

    socket.auth = { token }
  },
  onLeave: () => {
    socket.disconnect()
  }
})

function Play() {
  const params = Route.useParams()
  const navigate = Route.useNavigate()

  const [isConnected, setIsConnected] = useState(false)
  const [room, setRoom] = useState<Omit<RoomModel, 'players'> | null>(null)
  const [players, setPlayers] = useState<PlayerModel[]>([])

  const onConnectError = useEffectEvent((err: ExtendedError) => {
    switch (err.data) {
      case 'RoomNotFoundError':
        navigate({
          to: '/',
          replace: true
        })
        break
      case 'InvalidTokenError':
        localStorage.removeItem(`token_${params.id}`)
        navigate({
          to: '/join/$id',
          params,
          replace: true
        })
        break
      default:
        alert('Erro de conexão')
    }
  })

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    const onInitialData: ServerToClientEvents['initialData'] = ({
      players,
      ...room
    }) => {
      setRoom(room)
      setPlayers(players)
    }

    const onPlayerJoin: ServerToClientEvents['playerJoin'] = player => {
      setPlayers(prev => [...prev, player])
    }

    const onPlayerUpdate: ServerToClientEvents['playerUpdate'] = player => {
      setPlayers(prev => prev.map(p => (p.id === player.id ? player : p)))
    }

    const onPlayerLeave: ServerToClientEvents['playerLeave'] = playerId => {
      setPlayers(prev => prev.filter(p => p.id !== playerId))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', onConnectError)

    socket.on('initialData', onInitialData)
    socket.on('playerJoin', onPlayerJoin)
    socket.on('playerUpdate', onPlayerUpdate)
    socket.on('playerLeave', onPlayerLeave)

    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('connect_error', onConnectError)

      socket.off('initialData', onInitialData)
      socket.off('playerJoin', onPlayerJoin)
      socket.off('playerUpdate', onPlayerUpdate)
      socket.off('playerLeave', onPlayerLeave)
    }
  }, [])

  if (!isConnected) return <span>disconnected</span>
  if (!room) return <span>loading...</span>

  return (
    <RoomContext value={{ isConnected, room, players }}>
      <span>
        connected to {room.code}
        <br />
        players: {players.map(p => p.name).join(', ')}
      </span>
      <Outlet />
    </RoomContext>
  )
}
