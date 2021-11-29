import React from "react";
import { NavLink } from "react-router-dom";
import "./link.css";

const Link = ({ to, routeName }) => (
  <li>
    <NavLink to={to} className="link" activeClassName="active" exact>
      {routeName}
    </NavLink>
  </li>
);

export default Link;
