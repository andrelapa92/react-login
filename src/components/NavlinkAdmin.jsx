import { Link } from "react-router-dom";

export default function NavlinkAdmin() {

  return (

    <>
        <div className="vr text-light"></div>
        <Link to="/admin" className='navlink rounded-pill'>Admin</Link>
    </>

  );

}