const UniverseMessage = ({ role = 'assistant', title, content }) => {
	return (
		<div className={`universe-message ${role === 'assistant' ? 'from-assistant' : 'from-user'}`}>
			{role === 'assistant' && (
				<div className="universe-avatar assistant">
					<span className="sparkle s1">✦</span>
					<span className="sparkle s2">✦</span>
					<span className="sparkle s3">✦</span>
				</div>
			)}
			{role === 'user' && <div className="universe-avatar user" />}
			<div className="universe-message-body">
				{title && <div className="universe-message-title">{title}</div>}
				<div className="universe-message-content">{content}</div>
			</div>
		</div>
	);
};

export default UniverseMessage;


