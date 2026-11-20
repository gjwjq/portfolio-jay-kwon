interface ChecklistTask {
  id: string
  title: string
  completedAt: number | null
}

const storageKey = "jay-kwon.weekly-checklist.v1"
const seoulDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul", dateStyle: "short" })
const shortDate = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "UTC",
  month: "numeric",
  day: "numeric",
})
const completedDate = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  dateStyle: "medium",
})

function weekBounds(now: Date) {
  const monday = new Date(`${seoulDate.format(now)}T00:00:00Z`)
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7))
  const sunday = new Date(monday)
  sunday.setUTCDate(sunday.getUTCDate() + 6)
  return { monday, sunday }
}

document.addEventListener("nav", () => {
  const checklist = document.querySelector<HTMLElement>(".weekly-checklist")
  if (!checklist) return

  const form = checklist.querySelector("form")!
  const input = form.querySelector("input")!
  const template = checklist.querySelector("template")!
  const storageStatus = checklist.querySelector<HTMLElement>("[data-storage-status]")!
  const openList = checklist.querySelector<HTMLUListElement>("[data-open-tasks]")!
  const completedList = checklist.querySelector<HTMLUListElement>("[data-completed-tasks]")!
  const openEmpty = checklist.querySelector<HTMLElement>("[data-open-empty]")!
  const completedEmpty = checklist.querySelector<HTMLElement>("[data-completed-empty]")!
  const weekRange = checklist.querySelector("[data-week-range]")!
  const weekCount = checklist.querySelector("[data-week-count]")!
  const totalCount = checklist.querySelector("[data-total-count]")!
  const storageNote = storageStatus.textContent
  const storageError = "브라우저에 저장할 수 없어 이 화면에서만 변경 사항이 유지됩니다."
  let tasks: ChecklistTask[] = []

  function readTasks() {
    try {
      const saved = localStorage.getItem(storageKey)
      const parsed: unknown = saved ? JSON.parse(saved) : []
      tasks = Array.isArray(parsed) ? parsed : []
      storageStatus.textContent = storageNote
    } catch {
      storageStatus.textContent = storageError
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks))
      storageStatus.textContent = storageNote
    } catch {
      storageStatus.textContent = storageError
    }
    renderTasks()
  }

  function renderTask(task: ChecklistTask, list: HTMLUListElement) {
    const row = template.content.firstElementChild!.cloneNode(true) as HTMLLIElement
    const checkbox = row.querySelector("input")!
    const date = row.querySelector("time")!
    const remove = row.querySelector("button")!
    row.querySelector("span")!.textContent = task.title
    checkbox.checked = task.completedAt !== null
    if (task.completedAt !== null) {
      const completed = new Date(task.completedAt)
      date.dateTime = completed.toISOString()
      date.textContent = completedDate.format(completed)
      date.hidden = false
    } else {
      remove.hidden = false
      remove.setAttribute("aria-label", `${task.title} 삭제`)
    }
    checkbox.addEventListener("change", () => {
      task.completedAt = checkbox.checked ? Date.now() : null
      saveTasks()
      const destination = checkbox.checked ? completedList : openList
      destination.querySelector<HTMLInputElement>(`[data-task-id="${task.id}"] input`)?.focus()
    })
    remove.addEventListener("click", () => {
      tasks = tasks.filter(({ id }) => id !== task.id)
      saveTasks()
      input.focus()
    })
    row.dataset.taskId = task.id
    list.append(row)
  }

  function renderTasks() {
    const open = tasks.filter(({ completedAt }) => completedAt === null)
    const completed = tasks
      .filter((task): task is ChecklistTask & { completedAt: number } => task.completedAt !== null)
      .sort((a, b) => b.completedAt - a.completedAt)
    openList.replaceChildren()
    completedList.replaceChildren()
    open.forEach((task) => renderTask(task, openList))
    completed.forEach((task) => renderTask(task, completedList))
    openList.hidden = open.length === 0
    completedList.hidden = completed.length === 0
    openEmpty.hidden = !openList.hidden
    completedEmpty.hidden = !completedList.hidden

    const { monday, sunday } = weekBounds(new Date())
    const firstDay = monday.toISOString().slice(0, 10)
    const lastDay = sunday.toISOString().slice(0, 10)
    const completedThisWeek = completed.filter(({ completedAt }) => {
      const day = seoulDate.format(completedAt)
      return day >= firstDay && day <= lastDay
    }).length
    weekRange.textContent = `${shortDate.format(monday)} – ${shortDate.format(sunday)}`
    weekCount.textContent = `이번 주 ${completedThisWeek}개 완료`
    totalCount.textContent = `누적 ${completed.length}개`
  }

  const listeners = new AbortController()
  const { signal } = listeners
  window.addCleanup(() => listeners.abort())
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault()
      const title = input.value.trim()
      if (!title) return
      tasks.push({ id: crypto.randomUUID(), title, completedAt: null })
      saveTasks()
      form.reset()
      input.focus()
    },
    { signal },
  )
  window.addEventListener(
    "storage",
    (event) => {
      if (event.key !== storageKey && event.key !== null) return
      readTasks()
      renderTasks()
    },
    { signal },
  )

  readTasks()
  renderTasks()
  input.disabled = false
  form.querySelector("button")!.disabled = false
})
