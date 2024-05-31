"use client";
import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

const Comments = ({ gameId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { sessionData } = useContext(SessionContext);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/comments/games/${gameId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${sessionData.token}` },
                });
                const data = await response.json();
                // Asegúrate de que data es un array
                if (Array.isArray(data)) {
                    setComments(data);
                } else {
                    setComments([]);
                }
            } catch (error) {
                console.error("Error al cargar los comentarios:", error);
                setComments([]);
            }
        };

        fetchComments();
    }, [gameId, sessionData.token]);

    const handlePostComment = async () => {
        if (newComment.trim()) {
            const newCommentObject = { text: newComment, gameId };
            setComments([...comments, newCommentObject]);
            setNewComment("");
            try {
                const response = await fetch('http://localhost:3000/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionData.token}`
                    },
                    body: JSON.stringify(newCommentObject),
                });
                if (!response.ok) {
                    throw new Error("Error al postear el comentario");
                }
            } catch (error) {
                console.error("Error al postear el comentario:", error);
            }
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">Comentarios</h3>
            <div className="mb-4">
                {Array.isArray(comments) && comments.map(comment => (
                    <div key={comment.id} className="mb-2 p-2 border-b">
                        {comment.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="text-black w-full p-2 border mb-1 mt-2"
                placeholder="Escribe un comentario..."
            />
            <button onClick={handlePostComment} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
                Postear
            </button>
        </div>
    );
};

export default Comments;