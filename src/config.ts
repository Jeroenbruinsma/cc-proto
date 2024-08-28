const nz_api_ip = "http://cc-backend-api.cavotecmm.org:5000/v0"

export const backendUrl = localStorage.getItem('backend') ? localStorage.getItem('backend') : nz_api_ip
if(backendUrl !== nz_api_ip) console.log("alternative backend url used", backendUrl)
    
export const firtPageAfterLogin = '/sites'