import React, { ReactElement, useState, FormEvent } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import WorkItem, { Work } from '../../components/WorkItem';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';

function WorkList(): ReactElement {
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [works, setWorks] = useState([]);

  async function searchWorks(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });

    setWorks(response.data);
  }

  return (
    <div id="page-work-list" className="container">
      <PageHeader title="Estes são os serviços disponíveis.">
        <form id="search-works" onSubmit={searchWorks}>
          <Select
            name="subject"
            label="Serviço"
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
            options={[
              { value: 'Pedreiro', label: 'Pedreiro' },
              { value: 'Eletricista', label: 'Eletricista' },
              { value: 'Carpinteiro', label: 'Ciências' },
              { value: 'Professor particular', label: 'Professor particular' },
              { value: 'Manicure', label: 'Manicure' },
              { value: 'Professor de música', label: 'Professor de música' },
              { value: 'Pintor', label: 'Pintor' },
              { value: 'Office boy', label: 'Office boy' },
              { value: 'Programador', label: 'Programador' },
              { value: 'Diarista', label: 'Diarista' },
              { value: 'Organizador de eventos', label: 'Organizador de eventos' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            value={weekDay}
            onChange={e => { setWeekDay(e.target.value) }}
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
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {works.map((work: Work) => {
          return <WorkItem key={work.id} work={work} />
        })}
      </main>
    </div>
  );
}

export default WorkList;
