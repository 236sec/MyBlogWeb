/* import Markdown from "@/components/Markdown";
import axios from "axios";

export default function ({ params }: { params: { id: string } }) {
    //const [content, setContent] = useState('');
    //const [title, setTitle] = useState('');
    //const [tags, setTags] = useState([]);
    //const [date, setDate] = useState('');
    //const content = `Here is some JavaScript code:

//~~~python
//print('It works!')
//~~~
//`
    //useEffect(() => {
        async function getPost() {
            const res = await axios.get(`/api/post/?id=${params.id}`);
            console.log(res);
            //setContent(res.data.content);
            //setTitle(res.data.title);
            //setTags(res.data.tags);
            //setDate(res.data.updatedAt);
        }
        getPost();
    //}, [])
    return (
        <div>
            <h1>This is blog {params.id}</h1>
            <Markdown value={null} />
        </div>
    )
}
 */
import Markdown from "@/components/Markdown";
import getData from "@/lib/getPost";


  export default async function Page({ params } : { params: { id: string } }) {
    const data = await getData(params.id)
    if (!data) {
        return (
            <div className="my-8">
                <h1 className="text-9xl">404 Not found</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>{data.title}</h1>
            <Markdown value={data.content} />
        </div>
    )
  }