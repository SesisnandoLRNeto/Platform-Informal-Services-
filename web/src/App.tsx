import React, { ReactElement } from 'react';

import Routes from './routes';

import './assets/styles/global.css';
import { ToastContainer } from 'react-toastify';

function App(): ReactElement {
	return (
		<div>
			<Routes />
			<ToastContainer autoClose={3000} />
		</div>
	);
}

export default App;
