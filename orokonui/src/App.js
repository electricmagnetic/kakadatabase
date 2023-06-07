import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { SWRConfig } from "swr";
import { QueryParamProvider } from "use-query-params";

import { swrParameters } from "./configuration";
import initGa from "./analytics";
import history from "./history";

import { Header, HomePageHeader } from "./components/presentation/Header";
import Footer from "./components/presentation/Footer";

import HomePage from "./views/index";

import AboutPage from "./views/about";
import LegalPage from "./views/legal";

import LearnPage from "./views/learn/index";
import ThreatsPage from "./views/learn/threats";
import ProtectingPage from "./views/learn/protecting";

import BirdsPage from "./views/birds/index";
import BirdDetailPage from "./views/birds/detail";

import ObservationsPage from "./views/observations/index";
import ObservationDetailPage from "./views/observations/detail";

import ReportPage from "./views/report/index";
import ReportSuccessPage from "./views/report/success";

import NoMatchPage from "./views/nomatch";

const OtherPagesContainer = () => {
  return (
    <>
      <Header />
      <main>
        <div className="constrainer">
          <Switch>
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/legal" component={LegalPage} />

            <Route exact path="/learn" component={LearnPage} />
            <Route exact path="/learn/threats" component={ThreatsPage} />
            <Route exact path="/learn/protecting" component={ProtectingPage} />

            <Route exact path="/birds" component={BirdsPage} />
            <Route exact path="/birds/:slug" component={BirdDetailPage} />

            <Route exact path="/observations" component={ObservationsPage} />
            <Route
              exact
              path="/observations/:slug"
              component={ObservationDetailPage}
            />

            <Route exact path="/report" component={ReportPage} />
            <Route exact path="/report/success" component={ReportSuccessPage} />
            <Route
              exact
              path="/report/success/:slug"
              component={ReportSuccessPage}
            />

            <Route component={NoMatchPage} />
          </Switch>
        </div>
      </main>
    </>
  );
};

const HomePageContainer = () => {
  return (
    <>
      <HomePageHeader />
      <main>
        <HomePage />
      </main>
    </>
  );
};

initGa(history);

function App() {
  return (
    <SWRConfig value={swrParameters}>
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={HomePageContainer} />
              <Route component={OtherPagesContainer} />
            </Switch>
            <Route component={Footer} />
          </div>
        </QueryParamProvider>
      </Router>
    </SWRConfig>
  );
}

export default App;
