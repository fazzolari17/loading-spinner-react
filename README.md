# React Component Spinners

### Install to React project

```bash
npm i loading-spinner-react
```

#### Import Spinner

```jsx
import { SimpleLoader } from '@loading-spinner-react';
```

#### Use

```JSX
<SimpleLoader >
```

The documentation is currently in development and the website will be posted shortly.

### Manage Properties

| Property name               | type       | Required | Default value |
| --------------------------- | ---------- | -------- | ------------- | 
| **size**                    | `string`   | `false`  | '30px'        | CSS length value for `height` and `width` of the spinner |
| **color**                   | `string`   | `false`  | '#1976d2'     | CSS color values for the spinner                         |
| **secondaryColor**          | `string`   | `false`  | '#cccccc'     | CSS color value for second half of the loader            |
| **animationDuration**       | `string`   | `false`  | '2s'          | CSS `animation-duration`property value                   |
| **animationTimingFunction** | `string`   | `false`  | 'ease-in-out' | CSS `animation-timing-function` property value           |
| **animationDirection**      | `string`   | `false`  | 'normal'      | CSS `animation-direction` property value                 |
|                        | **styles** | `number` | `false`       | 2                                                        | number of spins during single animation | --> |
| **className**               | `string`   | `false`  |               | passes className to the wrapper container to             |

<!-- <body>
<style>
  tr {
    style: border: 1px solid black;
  }
</style>
<table>
  <thead>
    <tr>
      <th>Definition list</th>
      <th>Markdown in HTML</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Is something people use sometimes.</td>
      <td>Does *not* work **very** well. Use HTML <em>tags</em>.</td>
    </tr>
  </tbody>
</table>
<body> -->
