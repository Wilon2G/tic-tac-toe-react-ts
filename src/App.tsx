import { useState } from "react";
import Config from "./Config";
import Game from "./Game";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import "./sass/main.scss"

export type Config = {
  gameName: string;
  rows: number;
  cols: number;
  target: number;
};

let gameNumber = 0;

function App() {
  const [games, setGames] = useState<Config[]>([]);

  const [selectedGames,setSelectedGames] = useState<string[]>([]);

  const addGame = (rows: number, cols: number, target: number) => {
    if (games.length==0) {
      //console.log("Juegos ha llegado a 0"); //Cuando se borran todos los jurgos, el contador de juegos se reinicia
      gameNumber=0;
    }
    gameNumber++;

    setGames([
      ...games,
      { rows, cols, target, gameName: `Game ${gameNumber}` },
    ]);
  };

  const delGame=(selectedGames:string[]) =>{
    //console.log("Eliminando juego: "+gameNames);
    
    setGames(games.filter((game:Config)=>!selectedGames.includes(game.gameName)));

    
    //console.log(games);
    setSelectedGames([]);
  }

  return (
    <>
    <button className="DeleteButton" onClick={()=>delGame(selectedGames)}>
        Delete Games
      </button>
    <Menu defaultActive={["Config"]}>
      <MenuItem
        key="config"
        title="Tic-Tac-Toe"
        component={<Config addGame={addGame}  />}
        delButton={false}  //Especificamos que config no es un elemento eliminable


        setSelectedGames={setSelectedGames}
        selectedGames={selectedGames}

        
      />
      {games.map((game) => (
        <MenuItem
          key={game.gameName}
          title={game.gameName}
          component={
            <Game rows={game.rows} cols={game.cols} target={game.target}  title={game.gameName}/> //delGame={delGame} Si queremos eliminar desde game
          }
          delButton={true}  //Especificamos que game sí es un elemento eliminable
          setSelectedGames={setSelectedGames}
          selectedGames={selectedGames}
        />
      ))}
    </Menu>
    </>
  );
}

export default App;
