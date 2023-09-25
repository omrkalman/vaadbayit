export default function(amount) {
    let cents = (amount * 100) % 100;
    cents = cents > 9 ? cents : '0'+cents;
    const dollars = Math.trunc(amount);
    const displayAmount = `${dollars}.${cents}`;

    if (import.meta.env.VITE_CURRENCY_IS_AFTER) {
        return `${displayAmount}${import.meta.env.VITE_CURRENCY}`;
    }
    return `${import.meta.env.VITE_CURRENCY}${displayAmount}`;
}