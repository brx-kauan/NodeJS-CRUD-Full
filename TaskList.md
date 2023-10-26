```
> Feature User
-OK- Model user ( nome, email, password, data de criação, data de alteração )

-- Crud user

-- Create
-OK- Nome ( opcional ), Email e password devem ser obrigatórios
-OK- Id deve ser criado com uuid
-OK- Os usuários devem conter emails únicos
-OK- Password deve ser encriptado
-OK- Assim que o usuário for criado, deve ser criada uma pasta com id dele
---- Iremos armazenar todos seus arquivos
---- assets/files/:id

-- Read
-OK- Uuid é obrigatório para efetuar a leitura
-OK- Leitura do usuário deve ser feita pelo uuid
-OK- Não teremos o read all ou list all
--- Débitos Técnicos:
-OK- Autorização: só pode acessar a rota Logado
-OK- Não pode ler outro usuário

-- Update
-OK- Uuid é obrigatório para efetuar a edição
-OK- A edição é somente para o name
--- Débitos Técnicos:
-OK- Autorização: só pode acessar a rota Logado
-OK- Não pode editar outro usuário

-- Delete
--- Todos os dados deste usuário devem ser deletados, como:
-OK- Arquivos
-OK- Dados no banco
-OK- Tudo relacionado a ele
-OK- OBS.: Caso você utilize esta ferramenta para venda, leia mais sobre LGPD

--- Débitos Técnicos
-OK- Autorização: só pode acessar a rota Logado
-OK- Não pode deletar outro usuário
```
