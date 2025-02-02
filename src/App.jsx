import React, { useState, useRef, useEffect } from 'react';

    const initialPlayerOptions = ['Blank', 'Terri', 'Blondie', 'Nadina', 'Ramon', 'Chico', 'Dude', 'Elliot', 'Sam', 'Marven', 'Other'];
    const initialRounds = 13;
    const numberOfPlayers = 7;

    const dominoIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" style={{verticalAlign: 'middle'}}>
        <rect width="17.47" height="35.91" x="15.27" y="6.04" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" rx=".9" transform="rotate(45 23.999 24)"/>
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m17.82 17.82l12.36 12.36"/>
        <circle cx="30.55" cy="17.45" r="2.98" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="21.85" cy="30.51" r="2.98" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="13.12" cy="30.51" r="2.98" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );

    const playerIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
        <path fill="currentColor" d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09c.016.016.032.016.032.032c.144.112.288.224.448.336c.08.048.144.111.224.175A8 8 0 0 0 8.016 16a8 8 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16c.144-.111.304-.223.448-.335c.016-.016.032-.016.032-.032c1.696-1.487 2.8-3.676 2.8-6.106m-8 7.001c-1.504 0-2.88-.48-4.016-1.279c.016-.128.048-.255.08-.383a4.2 4.2 0 0 1 .416-.991c.176-.304.384-.576.64-.816c.24-.24.528-.463.816-.639c.304-.176.624-.304.976-.4A4.2 4.2 0 0 1 8 10.342a4.18 4.18 0 0 1 2.928 1.166q.552.552.864 1.295q.168.432.24.911A7.03 7.03 0 0 1 8 14.993m-2.448-7.4a2.5 2.5 0 0 1-.208-1.024c0-.351.064-.703.208-1.023s.336-.607.576-.847s.528-.431.848-.575s.672-.208 1.024-.208c.368 0 .704.064 1.024.208s.608.336.848.575c.24.24.432.528.576.847c.144.32.208.672.208 1.023c0 .368-.064.704-.208 1.023a2.8 2.8 0 0 1-.576.848a2.8 2.8 0 0 1-.848.575a2.72 2.72 0 0 1-2.064 0a2.8 2.8 0 0 1-.848-.575a2.5 2.5 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.2 5.2 0 0 0-.688-1.406a4.9 4.9 0 0 0-1.088-1.135a5.2 5.2 0 0 0-1.04-.608a3 3 0 0 0 .464-.383a4.2 4.2 0 0 0 .624-.784a3.6 3.6 0 0 0 .528-1.934a3.7 3.7 0 0 0-.288-1.47a3.8 3.8 0 0 0-.816-1.199a3.9 3.9 0 0 0-1.2-.8a3.7 3.7 0 0 0-1.472-.287a3.7 3.7 0 0 0-1.472.288a3.6 3.6 0 0 0-1.2.815a3.8 3.8 0 0 0-.8 1.199a3.7 3.7 0 0 0-.288 1.47q0 .528.144 1.007c.096.336.224.64.4.927c.16.288.384.544.624.784q.216.216.48.383a5 5 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a5 5 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992C.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907"/>
      </svg>
    );

    const firstPlaceIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
        <path fill="currentColor" d="M16 3c-1.645 0-3 1.355-3 3c0 1.125.633 2.113 1.563 2.625L11.624 14.5L7.03 11.219A3 3 0 0 0 8 9c0-1.645-1.355-3-3-3S2 7.355 2 9c0 1.348.926 2.469 2.156 2.844L6 22v5h20v-5l1.844-10.156C29.074 11.469 30 10.348 30 9c0-1.645-1.355-3-3-3s-3 1.355-3 3c0 .871.367 1.668.969 2.219L20.375 14.5l-2.938-5.875A3 3 0 0 0 19 6c0-1.645-1.355-3-3-3m0 2c.563 0 1 .438 1 1s-.438 1-1 1s-1-.438-1-1s.438-1 1-1M5 8c.563 0 1 .438 1 1s-.438 1-1 1s-1-.438-1-1s.438-1 1-1m22 0c.563 0 1 .438 1 1s-.438 1-1 1s-1-.438-1-1s.438-1 1-1m-11 2.25l3.094 6.188l1.5.375l5-3.563L24.187 21H7.813l-1.406-7.75l5 3.563l1.5-.375zM8 23h16v2H8z"/>
      </svg>
    );

    const lastPlaceIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
        <path fill="currentColor" d="M0 256a256 256 0 1 0 512 0a256 256 0 1 0-512 0m240 80c0-8.8 7.2-16 16-16c45 0 85.6 20.5 115.7 53.1c6 6.5 5.6 16.6-.9 22.6s-16.6 5.6-22.6-.9c-25-27.1-57.4-42.9-92.3-42.9c-8.8 0-16-7.2-16-16zm-80 80c-26.5 0-48-21-48-47c0-20 28.6-60.4 41.6-77.7c3.2-4.4 9.6-4.4 12.8 0C179.6 308.6 208 349 208 369c0 26-21.5 47-48 47m207.6-208a32 32 0 1 1-64 0a32 32 0 1 1 64 0m-192-32a32 32 0 1 1 0 64a32 32 0 1 1 0-64"/>
      </svg>
    );

    function App() {
      const [players, setPlayers] = useState(Array(numberOfPlayers).fill('Blank'));
      const [scores, setScores] = useState(
        Array.from({ length: initialRounds }, () => 
          Array(numberOfPlayers).fill('')
        )
      );
      const [doubles, setDoubles] = useState(Array(initialRounds).fill(0));
      const [showDoublesModal, setShowDoublesModal] = useState(false);
      const [currentRound, setCurrentRound] = useState(null);
      const [currentPlayer, setCurrentPlayer] = useState(null);
      const [tempScore, setTempScore] = useState('');
      const [tempDoubles, setTempDoubles] = useState(0);
      const [playerOptions, setPlayerOptions] = useState(initialPlayerOptions);
      const [showNewPlayerInput, setShowNewPlayerInput] = useState(false);
      const [newPlayerName, setNewPlayerName] = useState('');
      const [scoreNotes, setScoreNotes] = useState(
        Array.from({ length: initialRounds }, () => 
          Array(numberOfPlayers).fill('')
        )
      );
      const [showPlayerOrderModal, setShowPlayerOrderModal] = useState(true);
      const [selectedPlayers, setSelectedPlayers] = useState([]);
      const doublesInputRef = useRef(null);
      const newPlayerInputRef = useRef(null);
      const playerOrderSelectRef = useRef(null);
      const [roundStartNotes, setRoundStartNotes] = useState([]);
      const [worstRound, setWorstRound] = useState(null);
      const [gameHistory, setGameHistory] = useState([]);
      const [gameState, setGameState] = useState('new');
      const [editScoreModal, setEditScoreModal] = useState(false);
      const [editScoreData, setEditScoreData] = useState(null);
      const [theme, setTheme] = useState({
        background: '#0a192f',
        text: '#e6f1ff',
        cardBackground: '#172a4a'
      });

      useEffect(() => {
        if (showDoublesModal && doublesInputRef.current) {
          doublesInputRef.current.focus();
        }
      }, [showDoublesModal]);

      useEffect(() => {
        if (showNewPlayerInput && newPlayerInputRef.current) {
          newPlayerInputRef.current.focus();
        }
      }, [showNewPlayerInput]);

      useEffect(() => {
        if (showPlayerOrderModal && playerOrderSelectRef.current) {
          playerOrderSelectRef.current.focus();
        }
      }, [showPlayerOrderModal]);

      const handleScoreChange = (e, roundIndex, playerIndex) => {
        const value = e.target.value;
        if (value === '' || !isNaN(value)) {
          const newScores = [...scores];
          newScores[roundIndex][playerIndex] = value;
          setScores(newScores);
        }
      };

      const handleScoreKeyDown = (e, roundIndex, playerIndex) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
          const scoreValue = e.target.value.trim();
          if (scoreValue !== '' && !isNaN(scoreValue)) {
            setTempScore(parseInt(scoreValue));
            setCurrentRound(roundIndex);
            setCurrentPlayer(playerIndex);
            setTempDoubles(0);
            setShowDoublesModal(true);
          }
        }
      };

      const handleScoreBlur = (e, roundIndex, playerIndex) => {
        const scoreValue = e.target.value.trim();
        if (scoreValue !== '' && !isNaN(scoreValue)) {
          setTempScore(parseInt(scoreValue));
          setCurrentRound(roundIndex);
          setCurrentPlayer(playerIndex);
          setTempDoubles(0);
          setShowDoublesModal(true);
        }
      };

      const handleScoreClick = (roundIndex, playerIndex, score) => {
        setEditScoreData({ roundIndex, playerIndex, score });
        setEditScoreModal(true);
      };

      const handleEditScoreSubmit = (newScore) => {
        const newScores = [...scores];
        newScores[editScoreData.roundIndex][editScoreData.playerIndex] = newScore;
        setScores(newScores);
        setEditScoreModal(false);
      };

      const handlePlayerChange = (index, newName) => {
        const newPlayers = [...players];
        newPlayers[index] = newName;
        setPlayers(newPlayers);
        
        const newScores = [...scores];
        for (let roundIndex = 0; roundIndex < initialRounds; roundIndex++) {
          newScores[roundIndex][index] = '';
        }
        setScores(newScores);

        if (newName === 'Other') {
          setShowNewPlayerInput(true);
          setCurrentPlayer(index);
        } else {
          setShowNewPlayerInput(false);
        }
      };

      const handleNewPlayerNameChange = (e) => {
        setNewPlayerName(e.target.value);
      };

      const handleNewPlayerSubmit = () => {
        if (newPlayerName.trim() !== '') {
          const newOptions = [...playerOptions, newPlayerName];
          setPlayerOptions(newOptions);
          const newPlayers = [...players];
          newPlayers[currentPlayer] = newPlayerName;
          setPlayers(newPlayers);
          setShowNewPlayerInput(false);
          setNewPlayerName('');
        }
      };

      const handleDoublesSubmit = () => {
        const doublesValue = tempDoubles || 0;
        const doublesPoints = doublesValue * 20;
        const totalScore = tempScore + doublesPoints;

        const newScores = [...scores];
        newScores[currentRound][currentPlayer] = totalScore.toString();
        setScores(newScores);

        const newDoubles = [...doubles];
        newDoubles[currentRound] = doublesValue;
        setDoubles(newDoubles);

        // Create score note
        const newNotes = [...scoreNotes];
        newNotes[currentRound][currentPlayer] = `${players[currentPlayer]}, ${tempScore} points, ${doublesValue} doubles`;
        setScoreNotes(newNotes);

        setShowDoublesModal(false);
      };

      const handleDoublesKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
          e.preventDefault();
          handleDoublesSubmit();
        }
      };

      const handleNewPlayerKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
          e.preventDefault();
          handleNewPlayerSubmit();
        }
      };

      const handlePlayerOrderSelect = (e, index) => {
        const selectedName = e.target.value;
        const newSelectedPlayers = [...selectedPlayers];
        newSelectedPlayers[index] = selectedName;
        setSelectedPlayers(newSelectedPlayers);
      };

      const handleStartGame = () => {
        setPlayers(selectedPlayers.filter(player => player !== 'Blank'));
        setShowPlayerOrderModal(false);
        setGameState('playing');

        // Create round start notes
        const newRoundStartNotes = Array.from({ length: initialRounds }, (_, index) => {
          const roundNumber = (index + 1) % initialRounds;
          const playerIndex = index % selectedPlayers.length;
          return `Round ${roundNumber === 0 ? 0 : roundNumber}: ${selectedPlayers[playerIndex]}`;
        });
        setRoundStartNotes(newRoundStartNotes);
      };

      const handleEndGame = () => {
        // Save game data to history
        const gameData = {
          id: Date.now(),
          date: new Date().toLocaleString(),
          players: selectedPlayers,
          scores: scores,
          doubles: doubles,
          roundStartNotes: roundStartNotes
        };
        setGameHistory([...gameHistory, gameData]);
        setGameState('ended');
      };

      const handleRestoreGame = () => {
        if (gameHistory.length > 0) {
          const lastGame = gameHistory[gameHistory.length - 1];
          setPlayers(lastGame.players);
          setScores(lastGame.scores);
          setDoubles(lastGame.doubles);
          setRoundStartNotes(lastGame.roundStartNotes);
          setShowPlayerOrderModal(false);
          setGameState('playing');
        }
      };

      const handleNewGame = () => {
        setPlayers(Array(numberOfPlayers).fill('Blank'));
        setScores(Array.from({ length: initialRounds }, () => Array(numberOfPlayers).fill('')));
        setDoubles(Array(initialRounds).fill(0));
        setScoreNotes(Array.from({ length: initialRounds }, () => Array(numberOfPlayers).fill('')));
        setSelectedPlayers([]);
        setRoundStartNotes([]);
        setShowPlayerOrderModal(true);
        setGameState('new');
      };

      const handleThemeChange = (property, color) => {
        setTheme({...theme, [property]: color});
      };

      const calculateTotals = () => {
        return players.map((_, playerIndex) => 
          scores.reduce((sum, round) => {
            const score = round[playerIndex];
            return sum + (score === '' ? 0 : parseInt(score));
          }, 0)
        );
      };

      const getRankings = () => {
        const totals = calculateTotals();
        const activePlayers = players.filter(player => player !== 'Blank');
        
        return activePlayers
          .map((player, index) => ({
            name: player,
            total: totals[index],
            index: index
          }))
          .sort((a, b) => a.total - b.total)
          .map((player, rank, array) => ({
            name: player.name,
            total: player.total,
            rank: rank + 1,
            isFirst: rank === 0,
            isLast: rank === array.length - 1
          }));
      };

      const getWorstRound = () => {
        let worst = null;
        let worstScore = -Infinity; // Changed to -Infinity to find the highest score
        
        for (let roundIndex = 0; roundIndex < initialRounds; roundIndex++) {
          for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
            const score = scores[roundIndex][playerIndex];
            if (score !== '' && !isNaN(score)) {
              const parsedScore = parseInt(score);
              if (parsedScore > worstScore) { // Changed to > to find the highest score
                worstScore = parsedScore;
                worst = {
                  player: players[playerIndex],
                  round: roundIndex,
                  score: parsedScore
                };
              }
            }
          }
        }
        return worst;
      };

      const getPlayerScoresPerRound = () => {
        const playerScores = {};
        players.forEach((player, playerIndex) => {
          if (player !== 'Blank') {
            playerScores[player] = scores.map((round, roundIndex) => {
              return {
                round: roundIndex,
                score: round[playerIndex] || 0
              };
            });
          }
        });
        return playerScores;
      };

      const getLongestWinningStreaks = () => {
        // Placeholder for longest winning streaks logic
        return {};
      };

      const getMostFrequentOpponents = () => {
        // Placeholder for most frequent opponents logic
        return {};
      };

      const rankings = getRankings();
      const worstRoundInfo = getWorstRound();
      const playerScoresPerRound = getPlayerScoresPerRound();
      const longestWinningStreaks = getLongestWinningStreaks();
      const mostFrequentOpponents = getMostFrequentOpponents();

      const getAvailableNames = (currentIndex) => {
        const usedNames = selectedPlayers.filter((_, i) => i !== currentIndex);
        return playerOptions.filter(name => !usedNames.includes(name) || name === selectedPlayers[currentIndex]);
      };

      const totals = calculateTotals();

      return (
        <div className="scoreboard-container">
          {gameState === 'new' && (
            <div className="modal">
              <div className="modal-content">
                <h3>Select Player Order</h3>
                {gameHistory.length > 0 && (
                  <button onClick={handleRestoreGame} style={{marginBottom: '10px'}}>Restore Game</button>
                )}
                {Array.from({ length: numberOfPlayers }).map((_, index) => (
                  <div key={index} style={{marginBottom: '10px'}}>
                    <label>Player {index + 1}: </label>
                    <select
                      value={selectedPlayers[index] || 'Blank'}
                      onChange={(e) => handlePlayerOrderSelect(e, index)}
                      ref={playerOrderSelectRef}
                    >
                      {getAvailableNames(index).map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                ))}
                <div className="modal-buttons">
                  <button onClick={handleStartGame}>Start Game</button>
                </div>
              </div>
            </div>
          )}
          {gameState !== 'new' && (
            <div className="scoreboard" style={{backgroundColor: theme.cardBackground, color: theme.text}}>
              <h1>
                {dominoIcon} Domino Scorekeeper {dominoIcon}
              </h1>
              {gameState === 'playing' && (
                <table>
                  <thead>
                    <tr>
                      <th>Rounds</th>
                      {players.map((player, index) => (
                        <th key={index} data-col={10}>
                          <div className="player-header">
                            <select
                              value={player}
                              onChange={(e) => handlePlayerChange(index, e.target.value)}
                              style={{backgroundColor: theme.cardBackground, color: theme.text}}
                            >
                              {getAvailableNames(index).map((name) => (
                                <option key={name} value={name}>{name}</option>
                              ))}
                            </select>
                            <span>{player === 'Blank' ? '' : player} {player !== 'Blank' && player !== 'Other' && playerIcon}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((round, roundIndex) => (
                      <tr key={roundIndex}>
                        <td>Round {roundIndex}</td>
                        {players.map((player, playerIndex) => (
                          <td key={playerIndex}>
                            {players[playerIndex] !== 'Blank' && (
                              <>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={scores[roundIndex][playerIndex]}
                                  onChange={(e) => handleScoreChange(e, roundIndex, playerIndex)}
                                  onKeyDown={(e) => handleScoreKeyDown(e, roundIndex, playerIndex)}
                                  onBlur={(e) => handleScoreBlur(e, roundIndex, playerIndex)}
                                  style={{backgroundColor: theme.cardBackground, color: theme.text}}
                                />
                                {scoreNotes[roundIndex][playerIndex] && (
                                  <div style={{fontSize: '0.8em', color: '#94a3b8', textAlign: 'center'}}>
                                    {scoreNotes[roundIndex][playerIndex]}
                                    {doubles[roundIndex] > 0 && <span>&#8645;</span>}
                                  </div>
                                )}
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="total-row" style={{color: theme.text}}>
                      <td>Total</td>
                      {totals.map((total, index) => (
                        <td key={index}>{players[index] !== 'Blank' ? total : ''}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          )}

          {gameState !== 'new' && (
            <div className="rankings" style={{backgroundColor: theme.cardBackground, color: theme.text}}>
              <h2>Rankings</h2>
              <ol>
                {rankings.map((player) => (
                  <li key={player.name}>
                    {player.rank}. {player.name} - {player.total} points {player.isFirst && firstPlaceIcon} {player.isLast && lastPlaceIcon}
                  </li>
                ))}
              </ol>
              <div style={{marginTop: '20px'}}>
                <h3>Rounds:</h3>
                {roundStartNotes.map((note, index) => (
                  <div key={index} style={{fontSize: '0.9em', color: '#94a3b8'}}>
                    {note}
                  </div>
                ))}
              </div>
              {worstRoundInfo && (
                <div style={{marginTop: '20px'}}>
                  <h3>Worst Round:</h3>
                  <div style={{fontSize: '0.9em', color: '#94a3b8'}}>
                    {worstRoundInfo.player}, Round {worstRoundInfo.round}, {worstRoundInfo.score} points
                  </div>
                </div>
              )}
              {gameState === 'playing' && (
                <div style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
                  <button onClick={handleEndGame} style={{backgroundColor: theme.cardBackground, color: theme.text}}>End Game</button>
                </div>
              )}
              {gameState === 'ended' && (
                <div style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
                  <button onClick={handleNewGame} style={{backgroundColor: theme.cardBackground, color: theme.text}}>New Game</button>
                </div>
              )}
            </div>
          )}

          {showDoublesModal && (
            <div className="modal">
              <div className="modal-content" style={{backgroundColor: theme.cardBackground, color: theme.text}}>
                <h3>Enter Doubles for Round {currentRound + 1}</h3>
                <input
                  type="number"
                  value={tempDoubles}
                  onChange={(e) => setTempDoubles(parseInt(e.target.value) || 0)}
                  onKeyDown={handleDoublesKeyDown}
                  ref={doublesInputRef}
                  inputMode="numeric"
                />
                <div className="modal-buttons">
                  <button onClick={handleDoublesSubmit} style={{backgroundColor: theme.cardBackground, color: theme.text}}>OK</button>
                </div>
              </div>
            </div>
          )}

          {showNewPlayerInput && (
            <div className="modal">
              <div className="modal-content" style={{backgroundColor: theme.cardBackground, color: theme.text}}>
                <h3>Enter New Player Name</h3>
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={handleNewPlayerNameChange}
                  onKeyDown={handleNewPlayerKeyDown}
                  ref={newPlayerInputRef}
                />
                <div className="modal-buttons">
                  <button onClick={handleNewPlayerSubmit} style={{backgroundColor: theme.cardBackground, color: theme.text}}>OK</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default App;
