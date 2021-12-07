import React, { useState, useEffect } from 'react'
import requestUtil from './requestUtil'
import './SearchDatas.css'

// eslint-disable-next-line
export default () => {
    // eslint-disable-next-line
    const[products, setProducts] = useState([])

    const[id, setId] = useState()
    const[name, setName] = useState('')
    const[price, setPrice] = useState('')
    const[description, setDescription] = useState('')

    const [activeCreation, setActiveCreation] = useState(false)
    const [activeUpdate, setActiveUpdate] = useState(false)

    useEffect(() => {
        const loadProducts = async () => { 
            let product = await requestUtil.getAllProduct()
            setProducts(product)
        }
        loadProducts()
    }, [])

    const showCreation = () => {
        setActiveUpdate(false)
        setActiveCreation(!activeCreation)
    }

    const createProduct = async () => {
        let obj = {
            name: name,
            price: price,
            description: description
        }
        await requestUtil.createProduct(obj)
        setActiveCreation(false)
        window.location.reload(false);
    }

    const loadDatasUpdate = (id) => {
        let product = {}
        products.forEach(item => {
            if(item.id === id) {
                product = item
            }
        })
        setActiveCreation(false)
        setActiveUpdate(!activeUpdate)
        setId(product.id)
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
    }

    const updateProduct = async () => {
        let obj = {
            id: id,
            name: name,
            price: price,
            description: description
        }
        await requestUtil.updateProduct(obj)
        setActiveUpdate(false)
        window.location.reload(false);
    }

    const deleteProduct = async (id) => {
        await requestUtil.deleteProduct(id)
        window.location.reload(false);
    }
    const handlerName = (obj) => {
        setName(obj.target.value)
    }
    
    const handlerPrice = (obj) => {
        setPrice(obj.target.value)
    }

    const handlerDescription = (obj) => {
        setDescription(obj.target.value)
    }
    return(
        <div className="container">
          <div><button className="btn btn-showCreate" onClick={() => showCreation()}>Create a product</button></div>   
            <table className="tableCrud">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    {products.map(product => (
                        <tr className="groupDates" key={product.id}>
                            <td className="field">{product.name}</td>
                            <td className="field">{product.price}</td>
                            <td className="field"><textarea cols="50" rows="4" className="pDescription">{product.description}</textarea></td>

                            <td className="btnGroup">
                                <button className="btn btn-showUpdate" onClick={() => loadDatasUpdate(product.id)}>Update</button>
                                <button className="btn btn-delete" onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {activeCreation ? (
                <div className="fieldProduct">
                    <input className="fieldName"  placeholder="Name" value={name} onChange={handlerName} />
                    <input className="fieldDescription" placeholder="Description"value={description} onChange={handlerDescription}/>
                    <input className="fieldPrice"  placeholder="Price" value={price} onChange={handlerPrice}/>
                    <button className="btn btn-create" onClick={createProduct}>Create</button>
                </div>
            ) : <div></div>}


            {activeUpdate ? (
                <div className="fieldProduct">
                    <input className="fieldName" placeholder="Name" value={name} onChange={handlerName} />
                    <input className="fieldDescription" placeholder="Description"value={description} onChange={handlerDescription}/>
                    <input className="fieldPrice" placeholder="Price" value={price} onChange={handlerPrice}/>
                    <button className="btn btn-update" onClick={updateProduct}>Update</button>
                </div>
            ) : <div></div>}
        </div>
    )
}