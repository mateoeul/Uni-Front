const UniverseSidebar = () => {
	return (
		<aside className="universe-sidebar">
			<div className="universe-sidebar-header">
				<button className="uni-btn uni-btn-light">Nuevo chat</button>
				<input className="uni-input" type="text" placeholder="Buscar chat" readOnly />
			</div>
			<div className="universe-sidebar-section">
				<div className="universe-sidebar-title">Chats</div>
				<ul className="universe-chat-list">
					<li className="universe-chat-item is-active">Ingeniería en informática</li>
					<li className="universe-chat-item">¿Qué debería estudiar si me gusta la tecnología?</li>
					<li className="universe-chat-item">Diferencia informática y sistemas</li>
					<li className="universe-chat-item">ITBA o UTN</li>
				</ul>
			</div>
			<div className="universe-sidebar-footer">
				<div className="universe-user-avatar">CB</div>
				<div className="universe-user-name">Ciro Ben Dov</div>
			</div>
		</aside>
	);
};

export default UniverseSidebar;


