import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface IInput {
  register: UseFormRegisterReturn
  placeholder: string
  type: 'email' | 'password' | 'number' | 'text'
  [key: string]: any
}

const Input: React.FC<IInput> = ({ register, placeholder, type, ...rest }) => {
  return (
    <input
      className="appearance-none rounded-sm border-[1.5px] p-1 focus:outline-lime-500"
      placeholder={placeholder}
      type={type}
      {...register}
      {...rest}
      autoComplete="off"
    />
  )
}

export default Input
