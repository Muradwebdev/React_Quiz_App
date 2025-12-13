import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QuestionProvider } from "./Contexts/QuestionsContext.jsx";

createRoot(document.getElementById("root")).render(
  <QuestionProvider>
    <App />
  </QuestionProvider>
);
