import { useEffect, useState } from "react";
import formatMoney from "../utility/formatMoney";

export default function(amount) {

    const [money, setMoney] = useState('');

    useEffect(() => {
        setMoney(formatMoney(amount))
    }, [amount])

    return money;
}