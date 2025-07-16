import { type DetailedHTMLProps, type IframeHTMLAttributes } from 'react';
import type {
	TallyLoadedEvent,
	TallyPageViewEvent,
	TallySubmissionEvent,
} from '../interfaces';
import { useTally, useTallyEvents } from '../hooks';

type TallyFormProps = DetailedHTMLProps<
	IframeHTMLAttributes<HTMLIFrameElement>,
	HTMLIFrameElement
> & {
	formId: string;
	onFormLoad?: (event: TallyLoadedEvent) => void;
	onPageView?: (event: TallyPageViewEvent) => void;
	onSubmission?: (event: TallySubmissionEvent) => void;
};

function TallyForm({
	formId,
	onFormLoad,
	onPageView,
	onSubmission,
	...props
}: TallyFormProps) {
	useTally();
	useTallyEvents(formId, { onFormLoad, onPageView, onSubmission });

	return (
		<iframe
			loading="lazy"
			width="100%"
			frameBorder={0}
			marginHeight={0}
			marginWidth={0}
			{...props}
			data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
		/>
	);
}

export default TallyForm;
