export type TallyInstance = {
	loadEmbeds: () => void;
	openPopup: (formId: string, options?: TallyPopupOptions) => void;
	closePopup: (formId: string) => void;
};

export type TallyPopupOptions = {
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

export type TallyLoadedPayload = {
	formId: string;
};

export type TallyLoadedEvent = {
	event: 'Tally.FormLoaded';
	payload: TallyLoadedPayload;
};

export type TallyPageViewPayload = {
	formId: string;
	page: number;
};

export type TallyPageViewEvent = {
	event: 'Tally.FormPageView';
	payload: TallyPageViewPayload;
};

export type TallySubmissionPayload = {
	id: string; // submission ID
	respondentId: string;
	formId: string;
	formName: string;
	createdAt: Date; // submission date
	fields: Array<{
		id: string;
		title: string;
		type:
			| 'INPUT_TEXT'
			| 'INPUT_NUMBER'
			| 'INPUT_EMAIL'
			| 'INPUT_PHONE_NUMBER'
			| 'INPUT_LINK'
			| 'INPUT_DATE'
			| 'INPUT_TIME'
			| 'TEXTAREA'
			| 'MULTIPLE_CHOICE'
			| 'DROPDOWN'
			| 'CHECKBOXES'
			| 'LINEAR_SCALE'
			| 'FILE_UPLOAD'
			| 'HIDDEN_FIELDS'
			| 'CALCULATED_FIELDS'
			| 'RATING'
			| 'MULTI_SELECT'
			| 'MATRIX'
			| 'RANKING'
			| 'SIGNATURE'
			| 'PAYMENT';
		answer: { value: any; raw: any };
	}>;
};

export type TallySubmissionEvent = {
	event: 'Tally.FormSubmitted';
	payload: TallySubmissionPayload;
};

export type TallyFormData = { [fieldId: string]: string };
