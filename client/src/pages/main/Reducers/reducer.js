import {
    GET_DATA_FROM_SERVER,
    SORT_CLIENT_HEIGHT_ASC,
    SORT_CLIENT_HEIGHT_DESC,
    SORT_CLIENT_NAME_ASC,
    SORT_CLIENT_NAME_DESC,
  } from "../Constants";
  
  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case GET_DATA_FROM_SERVER:
        newState = action.payload;
        break;
      case SORT_CLIENT_NAME_ASC:
        newState = [...state].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
        break;
      case SORT_CLIENT_NAME_DESC:
        newState = [...state].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
        break;
      case SORT_CLIENT_HEIGHT_ASC:
        newState = [...state].sort((a, b) => (a.sum / a.count || 1).toFixed(2) - (b.sum / b.count || 1).toFixed(2));
        break;
      case SORT_CLIENT_HEIGHT_DESC:
        newState = [...state].sort((a, b) => (b.sum / b.count || 1).toFixed(2) - (a.sum / a.count || 1).toFixed(2));
        break;
      default:
    }
  
    return newState;
  }
  
  export default reducer;