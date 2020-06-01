import React from "react";
import ReactDOM from "react-dom";


interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  name: string;
  exerciseCount: number;
  description: string;
}

interface CoursePartOne extends CoursePartBaseWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface MyCoursePartFour extends CoursePartBaseWithDescription {
  name: "React with types";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePartFour;


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <>
          <b>{part.name}</b>, exercises: {part.exerciseCount} <br/>
          Description: {part.description}
        </>
      )
      case "React with types":
        return (
          <>
            <b>{part.name}</b>, exercises: {part.exerciseCount} <br/>
            Description: {part.description}
          </>
        )
    case "Deeper type usage":
      return (
        <>
          <b>{part.name}</b>, exercises: {part.exerciseCount} <br/>
          Description: {part.description} <br/>
          Submission link: {part.exerciseSubmissionLink}
        </>
      )
    case "Using props to pass data":
      return (
        <>
          <b>{part.name}</b>, exercises: {part.exerciseCount} <br/>
          Group projects: {part.groupProjectCount}
        </>
      )
    default:
      return assertNever(part);
  }
};

const Content: React.FC<{ parts: Array<CoursePart>}> = ({ parts }) => (
    <>
    {parts.map((part, i) => (
      <p key={i}>
        <Part part={part}/>
      </p>
    ))}
    </>
);

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Total: React.FC<{ exerciseCount: number }> = ({ exerciseCount }) => (
  <p>
    Number of exercises {exerciseCount}
  </p>
);

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "React with types",
      exerciseCount: 13,
      description: "React + TypeScript"
    }
  ];

  const totalExercises = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount, 0
  )

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts}/>
      <Total exerciseCount={totalExercises}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));