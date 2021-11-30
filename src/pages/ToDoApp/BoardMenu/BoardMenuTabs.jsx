import React, {useState} from 'react';
import ChangeBoardBackground from './ChangeBoardBGImage';
import ChangeBoardBGColor from './ChangeBoardBGColor';
import { MdClose } from "react-icons/md";
import './BoardMenu.sass';

export default function Tabs({backgroundChange, setOpenBackgroundChange}) {
    const [ active, setActive ] = useState(0);

    const TabContent = ({ title, content }) => (
        <div className="tabcontent">
            {content}
        </div>
    );    
    console.log()

    const changeImage = () => {
        return (
            <ChangeBoardBackground backgroundChange={backgroundChange} />
        )
    }

    const changeColor = () => {
        return (
            <ChangeBoardBGColor />
        )
    }

    const items = [
        { title: 'Image', content: changeImage() },
        { title: 'Color', content: changeColor() },
      ];

    

    const openTab = e => setActive(+e.target.dataset.index);

    return (
        <div className={backgroundChange ? "board-tab board-tab__open" : "board-tab"}>
            <div className="board-tab__nav">
                {
                    items.map((n, i) => (
                        <button
                            key={i}
                            className={`board-tab__link ${i === active ? 'active' : ''}`}
                            onClick={openTab}
                            data-index={i}
                        >{n.title}</button>
                    ))
                }
                <MdClose className="board-tab__close"  onClick={() => setOpenBackgroundChange(!backgroundChange)} />
            </div>
            {items[active] && <TabContent {...items[active]} />}
        </div>
    );
}
