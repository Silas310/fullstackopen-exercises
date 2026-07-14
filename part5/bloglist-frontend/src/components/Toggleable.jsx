import { useState } from 'react'


function Toggleable(props) {
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <div>
      {isVisible ? (
      <div>
        {props.children}
        <button type="button" onClick={() => setIsVisible(false)}>
        cancel
      </button>
      </div>
    ) : (
      <div>
        <button type="button" onClick={() => setIsVisible(true)}>
          {props.buttonLabel}
        </button>
      </div>
    )}
    </div>
  )
}

export default Toggleable