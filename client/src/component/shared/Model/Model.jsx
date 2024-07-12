import React, { useState } from 'react'
import InputType from '../Form/InputType'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import API from '../../../services/API'

function Model() {
    let { user } = useSelector(item => item.auth)
    let [inventoryType, setInventoryType] = useState('in')
    let [email, setEmail] = useState('')
    let [quantity, setQuantity] = useState(0)
    let [bloodType, setBLoodType] = useState('')
    //this is for handling model form
    async function createModelHandler() {
        try {
            if (!bloodType || !quantity) return toast.error('All Field are Requried*')
            let { data } = await API.post('/inventory/v1/create-inventory', {
                email: user?.email,
                inventoryType,
                organization: user?._id,
                quantity,
                bloodGroup: bloodType
            })
            if (data.success) {
                toast.success(data.message)
                window.location.reload()
            }
        }
        catch (e) {
            console.log(e)
            toast.error(e.response.data.message)
            //window.location.reload()
        }
    }
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Create Inventory</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        {/* //inventory-type */}
                        <div className="inventory-type d-flex">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked value="in" onChange={(e) => { setInventoryType(e.target.value) }} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    IN
                                </label>
                            </div>
                            {/* &nbsp;   */}
                            <div className="form-check ms-3">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="out" onChange={(e) => { setInventoryType(e.target.value) }} />
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    Out
                                </label>
                            </div>

                        </div>
                        <br />
                        {/* //this is for the email */}
                        <InputType labelFor="email" labelText="Email" inputType="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" />
                        {/* this is for quantity */}
                        <br />
                        {/* //selecting blood group */}
                        {/* ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"] */}
                        <select className="form-select" aria-label="Default select example" onChange={(e) => { setBLoodType(e.target.value) }}>
                            <option >Open this select menu</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                        </select>
                        {/* //this is for the email */}
                        <br />
                        <InputType labelFor="quantity" labelText="Quantity" inputType="number" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} name="quantity" />

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={createModelHandler}>Create</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Model