import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionContext = createContext();

let SECS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: Number(localStorage.getItem("score") || 0),
  secondRemaining: null,
};

const reduce = (state, action) => {
  switch (action.type) {
    case "dataReceived": {
      return { ...state, questions: action.payload, status: "ready" };
    }
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "FinishQuestion":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restartQuiz":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
};

const QuestionProvider = ({ children }) => {
  const [
    { questions, status, index, answer, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reduce, initialState);
  const countQuestions = questions.length;
  const maxPossiblePoint = questions.reduce((acc, cur) => {
    return acc + cur.points;
  }, 0);

  useEffect(() => {
    const supabaseUrl = "https://jckvofkhpofyglokqodr.supabase.co";
    const supabaseAnonKey = "sb_publishable_goVJFRvqpj2nXIWtZZcq3A_naigxCCD";

    fetch(`${supabaseUrl}/rest/v1/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("supabase", data);

        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((error) => dispatch({ type: "dataFailed", payload: error }));
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondRemaining,
        countQuestions,
        maxPossiblePoint,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestions = () => {
  const context = useContext(QuestionContext);

  if (context === undefined) {
    throw new Error("Questions yoxdur !!!");
  }
  return context;
};

export { QuestionProvider, useQuestions };
