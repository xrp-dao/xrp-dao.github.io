export default function Members() {
  return (
    <div className="container">
      <h3 className="mt-4">Membership Goal</h3>
      <h4>1 / 10,000</h4>
      <div className="row">
        <div className="col">
          <div
            className="progress"
            role="progressbar"
            aria-label="Animated striped example"
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: "75%" }}
            >
              75%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
