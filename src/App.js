import React, {useState, useEffect} from "react";

import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  const handleLoadRepositories = async () => {
    const response = await api.get('repositories')

    setRepositories(response.data)
  }

  async function handleAddRepository() {
    // const newRepositry = {
    //   title: "desafio-conceitos-reactjs",
    //   url: "https://github.com/j-keven/desafio-conceitos-node",
    //   techs: ["javascript"]
    // }

    const response = await api.post('repositories', {
      title: "desafio-conceitos-reactjs",
      url: "https://github.com/j-keven/desafio-conceitos-node",
      techs: ["javascript"]
    })

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories([...repositories.filter(item => item.id !== id)])
  }

  useEffect(() => {
    handleLoadRepositories();
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(item => {
            return (
              <li key={item.id}>
                {
                  item.title
                }
                <button onClick={() => handleRemoveRepository(item.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
