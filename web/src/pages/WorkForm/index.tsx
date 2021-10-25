import React, { ReactElement, useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import CreatableSelect from 'react-select/creatable';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WorkForm(): ReactElement {
	const history = useHistory();

	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState('');
	const [bio, setBio] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [address, setAddress] = useState('');
	const [type_service, setTypeservice] = useState('');
	const [cost, setCost] = useState('');
	const [scheduleItems, setScheduleItems] = useState([{ week_day: 0, from: '', to: '' }]);

	const [typesServiceOptions, setTypesServiceOptions] = useState([]);

	const notifyMessage = (message: string) => toast(message);

	useEffect(() => {
		getListTypeServices();
	}, []);

	function addNewScheduleItem() {
		setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
	}

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

	function handleCreateWork(e: FormEvent) {
		e.preventDefault();

		api
			.post('works', {
				name,
				avatar,
				whatsapp,
				bio,
				type_service,
				address,
				cost: Number(cost),
				schedule: scheduleItems,
			})
			.then(res => {
				const { informal_workers_id } = res.data;
				notifyMessage('Cadastro realizado com sucesso!');
				api.post('connections', { informal_workers_id });
				setTimeout(() => history.push('/'));
			})
			.catch(() => {
				notifyMessage('Erro no cadastro: Preencha todos os campos');
			});
	}

	function handleChangeType(event: any) {
		const { value } = event;
		setTypeservice(value);
	}

	function setScheduleItemValue(position: number, field: string, value: string) {
		const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
			if (index === position) {
				return { ...scheduleItem, [field]: value };
			}

			return scheduleItem;
		});

		setScheduleItems(updateScheduleItems);
	}

	return (
		<div id="page-work-form" className="container">
			<PageHeader title="Publice seu trampo gratuitamente." description="O primeiro passo é preencher esse formulário de inscrição." />

			<main>
				<form onSubmit={handleCreateWork}>
					<fieldset>
						<legend>Seus dados</legend>
						<Input
							name="name"
							label="Nome Completo"
							value={name}
							onChange={e => {
								setName(e.target.value);
							}}
						/>

						<Input
							name="avatar"
							label="Avatar (copie o link da sua melhor foto de perfil)"
							value={avatar}
							onChange={e => {
								setAvatar(e.target.value);
							}}
						/>

						<Input
							name="address"
							label="Endereço"
							value={address}
							onChange={e => {
								setAddress(e.target.value);
							}}
						/>

						<Input
							name="whatsapp"
							label="WhatsApp"
							value={whatsapp}
							onChange={e => {
								setWhatsapp(e.target.value);
							}}
						/>

						<Textarea
							name="bio"
							label="Descrição do seu serviço"
							value={bio}
							onChange={e => {
								setBio(e.target.value);
							}}
						/>
					</fieldset>

					<fieldset>
						<legend>Sobre o serviço</legend>
						<label>Tipo de serviço</label>
						<CreatableSelect
							placeholder="Selecione ou insira seu tipo serviço"
							id="creatable"
							name="type_service"
							isClearable
							onChange={(e: any) => handleChangeType(e)}
							options={typesServiceOptions}
						/>
						<Input
							name="cost"
							label="Custo da sua hora (R$ XX.XX)"
							value={cost}
							onChange={e => {
								setCost(e.target.value);
							}}
						/>
					</fieldset>

					<fieldset>
						<legend>
							Horários Disponíveis
							<button onClick={addNewScheduleItem} type="button">
								+ Novo Horário
							</button>
						</legend>
						{scheduleItems.map((scheduleItem, index) => {
							return (
								<div key={index} className="schedule-item">
									<Select
										name="week_day"
										label="Dia da Semana"
										value={scheduleItem.week_day}
										onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
										name="from"
										label="Das"
										type="time"
										value={scheduleItem.from}
										onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
									/>

									<Input
										name="to"
										label="Até"
										type="time"
										value={scheduleItem.to}
										onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
									/>
								</div>
							);
						})}
					</fieldset>

					<footer>
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante! <br />
							Preencha todos os dados
						</p>
						<button type="submit">Salvar Cadastro</button>
					</footer>
				</form>
			</main>
		</div>
	);
}

export default WorkForm;
