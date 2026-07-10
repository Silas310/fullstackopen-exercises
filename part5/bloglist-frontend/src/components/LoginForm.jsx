function LoginForm({handleLogin, setUsername, setPassword}) {
  const handleInputs = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <h2>log in to app</h2>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <label htmlFor="username">
          username:
          <input type="text" name="username" id="username" onChange={handleInputs} />
        </label>
        <label htmlFor="password">
          password:
          <input type="password" name="password" id="password" onChange={handleInputs} />
        </label>
        <button type="submit" style={{ padding: '0.4rem 0.1rem', 
          width: 'fit-content' }}>login</button>
      </div>
    </form>
  );
}

export default LoginForm;