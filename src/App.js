import './style/App.css';
import Counter from "./componets/Counter";
import InputValue from "./componets/InputValue";
import FetchData from "./componets/FetchData";
import PostData from "./componets/PostData";


function App() {



    return (
        <div className="container">
            <FetchData title={"Список ToDo"}/>
            <PostData/>
        </div>
    );
}

export default App;
