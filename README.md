# React Tally Wrapper

A lightweight React wrapper for embedding [Tally.so](https://tally.so) forms with ease.\
Supports all Tally embed features, event listeners, and customization options via props.

## Features

-   ✅ Easy integration of Tally forms in React, Astro and Next.js apps
-   🎯 Event handlers for form load, page view, and submission
-   🪄 Utility methods and hooks to work with the Tally widget and session
-   💥 TypeScript ready

---

## Installation

```bash
npm install react-tally
# or
bun add react-tally
```

---

## Usage

### As an embed

```tsx
import { TallyForm } from 'react-tally';

function MyPage() {
	return (
		<TallyForm
			formId="YOUR_FORM_ID"
			onFormLoad={(event) => console.log('Form loaded', event)}
			onPageView={(event) => console.log('Page viewed', event)}
			onSubmission={(event) => console.log('Form submitted', event)}
			style={{ width: '100%', height: '500px' }}
		/>
	);
}
```

**Props**

All standard `<iframe />` props are supported.\
In addition, the following are available:

| Prop             | Type                                    | Description                       |
| ---------------- | --------------------------------------- | --------------------------------- |
| **formId**       | `string`                                | Required. Your Tally form ID.     |
| **onFormLoad**   | `(event: TallyLoadedEvent) => void`     | Triggered when form is loaded.    |
| **onPageView**   | `(event: TallyPageViewEvent) => void`   | Triggered on page change.         |
| **onSubmission** | `(event: TallySubmissionEvent) => void` | Triggered when form is submitted. |

### As a popup

```tsx
import { useTallyPopup } from 'react-tally';

function MyPage() {
	const { open, close } = useTallyPopup('YOUR_FORM_ID');

	return (
		<div>
			<button onClick={() => open()}>Open</button>
			<button onClick={() => close()}>Close</button>
		</div>
	);
}
```

The `open()` function may take additional configuration options:

```ts
type TallyPopupOptions = {
	key?: string; // This is used as a unique identifier used for the "Show only once" and "Don't show after submit" functionality
	layout?: 'default' | 'modal';
	width?: number;
	alignLeft?: boolean;
	hideTitle?: boolean;
	overlay?: boolean;
	emoji?: {
		text: string;
		animation:
			| 'none'
			| 'wave'
			| 'tada'
			| 'heart-beat'
			| 'spin'
			| 'flash'
			| 'bounce'
			| 'rubber-band'
			| 'head-shake';
	};
	autoClose?: number; // in milliseconds
	showOnce?: boolean;
	doNotShowAfterSubmit?: boolean;
	customFormUrl?: string; // when you want to load the form via it's custom domain URL
	hiddenFields?: {
		[key: string]: any;
	};
	onOpen?: () => void;
	onClose?: () => void;
	onPageView?: (page: number) => void;
	onSubmit?: (payload: TallySubmissionPayload) => void;
};
```

---

## Utility Hooks and Functions

You can also use these utilities:

```ts
import {
	// Hooks
	useTally,
	useTallyEvents,

	// Functions
	getFormData,
	getFormSession,
} from 'react-tally';
```

-   `getFormData(formId: string): TallyFormData | undefined`\
    Fetch metadata about a given form.

-   `getFormSession(formId: string): string | undefined`\
    Access current session ID for a specific form.

-   `useTally(): void`\
    Injects the Tally popup widget script.

-   `useTallyEvents(formId:string, { onFormLoad, onPageView, onSubmission }: TallyEventHandlers): void`\
    Tally form event listeners for a specified form.

-   `useTallyEvents({ onFormLoad, onPageView, onSubmission }: TallyEventHandlers): void`\
    Tally form event listeners for all Tally events.

---

## License

MIT

---

## Credits

Based on the [Tally.so Developer Resources](https://tally.so/help/developer-resources).
