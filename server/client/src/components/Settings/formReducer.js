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
    // case 'HANDLE CHILD INPUT TEXT':
    //   return {
    //     ...state,
    //     [action.field]: action.payload
    //     // children: [{
    //     //   ...state.children,
    //     //   // childFirstName: action.payload
    //     //   [action.payload.index]: action.payload.value
    //     // }]
    //     // [action.field]: action.payload,
    //   };
    // case 'HANDLE CHILD COLOR INPUT':
    //   return {
    //     ...state,
    //     [action.field]: action.payload
    //     // children: [{
    //     //   ...state,
    //     //   // [action.field]: action.payload
    //     //   // childColor: action.payload
    //     //   [action.payload]: action.payload
    //     // }]
    //     //  mainContent: [{
    //     //   ...state.mainContent,
    //     //   title: action.payload,
    //     // }]
    //     // [action.field]: action.payload,
    //   }
    default:
      return state;
  }
}

export default formReducer
