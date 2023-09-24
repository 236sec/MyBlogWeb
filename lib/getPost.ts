import 'server-only'

export default async function getData(id: string) {
    const res = await fetch(`http://localhost:3000/api/post/?id=${id}`,{ next: { revalidate: 3600 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return null;
    }
   
    return res.json()
  }