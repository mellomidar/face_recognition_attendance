import '../App.css'
import Axios from "axios";
import React, { useEffect, useState } from "react";
import DynamicTable from '../components/DynamicTable';

function CrudEmployee () {

    const [data, setData] = useState(null);
    
    useEffect(() => {
        Axios.get("http://localhost:5000/api/employee_list")
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div className="crud-window subwindow">
            <DynamicTable data={data}/>
        </div>
    );
}

export default CrudEmployee;