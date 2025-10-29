import React, { useState } from 'react'

export default function CreatePost({ user, onCreate }) {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')

  function handleFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    // validation: text required if no media
    if (!file && text.trim().length === 0) {
      setError('Please add text or attach a media file.')
      return
    }

    const post = {
      id: Date.now().toString(),
      user,
      text: text.trim(),
      media: file ? { url: preview, type: file.type } : null,
      timestamp: new Date().toISOString(),
      reactions: { like: 0, love: 0, haha: 0 },
      comments: []
    }

    onCreate(post)
    // reset
    setText('')
    setFile(null)
    setPreview(null)
    setError('')
  }

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="cp-top">
        <img src={user.avatar} alt="avatar" className="avatar" />
        <textarea
          placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
          value={text}
          onChange={e => setText(e.target.value)}
          rows={2}
        />
      </div>

      {preview && (
        <div className="preview">
          {file && file.type.startsWith('video') ? (
            <video src={preview} controls className="media" />
          ) : (
            <img src={preview} alt="preview" className="media" />
          )}
          <button type="button" className="remove" onClick={() => { setFile(null); setPreview(null); }}>
            Remove
          </button>
        </div>
      )}

      <div className="cp-actions">
        <label className="file-label">
          <input type="file" accept="image/*,video/*" onChange={handleFile} />
          <span>Add Photo/Video</span>
        </label>

        <div className="spacer" />

        <button type="submit" className="publish">Publish</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  )
}
