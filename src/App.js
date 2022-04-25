import './style/App.css';

import ModalPostData from "./componets/ModalPostData";
import FetchPageableData from "./componets/FetchPageableData";


function App() {
    // <FetchData title={"Список ToDo"}/>
    return (
        <div className="container">
            <FetchPageableData title={"Список ToDo"}/>
            <ModalPostData/>
        </div>
    );
}

export default App;
