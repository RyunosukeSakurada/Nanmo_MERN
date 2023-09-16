
interface SectionHeaderProps {
  subtitle : string
  title : string
}

const SectionHeader = ({subtitle, title}:SectionHeaderProps) => {
  return (
      <div className='mb-6'>
        <span className='text-sm md:text-lg text-green-700'>{subtitle}</span>
        <h2 className='text-xl md:text-3xl font-bold -mt-1'>{title}</h2>
      </div>
  )
}

export default SectionHeader
