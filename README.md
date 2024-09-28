# Minify
Compose &amp; Minify HTML, JavaScript, CSS, and SCSS.

<br/>

## Installation
```
npm install @surfy/minify
```

## Usage

### Node.js
```js
import minify from '@surfy/minify';

// To String
const compressedString = await minify('/src_file.js');

// To File
await minify('/src_file.js', '/target_file.js');

// Same file
await minify('/src_file.js', true);

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

# License

CC0 1.0 Universal (CC0 1.0) Public Domain Dedication

The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighbouring rights, to the extent allowed by law.

You can copy, modify, distribute, and perform the work, even for commercial purposes, all without asking permission.

The work is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the work or the use or other dealings in the work.

For more information, see <https://creativecommons.org/publicdomain/zero/1.0/>

- [Surfy Foundation](https://hello.surfy.one)
- [LinkedIn](https://www.linkedin.com/in/astroscout/)