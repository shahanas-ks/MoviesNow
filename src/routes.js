
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Genres from "layouts/genres";
import Languages from "layouts/languages";
import Countries from "layouts/countries";
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
    key: "tables",
    icon: <Icon fontSize="small">movies</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Persons",
    key: "billing",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/billing",
    component: <Billing />,
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
    key: "sign-in",
    icon: <Icon fontSize="small">radio</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Reviews",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
