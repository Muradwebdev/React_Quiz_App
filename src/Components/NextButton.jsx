import { useQuestions } from "../Contexts/QuestionsContext";

const NextButton = () => {
  const { dispatch, answer, countQuestions, index } = useQuestions();
  if (answer === null) return null;
  if (index !== countQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        NextButton
      </button>
    );
  if (index === countQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "FinishQuestion" })}
      >
        Finished
      </button>
    );
  }
};

export default NextButton;
