import React from "react"

interface param {
    basketAmount : number
}

const Basket= (props: param) => {

    return(
        <div>
            <h1>Basket Amount:</h1>
            <h1>{props.basketAmount}</h1>
        </div>
    )
}

export default Basket;