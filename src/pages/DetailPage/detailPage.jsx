import React, { useEffect } from 'react'
import Axios from 'axios'
import { useSearchParams } from 'react-router-dom'

function DetailPage() {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let url = document.location.href
        console.log(url)
        // console.log(document.location.query)
        let urlString = document.location.href.toString()
        console.log(urlString)

        let idFromUrl = url.substring(29,30)
        console.log(idFromUrl)

        // let params = new URLSearchParams(document.location.search)
        // console.log(params)
        // let user = params.get("name");
        // console.log(user)
        // let id = parseInt(params.get("id"))
        // console.log(id)
        // Update the document title using the browser API
        Axios.get(`http://localhost:2000/products/${idFromUrl}`)
            .then(res => {
                console.log(res.data)
                setSearchParams(res.data)
                // this.setState({ product: res.data })
                // console.log(this.state.product)
            })
    });
    




    return (
        <h1>{searchParams}</h1>
    )
}

export default DetailPage