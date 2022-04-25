interface IFormError {
  payload: string
}

const FormError: React.FC<IFormError> = ({ payload }) => {
  return (
    <div className="flex items-center justify-center ">
      <span className="text-sm font-semibold text-red-500">{payload}</span>
    </div>
  )
}

export default FormError
