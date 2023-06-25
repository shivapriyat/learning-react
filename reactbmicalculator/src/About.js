import { NavMenu } from "./NavMenu";
import {Outlet} from "react-router-dom";
export function About() {
    return(
        <>
        <div>
            <h1>About us</h1>
        </div>
        <Outlet></Outlet>
        </>
    );
}