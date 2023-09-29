import { Icon } from '@iconify/react';
import { TraSuaType } from '../../types/TraSuaType';
import { useState } from 'react';
import { BACKEND_URL } from '../../api/userApi';
import axios from 'axios';

const EditModal = ({ data, index }: { data: TraSuaType[], index: number }) => {
    const [form, setForm] = useState(data[index]);
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
            .then((res: any) => {
                // setForm();
            }).catch(err =>
                console.log(err)
            );
    }
    console.log(form);
    
    return (
        <>
            <button type="button" data-bs-toggle="modal" data-bs-target={`#editModal${index}`} style={{ outline: 'none', border: 'none' }} title='edit'>
                <Icon icon="bx:edit" width="24" height="24" />
            </button>
            <div className="modal fade" id={`editModal${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">商品を修正する</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* {err && <li className='alert alert-danger'>{err.response.data.message}</li>} */}
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='close-btn-edit'>閉じる</button>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>修正</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditModal