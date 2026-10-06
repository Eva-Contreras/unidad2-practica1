type TaskSummaryProps = {
  total: number
  pending: number
  completed: number
}

export function TaskSummary({ total, pending, completed }: TaskSummaryProps) {
  return (
    <dl className="summary">
      <div>
        <dt>Total</dt>
        <dd>{total}</dd>
      </div>
      <div>
        <dt>Pendientes</dt>
        <dd>{pending}</dd>
      </div>
      <div>
        <dt>Completadas</dt>
        <dd>{completed}</dd>
      </div>
    </dl>
  )
}
