import React from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
  const message = useSelector(state => state.notification.message)
  const show = useSelector(state => state.notification.show)
  const error = useSelector(state => state.notification.error)
  if (show && error) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  return (
    <div>

    </div>
  )
}

export default Error