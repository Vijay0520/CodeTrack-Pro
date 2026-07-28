function AchievementBadge({ badge }) {
  return (
    <div
      className={`rounded-xl p-5 shadow-md border transition-all duration-300 ${
        badge.unlocked
          ? "bg-green-50 border-green-500 hover:scale-105"
          : "bg-gray-100 border-gray-300 opacity-60"
      }`}
    >
      <div className="text-5xl text-center">{badge.icon}</div>

      <h3 className="text-lg font-bold text-center mt-3">
        {badge.title}
      </h3>

      <p className="text-center mt-2">
        {badge.unlocked ? "✅ Unlocked" : "🔒 Locked"}
      </p>
    </div>
  );
}

export default AchievementBadge;