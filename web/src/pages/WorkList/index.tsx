import React, { ReactElement, useState, FormEvent, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import WorkItem, { Work } from '../../components/WorkItem';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { toast } from 'react-toastify';

function WorkList(): ReactElement {
	const [type_service, setTypeService] = useState('');
	const [weekDay, setWeekDay] = useState('');
	const [time, setTime] = useState('');

	const [works, setWorks] = useState([]);

	const [typesServiceOptions, setTypesServiceOptions] = useState([]);

	const notifyMessage = (message: string) => toast(message);

	useEffect(() => {
		getListTypeServices();
	}, []);

	async function getListTypeServices() {
		await api.get('works/types_services').then((response: any) => {
			const typesServiceOptions = response.data.map((types_services: string) => {
				return {
					value: types_services,
					label: types_services,
				};
			});
			setTypesServiceOptions(typesServiceOptions);
		});
	}

	async function searchWorks(e: FormEvent) {
		e.preventDefault();
		if (!type_service && !weekDay && !time) {
			await api.get('works').then((res: any) => {
				if (res.data.length === 0) {
					notifyMessage('Não há dados cadastrados');
				}
				setWorks(res.data);
			});
		} else {
			await api
				.get('works', {
					params: {
						type_service,
						week_day: weekDay,
						time,
					},
				})
				.then(res => {
					console.log(res.data);
					if (res.data.length === 0) {
						notifyMessage('Não há dados para este filtro');
					}
					setWorks(res.data);
				})
				.catch(() => {
					notifyMessage('Você precisa preencher todos os dados do filtro');
				});
		}
	}

	return (
		<div id="page-work-list" className="container">
			<PageHeader title="Estes são os serviços disponíveis.">
				<form id="search-works" onSubmit={searchWorks}>
					<Select
						name="type_service"
						label="Serviço"
						value={type_service}
						onChange={e => {
							setTypeService(e.target.value);
						}}
						options={typesServiceOptions}
					/>
					<Select
						name="week_day"
						label="Dia da Semana"
						value={weekDay}
						onChange={e => {
							setWeekDay(e.target.value);
						}}
						options={[
							{ value: '0', label: 'Domingo' },
							{ value: '1', label: 'Segunda-feira' },
							{ value: '2', label: 'Terça-feira' },
							{ value: '3', label: 'Quarta-feira' },
							{ value: '4', label: 'Quinta-feira' },
							{ value: '5', label: 'Sexta-feira' },
							{ value: '6', label: 'Sábado' },
						]}
					/>
					<Input
						name="time"
						label="Hora"
						type="time"
						value={time}
						onChange={e => {
							setTime(e.target.value);
						}}
					/>

					<button type="submit">Buscar</button>
				</form>
			</PageHeader>

			<main>
				{works.map((work: Work) => {
					return <WorkItem key={work.id} work={work} />;
				})}
			</main>
		</div>
	);
}

export default WorkList;
