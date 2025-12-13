import { useQuestions } from "../Contexts/QuestionsContext";
import Options from "./Options";

const Question = () => {
  const { questions, index } = useQuestions();
  return (
    <div>
      <h4>{questions[index].questions}</h4>
      <Options />
    </div>
  );
};

export default Question;
