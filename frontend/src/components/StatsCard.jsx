function StatsCard({ title, value, description }) {
  return (
    <div className="stats-card">
      <p className="stats-title">{title}</p>
      <h2>{value}</h2>
      <p className="stats-description">{description}</p>
    </div>
  );
}

export default StatsCard;