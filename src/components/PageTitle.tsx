import React from 'react'

const PageTitle = ({title,className } : {title:string,className?:string}) => {
  return (
    <h1 className={`text-center mt-12 text-2xl font-semibold ${className}`}>{title}</h1>
  )
}

export default PageTitle