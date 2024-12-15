import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import { useState, useRef, useEffect, FormEvent } from 'react';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	updateArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	updateArticleState,
}: ArticleParamsFormProps) => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const ref = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMenuOpen &&
				ref.current &&
				!ref.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};
		if (!isMenuOpen) return;
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const toggleForm = () => {
		setIsMenuOpen((prevOpen) => !prevOpen);
	};

	const changeFontFamily = (select: OptionType) => {
		setArticleState({ ...articleState, fontFamilyOption: select });
	};

	const changeFontSize = (select: OptionType) => {
		setArticleState({ ...articleState, fontSizeOption: select });
	};

	const changeFortColor = (select: OptionType) => {
		setArticleState({ ...articleState, fontColor: select });
	};

	const changeBackgroundColor = (select: OptionType) => {
		setArticleState({ ...articleState, backgroundColor: select });
	};

	const changeContentWidth = (select: OptionType) => {
		setArticleState({ ...articleState, contentWidth: select });
	};

	const submitButton = (event: FormEvent) => {
		event.preventDefault();
		updateArticleState(articleState);
	};

	const resetButton = () => {
		updateArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				{isMenuOpen && (
					<form className={styles.form} onSubmit={submitButton} ref={ref}>
						<Text
							family='open-sans'
							size={31}
							weight={800}
							uppercase
							as='h3'
							align='left'>
							Задайте параметры
						</Text>
						<Select
							selected={articleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={changeFontFamily}
							title='Шрифт'
						/>
						<RadioGroup
							selected={articleState.fontSizeOption}
							name='radio'
							options={fontSizeOptions}
							onChange={changeFontSize}
							title='Размер шрифта'></RadioGroup>
						<Select
							selected={articleState.fontColor}
							options={fontColors}
							onChange={changeFortColor}
							title='Цвет шрифта'></Select>
						<Separator></Separator>
						<Select
							selected={articleState.backgroundColor}
							options={backgroundColors}
							onChange={changeBackgroundColor}
							title='Цвет фона'></Select>
						<Select
							selected={articleState.contentWidth}
							options={contentWidthArr}
							onChange={changeContentWidth}
							title='Ширина контента'></Select>
						<div className={clsx(styles.bottomContainer)}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={resetButton}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				)}
			</aside>
		</>
	);
};
