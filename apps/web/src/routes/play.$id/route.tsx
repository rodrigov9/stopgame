import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/play/$id')({
  component: Play
})

function Play() {
  const { id } = Route.useParams()
  return <div>{id}</div>
}
