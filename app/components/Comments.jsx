"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';

const Comments = ({ gameId }) => {
    const {userData} = useUser();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/comments/games/${gameId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${userData.token}` },
                });
                const data = await response.json();

                setComments(data);

            } catch (error) {
                console.error("Error al cargar los comentarios:", error);
                setComments([]);
            }
        };

        fetchComments();
    }, [gameId]);

    const handlePostComment = async () => {
        if (newComment.trim()) {
            const newCommentObject = { comment: newComment, userId:userData.id, videoGameId:gameId };
            setComments([newCommentObject]);
            setNewComment("");
            try {
                const response = await fetch(`http://localhost:3000/comments/${gameId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`
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
            </div>}
        </div>
    );
};

export default Comments;
