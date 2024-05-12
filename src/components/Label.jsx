import React from 'react'

const Label = ({label,value}) => {
  return (
    <div className="flex flex-col">
        <p className="text-sm font-extralight text-slate-400">
            {label}
        </p>
        <p>
            {value}
        </p>
    </div>
  )
}

export default Label