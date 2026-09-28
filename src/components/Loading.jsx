// Skeleton cards shown while data loads.
export default function Loading({ count = 8 }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <div className="card skeleton" key={i}>
          <div className="poster" />
          <div className="card-body"><div className="line" /><div className="line short" /></div>
        </div>
      ))}
    </div>
  );
}
