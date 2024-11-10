import { ReactNode, useContext } from "react";
import { MenuContext } from "./Menu";

type MenuItemProps = {
  title: string;
  component: ReactNode;
  delButton:boolean;    //Al ítem le pasamos un booleano para saber si es un elemento eliminable o no
  setSelectedGames:(title:string[]) => void;
  selectedGames:string[];
  // delGame:(gameName:string)=>void;
};

export default function MenuItem({ title, component, delButton, setSelectedGames,selectedGames }: MenuItemProps) {
  // , delButton,delGame
  const { active, setActive } = useContext(MenuContext);

  function handleClick() {
    if (active?.includes(title)) {
      setActive(active.filter((s:string)=>s!==title));
    }
    else{
      setActive([...active,title]);
    }
    
  }
  
  function handleDel() {
    
    if (selectedGames.includes(title)) {
      console.log("Juego des-selecionado ");
      setSelectedGames([...selectedGames.filter((v)=>v!==title)]);
    }
    else{
      console.log("Juego selecionado");
      setSelectedGames([...selectedGames,title]);
    }

    
  }

  // const titleComponent = <div onClick={handleClick}>{title}</div>;

  const delButtonComponent=delButton?<input type="checkbox" onChange={()=> handleDel()} />:<></>;

  return (
    <li>
      {/* {titleComponent} */}
      {delButtonComponent}
      
      <div style={{backgroundColor:active?.includes( title )? "lightyellow" : "white",width:"10%"}} onClick={handleClick}>{title}</div>
      
      <div
        style={{
          display: active?.includes( title )? "block" : "none",
        }}
      >
        {component}
      </div>
      
    </li>
  );
}
