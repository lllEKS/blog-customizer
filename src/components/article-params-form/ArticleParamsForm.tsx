import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
// import { StoryDecorator } from 'src/ui/story-decorator';
import { Text } from 'src/ui/text';

import { useState, useRef, useEffect, FormEvent } from 'react';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	fontFamily: (select: OptionType) => void;
	fontSize: (select: OptionType) => void;
	fontColor: (select: OptionType) => void;
	backgroundColor: (select: OptionType) => void;
	contentWidth: (select: OptionType) => void;
	resetButton: () => void;
	submitButton: (event: FormEvent) => void;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	fontFamily,
	fontSize,
	fontColor,
	backgroundColor,
	contentWidth,
	resetButton,
	submitButton,
	articleState,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const ref = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (open && ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	const toggleForm = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				{open && (
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
							onChange={fontFamily}
							title='Шрифт'
						/>
						<RadioGroup
							selected={articleState.fontSizeOption}
							name='radio'
							options={fontSizeOptions}
							onChange={fontSize}
							title='Размер шрифта'></RadioGroup>
						<Select
							selected={articleState.fontColor}
							options={fontColors}
							onChange={fontColor}
							title='Цвет шрифта'></Select>
						<Separator></Separator>
						<Select
							selected={articleState.backgroundColor}
							options={backgroundColors}
							onChange={backgroundColor}
							title='Цвет фона'></Select>
						<Select
							selected={articleState.contentWidth}
							options={contentWidthArr}
							onChange={contentWidth}
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
