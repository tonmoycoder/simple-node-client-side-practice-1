import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    event.target.reset();
  };

  return (
    <div className="App">
      <h3 className="font_condensed ">Add new Actress</h3>
      <form onSubmit={handleChange}>
        <input type="text" name="name" id="two" placeholder="name" />
        <br /> <br />
        <input type="text" name="email" id="one" placeholder="email" />
        <br /> <br />
        <button className='button' type="submit">add actress</button>
      </form>
      <h2 className="font_condensed">Total actress:{users.length}</h2>
      <div className="container_actress">
        {users.map((user) => (
          <div className="font_sans details_actress" key={user.id}>
            <p> Actress Name : {user.name}</p> <p> Actress E-mail : {user.email}</p>{' '}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
