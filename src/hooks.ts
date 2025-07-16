import { useEffect } from 'react';
import type {
	TallyLoadedEvent,
	TallyPageViewEvent,
	TallyPopupOptions,
	TallySubmissionEvent,
} from './interfaces';
import { loadTallyEmbeds, injectTallyWidget } from './utils';

export function useTally() {
	useEffect(() => {
		// If Tally is already loaded, load the embeds
		if (typeof window.Tally !== 'undefined') {
			return loadTallyEmbeds();
		}

		// If the Tally widget script is not loaded yet, load it
		if (
			document.querySelector(`script[src="${injectTallyWidget.src}"]`) ===
			null
		) {
			return injectTallyWidget();
		}
	}, []);
}

type TallyEventHandlers = {
	onFormLoad?: (event: TallyLoadedEvent) => void;
	onPageView?: (event: TallyPageViewEvent) => void;
	onSubmission?: (event: TallySubmissionEvent) => void;
};

export function useTallyEvents(
	formId: string,
	{ onFormLoad, onPageView, onSubmission }: TallyEventHandlers,
): void;
export function useTallyEvents({
	onFormLoad,
	onPageView,
	onSubmission,
}: TallyEventHandlers): void;
export function useTallyEvents(
	a: string | TallyEventHandlers,
	b?: TallyEventHandlers,
) {
	const formId = typeof a === 'string' ? a : undefined;
	const { onFormLoad, onPageView, onSubmission } =
		typeof a === 'object' ? a : b!;

	useEffect(() => {
		function tallyEventHandler(event: MessageEvent) {
			if (
				typeof event?.data === 'string' &&
				event.data.includes('Tally.')
			) {
				const data = JSON.parse(event.data) as
					| TallyLoadedEvent
					| TallyPageViewEvent
					| TallySubmissionEvent;

				if (formId && data.payload.formId !== formId) {
					return;
				}

				({
					'Tally.FormLoaded': onFormLoad,
					'Tally.FormPageView': onPageView,
					'Tally.FormSubmitted': onSubmission,
				})[data.event]?.(data as any);
			}
		}

		window.addEventListener('message', tallyEventHandler);
		return () => {
			window.removeEventListener('message', tallyEventHandler);
		};
	}, []);
}

export function useTallyPopup(formId: string) {
	useTally();

	return {
		open(options?: TallyPopupOptions) {
			window.Tally?.openPopup(formId, options);
		},
		close() {
			window.Tally?.closePopup(formId);
		},
	};
}
