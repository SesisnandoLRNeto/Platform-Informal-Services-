import React from 'react';

import './styles.css';

import whastappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Work {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: number;
}

interface WorkItemProps {
  work: Work;
}

const WorkItem: React.FC<WorkItemProps> = ({ work }: WorkItemProps) => {
  function createNewConnection() {
    api.post('connections', { 
      user_id: work.id, 
    });
  }
  
  return (
    <article className="work-item">
      <header>
        <img src={work.avatar} alt={work.name} />
        <div>
          <strong>{work.name}</strong>
          <span>{work.subject}</span>
        </div>
      </header>
      <p>
        {work.bio}
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>
            R$
            {work.cost}
          </strong>
        </p>
        <a 
          target="_blank" 
          onClick={createNewConnection} 
          href={`https://wa.me/${work.whatsapp}`} 
          type="button"
        >
          <img src={whastappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default WorkItem;
