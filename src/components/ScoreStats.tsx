import { Score } from '../types';

interface ScoreProps {
  score: Score;
}
const ScoreStats = ({ score }: ScoreProps) => {
  return (
    <div className="d-flex flex-row justify-content-center gap-3">
      <p>
        Correct: <span className="text-success fw-bold">{score.correct}</span>
      </p>
      <p>
        Incorrect:{' '}
        <span className="text-danger fw-bold">{score.incorrect}</span>
      </p>
    </div>
  );
};

export default ScoreStats;
