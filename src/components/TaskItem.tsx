
const subjects = {
  programacion: 'Programación',
  matematicas: 'Matemáticas',
  historia: 'Historia',
} as const

export type SubjectId = keyof typeof subjects

export type TaskItemProps = {
  id: string
  title: string
  subject: SubjectId
  done: boolean
}

type TaskItemComponentProps = TaskItemProps & {
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({
  id,
  title,
  subject,
  done,
  onToggle,
  onDelete,
}: TaskItemComponentProps) {
  return (
    <li className={done ? 'task is-done' : 'task'}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
          aria-label={`Marcar "${title}" como ${
            done ? 'pendiente' : 'completada'
          }`}
        />
        <span>{title}</span>
      </label>
      <span className={`badge badge-${subject}`}>{subjects[subject]}</span>
      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(id)}
        aria-label={`Eliminar "${title}"`}
      >
        Eliminar
      </button>
    </li>
  )
}
