import React, { FormEvent, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import logoImg from "../../assets/githeader.svg";
import { Title, Form, Repositories } from "./styles";
import api from "../../services/api";
import { AsyncResource } from "async_hooks";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const response = await api.get(`repos/${newRepo}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo("");
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Explorer"></img>
      <Title>Explore Repositórios no GitHub</Title>
      <Form onSubmit={handleAddRepository}>
        <input
          placeholder="Digite aqui"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        ></input>
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map((repository) => (
          <a
            key={repository.full_name}
            href={`https://github.com/${repository.full_name} `}
            target="_blank"
          >
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
