import LoadingSpiner from './LoadingSpiner'

interface ISubmitButton {
  payload: string
  loading: boolean
}

const SubmitButton: React.FC<ISubmitButton> = ({ payload, loading }) => {
  return (
    <button
      className="flex h-9 items-center justify-center rounded-sm bg-lime-500 py-2 text-sm font-semibold text-white hover:bg-lime-400 active:bg-lime-300"
      type="submit"
    >
      {loading ? <LoadingSpiner /> : payload}
    </button>
  )
}

export default SubmitButton
