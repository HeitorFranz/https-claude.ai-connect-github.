export default function EmBreve({ titulo }: { titulo: string }) {
  return (
    <div className="grid gap-2">
      <h1 className="text-3xl">{titulo}</h1>
      <p className="text-mute">Em construção.</p>
    </div>
  )
}
