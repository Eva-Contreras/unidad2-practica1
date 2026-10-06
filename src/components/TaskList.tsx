import { TaskItem } from './TaskItem'
import type { TaskItemProps } from './TaskItem'

type TaskListProps = {
  tasks: TaskItemProps[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <section className="task-panel" aria-label="Tareas">
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-state">No hay tareas para este filtro.</li>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              {...task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </ul>
    </section>
  )
}
