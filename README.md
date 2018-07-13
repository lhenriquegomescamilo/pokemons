### Arquitetura do projeto
* Estrutura básica do projeto

````
├── app
│   ├── components
│   │   └── pokemons
│   ├── config
│   │   ├── db
│   │   │   ├── migrate
│   │   │   └── seeders
│   │   └── env
│   ├── models
│   └── utils
├── bin
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── test
│   └── integration
│       └── config
└── views
````

### Executando o projeto
  * Pelo terminal navegue até a pasta e depois execute o seguinte comando:
 ````
 $ npm install
 ````
 
 * Para subir o servidor antes é necessário executar alguns comandos:
  
 ````
 $ export NODE_ENV=development
 $ docker-compose up -d
 $ npm run migrate  
 ````
 
 * Por fim para subir o servidor utilize o comando:
 ````
 $ npm run start
 ````