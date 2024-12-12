# Problema 3- BET Distribuída
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
### Eliminação de Intermediários: 
A descentralização remove a necessidade de casas de apostas, reduzindo custos e aumentando a eficiência.
### Confiabilidade: 
O registro imutável das transações garante que os resultados e os pagamentos sejam transparentes e verificáveis.
### Mitigação de Bloqueios: 
A resistência à censura permite operações mesmo em ambientes regulatórios rigorosos.



