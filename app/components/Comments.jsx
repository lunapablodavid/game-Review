import React, { useState, useEffect } from 'react';

const Comments = ({ gameId }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [sessionData, setSessionData] = useState({});

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data'));
        if (userData) setSessionData(userData);
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/comments/games/${gameId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${sessionData.token}` },
                });
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error("Error al cargar los comentarios:", error);
            }
        };

        fetchComments();
    }, [gameId, sessionData.token]);

    const handlePostComment = async () => {
        if (newComment.trim()) {
            const newCommentObject = { text: newComment, id: comments.length + 1, gameId };
            setComments([...comments, newCommentObject]);
            setNewComment("");
            try {
                await fetch('http://localhost:3000/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionData.token}`
                    },
                    body: JSON.stringify(newCommentObject),
                });
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
