import { BlobOptions } from 'buffer';
import React from 'react';
import './App.css';
import swapIcon from './swapIcon.svg';
import { CurrenciI, FromToI, InputValuesI, TrigersI } from './Types';
import { Context } from './Context/index';
import Select from './Components/Select/Select';
import SwapIcon from './Components/SwapIcon/SwapIcon';

export const MyContext = React.createContext({});

const App = () => {
  const [currencies, setCurrencies] = React.useState<CurrenciI[] | null>(null);

  const [fromTo, setFromTo] = React.useState<FromToI>({ from: null, to: null });

  const [inputValues, setInputValues] = React.useState<InputValuesI>({
    input1: null,
    input2: null,
  });

  const [trigers, setTrigers] = React.useState<TrigersI>({
    from: false,
    to: false,
  });

  const [isAnim, setIsAnim] = React.useState<boolean | null>(null);

  /* fetch currencies */
  React.useEffect(() => {
    if (!currencies) {
      fetch(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${getTodayDate()}&json`,
        { method: 'GET' },
      )
        .then((res) => res.json())
        .then((res) => {
          setCurrencies([
            ...res,
            {
              txt: 'Українська Гривня',
              rate: 1,
              r030: 2541,
              cc: 'UAH',
              exchangedate: res[0].exchangedate,
            },
          ]);
          setFromTo({ from: res[0], to: res[0] });
        });
    }
  }, [currencies]);

  const getTodayDate = () => {
    let today = new Date();
    let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');

    return year + month + day;
  };

  /* convert currencies from - to */
  React.useEffect(() => {
    setInputValues({
      ...inputValues,
      input2: +((+fromTo.from?.rate! / +fromTo.to?.rate!) * +inputValues.input1!).toFixed(2),
    });
  }, [trigers.from]);

  /* convert currencies to - from */
  React.useEffect(() => {
    setInputValues({
      ...inputValues,
      input1: +((+fromTo.to?.rate! / +fromTo.from?.rate!) * +inputValues.input2!).toFixed(2),
    });
  }, [trigers.to]);

  /* change input Value */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > -1) {
      const findPoint = e.target.value.indexOf('.');
      if (findPoint > -1) {
        const lengthAfterPoint = e.target.value.slice(findPoint + 1).length;
        if (lengthAfterPoint < 3) {
          setInputValues({ ...inputValues, [e.target.name]: e.target.value });
          e.target.name === 'input1'
            ? setTrigers({ ...trigers, from: !trigers.from })
            : setTrigers({ ...trigers, to: !trigers.to });
        }
      } else {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
        e.target.name === 'input1'
          ? setTrigers({ ...trigers, from: !trigers.from })
          : setTrigers({ ...trigers, to: !trigers.to });
      }
    }
  };

  /* change selected currencies */
  const handleCurChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.name)
    const cur = currencies?.filter((item) => item.txt === e.target.value);
    setFromTo({ ...fromTo, [e.target.name]: cur![0] });
    e.target.name === 'from'
      ? setTrigers({ ...trigers, from: !trigers.from })
      : setTrigers({ ...trigers, to: !trigers.to });
  };

  /* swap currencies */
  const handleSwapCur = () => {
    setIsAnim(!isAnim);
  };

  return (
    <div className="App">
      <Context.Provider
        value={{
          currencies,
          setCurrencies,
          fromTo,
          setFromTo,
          inputValues,
          setInputValues,
          trigers,
          setTrigers,
          isAnim,
          setIsAnim,
          handleChange,
          handleCurChange
        }}>
        <div className="main">
          <h1 className="title">Конвертер Валют</h1>

          <p className="rate_for">Курс на {currencies?.[0].exchangedate}</p>

          <div className="selects">
            <Select inputValue={inputValues.input1!} animNameEnd='select1AnimEnd' animNameStart='select1AnimStart' inputName='input1' selectName='from' selectValue={fromTo.from!}/>

           <SwapIcon handleSwapCur={handleSwapCur}/>

            <Select animNameEnd='select2AnimEnd' animNameStart='select2AnimStart' inputName='input2' selectName='to' inputValue={inputValues.input2!} selectValue={fromTo.to!}/>
          </div>
        </div>
      </Context.Provider>
    </div>
  );
};

export default App;
