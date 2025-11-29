const FinishScreen = ({ points, maxPossiblePoint, highScore, dispatch }) => {
  const percantage = (points / maxPossiblePoint) * 100;
  let emoji;

  if (percantage === 100) emoji = "🥇";
  if (percantage >= 100 && percantage < 100) emoji = "🎉";
  if (percantage >= 50 && percantage < 80) emoji = "😥";
  if (percantage >= 0 && percantage < 50) emoji = "😠";
  if (percantage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoint}({Math.ceil(percantage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart quiz
      </button>
    </>
  );
};

export default FinishScreen;
