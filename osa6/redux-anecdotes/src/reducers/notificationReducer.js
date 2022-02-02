const initialState = {
  show: false,
  message: 'Initial message'
}

const reducer = (state = initialState, action) => {
  console.log(action)
  console.log('state', state)
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

export const showMessage = (message) => {
  return {
    type: 'SHOW',
    data: {
      message: message,
      show: true
    }
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE'
  }
}

export default reducer