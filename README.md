# Use Tracking

[![npm version](https://img.shields.io/npm/v/use-tracking)](https://www.npmjs.com/package/use-tracking)
[![npm downloads](https://img.shields.io/npm/dm/use-tracking)](https://www.npmjs.com/package/use-tracking)

[Use Tracking](https://rdt.li/use-tracking) is a custom React hook with a configurable Tracker component designed to enable simple and effective analytics and event tracking within your Next.js applications.

> If you find this package useful, please consider [starring it on GitHub](https://rdt.li/use-tracking-hook)! Your support motivates further development and improvements.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Recommended: Usage with Tracker Component](#recommended-usage-with-tracker-component)
  - [Step 1: Create a Next.js Provider Component](#step-1-create-a-nextjs-provider-component)
  - [Step 2: Add the TrackingProvider to Your Layout Component](#step-2-add-the-trackingprovider-to-your-layout-component)
  - [Step 3: Make Sure to Set Up an API Route](#step-3-make-sure-to-set-up-an-api-route)
- [Usage for Specific Pages](#usage-for-specific-pages)
  - [Step 1: Create a Next.js Client Hook](#step-1-create-a-nextjs-client-hook)
  - [Step 2: Make Sure to Set Up an API Route](#step-2-make-sure-to-set-up-an-api-route-1)
- [Configuration Options](#configuration-options)
- [Contributions](#contributions)
- [License](#license)
- [About](#about)

## Features

- Track page views with a unique session ID
- Record click events on customizable HTML tags
- Send event data to any specified action handler, including logging to the console during development
- Customize tracking attributes to ignore or include as needed

## Installation

Install via Bun:

```bash
bun add use-tracking
```

Or using npm:

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

#### Output:

```js
// Event: pageview on initial render
Event: {
  url: '/example',
  event: 'pageview',
  timestamp: '2024-12-05T15:21:45.609Z',
  sessionId: '2b61fb421f81d84dbfc161f677906eba'
}

// Event: button click
Event: {
  url: '/example',
  event: 'buttonclick',
  timestamp: '2024-12-05T15:21:45.609Z',
  sessionId: '2b61fb421f81d84dbfc161f677906eba',
  // stringified attributes object
  attributes: {
    class: 'text-xs',
    'data-action': 'test-button',
  },
}
```

## Recommended: Usage with Tracker Component

It is recommended to use the `TrackerProvider` in a layout component that is rendered on every page. This enables you to track page views and click events across your entire application.

### Step 1: Create a Next.js Provider Component

> Path: `src/components/tracking-provider.tsx`

```tsx
'use client'

import { Tracker } from 'use-tracking'

export default function TrackingProvider() {
  return (
    <Tracker
      // other options
      action={(event) => {
        fetch('/api/analytics', {
          method: 'POST',
          body: JSON.stringify(event),
        })
      }}
    />
  )
}
```

### Step 2: Add the TrackingProvider to Your Layout Component

> Path: `src/app/layout.tsx`

```tsx
import TrackingProvider from '../components/tracking-provider'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <TrackingProvider />
      </body>
    </html>
  )
}
```

### Step 3: Make Sure to Set Up an API Route

```ts
export async function POST(request: Request) {
  const event = await request.json()

  // Add your logic here, such as updating the database

  console.log(event)

  return Response.json({ success: true })
}
```

## Usage for Specific Pages

If you only want to track events on specific pages, you can use the `useTracking` hook directly in those components.

### Step 1: Create a Next.js Client Hook

> Path: `src/app/dashboard/page.tsx`

```tsx
'use client'

import { useTracking } from 'use-tracking'

export default function Page() {
  useTracking({
    action: (event) => {
      fetch('/api/analytics/dashboard/route.ts', {
        method: 'POST',
        body: JSON.stringify(event),
      })
    },
  })

  return (
    <button className="text-xs" data-action="test-button">
      Click Me!
    </button>
  )
}
```

### Step 2: Make Sure to Set Up an API Route

```ts
export async function POST(request: Request) {
  const event = await request.json()

  // Add your logic here, such as updating the database

  console.log(event)

  return Response.json({ success: true })
}
```

## Configuration Options

The `useTracking` hook accepts an options object with the following properties:

- `prefix: (string)`

  A string used to filter attributes by prefix. Only attributes that start with this prefix will be tracked.

```ts
useTracking({
  prefix: 'data-',
})
```

- `ignore: (string[])`

  An array of attribute name patterns to ignore. Useful for excluding irrelevant attributes.

```ts
useTracking({
  ignore: ['aria-'],
})
```

This will ignore all attributes that start with `aria-`.

- `meaningfulTags: (string[])`

  An array of HTML tags considered meaningful for click events. For example, `['A', 'BUTTON']` to track link clicks and button presses.

```ts
useTracking({
  meaningfulTags: ['A', 'BUTTON'],
})
```

- `action: (function)`

  A callback function called with the event data when tracking occurs. If not provided, events are logged to the console in development mode.

```ts
useTracking({
  action: (data) => {
    console.log('Event:', data)
  },
})
```

## Contributions

Contributions to `use-tracking` are welcome! Please fork the project and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## About

Created by [Neeraj Dalal](https://nrjdalal.com). For queries, you can reach out at admin@nrjdalal.com.
