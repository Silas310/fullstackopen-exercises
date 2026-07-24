import { Button } from './Button.styles.js'
import { Input } from './Input.styles.js'


function LoginForm({ handleLogin, setUsername, setPassword }) {
  
  const handleInputs = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    } else if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }


  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to app</h2>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <label htmlFor="username" aria-label="username">
          <Input 
            type="text" 
            name="username" 
            id="username" 
            onChange={handleInputs} 
            placeholder="  username"
          />
        </label>
        <label htmlFor="password" aria-label="password">
          <Input 
            type="password" 
            name="password" 
            id="password" 
            onChange={handleInputs}
            placeholder="  password"
          />
        </label>
        <Button>login</Button>
      </div>
    </form>
  )
}

export default LoginForm