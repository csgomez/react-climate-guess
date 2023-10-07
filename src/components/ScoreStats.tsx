import { Score } from '../types';

interface ScoreProps {
  score: Score;
}
const ScoreStats = ({ score }: ScoreProps) => {
  return (
    <div className="d-inline-block mx-auto text-start">
      <p>
        Correct: <span className="text-success">{score.correct}</span>
      </p>
      <p>
        Incorrect: <span className="text-danger">{score.incorrect}</span>
      </p>
    </div>
  );
};

export default ScoreStats;
