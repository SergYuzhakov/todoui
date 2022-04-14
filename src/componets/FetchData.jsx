import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "./Loader/Loader";
import Table from "./Table/Table";

const FetchData = ({title}) => {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/todo')
            .then(item => setData(item.data))
            .then(setLoading(false))


    }, []);

    return <div className="container">
        <h1 style={{textAlign: 'center'}}>{title}</h1>
        {
            isLoading ? <Loader/> : <Table data={data}/>
        }

    </div>
};
export default FetchData;