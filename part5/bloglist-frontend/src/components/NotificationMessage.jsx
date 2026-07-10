const NotificationMessage = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div style={{ backgroundColor: 'lightgray', border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      {message}
    </div>
  )
}

export default NotificationMessage