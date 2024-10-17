# Api Gerenciador de tarefas

## Descrição

Este projeto é uma API construída com Node.js e Express para gerenciar tarefas. Ele permite a criação, leitura, atualização e exclusão de tarefas, utilizando um banco de dados MongoDB.

## Tecnologias Usadas

- Node.js
- Express
- Mongoose
- dotenv
- CORS

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio



## Uso

A API estará disponível em http://localhost:8000/tasks. Você pode usar ferramentas como Postman ou Insomnia para testar os endpoints.
Endpoints

    GET /tasks: Retorna todas as tarefas.
    GET /tasks/:id: Retorna uma tarefa específica pelo ID.
    POST /tasks: Cria uma nova tarefa.
    PATCH /tasks/:id: Atualiza uma tarefa existente. Apenas o campo isCompleted pode ser atualizado.
    DELETE /tasks/:id: Remove uma tarefa pelo ID.

## Modelo de Dados

O modelo de dados para as tarefas é definido da seguinte forma:

![image](https://github.com/user-attachments/assets/e75226fe-6c61-4a94-ac20-ed2187e0d689)

## Atributos

    description: A descrição da tarefa (obrigatório).
    isCompleted: Um booleano que indica se a tarefa foi concluída (padrão: false).

## Controlador de Tarefas

O controlador de tarefas gerencia a lógica da API. Ele possui os seguintes métodos:
Métodos

    getTasks(): Retorna todas as tarefas.
    getTaskById(): Retorna uma tarefa específica pelo ID.
    createTask(): Cria uma nova tarefa.
    updateTask(): Atualiza uma tarefa existente.
    deleteTask(): Remove uma tarefa pelo ID.


