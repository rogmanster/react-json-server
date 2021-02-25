import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Fighters() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch("http://localhost:5000/fighters")
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = (id) => {
    console.log(id);
    const res = fetch(`http://localhost:5000/fighters/${id}`, {
      method: "DELETE"
    });
    alert("deleted " + id);
    //We should control the response status to decide if we will change the state or not.
    /*   res.status === 200
      ? setData(data.filter((x) => x.id !== id))
      : alert("Error Deleting This Task"); */
  };

  const renderFighter = (fighter, index) => {
    return (
      <tr key={index}>
        <td>
          <img
            src={fighter.image}
            alt=""
            height="35"
            width="35"
            margin-left="auto"
            margin-right="auto"
          ></img>
        </td>
        <td>{fighter.name}</td>
        <td>{fighter.team}</td>
        <td>{fighter.weight}</td>
        <td>
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(fighter.id)}
          />
        </td>
      </tr>
    );
  };

  return (
    <div id="table-scroll">
      <table className="styled-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Team</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>{data.map(renderFighter)}</tbody>
      </table>
    </div>
  );
}

//  <Table striped className='container'>

export default Fighters;
