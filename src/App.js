import './App.css';
import { useState } from 'react';
import Header from "./components/Header";
import UserInputSection from './components/UserInputSection';
import SnapshotTable from './components/SnapshotTable';
import SectionDivider from './components/SectionDivider';


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
            <SectionDivider input={input} />
            <SnapshotTable input={input} />
        </div>
    );
}

export default App;
