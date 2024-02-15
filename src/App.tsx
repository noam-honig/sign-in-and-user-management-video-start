import { useEffect, useState } from "react"
import { remult } from "remult"
import { User } from "./shared/User"

const userRepo = remult.repo(User)

export default function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    userRepo.find().then(setUsers)
  }, [])

  function create() {
    setUsers([
      ...users,
      {
        id: "new_" + users.length,
        admin: false,
        name: "",
        createdAt: new Date(),
      },
    ])
  }
  function setUserState(user: User, value: Partial<User>) {
    setUsers(users.map((u) => (u.id === user.id ? { ...u, ...value } : u)))
  }
  async function saveUser(user: User) {
    try {
      const saved = await (user.id.startsWith("new")
        ? userRepo.insert(user)
        : userRepo.save(user))
      setUsers(users.map((u) => (u === user ? saved : u)))
    } catch (err: any) {
      alert(err.message)
    }
  }
  async function deleteUser(user: User) {
    try {
      await userRepo.delete(user)
      setUsers(users.filter((u) => u !== user))
    } catch (err: any) {
      alert(err.message)
    }
  }
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Admin</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  value={user.name}
                  onChange={(e) => setUserState(user, { name: e.target.value })}
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={user.admin}
                  onChange={(e) =>
                    setUserState(user, { admin: e.target.checked })
                  }
                />
              </td>
              <td>
                <button onClick={() => saveUser(user)}>save</button>
                <button onClick={() => deleteUser(user)}>delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4}>
              <button onClick={create}>Create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
