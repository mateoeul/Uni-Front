const UniverseInput = () => {
	return (
		<div className="universe-input">
			<div className="universe-input-toolbar">
				<button className="uni-btn uni-btn-ghost small">Regenerar respuesta</button>
			</div>
			<div className="universe-input-row">
				<input type="text" className="uni-input large pill" placeholder="Escribí tu mensaje para UNIVERSE..." readOnly />
				<button className="uni-btn uni-btn-send pill">Enviar</button>
			</div>
		</div>
	);
};

export default UniverseInput;


