import React, { useContext } from "react";
import Menu from "../../components/menu/menu";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Teams from "../teams/teams";
import Players from "../players/players";
import Leagues from "../leagues/leagues";
import Coach from "../coach/coach";
import Seasons from "../seasons/seasons";
import useStyles from "./dashboardStyle";
import Link from "@material-ui/core/Link";
import { AuthContext } from "../../providers/authProvider";
import Login from "../login/Login";
import Games from "../games/games";
import LoggedinUserPanel from "../../components/loggedinUserPanel/loggedinUserPanel";
const hist = createBrowserHistory();

export default function Dashboard() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);


  console.log('user', authContext.state.user);
  return (
    <div className={classes.root}>
      <Router history={hist}>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Menu />
        </nav>
        {authContext.state.user ||
        hist.location.pathname === "/login" ? null : (
          <div className={classes.login}>
            <Link href="/login">Login</Link>
          </div>
        )}
        {authContext.state.user ? (
          <LoggedinUserPanel authContext={authContext} />
        ) : null}
        <main className={classes.content}>
          <Switch>
            <Route path="/teams">
              <Teams />
            </Route>
            <Route path="/players">
              <Players />
            </Route>
            <Route path="/coach">
              <Coach />
            </Route>
            <Route path="/leagues">
              <Leagues />
            </Route>
            <Route path="/seasons">
              <Seasons />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}
