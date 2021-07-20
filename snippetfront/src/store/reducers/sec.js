let emptySec = {
  isLogged: false,
  isVerifying: false,
  hasError: false,
  error:"",
  user: null
}

if(localStorage.getItem("sec_str") && true) {
  emptySec = JSON.parse(localStorage.getItem("sec_str"));
}

if(emptySec.isLogged){
  //verificacion ping function
}

export const SEC_LOGIN = "SEC_LOGIN";
export const SEC_FETCHING = "SEC_FETCHING";
export const SEC_ERROR = "SEC_ERROR";
export const SEC_LOGOUT = "SEC_LOGOUT";
export const SEC_JWTERROR = "SEC_JWTERROR";

const secReducer = (state = emptySec, action = {}) => {
  switch (action.type) {
    case SEC_LOGIN:
      const newSec = {
        ...state,
        isVerifying:false,
        isLogged: true,
        hasError:false,
        error:"",
        user:action.payload
      };
      localStorage.setItem("sec_str", JSON.stringify(newSec));
      return newSec;
    case SEC_FETCHING:
      return { ...state, isVerifying:true};
    case SEC_ERROR:
      return {
        ...state,
        isVerifying: false,
        hasError: true,
        error: action.payload
      };
    case SEC_LOGOUT:
      return {
        ...state,
        isVerifying: false,
        isLogged: false,
        hasError: false,
        error: "",
        user: null
      };
    default:
      return state;
  }
}
export default secReducer;
