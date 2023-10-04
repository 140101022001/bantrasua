import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../api/userApi";
type res = {
    data: {
        allSum?: number;
        growth?: number;
        lastMonthSum?: number;
        status?: number;
        thisMonthSum?: number;
        todaySum?: number;
        allQuantity?: number;
        todayQuantity?: number;
    };
};
const state: res = {
    data: {
        allSum: 0,
        growth: 0,
        lastMonthSum: 0,
        status: 0,
        thisMonthSum: 0,
        todaySum: 0,
        allQuantity: 0,
        todayQuantity: 0,
    }
}
const Benefit = () => {
    const [data, setData] = useState(state);
    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/benefit`)
            .then((res: res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="container">
            <h1>売り上げ</h1>
            <div style={{ display: "flex", gap: "50px" }}>
                <div style={{ width: "50%" }}>
                    <div className="mypage-main">
                        <strong>販売済み商品の合計: {data.data.allQuantity}個</strong>
                        <strong>今までの収入: {data.data.allSum}￥</strong>
                        <strong>今日の販売済み商品の合計: {data.data.todayQuantity}個</strong>
                        <strong>今日の収入: {data.data.todaySum}￥</strong>
                        <strong>今月の収入： {data.data.thisMonthSum}￥</strong>
                        <strong>先月の収入： {data.data.lastMonthSum}￥</strong>
                        <strong>成長: {data.data.growth}%</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benefit;
