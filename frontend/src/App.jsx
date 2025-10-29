import React, { useState } from 'react'
import CreatePost from './components/CreatePost'
import Post from './components/Post'

const initialUser = {
  id: 'u1',
  name: 'John Doe',
  avatar: '/uploads/1761763585252-38bcb44c-11d2-437e-a7bf-f415e97f9834.jfif'
}

export default function App() {
  const [posts, setPosts] = useState([])

  function handleCreate(post) {
    setPosts(prev => [post, ...prev])
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Pub Service</h1>
      </header>

      <main className="app-main">
        <CreatePost user={initialUser} onCreate={handleCreate} />

        <section className="feed">
          {posts.length === 0 ? (
            <div className="empty">No posts yet. Create the first one!</div>
          ) : (
            posts.map(p => <Post key={p.id} post={p} />)
          )}
        </section>
      </main>
    </div>
  )
}
