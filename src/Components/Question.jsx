import { useQuestions } from "../Contexts/QuestionsContext";
import Options from "./Options";

const Question = () => {
  const { question } = useQuestions();
  return (
    <div>
      <h4>{question.questions}</h4>
      <Options />
    </div>
  );
};

export default Question;
