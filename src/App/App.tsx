import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
import './App.scss'
// import Input from 'components/Input'
// import Card from 'components/Card'
// import Button from 'components/Button'
import MultiDropdown from 'components/MultiDropdown'
import CheckIcon from 'components/icons/CheckIcon';
import FavoritesIcon from 'components/icons/FavoritesIcon';
// import CheckBox from 'components/CheckBox'

type Option = {
    /** Ключ варианта, используется для отправки на бек/использования в коде */
    key: string;
    /** Значение варианта, отображается пользователю */
    value: string;
};
function App() {
    const [value, setValue] = useState<Option[]>([]);
    return (
        <div>
            {/* <Card
                actionSlot={<Button>В корзину</Button>}
                captionSlot={' гошвашаолдывоалдывовалдв'}
                contentSlot={'какой то контент'}
                image="https://w.forfun.com/fetch/f7/f76c030200142905d4d0856baa694308.jpeg"
                title={'Заголовок ве несколько строк Заголовок ве несколько строк Заголовок ве несколько строк Заголовок ве несколько строк'}
                subtitle={'подзаголовок ве несколько строк подзаголовок ве несколько строк подзаголовок ве несколько строк подзаголовок ве несколько строк подзаголовок ве несколько строк подзаголовок ве несколько строк подзаголовок ве несколько строк'}
            /> */}

            {/* <CheckBox onChange={() => { }} disabled></CheckBox> */}
            {/* <Input onChange={() => { }} value=''></Input> */}
            <MultiDropdown
                options={[
                    { key: 'msk', value: 'Москва' },
                    { key: 'spb', value: 'Санкт-Петербург' },
                    { key: 'ekb', value: 'Екатеринбург' }
                ]}
                value={value}
                onChange={setValue}
                getTitle={(values: Option[]) => values.length === 0 ? 'Выберите города' : values.map(({ value }) => value).join(', ')}
            />
            <FavoritesIcon width={17} height={17} />  <CheckIcon />
        </div>
    )
}

export default App

