import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  } 

  const average = (props.good - props.bad) / total;
  const positive = (props.good / total) * 100;
  return (
    <>
      <h1>statistics</h1>
      <StatisticsLine text={`good: ${props.good}`} />
      <StatisticsLine text={`neutral: ${props.neutral}`} />
      <StatisticsLine text={`bad: ${props.bad}`} />
      <StatisticsLine text={`all: ${total}`} />
      <StatisticsLine text={`average: ${average}`} />
      <StatisticsLine text={`positive: ${positive} %`} />
    </>
  );
}

const StatisticsLine = (props) => (
  <p>{props.text}</p>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <main>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </main>
  )
}

export default App