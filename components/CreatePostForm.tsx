"use client";
import { useState } from "react"
import axios from "axios";

export default function CreatePostForm() {
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!title || !content) {
            setError("All Field Must Be Field.");
            return
        }
        try {
            const data = {
                title,
                tag,
                content,
            };
            const res : any = axios.post('/api/post',data);
            if (res.status == 201) {
                setTitle('');
                setTag([]);
                setContent('');
                setError('');
            } else {
                setError("Post Create Failed")
            }
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    }

    return (
    <div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} >
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" name="tag"/>
            <input type="text" name="content" onChange={(e) => setContent(e.target.value)}/>
            <input type="submit" className="submitbox" value="Create Post"/>
        </form>
        { error ? <div className="errorbox">
            {error}
        </div> : null}
    </div>
    )
}