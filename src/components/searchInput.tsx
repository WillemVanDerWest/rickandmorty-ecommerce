import React from "react"

interface param{
    handleSearch: (search:string)=> void
}

export default function SearchInput({handleSearch}:param){

    const handleSearchProp=(event:string)=>{
        handleSearch(`?name=${event}`)
    }
    return(
        <input type={`text`} placeholder={`start typing`} onChange={(event)=>handleSearchProp(event?.target.value)} />
    )
}