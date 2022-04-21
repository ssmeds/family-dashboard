const formReducer = (state, { type, payload }) => {
  switch (type) {
    case 'HANDLE INPUT TEXT':
      return {
        ...state,
        [type.field]: payload,
      };
    case 'child-firstName':
      return {
        ...state,
        children: {
          ...state.children,
          childFirstName: payload,
        }
      }
    case 'child-color':
      return {
        ...state,
        children: {
          ...state.children,
          childColor: payload,
        }
      }
    default:
      return state;
  }
}

export default formReducer
