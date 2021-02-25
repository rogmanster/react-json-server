import React, { useReducer, useState } from "react";

const formData = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  };
};

function AddFighter() {
  const [submit, setSubmit] = useState(false);
  const [data, dataForm] = useReducer(formData, {});

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 3000);

    console.log(data);

    fetch("http://localhost:5000/fighters", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    dataForm({
      name: event.target.name,
      value: event.target.value
    });
  };

  return (
    <div className="container">
      <h2>Add Fighters</h2>
      {submit && <h4>Submitting...</h4>}
      <form onSubmit={handleSubmit}>
        <fieldset>
          You are submitting the following:
          <ul>
            {Object.entries(data).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>: {value.toString()}
              </li>
            ))}
          </ul>
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange} />
            <p>Team</p>
            <input name="team" onChange={handleChange} />
            <p>Weight</p>
            <input name="weight" onChange={handleChange} />
            <p>Image</p>
            <input name="image" onChange={handleChange} />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddFighter;
