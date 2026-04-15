import { api } from '.'
import type {
  GetRoomResponse,
  JoinRoomBody,
  JoinRoomResponse,
  CreateRoomBody,
  CreateRoomResponse
} from '@stopgame/schemas/http/room'

type Options = {
  signal?: AbortSignal
}

export async function getRoom(code: string, options?: Options) {
  const response = await api.get<GetRoomResponse>(`/rooms/${code}`, options)
  return response.data
}

export async function joinRoom(
  code: string,
  body: JoinRoomBody,
  options?: Options
) {
  const response = await api.post<JoinRoomResponse>(
    `/rooms/${code}/join`,
    body,
    options
  )
  return response.data
}

export async function createRoom(body: CreateRoomBody, options?: Options) {
  const response = await api.post<CreateRoomResponse>('/rooms', body, options)
  return response.data
}
