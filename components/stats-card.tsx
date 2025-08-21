interface StatsCardProps {
  number: string
  text: string
  description: string
}

export function StatsCard({ number, text, description }: StatsCardProps) {
  return (
    <div className="bg-gray-900 p-3 md:p-4 rounded-lg">
      <div className="text-xl md:text-2xl font-bold">{number}</div>
      <div className="text-xs md:text-sm font-medium">{text}</div>
      <div className="text-xs text-gray-400 mt-1 hidden sm:block">{description}</div>
    </div>
  )
}
