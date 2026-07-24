const NotificationMessage = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div style={{padding: '10px', margin: '10px 0' }}>
      {message}
    </div>
  )
}

export default NotificationMessage