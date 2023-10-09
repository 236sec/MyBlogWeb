import { IPost } from "@/models/post";

export default function BlogCard({title,tag,content} : IPost) {
  return (
    <div className='w-full h-full rounded-2xl overflow-hidden text-xl'>
        <h1>{title}</h1>
        <p>{tag}</p>
        <p>{content}</p>
    </div>
  );
}
