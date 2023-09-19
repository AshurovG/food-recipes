import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './MultiDropdown.module.scss'
import cn from 'classnames'
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { useLocalStore } from 'utils/useLocalStore.ts';
import DropdownStore from '../../Store/DropdownStore';

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
    const dropdownStore = useLocalStore(() => new DropdownStore());
    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const selectedSet = React.useMemo(() => new Set(value), [value])
    const filteredOptions = React.useMemo(
        () =>
            options.filter((o) => o.value.toLowerCase().includes(dropdownStore.filter.toLowerCase())
            ),
        [options, dropdownStore.filter]
    )

    const onClickDropdown = React.useCallback(() => {
        if (disabled) {
            return
        }
        dropdownStore.setIsOpen(true)
        dropdownStore.setIsTyping(true)
    }, [disabled])

    const onClickOption = (selectedOption: Option) => () => {
        if (disabled) {
            return
        }

        dropdownStore.setIsTyping(false)

        if (selectedSet.has(selectedOption)) {
            onChange(value.filter((o) => o.key !== selectedOption.key))
            return
        }
        onChange([...value, selectedOption])
    }

    React.useEffect(() => {
        const onDocumetClick = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Element)) {
                dropdownStore.setIsOpen(false)
                dropdownStore.setIsTyping(false)
                dropdownStore.setFilter('')
            }
        }

        document.addEventListener('click', onDocumetClick)

        return () => {
            document.removeEventListener('click', onDocumetClick)
        }
    }, [])

    React.useEffect(() => {
        if (disabled) {
            dropdownStore.setIsOpen(false)
            dropdownStore.setIsTyping(false)
            dropdownStore.setFilter('')
        }
    }, [disabled])

    const title = React.useMemo(() => getTitle(value), [getTitle, value])

    const inputValue = React.useMemo(() => {
        if (!dropdownStore.isOpen) {
            if (value.length === 0) {
                return ''
            }

            return title
        }

        if (dropdownStore.isTyping) {
            return dropdownStore.filter
        }

        return ''
    }, [dropdownStore.isOpen, dropdownStore.isTyping, , value.length, title, dropdownStore.filter])

    return (
        <div
            className={cn(
                styles.dropdown,
                dropdownStore.isOpen && styles.dropdown_open,
                disabled && styles.dropdown_disabled,
                className
            )}
            ref={rootRef}
        >
            <Input
                className={styles.dropdown__input}
                value={inputValue}
                placeholder={title}
                onChange={dropdownStore.setFilter}
                onClick={onClickDropdown}
                afterSlot={<ArrowDownIcon color='secondary' width={24} height={24} />}
            />
            {dropdownStore.isOpen && (
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

export default observer(MultiDropdown);