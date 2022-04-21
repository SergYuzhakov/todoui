import './style/App.css';
import Counter from "./componets/Counter";
import InputValue from "./componets/InputValue";
import FetchData from "./componets/FetchData";
import PostData from "./componets/PostData";
import PostDataUseForm from "./componets/PostDataUseForm";
import ModalPostData from "./componets/ModalPostData";


function App() {

    return (
        <div className="container">
            <FetchData title={"Список ToDo"}/>
            <ModalPostData/>
        </div>
    );
}

export default App;
