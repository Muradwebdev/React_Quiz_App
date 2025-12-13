import { useQuestions } from "../Contexts/QuestionsContext";

const Progress = () => {
  const { index, countQuestions, points, maxPossiblePoint, answer } =
    useQuestions();
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
