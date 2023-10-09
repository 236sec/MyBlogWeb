"use client";
import { useEffect,useState } from "react"

export default function Home() {
  const [data,setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/api/post`);
      console.log(res.arrayBuffer());
      setData(res);
    }
    fetchData();
    }
    ,[])
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/api/post`);
      console.log(res);
    }
    fetchData();
    console.log(`This is ${data}`);
  },[data])
  return (
    <div className='flex flex-col bg-primary_light w-full'>
      <h1 className='mx-auto text-4xl font-bold'>Main Page</h1>
      <div className='shadow-md bg-red my-10 w-full'>
          <h2 className='text-2xl font-bold'>BoxList</h2>
          <ul>
            <li>Hello</li>
          </ul>
      </div>
    </div>
  )
}
