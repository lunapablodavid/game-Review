"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Comments = ({ gameId }) => {
    const { userData } = useUser() || {};
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [msgError, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:3000/comments/games/${gameId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${userData.token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.error("Error al cargar los comentarios:", error);
                setComments([]);
            }
        };

        fetchComments();
    }, [gameId, userData.token]);

    const handlePostComment = async () => {
        if (newComment.trim()) {
            const commentWithUserInfo = `${userData.name} - ${new Date().toLocaleString()}: ${newComment}`;
            const newCommentObject = { comment: commentWithUserInfo, userId: userData.id, videoGameId: gameId };
            setComments([...comments, newCommentObject]);
            setNewComment("");
            try {
                const res = await fetch(`http://localhost:3000/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`
                    },
                    body: JSON.stringify(newCommentObject),
                });
                if (!res.ok) {
                    const err = await res.json();
                    return setError(err.message);
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const closeModal = () => {
        setError(null);
    };

    return (
        <div>
            {msgError && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="text-red-600 font-semibold">{msgError}</p>
                        <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Cerrar</button>
                    </div>
                </div>
            )}
            <h3 className="text-xl font-bold mb-2">Comentarios</h3>
            <div className="mb-4">
                {Array.isArray(comments) && comments.map(comment => (
                    <div key={comment.id} className="mb-2 p-2 border-b">
                        {comment.comment}
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
