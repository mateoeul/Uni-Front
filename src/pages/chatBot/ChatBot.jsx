import React, { useEffect, useRef, useState } from "react";
import "./chatbot.css";
import '../../components/universe/universe.css';
import UniverseSidebar from "../../components/universe/UniverseSidebar";
import UniverseMessage from "../../components/universe/UniverseMessage";
import UniverseInput from "../../components/universe/UniverseInput";
import chatbotService from "../../services/chatbot-service";

const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            id: Date.now(),
            role: 'assistant',
            title: 'UNI AI',
            content: 'Hola! Soy UNI AI. Contame qué te interesa estudiar o en qué te gustaría trabajar y te ayudo a explorar opciones.'
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || loading) return;
        setError("");

        // Push user message
        const userMsg = { id: Date.now() + 1, role: 'user', content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // Call backend
        setLoading(true);
        try {
            const reply = await chatbotService.sendMessage(text);
            const assistantMsg = {
                id: Date.now() + 2,
                role: 'assistant',
                content: reply || '...'
            };
            setMessages((prev) => [...prev, assistantMsg]);
        } catch (e) {
            setError(e.message || 'Ocurrió un error.');
            const assistantMsg = {
                id: Date.now() + 3,
                role: 'assistant',
                title: 'Error',
                content: 'No pude obtener una respuesta en este momento. Intentá nuevamente.'
            };
            setMessages((prev) => [...prev, assistantMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="universe-page">
            <UniverseSidebar />
            <main className="universe-chat-area">
                <div className="universe-hero-header">
                    <h1 className="universe-hero-title">UNI AI</h1>
                </div>
                <section className="universe-messages">
                    {messages.map((m) => (
                        <UniverseMessage key={m.id} role={m.role} title={m.title} content={m.content} />
                    ))}
                    {loading && (
                        <UniverseMessage role="assistant" content="Pensando..." />
                    )}
                    <div ref={endRef} />
                </section>
                {error && (
                    <div className="uni-alert error" style={{ margin: '0 16px' }}>
                        {error}
                    </div>
                )}
                <UniverseInput
                    value={input}
                    onChange={setInput}
                    onSend={handleSend}
                    disabled={loading}
                />
            </main>
        </div>
    );
};

export default ChatBot;