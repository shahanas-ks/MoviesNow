
import Dashboard from "layouts/dashboard";
import Movies from "layouts/movies";
import Persons from "layouts/persons";
import Genres from "layouts/genres";
import Languages from "layouts/languages";
import Countries from "layouts/countries";
import Podcasts from "layouts/podcasts";
import Reviews from "layouts/reviews";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Movies",
    key: "movies",
    icon: <Icon fontSize="small">movies</Icon>,
    route: "/movies",
    component: <Movies />,
  },
  {
    type: "collapse",
    name: "Persons",
    key: "persons",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/persons",
    component: <Persons />,
  },
  {
    type: "collapse",
    name: "Genres",
    key: "genres",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/genres",
    component: <Genres />,
  },
  {
    type: "collapse",
    name: "Languages",
    key: "languages",
    icon: <Icon fontSize="small">flags</Icon>,
    route: "/languages",
    component: <Languages />,
  },
  {
    type: "collapse",
    name: "Countries",
    key: "countries",
    icon: <Icon fontSize="small">language</Icon>,
    route: "/countries",
    component: <Countries />,
  },
  {
    type: "collapse",
    name: "Podcasts",
    key: "podcasts",
    icon: <Icon fontSize="small">radio</Icon>,
    route: "/podcasts",
    component: <Podcasts />,
  },
  {
    type: "collapse",
    name: "Reviews",
    key: "reviews",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/reviews",
    component: <Reviews />,
    
  },
    {
    type: "route",
    // name: "login",
    key: "sign-in",
    // icon: <Icon fontSize="small">radio</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
