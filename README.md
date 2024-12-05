# Use Tracking

[![npm version](https://img.shields.io/npm/v/use-tracking)](https://www.npmjs.com/package/use-tracking)
[![npm downloads](https://img.shields.io/npm/dm/use-tracking)](https://www.npmjs.com/package/use-tracking)

`use-tracking` is a custom React hook designed to enable simple and effective event tracking within your applications. It is especially useful for tracking user interactions like page views and click events, providing an easy way to collect analytics data.

> If you find this package useful, please consider [Starring on GitHub](https://rdt.li/use-tracking-hook)! Your support motivates further development and improvements.

## Features

- Track page views with a unique session ID.
- Record click events on customizable HTML tags.
- Send event data to any specified action handler, including logging to the console during development.
- Customize tracking attributes to ignore or include as needed.

## Installation

```bash
bun add use-tracking
```

or using npm:

```bash
npm install use-tracking
```

## Usage

Below is a basic example of how to use the `useTracking` hook in a React component:

```tsx
'use client'

import { useTracking } from 'use-tracking'

export default function Page() {
  useTracking()

  return (
    <button className="text-xs" data-action="test-button">
      Click Me!
    </button>
  )
}
```

Output:

```js
// event pageview on initial render
Event: {
  url: '/example',
  event: 'pageview',
  timestamp: '2024-12-05T15:21:45.609Z',
  sessionId: '2b61fb421f81d84dbfc161f677906eba'
}

// event on button click
Event: {
  url: '/example',
  event: 'buttonclick',
  timestamp: '2024-12-05T15:21:45.609Z',
  sessionId: '2b61fb421f81d84dbfc161f677906eba'
  // stringified attributes object
  attributes: {
    class: 'text-xs',
    'data-action': 'test-button',
  },
}
```

## Recommended Usage

It is recommended to use the `useTracking` hook in a layout component that is rendered on every page. This way, you can track page views and click events across your entire application.

### First create a Next.js client component

> Path: src/components/tracker.tsx

```tsx
'use client'

import { useTracking } from 'use-tracking'

export default function Page() {
  useTracking({
    action: (event) => {
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(event),
      })
    },
  })

  return null
}
```

### Create an API handler

> Path src/app/api/analytics/route.ts

```ts
export async function POST(request: Request) {
  const event = await request.json()

  // add your logic here, like to update db, etc

  console.log(event)

  return Response.json({ success: true })
}
```

### Then add it to your layout component to track all event

> Path: src/app/RootLayout.tsx

```tsx
import Tracker from '../components/tracker'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Tracker />
      </body>
    </html>
  )
}
```

## Configuration Options

The `useTracking` hook accepts an options object with the following properties:

- `prefix: (string)`

A string used to filter the attributes by prefix. Only attributes that start with this prefix will be tracked.

```ts
useTracking({
  prefix: 'data-',
})
```

- `ignore: (string[])`

An array of attribute name patterns to ignore. Useful for excluding irrelevant attributes

```ts
useTracking({
  ignore: ['aria-'],
})
```

Will ignore all attributes that start with `aria-`.

- `meaningfulTags: (string[])`: An array of HTML tags that are considered meaningful for click events. For example, `['A', 'BUTTON']` to track link clicks and button presses.

```ts
useTracking({
  meaningfulTags: ['A', 'BUTTON'],
})
```

- `action: (function)`: A callback function that will be called with the event data when tracking occurs. If not provided, events are logged to the console in development mode.

```ts
useTracking({
  action: (eventData) => {
    console.log('Event:', eventData)
  },
})
```

## Contributions

Contributions to `use-tracking` are welcome! Please fork the project and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## About

Created by [Neeraj Dalal](https://nrjdalal.com). For queries, you can reach out at admin@nrjdalal.com.
