import type { TallyFormData } from './interfaces';

export function injectTallyWidget() {
	const script = document.createElement('script');
	script.src = injectTallyWidget.src;
	script.onload = loadTallyEmbeds;
	script.onerror = loadTallyEmbeds;
	document.body.appendChild(script);
}
injectTallyWidget.src = 'https://tally.so/widgets/embed.js';

export function loadTallyEmbeds() {
	// Load Tally embeds
	if (typeof window.Tally !== 'undefined') {
		window.Tally.loadEmbeds();
		return;
	}

	// Fallback if window.Tally is not available
	document
		.querySelectorAll<HTMLIFrameElement>(
			'iframe[data-tally-src]:not([src])',
		)
		.forEach((iframeEl) => {
			if (iframeEl.dataset.tallySrc) {
				iframeEl.src = iframeEl.dataset.tallySrc;
			}
		});
}

export function getFormSession(formId: string) {
	return localStorage.getItem(`FORM_SESSION_${formId}`) || undefined;
}

export function getFormData(formId: string) {
	const data = localStorage.getItem(`FORM_DATA_${formId}`);

	if (data) {
		return JSON.parse(data) as TallyFormData;
	}
}
