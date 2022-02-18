const initialState = {
  show: false,
  message: 'Initial message'
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW': {
    const show = {
      show: true,
      message: action.data.message,
      error: action.data.error
    }
    return show
  }
  case 'HIDE': {
    const hide = {
      show: false,
      message: '',
      error: false
    }
    return hide
  }
  default:
    return state
  }
}

export const showMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {
        message: message,
        show: true,
        error: false
      }
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 1000 * time)
  }
}

export const showErrorMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {
        message: message,
        show: true,
        error: true
      }
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 1000 * time)
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE'
  }
}

export default notificationReducer