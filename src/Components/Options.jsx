import { useQuestions } from "../Contexts/QuestionsContext";

const Options = () => {
  const { question, dispatch, answer } = useQuestions();
  const hasAnswered = answer !== null;
  // console.log("question", question);
  const objectFromArray = question.options.replace(/^{|}$/g, "").split(","); // SubaBaseden {} seklinde gelirdi deye etdin yadda saxla
  // console.log(arrOption, "arroptio");

  return (
    <div>
      <div className="options">
        {objectFromArray.map((option, index) => (
          <button
            className={`btn btn-option  ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={hasAnswered}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Options;
