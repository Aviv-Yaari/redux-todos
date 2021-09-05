export const UserActivities = props => {
  const { activities } = props;
  return (
    <section className="user-activities">
      <h2>User Activities</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.at} className="activity">
            <span>{activity.text}, </span>
            <span>At: {new Date(activity.at).toLocaleString('he-IL')}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
