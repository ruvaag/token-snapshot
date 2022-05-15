import './App.css';
import moment from 'moment';
import { useState } from 'react';
import Header from "./components/Header";
import Divider from '@mui/material/Divider';
import UserInputSection from './components/UserInputSection';
import SnapshotTable from './components/SnapshotTable';


function App() {

    const [input, setInput] = useState({
        "date": undefined,
        "address": undefined,
        "chainId": undefined,
        "chainName": undefined,
    });

    return (
        <div className="App">
            <Header />

            <UserInputSection setUserInput={setInput} />

            <Divider textAlign="left">
                Snapshot for <b>{input?.address ?? 'Invalid Address'}</b> on&nbsp;
                <b>{input?.chainName ?? 'Invalid Chain'}</b> as of&nbsp;
                <b>{moment.unix(input?.date).format("dddd, MMMM Do YYYY")}</b>
            </Divider>

            <SnapshotTable input={input} />
        </div>
    );
}

export default App;
