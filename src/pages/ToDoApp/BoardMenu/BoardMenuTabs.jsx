import React, {useEffect} from 'react';
import ChangeBoardBGImage from './ChangeBoardBGImage';
import ChangeBoardBGColor from './ChangeBoardBGColor';
import { MdClose } from "react-icons/md";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './BoardMenu.sass';

export default function BoardMenuTabs({backgroundChange, setOpenBackgroundChange}) {
    useEffect(() => {
        console.count('rend2')
    }, [])

    return (
        <div className={backgroundChange ? "board-tab board-tab__open" : "board-tab"}>
            <Tabs>
                <TabList className="board-tab__nav">
                    <Tab className="board-tab__link">Image</Tab>
                    <Tab className="board-tab__link">Color</Tab>
                    <MdClose className="board-tab__close"  onClick={() => setOpenBackgroundChange(!backgroundChange)} />
                </TabList>

                <TabPanel className="board-tabcontent">
                    <ChangeBoardBGImage />
                </TabPanel>
                <TabPanel className="board-tabcontent">
                    <ChangeBoardBGColor />
                </TabPanel>
            </Tabs>
        </div>
    )
}
