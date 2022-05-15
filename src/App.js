import './App.css';
import moment from 'moment';
import { useState } from 'react';
import Header from "./components/Header";
import Divider from '@mui/material/Divider';
import UserInputSection from './components/UserInputSection';
import SnapshotTable from './components/SnapshotTable';


function App() {

    const [input, setInput] = useState();

    return (
        <div className="App">
            <Header />

            <UserInputSection setUserInput={setInput} />

            <Divider textAlign="left">
                Snapshot for {input?.address ?? 'Invalid Address'} as of&nbsp;
                {moment.unix(input?.date).format("dddd, MMMM Do YYYY")}
            </Divider>

            <SnapshotTable input={input} />
        </div>
    );
}

export default App;
