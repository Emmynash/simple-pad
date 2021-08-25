import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { ProvideNoteContext, ProvideSideBarContext, ProvideThemeContext } from "hooks";
import { Home } from "pages";
import moment from "moment";
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-000000-01');
  ReactGA.pageview(window.location.pathname + window.location.search);
  history.listen(location => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  })
}
moment.locale('en', {
  relativeTime: {
    s: "1s",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    y: "1y",
    yy: "%dy",
  }
})
export const App = () => (
  <Router history={history}>
    <ProvideNoteContext>
      <ProvideThemeContext>
        <ProvideSideBarContext>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </ProvideSideBarContext>
      </ProvideThemeContext>
    </ProvideNoteContext>
  </Router>
)