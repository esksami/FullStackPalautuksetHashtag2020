import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

interface ContentProps {
  parts: Array<{
    name: string;
    exerciseCount: number;
  }>;
}

const Content: React.FC<ContentProps> = ({ parts }) => (
    <>
    {parts.map((part, i) => (
      <p key={i}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
    </>
);

const Total: React.FC<{ exerciseCount: number }> = ({ exerciseCount }) => (
  <p>
    Number of exercises {exerciseCount}
  </p>
);

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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