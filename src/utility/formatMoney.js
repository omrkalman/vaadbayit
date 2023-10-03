export default function(amount, isNegative) {
    if (amount < 0) {
        amount = Math.abs(amount)
        isNegative = true
    }
    let cents = (amount * 100) % 100;
    cents = cents > 9 ? cents : '0'+cents;
    const dollars = Math.trunc(amount);
    const displayAmount = `${dollars}.${cents}`;

    if (import.meta.env.VITE_CURRENCY_IS_AFTER) {
        return `${isNegative ? '-' : ''}${displayAmount}${import.meta.env.VITE_CURRENCY}`;
    }
    return `${isNegative ? '-' : ''}${import.meta.env.VITE_CURRENCY}${displayAmount}`;
}