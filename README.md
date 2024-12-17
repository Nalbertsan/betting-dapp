# Problema 3- BET Distribuída

Frontend - https://github.com/Nalbertsan/betfront
Backend - https://github.com/Nalbertsan/littertiger
Contrato - Repositório atual

## Dupla: Pedro Henrique Araujo Almeida e Nalbert Santos

# Introdução 
Com o crescimento exponencial da internet e a popularização dos dispositivos móveis, as apostas online emergiram como uma atividade amplamente acessível e praticada. Esse setor movimenta bilhões de dólares anualmente e abrange uma ampla variedade de eventos, desde esportes até simulações computadorizadas. Contudo, as plataformas tradicionais são majoritariamente centralizadas, gerando dependência de intermediários e potencial para manipulação ou restrições regulatórias por governos.

Diante desse cenário, o projeto “BET Distribuída” propôs desenvolver uma alternativa disruptiva, utilizando tecnologia de ledger distribuído (blockchain). O objetivo foi criar um sistema descentralizado de apostas online que elimina intermediários, aumentando a confiabilidade, segurança e transparência das transações, mesmo em cenários de regulamentação adversa.

A solução desenvolvida implementa funcionalidades que permitem o cadastro de eventos, realização de apostas e distribuição de resultados com total integridade e descentralização. Para alcançar esses objetivos, o sistema foi desenvolvido na linguagem Java, utilizando a tecnologia blockchain para assegurar a transparência das transações e o registro seguro dos eventos.

Os principais resultados incluem um sistema funcional capaz de gerenciar eventos em tempo real, realizar apostas de forma descentralizada e atualizar automaticamente os saldos dos usuários com base nos resultados. Esse sistema, acompanhado de documentação técnica robusta, reforça o potencial da tecnologia blockchain para transformar o mercado de apostas online e atender às demandas de usuários e regulamentadores por soluções mais confiáveis e acessíveis.

# Fundamentação Teórica
O blockchain é uma tecnologia revolucionária que ganhou destaque nos últimos anos como uma solução para problemas de transparência, segurança e descentralização em sistemas de armazenamento e transação de dados. Originalmente introduzido em 2008 como a infraestrutura subjacente do Bitcoin, o blockchain evoluiu para um paradigma multifacetado, utilizado em diversas áreas, incluindo fintech, supply chain, saúde e, neste caso, apostas online descentralizadas.
## Conceito e Estrutura do Blockchain
O blockchain, ou cadeia de blocos, é um tipo de banco de dados distribuído que registra transações de forma imutável em blocos interligados. Cada bloco contém um conjunto de transações validadas, um timestamp, e uma referência ao bloco anterior por meio de um hash criptográfico. Esta estrutura sequencial e encadeada garante a integridade e a segurança dos dados armazenados.

As principais camadas que compõem um sistema blockchain incluem:
### 1. Camada de Rede: 
Responsável pela comunicação entre os nós da rede, permitindo o compartilhamento e sincronização das informações.
### 2. Camada de Consenso: 
Define o método pelo qual os participantes da rede concordam sobre o estado do ledger. Protocolos como Proof of Work (PoW), Proof of Stake (PoS) e Proof of Authority (PoA) são exemplos de mecanismos de consenso.
### 3. Camada de Dados: 
Armazena as informações registradas na forma de blocos encadeados.
### 4. Camada de Aplicativos: 
Facilita a interação com a blockchain por meio de interfaces gráficas ou APIs, permitindo o desenvolvimento de aplicações descentralizadas (dApps).

## Características Principais
### 1. Descentralização:
Em vez de depender de uma entidade central, o blockchain opera em uma rede distribuída de nós, cada um mantendo uma cópia do ledger. Essa estrutura aumenta a resiliência e a segurança do sistema.
### 2.Imutabilidade:
Uma vez que uma transação é registrada e validada, ela não pode ser alterada ou removida. Essa propriedade é garantida pelos algoritmos criptográficos e pela natureza sequencial dos blocos.
### 3. Transparência:
Qualquer pessoa pode visualizar as transações em blockchains públicas, aumentando a confiança no sistema. Em blockchains privadas, o acesso é restrito a participantes autorizados.
### 4. Segurança:
A utilização de criptografia assimétrica protege os dados e garante a autenticação das transações. Além disso, os mecanismos de consenso previnem ataques como o "double spending".
### 5. Programabilidade:
Smart contracts, ou contratos inteligentes, permitem a automação de transações e processos sem a necessidade de intermediários. Esses contratos são programas que são executados automaticamente quando as condições predefinidas são atendidas.

## Funcionamento do Blockchain
O processo básico de funcionamento do blockchain pode ser descrito em quatro etapas principais:
### 1. Início da Transação: 
Um usuário inicia uma transação que é transmitida para a rede.
### 2. Validação: 
Os nós verificam a transação usando as regras do protocolo e validam se é legítima.
### 3. Criação de Bloco: 
Transações validadas são agrupadas em um bloco que inclui um hash do bloco anterior.
### 4. Adicionando o Bloco: 
O bloco é adicionado à cadeia e replicado em todos os nós da rede, atualizando o estado do ledger.

## Aplicabilidade em Sistemas de Apostas Online
A aplicação do blockchain em sistemas de apostas online, como o desenvolvido para este projeto, aborda desafios críticos associados a modelos tradicionais:
### 1. Eliminação de Intermediários: 
A descentralização remove a necessidade de casas de apostas, reduzindo custos e aumentando a eficiência.
### 2. Confiabilidade: 
O registro imutável das transações garante que os resultados e os pagamentos sejam transparentes e verificáveis.
### 3. Mitigação de Bloqueios: 
A resistência à censura permite operações mesmo em ambientes regulatórios rigorosos.

# Metodologia 
O desenvolvimento do sistema de apostas online descentralizado foi conduzido utilizando a linguagem de programação Java e frameworks específicos relacionados ao blockchain, como o Web3 e ferramentas auxiliares como Ganache. Esta seção descreve detalhadamente a abordagem metodológica, abrangendo a arquitetura, os algoritmos e as técnicas empregadas.
## Ferramentas e Ambientes
A seguir temos as ferramentas e ambientes de desenvolvimento que foram utilizados ao longo do projeto para que fosse possível a realização do mesmo de forma eficiente
### 1. Ganache: 
Utilizado para simular uma blockchain local e testar contratos inteligentes de maneira eficiente.
### 2. Web3j: 
Biblioteca para integração do backend com a blockchain Ethereum, simplificando a manipulação de contratos e transações.
### 3. IDE IntelliJ: 
Ambiente principal de desenvolvimento, escolhido por sua compatibilidade com Java e suporte a ferramentas de integração.
### 4. GitHub: 
Repositório utilizado para versionamento de código, colaboração entre desenvolvedores e documentação do projeto.

## Arquitetura do Sistema
A arquitetura do sistema foi projetada com base no modelo cliente-servidor distribuído, em que cada nó da rede atua como um participante independente capaz de interagir diretamente com o ledger distribuído. Os principais componentes incluem:
### 1. Frontend: 
A interface do usuário foi desenvolvida utilizando tecnologias compatíveis com integração a APIs Web3, garantindo uma interação amigável e intuitiva com o sistema. O frontend é responsável por permitir o cadastro de eventos, visualização de odds, realização de apostas e consulta aos resultados de forma prática e eficiente.
### 2. Backend: 
Implementado em Java, o backend gerencia a lógica de negócios central do sistema. Ele é responsável por validar entradas do usuário, interagir com os contratos inteligentes e assegurar que todas as operações sigam as regras definidas no protocolo. A modularidade do backend permite fácil manutenção e expansão futura.
### 3. Blockchain Local: 
O Ganache foi utilizado para criar uma blockchain local, permitindo um ambiente de testes seguro e controlado. Essa blockchain local simula o comportamento de uma rede real, possibilitando a execução de cenários variados durante o desenvolvimento.

## Algoritmos e Técnicas Utilizadas
### 1. Contratos Inteligentes: 
Desenvolvidos em Solidity, os contratos inteligentes são a base da lógica operacional do sistema. Eles controlam funcionalidades como cadastro de eventos, registro de apostas, cálculo de prêmios e distribuição de fundos. Os contratos foram implementados com foco em segurança e eficiência, utilizando práticas recomendadas para evitar vulnerabilidades comuns, como reentrância e overflow.
### 2. Gerenciamento de Transações: 
A comunicação entre a interface do usuário e a blockchain foi facilitada por APIs Web3, que permitem a criação, assinatura e envio de transações de forma segura. O uso de bibliotecas como Web3j no backend permitiu a integração robusta entre o Java e os contratos inteligentes.
### 3. Cálculo de Odds Dinâmicas: 
Foi implementado um algoritmo avançado que ajusta as odds automaticamente com base no volume de apostas e na distribuição de valores entre os resultados possíveis. Esse algoritmo opera em tempo real, garantindo transparência e mantendo o equilíbrio financeiro do sistema.
### 4. Validação e Segurança: 
Técnicas de validação criptográfica, como assinaturas digitais, foram empregadas para autenticar transações e proteger a integridade dos dados. Além disso, medidas adicionais, como logs auditáveis e rastreamento de transações, aumentaram a confiabilidade do sistema.

## Processo de Desenvolvimento
O desenvolvimento foi conduzido em etapas. Cada ciclo envolveu planejamento detalhado, implementação de funcionalidades, integração e revisões contínuas. Essa abordagem permitiu adaptações rápidas a novas necessidades e garantiu a entrega de um sistema robusto e funcional.

# Resultados
Para validar o o funcionamento e o resultado final do sistema, foram realizados testes abrangentes, cobrindo cada um dos tópicos apresentados no planejamento:
### 1. Contas:
Foi testada a capacidade do sistema de criar, gerenciar e autenticar contas de usuários, além de suportar depósitos e saques. O sistema funcionou conforme o esperado, garantindo que os usuários pudessem gerenciar seus fundos com segurança.
### 2. Eventos: 
Avaliou-se se administradores eram capazes de criar e listar eventos. Durante os testes, foi possível cadastrar eventos com sucesso, e todos foram listados corretamente na interface do sistema.
### 3. Apostas: 
Testou-se a funcionalidade de realização de apostas, verificando se os usuários só podiam apostar com crédito suficiente. Os registros foram feitos de forma transparente na blockchain, e não ocorreram inconsistências.
### 4. Simulação: 
Checamos se o sistema suporta simulações de eventos em tempo real. O teste demonstrou que a lógica de simulação operou corretamente, exibindo resultados baseados nos parâmetros configurados.
### 5. Odds: 
Verificou-se a atualização dinâmica das odds com base nos critérios predefinidos. O algoritmo ajustou as odds em tempo real, mesmo com variações significativas no volume de apostas.
### 6. Contabilidade: 
Validou-se o cálculo de saldos após o encerramento de eventos. O sistema distribuiu os ganhos corretamente, atualizando os saldos de acordo com as regras definidas.
### 7. Publicação: 
Avaliou-se a exibição pública dos resultados. Os dados históricos foram acessíveis e apresentaram consistência e clareza.

## Resultados Obtidos
Os testes demonstraram que o sistema está funcional e atende aos requisitos planejados. As funcionalidades principais foram validadas com sucesso, com destaque para a confiabilidade do registro de transações na blockchain e a robustez do algoritmo de odds dinâmicas. A interface do usuário apresentou um desempenho satisfatório, permitindo interações fluidas e sem erros.

## Discussão sobre Falhas
Apesar dos resultados positivos, algumas falhas foram observadas:
### Interface de Usuário: 
Alguns elementos da interface apresentaram lentidão ao carregar dados em redes com alta latência. Isso sugere a necessidade de otimização da integração frontend-backend.
### Simulação em Grande Escala: 
Durante simulações com um grande número de eventos simultâneos, o desempenho do sistema foi impactado, evidenciando um ponto de melhoria em relação à escalabilidade.
### Documentação: 
Embora a documentação esteja clara, identificamos áreas onde mais exemplos práticos poderiam ser adicionados para facilitar a compreensão por novos desenvolvedores.

# Conclusão
O projeto de desenvolvimento de um sistema de apostas online descentralizado baseado em tecnologia blockchain representou um esforço significativo para unir conceitos avançados de tecnologia a uma aplicação prática. Ao longo do processo, foi possível implementar um sistema funcional que elimina intermediários, garante transparência e mitiga bloqueios governamentais, utilizando frameworks como Web3 e ferramentas como Ganache para simulação e testes.

Apesar dos avanços realizados, algumas áreas poderiam ser exploradas com maior profundidade. Por exemplo, a otimização da escalabilidade do sistema para suportar um volume massivo de transações e a implementação de mecanismos mais avançados de análise de dados para aprimorar a experiência do usuário. Esses pontos representam oportunidades para trabalhos futuros e possíveis expansões do projeto.

A experiência proporcionada pelo desenvolvimento do sistema permitiu um aprendizado valioso. Foi possível compreender na prática como os conceitos teóricos de blockchain, como contratos inteligentes e descentralização, se aplicam ao mundo real. Além disso, a integração de diferentes ferramentas e frameworks ampliou as habilidades técnicas da equipe, especialmente no uso de tecnologias voltadas para redes distribuídas.

Esse aprendizado pode ser amplamente aplicado em outros contextos. A tecnologia blockchain tem o potencial de transformar diversos setores, e as competências adquiridas durante este projeto oferecem uma base sólida para o desenvolvimento de soluções inovadoras em áreas diversas. Assim, o projeto não apenas alcançou seus objetivos iniciais, mas também preparou a dupla para futuros desafios tecnológicos.


