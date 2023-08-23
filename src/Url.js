const BACKEND_URL= "https://difficult-gray-waistcoat.cyclic.cloud"
// const BACKEND_URL= "http://localhost:5000"

console.log(BACKEND_URL)
export const sign_in = `${BACKEND_URL}/api/auth/login/`;
export const signup = `${BACKEND_URL}/api/auth/signup/`;
 
export const ALL_COMPS = `${BACKEND_URL}/api/comp/getAllCompetitions/`;
export const MY_COMPS = `${BACKEND_URL}/api/comp/getMyCompetitions/`;
export const SHOW_MY_REQ = `${BACKEND_URL}/api/comp/showMyRequests/`;
export const viewApp = `${BACKEND_URL}/api/auth/getById/`;
export const DELETE_COMP = `${BACKEND_URL}/api/comp/deleteCompetition/`;
export const POST_COMP = `${BACKEND_URL}/api/comp/createCompetition/`;
export const APPLY_COMP = `${BACKEND_URL}/api/comp/applyCompetition/`;  
export const ACCEPT_COMP = `${BACKEND_URL}/api/comp/acceptCompetition/`;
export const COMP_STATUS = `${BACKEND_URL}/api/comp/compStatus/`;
export const REMOVE_COMP = `${BACKEND_URL}/api/comp/removeCompetition/`;
export const REMOVE_REQ = `${BACKEND_URL}/api/comp/removeRequest/`;
