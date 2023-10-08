import React, { useContext } from 'react';
import { Context } from './../../Context/index';
import { CurrenciI } from '../../Types';

interface PropsI {
  selectName: string;
  inputName: string;
  animNameStart: 'select1AnimStart' | 'select2AnimStart';
  animNameEnd: 'select1AnimEnd' | 'select2AnimEnd';
  inputValue: number;
  selectValue: CurrenciI | null;
}

const Select: React.FC<PropsI> = ({
  selectName,
  inputName,
  animNameStart,
  animNameEnd,
  inputValue,
  selectValue,
}) => {
  const { isAnim, currencies, handleChange, handleCurChange } = useContext(Context);
  return (
    <div
      className={`wrapper ${
        isAnim !== null ? (isAnim ? animNameStart : animNameEnd) : null
      }`}>
      <div className={'select'}>
        <select name={selectName} onChange={(e) => handleCurChange!(e)} value={selectValue?.txt}>
          {currencies?.map((item: any, index: any) => (
            <option key={index} value={item.txt}>
              {item.txt}
            </option>
          ))}
        </select>
      </div>

      <input
        placeholder={'0.00'}
        type={'number'}
        name={inputName}
        value={inputValue}
        onChange={(e) => handleChange!(e)}
      />
    </div>
  );
};

export default Select;
