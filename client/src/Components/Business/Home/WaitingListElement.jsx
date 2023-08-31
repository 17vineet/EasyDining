import { useState } from 'react';
import './WaitingListElement.css';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const [name, setName] = useState('')
  const [loe, setLoe] = useState(['Hetvik', 'Shah', 'Nainesh'])
  function handleClick() {
    console.log('Changed')
    setLoe([...loe, name]);
    console.log(loe)
  }
  function handleChange(event) {
    setName(event.target.value)
  }
  function handleDelete(index) {
    console.log(index)
    const updatedList = loe.filter((_,ind) => index != ind)
    setLoe(updatedList)
    console.log(updatedList)
  }

  return (
    <>
      <h1>Hello World</h1>
      <input type='text' placeholder='Enter your name to reserve table' onChange={handleChange}></input>
      <button onClick={handleClick}>Add Element</button>
      {
        loe.map((ele, index) => {
          return (
            <>
              <div className='element' key={index}>
                <div className="name">{ele}</div>
                < button className='btn btn-primary' onClick={() => {
                  handleDelete(index)
                }} > Delete This Element</button >
              </div>
            </>)
        })}</>)
}
export default App;