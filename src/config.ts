export const api_ip = "https://api.cavotecconnect.com:8000/v0"
export const api_ip_prod = "https://api.prod.cavotecconnect.com:8000/v0"
export const api_ip_dev = "https://api.dev.cavotecconnect.com:8000/v0"

export const backendUrl = localStorage.getItem('backend') ? localStorage.getItem('backend') : api_ip
if(backendUrl !== api_ip) console.log("alternative backend url used", backendUrl)
    
export const firstPageAfterLogin = '/sites'
export const rowItemsNeededForShowMoreButton = 3