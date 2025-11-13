const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => {
  const { name, exercises } = props.part;
  console.log(name, exercises);

  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = (props) => {
  const {total} = props;
  return(
    <p>There is {total} exercises</p>
  )
}

const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((acc, current) => acc + current.exercises, 0)}/>
    </div>
  )
}

export default Course;