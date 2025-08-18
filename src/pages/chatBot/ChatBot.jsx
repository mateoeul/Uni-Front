import "./chatbot.css";
import '../../components/universe/universe.css';
import UniverseSidebar from "../../components/universe/UniverseSidebar";
import UniverseHeader from "../../components/universe/UniverseHeader";
import UniverseMessage from "../../components/universe/UniverseMessage";
import UniverseInput from "../../components/universe/UniverseInput";

const ChatBot = () => {
    return (
        <div className="universe-page">
            <UniverseSidebar />
            <UniverseHeader />
            <main className="universe-chat-area">
                <section className="universe-messages">
                    <UniverseMessage
                        role="assistant"
                        title="Ingeniería en informática qué es"
                        content="La Ingeniería en Informática es una disciplina que fusiona las ciencias de la computación con la electrónica, el software y las telecomunicaciones para diseñar, desarrollar y mantener soluciones tecnológicas. Cubre desde la programación y bases de datos hasta la inteligencia artificial y ciberseguridad, ofreciendo un amplio y demandado campo laboral en roles como desarrollador, analista de sistemas o especialista en ciberseguridad, entre otros."
                    />
                    <UniverseMessage
                        role="user"
                        content="¿Qué universidades recomiendan para estudiar?"
                    />
                    <UniverseMessage
                        role="assistant"
                        title="Sugerencias de UNIVERSE"
                        content="Puedo ayudarte a comparar planes de estudio, modalidad y salida laboral. Elegí una carrera y te muestro opciones destacadas."
                    />
                </section>
                <UniverseInput />
            </main>
        </div>
    );
};

export default ChatBot;