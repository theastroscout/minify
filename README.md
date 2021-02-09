# Minify
Compose &amp; Minify html, js, css, and scss.

<br/>

## Installation
```
npm install @hqdaemon/minify
```

## Usage

### Node.js
```js
const minify = require("@hqdaemon/minify");

// To String
let jsResult = await minify("/path_to_file/script.js");
let cssResult = await minify("/path_to_file/style.scss");
let htmlResult = await minify("/path_to_file/dom.html");

// To File
minify("/path_to_file/script.js", {to: "/path_to_new_file/new_file_name.js"});
minify("/path_to_file/style.scss", {to: "/path_to_new_file/new_file_name.css"});
minify("/path_to_file/dom.html", {to: "/path_to_new_file/dom.html"});

// Return false or composed string
```

### CLI
```
minify file.js > file.min.js
minify style.scss > style.min.css
minify dom.html > dom.min.html
```

<br />
<br />
<br />
<br />

## MIT License

Copyright (c) HQ • [hqmode.com](https://hqmode.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.