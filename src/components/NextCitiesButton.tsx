interface NextCitiesButtonProps {
  isWaitingForPlayer: boolean;
  onClick: () => void;
}

const NextCitiesButton = ({
  isWaitingForPlayer,
  onClick: handleClick,
}: NextCitiesButtonProps) => {
  // Button should appear disabled while waiting for user to choose a city
  const buttonStyle = isWaitingForPlayer
    ? 'btn-outline-light opacity-25'
    : 'btn-light';

  return (
    <div className="d-grid col-12 col-md-4 mx-auto">
      <button
        className={`btn ${buttonStyle}`}
        onClick={handleClick}
        disabled={isWaitingForPlayer}
        data-testid="next-button"
      >
        Next Cities
      </button>
    </div>
  );
};

export default NextCitiesButton;
