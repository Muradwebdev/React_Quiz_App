import { useEffect } from "react";
import { useQuestions } from "../Contexts/QuestionsContext";

const Timer = () => {
  const { secondRemaining, dispatch, status } = useQuestions();
  const mins = Math.floor(secondRemaining / 60);
  const seconds = Math.floor(secondRemaining % 60);
  useEffect(() => {
    if (status !== "active") return;
    if (secondRemaining === 0) return;
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch, status, secondRemaining]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
