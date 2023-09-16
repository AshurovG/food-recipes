import React, { HtmlHTMLAttributes, useState } from 'react';
import styles from './MultiDropdown.module.scss'
import cn from 'classnames'
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';

export type Option = {
    key: string;
    value: string;
};

export type MultiDropdownProps = {
    className?: string;
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    disabled?: boolean;
    getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
    className,
    options,
    value,
    onChange,
    disabled,
    getTitle,
}) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const [isOpen, setIsOpen] = React.useState(false);
    const [isTyping, setIsTyping] = React.useState(false);
    const [filter, setFilter] = React.useState('')

    const selectedSet = React.useMemo(() => new Set(value), [value])

    const filteredOptions = React.useMemo(
        () =>
            options.filter((o) => o.value.toLowerCase().includes(filter.toLowerCase())
            ),
        [options, filter]
    )

    const onClickDropdown = React.useCallback(() => {
        if (disabled) {
            return
        }
        setIsOpen(true)
        setIsTyping(true)
    }, [disabled])

    const onClickOption = (selectedOption: Option) => () => {
        console.log(selectedSet)
        console.log(selectedOption)
        console.log(value)
        if (disabled) {
            return
        }

        setIsTyping(false)

        if (selectedSet.has(selectedOption)) {
            console.log(1)
            onChange(value.filter((o) => o.key !== selectedOption.key))
            return
        }
        onChange([...value, selectedOption])
    }

    React.useEffect(() => {
        const onDocumetClick = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Element)) {
                setIsOpen(false)
                setIsTyping(false)
                setFilter('')
            }
        }

        document.addEventListener('click', onDocumetClick)

        return () => {
            document.removeEventListener('click', onDocumetClick)
        }
    }, [])

    React.useEffect(() => {
        if (disabled) {
            setIsOpen(false)
            setIsTyping(false)
            setFilter('')
        }
    }, [disabled])

    const title = React.useMemo(() => getTitle(value), [getTitle, value])

    const inputValue = React.useMemo(() => {
        if (!isOpen) {
            if (value.length === 0) {
                return ''
            }

            return title
        }

        if (isTyping) {
            return filter
        }

        return ''
    }, [isOpen, isTyping, , value.length, title, filter])

    return (
        <div
            className={cn(
                styles.dropdown,
                isOpen && styles.dropdown_open,
                disabled && styles.dropdown_disabled,
                className
            )}
            ref={rootRef}
        >
            <Input
                className={styles.dropdown__input}
                value={inputValue}
                placeholder={title}
                onChange={setFilter}
                onClick={onClickDropdown}
                afterSlot={<ArrowDownIcon color='secondary' width={24} height={24} />}
            />
            {isOpen && (
                <div className={styles.dropdown__options}>
                    {filteredOptions.map((o) => (
                        <button
                            key={o.key}
                            className={cn(
                                styles.dropdown__option,
                                selectedSet.has(o) && styles.dropdown__option_selected
                            )}
                            onClick={onClickOption(o)}
                        >
                            <Text view='p-16'>{o.value}</Text>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
};

export default MultiDropdown;