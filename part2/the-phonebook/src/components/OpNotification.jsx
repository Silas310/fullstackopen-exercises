const OpNotification = ( {message} ) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{color: 'green', border: '2px solid green'}}>
      <p>{message}</p>
    </div>
  )
}

export default OpNotification;