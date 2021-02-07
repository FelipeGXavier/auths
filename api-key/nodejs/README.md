## Auths

Projeto para praticar o uso de diferentes formar de autenticação e autorização utilizando Java e NodeJS. 

Métodos utilizados: 

- API Key
- JWT (Json Web Token)
- OAuth2

Cada diretório tem o setup necessário para rodar o projeto utilizando Docker.

<pre><code>docker-compose up -d</code></pre>
<hr>

**Projetos NodeJS**:

<pre><code>npm install</code></pre>

Para projetos que utilizam <a href="https://apidocjs.com/">apidocs</a> é necessário gerar a documentação antes.

<pre><code>npm run docs</code></pre>

Acessível pela rota **/apidocs**

<hr>

**Projetos Java:**

<pre><code>mvn clean install</code></pre>

Para projeto que utilizam <a href="https://swagger.io/">swagger</a> após o projete compila estiver rodando.

<pre><code>./mvnw spring-boot:run</code></pre>

Acessível pela rota **/swagger-ui.html**
