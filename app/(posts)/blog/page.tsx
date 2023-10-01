import Markdown from "@/components/Markdown"

export default function MarkdownPage(){
    const content = `Here is some JavaScript code:

~~~python
print('It works!')
~~~
`
    return (
        <div>
            <Markdown value={content} />
        </div>
    )
}