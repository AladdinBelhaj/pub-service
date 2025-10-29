import React, { useState } from 'react'

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (diff < 60) return `${diff}s`
  if (diff < 3600) return `${Math.floor(diff/60)}m`
  if (diff < 86400) return `${Math.floor(diff/3600)}h`
  return `${Math.floor(diff/86400)}d`
}

export default function Post({ post }) {
  const [reactions, setReactions] = useState(post.reactions || { like: 0, love: 0, haha: 0 })
  const [comments, setComments] = useState(post.comments || [])
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)

  function react(type) {
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }))
  }

  function addComment(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    const c = { id: Date.now().toString(), text: commentText.trim(), time: new Date().toISOString() }
    setComments(prev => [...prev, c])
    setCommentText('')
    setShowComments(true)
  }

  return (
    <article className="post">
      <header className="post-header">
        <img src={post.user.avatar} alt="avatar" className="avatar" />
        <div className="meta">
          <div className="name">{post.user.name}</div>
          <div className="time">{timeAgo(post.timestamp)}</div>
        </div>
      </header>

      <div className="post-body">
        {post.text && <p className="text">{post.text}</p>}

        {post.media && (
          <div className="media-wrap">
            {post.media.type.startsWith('video') ? (
              <video src={post.media.url} controls className="media" />
            ) : (
              <img src={post.media.url} alt="post media" className="media" />
            )}
          </div>
        )}
      </div>

      <footer className="post-footer">
        <div className="reactions">
          <button onClick={() => react('like')}>👍 {reactions.like}</button>
          <button onClick={() => react('love')}>❤️ {reactions.love}</button>
          <button onClick={() => react('haha')}>😂 {reactions.haha}</button>
        </div>

        <div className="comment-toggle">
          <button onClick={() => setShowComments(s => !s)}>{showComments ? 'Hide' : 'Comments'} ({comments.length})</button>
        </div>

        {showComments && (
          <div className="comments">
            <div className="comment-list">
              {comments.length === 0 ? <div className="empty">No comments yet</div> : (
                comments.map(c => (
                  <div className="comment" key={c.id}>
                    <div className="comment-text">{c.text}</div>
                    <div className="comment-time">{timeAgo(c.time)}</div>
                  </div>
                ))
              )}
            </div>

            <form className="add-comment" onSubmit={addComment}>
              <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Write a comment..." />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </footer>
    </article>
  )
}
