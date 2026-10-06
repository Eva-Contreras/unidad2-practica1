import { useState, type FormEvent } from 'react'
import type { Subject } from '../hooks/useStudyPlan'

type TaskFormProps = {
  error: string
  onAddTask: (title: string, subject: Subject) => boolean
}

export function TaskForm({ error, onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState<Subject>('programacion')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!onAddTask(trimmedTitle, subject)) return
    setTitle('')
    setSubject('programacion')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2>Nueva tarea</h2>
      <p className="form-help">
        El título es obligatorio y debe tener al menos 3 caracteres.
      </p>

      <label htmlFor="title">Título</label>
      <input
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ej. Repasar los hooks"
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'task-error' : undefined}
      />

      <label htmlFor="subject">Materia</label>
      <select
        id="subject"
        name="subject"
        value={subject}
        onChange={(event) => setSubject(event.target.value as Subject)}
      >
        <option value="programacion">Programación</option>
        <option value="matematicas">Matemáticas</option>
        <option value="historia">Historia</option>
      </select>

      <p className="form-error" id="task-error" role="alert">
        {error}
      </p>

      <button type="submit" className="submit-button">
        Agregar tarea
      </button>
    </form>
  )
}
