// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract BettingSystem {
    struct Event {
        uint id;
        string name;
        string[] outcomes;
        mapping(string => uint) odds; // Odds ajustadas
        mapping(string => uint) totalBets; // Total apostado em cada resultado
        bool finalized;
        string result;
        uint totalPool;
    }

    struct EventSummary {
        uint id;
        string name;
        bool finalized;
        uint totalPool;
    }

    struct Bet {
        uint eventId;
        string outcome;
        uint amount;
    }

    struct FinalizedEvent {
        uint id;
        string name;
        string result;
        uint totalPool;
    }

    uint public totalEvents;
    mapping(uint => address[]) public eventParticipants;
    mapping(uint => Event) public events;
    mapping(uint => FinalizedEvent) public finalizedEvents;
    mapping(address => uint) public balances;
    mapping(address => Bet[]) public userBets;

    uint public eventCounter;

    // Events
    event EventCreated(uint id, string name);
    event BetPlaced(address indexed user, uint eventId, string outcome, uint amount);
    event EventFinalized(uint id, string result);
    event Withdrawal(address indexed user, uint amount);
    event Deposit(address indexed user, uint amount);
    event ParticipantRegistered(address indexed participant, uint indexed eventId);
    event LogOddsUpdated(uint eventId, string outcome, uint odds);

    // Casa inicializa o contrato com 2 ETH para cada lado
    uint constant HOUSE_CONTRIBUTION = 2 ether;
    uint constant MARGIN_PERCENTAGE = 5; // Margem de 5%

    // Depósito de saldo
    function deposit() external payable {
        require(msg.value > 0, "Deposit must be greater than zero");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }



    // Criar novo evento
    function createEvent(string memory name, string[] memory outcomes) external {
        require(outcomes.length > 1, "Event must have at least two outcomes");

        Event storage newEvent = events[eventCounter];
        newEvent.id = eventCounter;
        newEvent.name = name;
        newEvent.outcomes = outcomes;
        newEvent.finalized = false;

        for (uint i = 0; i < outcomes.length; i++) {
            newEvent.odds[outcomes[i]] = 1.80e18; // Odds iniciais
            newEvent.totalBets[outcomes[i]] = HOUSE_CONTRIBUTION; // A casa contribui com 2 ETH
            newEvent.totalPool += HOUSE_CONTRIBUTION;
        }

        emit EventCreated(eventCounter, name);
        eventCounter++;
    }

    // Pegar todos os lados
    function getEventOutcomes(uint eventId) external view returns (string[] memory) {
        return events[eventId].outcomes;
    }

       // Função para retornar o nome do evento
    function getEventName(uint eventId) external view returns (string memory) {
        return events[eventId].name;
    }

    // Função para retornar as odds de um resultado específico
    function getEventOdds(uint eventId, string memory outcome) external view returns (uint) {
        return events[eventId].odds[outcome];
    }

    // Função para retornar o total apostado em um resultado específico
    function getEventTotalBets(uint eventId, string memory outcome) external view returns (uint) {
        return events[eventId].totalBets[outcome];
    }

    // Função para verificar se o evento está finalizado
    function isEventFinalized(uint eventId) external view returns (bool) {
        return events[eventId].finalized;
    }

    // Função para retornar o resultado de um evento finalizado
    function getEventResult(uint eventId) external view returns (string memory) {
        return events[eventId].result;
    }

    // Função para retornar o total do pool de um evento
    function getEventTotalPool(uint eventId) external view returns (uint) {
        return events[eventId].totalPool;
    }
    // Pegar dos os eventos IDS
    function getAllEventIds() external view returns (uint[] memory) {
        uint[] memory eventIds = new uint[](eventCounter);
        for (uint i = 0; i < eventCounter; i++) {
            eventIds[i] = events[i].id;
        }
        return eventIds;
    }

    // Pegar todos os eventos
    function getAllEvents() external view returns (EventSummary[] memory) {
        EventSummary[] memory allEvents = new EventSummary[](eventCounter);
        for (uint i = 0; i < eventCounter; i++) {
            Event storage currentEvent = events[i];
            allEvents[i] = EventSummary({
                id: currentEvent.id,
                name: currentEvent.name,
                finalized: currentEvent.finalized,
                totalPool: currentEvent.totalPool
            });
        }
        return allEvents;
    }

    

    function getUserInfo(address user) external view returns (uint balance, Bet[] memory bets) {
        return (balances[user], userBets[user]);
    }

    // Retorna a odd de um resultado específico em um evento    
    function getOdds(uint eventId, string memory outcome) public view returns (uint) {
        return events[eventId].odds[outcome];
    }

    // Apostar em um evento
function placeBet(uint256 eventId, string memory outcome, uint256 amount) external {
    require(amount > 0, "Bet amount must be greater than zero");

    Event storage bettingEvent = events[eventId];
    require(!bettingEvent.finalized, "Event is already finalized");
    require(balances[msg.sender] >= amount, "Insufficient balance");

    uint256 odd = bettingEvent.odds[outcome];
    require(odd > 0, "Invalid outcome");

    // Subtrair o valor da aposta do saldo do usuário
    balances[msg.sender] -= amount;

    // Atualizar o total apostado no resultado e o pool total do evento
    bettingEvent.totalBets[outcome] += amount;
    bettingEvent.totalPool += amount;

    // Registrar a aposta do usuário
    userBets[msg.sender].push(Bet(eventId, outcome, amount));

    // Registrar participante se ainda não estiver na lista
    bool isParticipant = false;
    for (uint i = 0; i < eventParticipants[eventId].length; i++) {
        if (eventParticipants[eventId][i] == msg.sender) {
            isParticipant = true;
            break;
        }
    }

    if (!isParticipant) {
        eventParticipants[eventId].push(msg.sender);
        emit ParticipantRegistered(msg.sender, eventId);
    }

    // Atualizar odds dinamicamente
    updateOdds(eventId);

    emit BetPlaced(msg.sender, eventId, outcome, amount);
}

// Update de odds dinamicamente 
function updateOdds(uint eventId) internal {
        Event storage bettingEvent = events[eventId];
        uint totalPool = bettingEvent.totalPool;

        uint totalBetsAcrossOutcomes = 0;
        for (uint i = 0; i < bettingEvent.outcomes.length; i++) {
            totalBetsAcrossOutcomes += bettingEvent.totalBets[bettingEvent.outcomes[i]];
        }

        // Adicionar margem da casa (exemplo: 5%)
        uint margin = 5; // Margem de 5%

        for (uint i = 0; i < bettingEvent.outcomes.length; i++) {
            string memory outcome = bettingEvent.outcomes[i];
            uint betsOnOutcome = bettingEvent.totalBets[outcome];

            if (betsOnOutcome > 0) {
                uint oddsRaw = (totalPool * 1e18) / betsOnOutcome;

                // Ajustar odds para incorporar a margem da casa
                uint adjustedOdds = (oddsRaw * (100 - margin)) / 100;

                // Garantir limites de odds (mínimo 1.01)
                if (adjustedOdds < 1.01e18) {
                    bettingEvent.odds[outcome] = 1.01e18;
                } else {
                    bettingEvent.odds[outcome] = adjustedOdds;
                }
            } else {
                // Definir odds altas para resultados sem apostas
                bettingEvent.odds[outcome] = 2e18;
            }

            emit LogOddsUpdated(eventId, outcome, bettingEvent.odds[outcome]);
        }
    }

    // Finalizar evento
    function finalizeEvent(uint eventId, string memory result) external {
        Event storage bettingEvent = events[eventId];
        require(!bettingEvent.finalized, "Event already finalized");

        bool isValidResult = false;
        for (uint i = 0; i < bettingEvent.outcomes.length; i++) {
            if (keccak256(bytes(bettingEvent.outcomes[i])) == keccak256(bytes(result))) {
                isValidResult = true;
                break;
            }
        }
        require(isValidResult, "Invalid result");

        bettingEvent.finalized = true;
        bettingEvent.result = result;

        uint totalPool = bettingEvent.totalPool;
        uint winningPool = bettingEvent.totalBets[result];

        if (winningPool > 0) {
            uint rewardPerUnit = (totalPool * 1e18) / winningPool;

            for (uint i = 0; i < eventParticipants[eventId].length; i++) {
                address participant = eventParticipants[eventId][i];

                for (uint j = 0; j < userBets[participant].length; j++) {
                    Bet storage userBet = userBets[participant][j];
                    if (userBet.eventId == eventId && keccak256(bytes(userBet.outcome)) == keccak256(bytes(result))) {
                        balances[participant] += (userBet.amount * rewardPerUnit) / 1e18;
                    }
                }
            }
        }

        finalizedEvents[eventId] = FinalizedEvent(eventId, bettingEvent.name, result, totalPool);
        emit EventFinalized(eventId, result);
    }

    // Sacar saldo
    function withdraw() external {
        uint amount = balances[msg.sender];

        balances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");

        emit Withdrawal(msg.sender, amount);
    }

    // Saldo depositado no contrato
    function getMyBalance() external view returns (uint) {
        return balances[msg.sender];
    }
}
