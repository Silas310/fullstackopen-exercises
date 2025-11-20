const OpNotification = ( {message, isSuccess} ) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{color: isSuccess ? 'green' : 'red', border: `2px solid ${isSuccess ? 'green' : 'red'}`}}>
      <p>{message}</p>
    </div>
  )
}

export default OpNotification;