import React from 'react'

const Title = ({title="title",subTitle,style}) => {

  return (
    <div className='flex items-center text-slate-200 justify-start w-full min-h-[40px] capitalize' style={style}>
        {title}
    </div>
  )
}

export default Title