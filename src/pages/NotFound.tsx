import { Link, useNavigate } from "react-router-dom"
import TopHeader from "../components/TopHeader/TopHeader"
import { firstPageAfterLogin } from "../config"
import { useEffect } from "react"


const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
        navigate(`${firstPageAfterLogin || "/"}`)
        }, 5000);
        return () => clearTimeout(timer);
      }, []);

  return (
    <>
        <TopHeader showImage={true} />
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <h1>Oops</h1>
            <p>It looks like you've stumbled upon a page that doesn't exist.</p>
            <p>Try going back to the <Link to={`${firstPageAfterLogin || "/"}`}>home page</Link> or go back</p>
        </div>
    </>
  )
}

export default NotFound