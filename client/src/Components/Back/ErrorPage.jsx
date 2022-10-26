import { Link } from "react-router-dom";

export default function  ErrorPage({message}) {


  return (
       
          <div className="error" >
                  <h1>{message}</h1>
                  <Link className="message-link" to="/" >
                    <h2>Back to <span>HomePage</span></h2>
                  </Link>
          </div>
         



  )
};


  