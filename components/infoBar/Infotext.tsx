type InfoText = {
  children: React.ReactNode;
}

const InfoText = ({ children }: InfoText) => {
  return (
    <div className='text-lg w-fit text-center hidden md:flex font-semibold items-center'>{children}</div>
  )
}

export default InfoText