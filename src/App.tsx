import { useEffect, useState } from 'react'
import './App.css'

type items = {
  id: string
  title: string
  completed: boolean
}

export default function App() {
  const [newItem, setNewItem] = useState<string>("")
  const [items, setItems] = useState<items[]>(() => {
    const storedItems = localStorage.getItem("items")
    if (storedItems) {
      try {
        return JSON.parse(storedItems) as items[]
      } catch (error) {
        console.error("Error parsing stored items:", error)
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newItem.trim() === "") return
    setItems((currentItems) => [...currentItems, { id: crypto.randomUUID(), title: newItem, completed: false }])
    setNewItem("")
  }

  const handleToggle = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <>
      <body>
        <form className="new-item-form" onSubmit={handleSubmit}>
          <label htmlFor="item">New Item</label>
          <div className="form-row">
            <input
              type="text"
              id="item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
          </div>
          <button type="submit">Add</button>
          <h2>Todo List</h2>
          <ul className="list">
            {items.map(item => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggle(item.id)}
                  />
                  {item.title}
                </label>
                <button className="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </form>
      </body>
    </>
  )
}