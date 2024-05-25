"use client"
/* const Comments = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch("http://localhost:3000/comments/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment })
        });
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
      } 

      const handleChange = (event) => {
        setNewComment(event.target.value);
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">Comentarios</h3>
            <div className="text-black mb-4">
               <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newComment}
                    onChange={handleChange}
                    placeholder="Escribe tu comentario..."
                    className="w-full px-3 py-2 border rounded-md"
                ></input>
                </form>
            </div>
            <button type='submit' className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300 border hover:border-pink-700 text-white">
                Publicar
            </button>
 
             <div className=" text-white mt-4">
                {comments.map((comment, index) => (
                    <div key={index} className="border-b pb-2 mb-2">
                        <p>{comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments; */
import React, { useState, useEffect } from 'react';

const Comments = ({ gameId }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/comments/create`);
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error("Error al cargar los comentarios:", error);
            }
        };

        fetchComments();
    }, [gameId]);

    const handlePostComment = async () => {
        if (newComment.trim()) {
            const newCommentObject = { text: newComment, id: comments.length + 1, gameId };
            setComments([...comments, newCommentObject]);
            setNewComment("");            
            try {
                await fetch('/api/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
                {comments.map(comment => (
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