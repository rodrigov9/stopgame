import { useEffect, useEffectEvent, useState } from 'react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { io, Socket } from 'socket.io-client'
import { jwtDecode } from 'jwt-decode'
import { env } from '@/env'

import type {
  ServerToClientEvents,
  ClientToServerEvents
} from '@stopgame/schemas/socket'
import type { RoomModel } from '@stopgame/schemas/room'
import {
  type PlayerModel,
  playerTokenPayloadSchema
} from '@stopgame/schemas/player'
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
  loader: async ({ params }) => {
    try {
      const token = localStorage.getItem(`token_${params.id.toUpperCase()}`)
      if (!token) throw new Error()

      const payload = playerTokenPayloadSchema.parse(jwtDecode(token))

      socket.auth = { token }
      return payload
    } catch {
      throw redirect({
        to: '/join/$id',
        params,
        replace: true
      })
    }
  },
  onLeave: ({ params }) => {
    socket.disconnect()
    localStorage.removeItem(`token_${params.id.toUpperCase()}`)
  }
})

function Play() {
  const { roomCode, playerId } = Route.useLoaderData()
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
        localStorage.removeItem(`token_${roomCode}`)
        navigate({
          to: '/join/$id',
          params: params => params,
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
        connected to {room.code} as {players.find(p => p.id === playerId)?.name}
      </span>
      <span>players: {players.map(p => p.name).join(', ')}</span>
      <Outlet />
    </RoomContext>
  )
}
