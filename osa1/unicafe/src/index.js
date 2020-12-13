import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <div>
    <h1>{props.content}</h1>
  </div>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const all = props.bad + props.neutral + props.good
  const average = props.rating / all
  const positive = props.good / all

  if (all === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td>neutral</td> 
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td> all </td>
          <td> {all}</td>
        </tr>
        <tr>
          <td> average </td>
          <td> {average}</td>
        </tr>
        <tr>
          <td> positive </td>
          <td> {positive*100}%</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const header1 = 'give feedback'
  const header2 = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [rating, setRating] = useState(0)

  const handleBadClick = () => {
    setBad(bad + 1)
    setRating(rating - 1)
  }

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleGoodClick = () => {
    setGood(good + 1)
    setRating(rating + 1)
  }

  return (
    <div>
      <Header content={header1}/>

      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>

      <Header content={header2}/>

      <Statistics good={good}
                  bad={bad}
                  neutral={neutral}
                  rating={rating}/>
    </div>
  )
 }

ReactDOM.render(<App />, 
  document.getElementById('root')
)