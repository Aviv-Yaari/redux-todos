export const UserActivities = props => {
  const { activities } = props;
  return (
    <ul className="user-activities">
      {activities.map(activity => (
        <li key={activity.at} className="activity">
          <span>{activity.text}, </span>
          <span>At: {new Date(activity.at).toLocaleString('he-IL')}</span>
        </li>
      ))}
    </ul>
  );
};
