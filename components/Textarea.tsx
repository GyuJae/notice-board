import { UseFormRegisterReturn } from 'react-hook-form'

interface ITextarea {
  register: UseFormRegisterReturn
  placeholder: string
  [key: string]: any
}

const Textarea: React.FC<ITextarea> = ({ register, placeholder, ...rest }) => {
  return (
    <textarea
      className="w-full rounded-sm border-2 p-1 focus:outline-lime-500"
      {...register}
      placeholder={placeholder}
      {...rest}
    />
  )
}

export default Textarea
