import { ReactNode, useContext } from "react";
import { MenuContext } from "./Menu";

type MenuItemProps = {
  title: string;
  component: ReactNode;
  // delButton:boolean;
  // delGame:(gameName:string)=>void;
};

export default function MenuItem({ title, component }: MenuItemProps) {
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
  // function handleDel() {
  //   delGame(title);
  // }

  // const titleComponent = <div onClick={handleClick}>{title}</div>;

  // const delButtonComponent=delButton?<button onClick={handleDel}>Eliminar</button>:<div></div>;

  return (
    <li>
      {/* {titleComponent} */}
      <div style={{backgroundColor:active?.includes( title )? "lightyellow" : "white",width:"10%"}} onClick={handleClick}>{title}</div>
      {/* {delButtonComponent} */}
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
