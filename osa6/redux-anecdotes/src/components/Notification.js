import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const show = useSelector(state => state.notification.show)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (show) {
    return (
      <div style={style}>
        {message}
      </div>
    )  
  } 
  return (
    <div>
      
    </div>
  )
}

export default Notification