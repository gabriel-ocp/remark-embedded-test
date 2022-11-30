import remarkEmbedder from '@remark-embedder/core'
// or, if you're using CJS:
// const {default: remarkEmbedder} = require('@remark-embedder/core')
import {remark} from 'remark'
import html from 'remark-html'

const CodeSandboxTransformer = {
  name: 'CodeSandbox',
  // shouldTransform can also be async
  shouldTransform(url) {
    const {host, pathname} = new URL(url)

    return (
      ['codesandbox.io', 'www.codesandbox.io'].includes(host) &&
      pathname.includes('/s/')
    )
  },
  // getHTML can also be async
  getHTML(url) {
    const iframeUrl = url.replace('/s/', '/embed/')

    return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`
  },
}

const exampleMarkdown = `
This is a CodeSandbox:

https://codesandbox.io/s/css-variables-vs-themeprovider-df90h
`

async function go() {
  const result = await remark()
    .use(remarkEmbedder, {
      transformers: [CodeSandboxTransformer],
    })
    .use(html)
    .process(exampleMarkdown)

  console.log(result.toString())
  // logs:
  // <p>This is a CodeSandbox:</p>
  // <iframe src="https://codesandbox.io/embed/css-variables-vs-themeprovider-df90h" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
}

go()
