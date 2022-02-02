const initialState = {
  show: false,
  message: 'Initial message'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      const show = {
        show: true,
        message: action.data.message
      }
      return show
    case 'HIDE':
      const hide = {
        show: false,
        message: ''
      }
      return hide
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
        show: true
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

export default reducer