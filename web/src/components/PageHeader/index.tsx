import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
	title: string;
	description?: string;
	children?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }: PageHeaderProps) => {
	return (
		<header className="page-header">
			<div className="top-bar-container">
				<Link to="/">
					<img src={backIcon} alt="Voltar" />
				</Link>
				<h1>MeuTrampo</h1>
			</div>

			<div className="header-content">
				<strong>{title}</strong>
				{description && <p>{description}</p>}

				{children}
			</div>
		</header>
	);
};

export default PageHeader;
