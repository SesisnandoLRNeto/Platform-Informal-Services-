import React, { ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import landingImg from '../../assets/images/landing.png';

import find from '../../assets/images/icons/find.png';
import work from '../../assets/images/icons/work.png';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

function Landing(): ReactElement {
	const [totalConnections, settotalConnections] = useState(0);

	useEffect(() => {
		api.get('connections').then(response => {
			const { total } = response.data;

			settotalConnections(total);
		});
	}, []);

	return (
		<div id="page-landing">
			<div id="page-landing-content" className="container">
				<div className="logo-container">
					<h1 className="title-app">MeuTrampo</h1>
					<h2>Sua plataforma para publicar e encontrar trabalho freela online.</h2>
				</div>
				<img src={landingImg} alt="Plataforma de trabalhos informais" className="hero-image" />

				<div className="buttons-container">
					<Link to="/find" className="find">
						<img className="image invert" src={find} alt="Encontrar" />
						<span className="button-title">Encontrar</span>
					</Link>

					<Link to="/public-work" className="public">
						<img className="image invert" src={work} alt="Publicar" />
						<span className="button-title">Publicar</span>
					</Link>
				</div>

				<span className="total-connections">
					Total de {totalConnections} conexões já realizadas
					<img src={purpleHeartIcon} alt="Coração azul" />
				</span>
			</div>
		</div>
	);
}

export default Landing;
