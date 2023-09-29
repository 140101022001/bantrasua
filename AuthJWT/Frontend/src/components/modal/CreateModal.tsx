import { useState, useEffect } from 'react';
import { CreateTraSua, TraSuaType } from '../../types/TraSuaType';
import { Icon } from '@iconify/react';
import { BACKEND_URL } from '../../api/userApi';
import axios from 'axios';


const state: CreateTraSua = {
    name: '',
    img_url: '',
    quantity: 0,
    price: 0
}

const CreateModal = ({ setData, setSuccess }: { setData: any, setSuccess: any }) => {
    const [form, setForm] = useState(state);
    const [modal, setModal] = useState<boolean>(true);
    const [err, setErr] = useState('');
    useEffect(() => {
        if (!modal) {
            const close = document.getElementById('close-btn');
            close?.click();
        }
    }, [modal]);
    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(previous => ({
            ...previous,
            [name]: value
        }))
    }
    const handleGetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                const path = `/src/assets/image/${file.name}`
                setForm(previous => ({
                    ...previous,
                    img_url: path
                }));
            }
        }
    }

    const handleCreate = async () => {
        if (form.img_url && form.name && form.price) {
            await axios.post(`${BACKEND_URL}/api/product/create`, form)
                .then((res: any) => {
                    setData((previous: TraSuaType[]) => [...previous, res.data.product]);
                    setModal(false);
                    setSuccess('商品を追加しました。');
                }).catch(err =>
                    setErr(err)
                );
        }
    }
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                商品を追加する
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">商品を追加する</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {err && <li className='alert alert-danger'>{err.response.data.message}</li>}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">商品名</label>
                                    <input type="text" name='name' value={form.name} className="form-control input" id="name" onChange={handleChangeForm} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">価格</label>
                                    <input type="number" name='price' value={form.price} className="form-control input" id="price" onChange={handleChangeForm} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="quantity">数量</label>
                                    <input type="number" name='quantity' value={form.quantity} className="form-control input" id="quantity" onChange={handleChangeForm} />
                                </div>
                                {form.img_url && <img src={form.img_url} alt='abc' style={{ width: '250px', height: '250px' }}></img>}
                                <div className="mb-3">
                                    <label htmlFor="img_url" className="form-label" style={{ cursor: 'pointer' }}><Icon icon="material-symbols:upload" width="24" height="24" /> イメージupload</label>
                                    <input type="file" name='img_url' style={{ display: 'none' }} id="img_url" onChange={handleGetImage} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='close-btn'>閉じる</button>
                            <button type="button" className="btn btn-primary" onClick={handleCreate}>追加</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateModal