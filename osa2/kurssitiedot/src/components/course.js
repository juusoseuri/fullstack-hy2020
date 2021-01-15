import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h1>{props.courseName}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part name={props.name} exercises={props.exercises}/>
      </div>
    )
  }
  
  const Total = (props) => {
    const { course } = props
    const total = course.parts.reduce(function(sum, part) {
      return sum + part.exercises
    }, 0)
  
    return (
      <div>
        <h4>total of exercises {total}</h4>
      </div>
    )
  }
  
  const Course = (props) => {
    const { course } = props
  
    return (
      <div>
        <Header courseName={course.name}/>
        {course.parts.map(parts =>
        <dl key={parts.id}>
          <Content name={parts.name} exercises={parts.exercises}/>
        </dl>
        )}
        <Total course={course}/>
      </div>
    )
  }

  export default Course