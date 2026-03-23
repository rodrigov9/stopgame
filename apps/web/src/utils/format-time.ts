export function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const result = []

  if (minutes > 0) result.push(`${minutes} min`)
  if (seconds > 0) result.push(`${seconds} s`)

  return result.join(' ')
}
