const initialState = { 
  clientId: "374d2397-5777-4568-90a9-16eb600c4e4a",
  allCases: [],
  allOfficers: [],
  approvedOfficers: [],
  oneCase: {},
  oneOfficer: {},
  islogged: false,
  newCase: {},
  isLoadDone: false,
  message: "",
  currentUser: ""
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
      case "ALL_CASES":
          return {...state, allCases: [...action.payload]}

      case "ALL_OFFICERS":
          return {...state, allOfficers: [...action.payload]}

      case "LOAD_DONE":
          return {...state, isLoadDone: action.payload}

      case "SAVE_APPROVED_OFFICERS":
          return {...state, approvedOfficers: [...action.payload]}

      case "ONE_CASE":
          return {...state, oneCase: {...action.payload}}

      case "ONE_OFFICER":
          return {...state, oneOfficer: {...action.payload}}

      case "LOGIN":
          return {...state, islogged: true}

      case "LOGOUT":
          return {...state, islogged: false, TOKEN: ""}
          
      case "NEW_CASE":
          return {...state, newCase: action.payload}

      case "MSG":
          return {...state, message: action.payload}
      
      default: return state;    
  }
}