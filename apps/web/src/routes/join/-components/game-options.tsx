import { formatTime } from '@/utils/format-time'

import { Bullet } from '@/components/bullet'
import { Crown, Users, Flag, AlarmClock, ListBox } from 'pixelarticons/react'

type GameOptionsProps = {
  game: {
    code: string
    owner: string
    players: {
      max: number
      current: number
    }
    round: number
    time: number | null
    categories: string[]
  }
}

export function GameOptions({ game }: GameOptionsProps) {
  return (
    <section className="grid grid-cols-2 gap-6">
      <h2 className="col-span-2 text-center text-2xl text-yellow text-shadow-title">
        #{game.code}
      </h2>

      <div className="flex flex-col items-center">
        <Crown className="mb-0.5 size-6" />
        <span className="mb-2">Criado por</span>
        <span className="text-sm">{game.owner}</span>
      </div>

      <div className="flex flex-col items-center">
        <Users className="mb-0.5 size-6" />
        <span className="mb-2">Jogadores</span>
        <span className="text-sm">
          {game.players.current}/{game.players.max}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <Flag className="mb-0.5 size-6" />
        <span className="mb-2">Ronda atual</span>
        <span className="text-sm">{game.round}</span>
      </div>

      <div className="flex flex-col items-center">
        <AlarmClock className="mb-0.5 size-6" />
        <span className="mb-2">Tempo</span>
        <span className="text-sm">
          {game.time ? formatTime(game.time) : 'Ilimitado'}
        </span>
      </div>

      <div className="col-span-2 flex flex-col items-center">
        <ListBox className="mb-0.5 size-6" />
        <span className="mb-2">Categorias</span>
        <div className="flex flex-wrap justify-center gap-2">
          {game.categories.map(category => (
            <Bullet key={category}>{category}</Bullet>
          ))}
        </div>
      </div>
    </section>
  )
}
