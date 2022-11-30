import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
// or, if you're using CommonJS require:
// const {default: oembedTransformer} = require('@remark-embedder/transformer-oembed')
import {remark} from 'remark'
import html from 'remark-html'

const exampleMarkdown = `
# My favorite YouTube video

[This](https://www.youtube.com/watch?v=dQw4w9WgXcQ) is a great YouTube video.
Watch it here:

https://www.youtube.com/watch?v=dQw4w9WgXcQ

Isn't it great!?
`
function remarkFoo() {
  return (tree, file) => {
    console.log("foo");
  };
}

async function go() {
  const result = await remark()
    .use(remarkFoo)
    .use(remarkEmbedder, {
      transformers: [oembedTransformer],
    })
    .use(html)
    .process(exampleMarkdown)

  console.log(result.toString())
}

go()