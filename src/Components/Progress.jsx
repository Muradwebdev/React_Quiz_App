const Progress = ({
  countQuestions,
  index,
  points,
  maxPossiblePoint,
  answer,
}) => {
  return (
    <header className="progress">
      <progress max={countQuestions} value={index + Number(answer !== null)} />
      <p>
        Question
        <strong>
          {index + 1}/{countQuestions}
        </strong>
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoint}
      </p>
    </header>
  );
};

export default Progress;
