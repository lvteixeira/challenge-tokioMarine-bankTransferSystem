# challenge-tokioMarine-bankTransferSystem


## Badges
![](https://img.shields.io/badge/lang-Java-brown)

![](https://img.shields.io/badge/jdk-Oracle_Open_JDK_---->_v17.0.6-purple)

![](https://img.shields.io/badge/framework-Sring_Boot_---->_v3.2.0-darkblue)

![](https://img.shields.io/badge/deps/build-Gradle_---->_v8.4-def)

![](https://img.shields.io/badge/tests-JUnit_---->_v4_and_v5-orange)

![](https://img.shields.io/badge/lang-Javascript-brown)

![](https://img.shields.io/badge/framework-Node.js_---->_v20.9.0-purple)


# Bank Transfer System
Projeto de prototipagem escrito para o desafio técnico de desenvolvimento de software da Tokio Marine. Consiste em aplicação web que possibilite o usuário agendar uma transação bancária vide regra de negócio.

# Decisões Arquiteturais
O planejamento do projeto teve foco na entrega dos requisitos funcionais explicitados no requisito visando entregar um protótipo de qualidade, com eficiência e no menor tempo possível.

Em um projeto de maior dimensão e.g: "O servidor recebe milhões de requisições de agendamento simultâneas e depende do processamento de informações por diferentes microsserviços para fazer uma transferência ou pagamento", certamente seria plausível implementar uma arquitetura de microsserviços com solução de mensageria. Para atender aos requisitos do desafio, uma arquitetura em três camadas com um banco de dados em memória, uma API REST e outro servidor responsável pela apresentação dos dados e interação com o usuário foi suficiente.

A api é orientada à serviços, no padrão MVCS, arquitetura REST recebendo e respondendo requisições HTTP no formato JSON. A arquitetura orientada à serviços provê melhor _readability_ e separação de responsabilidades (SRP), fazendo com que a regra de negócio seja aplicada de forma mais organizada, coesa e possa ser granularizada com maior facilidade de acordo com necessidades futuras, o que facilita alteração, manutenção, integração e portabilidade.

O código da API utiliza o padrão de injeção de dependência, o que permite que uma classe obtenha suas dependências a partir de outra, tornando o código mais limpo e desacoplado, além de reutilizável e melhor testável. Uma classe de serviço pode injetar uma classe de repositório para acessar dados do banco de dados, um controlador pode injetar uma classe de serviço para processar solicitações HTTP, uma classe de configuração pode injetar uma classe de bean para configurar a aplicação.

Trafegar DTOs e não Entitys! O que trafega na camada de aplicação não é a serialização de um objeto Data Entity mas sim de um objeto de transferência de dados, provendo separação e melhor implementação do que diz respeito a modelagem de dados/regra de negócio e o que é devolvido ao cliente.

Por sua vez, o front end é um SPA responsável por prover a interface de usuário. As páginas HTML são renderizadas e dinamizadas de acordo com as ações do usuário utilizando React e Javascript. Para estilos, foi utilizado TailwindCSS e daisyUI.

A componentizaçao das telas ajuda a desenhar o fluxo de funcionamento do app e facilita a implementação de novas funcionalidades pois ajuda na separação das responsabilidades, além de deixar o código mais organizado e facilitar ainda a configuração de estilos. O Tailwind CSS fica responsável por aplicar estilos pré definidos direto no `className` do elemento otimizando a escrita de CSS e o daisyUi é responsável pelo design dos componentes.








## Tech Stack

**Frontend:** Next.js(React), FetchAPI, TailwindCSS, daisyUI;

**Backend:** SpringBoot, Banco de Dados (h2);

A api de transferências foi escrita em Java, utilizando o framework Spring Boot persistindo dados em banco h2. Para a interface de usuário considerei a utilização do Next.js para facilitar a manipulação de eventos de ciclo de vida dos componentes, o que ajudou a acelerar a entrega do protótipo, além de ser um framework de alta performance (seu compilador é escrito em Rust) e fácil integração com diversos recursos.

https://nextjs.org/docs/architecture/nextjs-compiler

https://swc.rs

## Features
### UI
- Permite que o usuário agende transferências;
- Permite que o usuário veja as transferências agendadas;
- Garante que o número da conta esteja no padrão; 
- Garante que a quantia seja um valor inteiro e esteja no padrão esperado;
- Não permite que a data para realização da transferência seja anterior a do dia corrente;
- Formata a data para o padrao esperado, independente do local time do navegador;
- Popa notificação na tela avisando o usuário do status durante uma solicitação de agendamento;
- Aplica estilos com framework TailwindCSS utilizando design de componentes daisyUI.
### API
- Lista transferências por usuário (extrato);
- Cria nova transferência (agendamento);
- Processa e analisa solicitações de transferência de acordo com a regra de negócio;
- Calcula a diferença em dias entre duas datas;
- Calcula taxa referente à transferência;
- Não permite que transferência seja agendada para mais de 50 dias a partir da data de solicitação;
- Conta com testes (JUnit);
- Conta com documentação (Swagger);
- Persiste os agendamentos de transferência em banco h2.


## Instalando o projeto

### Frontend

O projeto depende da versão 20.9.0 do Node.js. Com o Node.js instalado:

1 - Acessar o diretório raiz:
```bash
cd react-bankTransferSystemApp\bank-transfer-system
```
2 - Instalar dependências:
```bash
npm install
```
3 - Rodar o projeto:
```bash
npm run dev
```

Se tiver algum problema, delete os seguintes diretórios:

`bank-transfer-system\node_modules` 

`bank-transfer-system\.next`

Após a deleção, volte ao passo 1.

### Backend

O projeto depende da versão 17.0.6 do JDK. Com o JDK instalado:

1 - Acessar o diretório raiz:
```bash
cd spring-bankTransferSystemApi\bankTransferSystemApi
```
2 - Buildar o projeto:
```bash
.\gradlew.bat build
```
2 - Rodar o projeto:
```bash
java -jar .\build\libs\bankTransferSystemApi-0.0.1-SNAPSHOT.jar
```
    
## Executando os testes

A API conta com testes para os endpoints, para rodá-los:

```bash
.\gradlew.bat test --tests com.acme.bankTransferSystemApi.BankTransferSystemApiApplicationTests.shouldScheduleTransfer
```
```bash
.\gradlew.bat test --tests com.acme.bankTransferSystemApi.BankTransferSystemApiApplicationTests.shouldNotScheduleTransfer
```
```bash
.\gradlew.bat test --tests com.acme.bankTransferSystemApi.BankTransferSystemApiApplicationTests.shouldNotReturnStatementsIncaseUserNeverScheduledATransfer
```
O report dos testes fica disponível em: 

```bash
build\reports\tests\test\index.html
```

## Documentação
A documentação dos endpoints pode ser visualizada em http://localhost:8080/swagger-ui/index.html#/
## Utilização/Exemplos
Com o app e api em execução acesse http://localhost:3000/ para acessar a interface de usuário.

![Screenshot de tela de agendamento de transferência.](https://i.ibb.co/Hgt3GXY/img1.png)

![Screenshot de tela de extrato bancario.](https://i.ibb.co/Bq7J10n/img2.png)
