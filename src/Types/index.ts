export interface CurrenciI {
  r030: number
  txt: string
  rate: number
  cc: string
  exchangedate: string
}

export interface FromToI {
  from: CurrenciI | null
  to: CurrenciI | null
}

export interface InputValuesI {
  input1: number | null
  input2: number | null
}

export interface TrigersI {
  from: boolean
  to: boolean
}

export interface ContextI {
  currencies: CurrenciI[] | null 
  setCurrencies: React.Dispatch<React.SetStateAction<CurrenciI[] | null>> | null
  
  fromTo: FromToI | null
  setFromTo: React.Dispatch<React.SetStateAction<FromToI>> | null

  inputValues: InputValuesI | null
  setInputValues: React.Dispatch<React.SetStateAction<InputValuesI>> | null

  trigers: TrigersI | null
  setTrigers: React.Dispatch<React.SetStateAction<TrigersI>> | null

  isAnim: boolean | null
  setIsAnim: React.Dispatch<React.SetStateAction<boolean | null>> | null

  handleCurChange: ((e: React.ChangeEvent<HTMLSelectElement>) => void) | null 
  handleChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | null
}
