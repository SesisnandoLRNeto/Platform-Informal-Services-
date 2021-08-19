import React, { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import WorkList from './pages/WorkList';
import WorkForm from './pages/WorkForm';

function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/find" component={WorkList} />
      <Route path="/public-work" component={WorkForm} />
    </BrowserRouter>
  );
}

export default Routes;
