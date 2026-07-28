import { useEffect, useState } from "react";
import api from "../../api/axios";
import AchievementBadge from "./AchievementBadge";

function Achievements() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await api.get("/badges");
        setBadges(res.data);
      } catch (error) {
        console.error("Error fetching badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">🏆 Achievements</h2>
        <p>Loading badges...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">🏆 Achievements</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <AchievementBadge key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}

export default Achievements;