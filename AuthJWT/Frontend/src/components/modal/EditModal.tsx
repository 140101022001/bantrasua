import { Icon } from '@iconify/react';
import { TraSuaType } from '../../types/TraSuaType';
import { useState } from 'react';
import { BACKEND_URL } from '../../api/userApi';
import axios from 'axios';
import { productResponse } from './ChargeModal';

const EditModal = ({ data, index, setData, setSuccess }: { data: TraSuaType[], index: number, setData: (data: TraSuaType[]) => void, setSuccess: (mes: string)=>void }) => {
    const [form, setForm] = useState(data[index]);
    const [err, setErr] = useState<any | undefined>();
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
    const handleEdit = async () => {
        await axios.put(`${BACKEND_URL}/api/product/update`, form)
            .then((res: productResponse) => {
                const newData = data.map(item =>
                    item.id === res.data.product.id ? res.data.product : item
                );
                setData(newData);
                setSuccess('商品を修正しました。');
                setErr(undefined);
                const closeButton = document.getElementById(`close-btn-edit${index}`);
                closeButton?.click();
            }).catch(error =>
                setErr(error.response.data.errors)
            );
    }
    return (
        <>
            <span data-bs-toggle="modal" data-bs-target={`#editModal${index}`} style={{ outline: 'none', border: 'none' }} title='edit' className='icon-btn'>
                <Icon icon="typcn:edit" width="24" height="24" />
            </span>
            <div className="modal fade" id={`editModal${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">商品を修正する</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {err?.name && err?.name?.map((item) => {
                                return <li className='alert alert-danger' key={item}>{item}</li>
                            })}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor={`name${index}`} className="form-label">商品名</label>
                                    <input type="text" name='name' value={form.name} className="form-control input" id={`name${index}`} onChange={handleChangeForm} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`price${index}`} className="form-label">価格</label>
                                    <input type="number" name='price' value={form.price} className="form-control input" id={`price${index}`} onChange={handleChangeForm} />
                                </div>
                                <img src={form.img_url} alt='abc' style={{ width: '250px', height: '250px' }}></img>
                                <div className="mb-3">
                                    <label htmlFor={`img_url${index}`} className="form-label" style={{ cursor: 'pointer' }}><Icon icon="material-symbols:upload" width="24" height="24" /> イメージupload</label>
                                    <input type="file" name='img_url' style={{ display: 'none' }} id={`img_url${index}`} onChange={handleGetImage} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id={`close-btn-edit${index}`}>閉じる</button>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>修正</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditModal