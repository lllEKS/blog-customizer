import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateForm, setStateForm] =
		useState<ArticleStateType>(defaultArticleState);

	const [state, setState] = useState(defaultArticleState);

	const changeFontFamily = (select: OptionType) => {
		setStateForm({ ...stateForm, fontFamilyOption: select });
	};

	const changeFontSize = (select: OptionType) => {
		setStateForm({ ...stateForm, fontSizeOption: select });
	};

	const changeFortColor = (select: OptionType) => {
		setStateForm({ ...stateForm, fontColor: select });
	};

	const changeBackgroundColor = (select: OptionType) => {
		setStateForm({ ...stateForm, backgroundColor: select });
	};

	const changeContentWidth = (select: OptionType) => {
		setStateForm({ ...stateForm, contentWidth: select });
	};

	const stateSubmitButton = (event: FormEvent) => {
		event.preventDefault();
		setState(stateForm);
	};

	const stateResetButton = () => {
		setState(defaultArticleState);
		setStateForm(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={changeFontFamily}
				articleState={stateForm}
				fontSize={changeFontSize}
				fontColor={changeFortColor}
				backgroundColor={changeBackgroundColor}
				contentWidth={changeContentWidth}
				resetButton={stateResetButton}
				submitButton={stateSubmitButton}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
