const UniverseInput = ({ value, onChange, onSend, disabled }) => {
	return (
		<div className="universe-input">
			<div className="universe-input-toolbar">
				<button className="uni-btn uni-btn-ghost small" disabled={true}>Regenerar respuesta</button>
			</div>
			<div className="universe-input-row">
				<input
					type="text"
					className="uni-input large pill"
					placeholder="Escribí tu mensaje para UNIVERSE..."
					value={value}
					onChange={(e) => onChange?.(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							onSend?.();
						}
					}}
					disabled={disabled}
				/>
				<button className="uni-btn uni-btn-send pill" onClick={() => onSend?.()} disabled={disabled}>Enviar</button>
			</div>
		</div>
	);
};

export default UniverseInput;


