type PriceTagProps = {
    normal: number
    promo: number
}

function PriceTag(props: PriceTagProps) {
    let price:string = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(props.promo > 0 ? props.promo : props.normal)
    let diff:string = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(props.promo - props.normal)
  return (
    <span className={`position-relative ${props.promo > 1 ? "text-danger" : "text-muted" }`}>
        {price}
        {props.promo === -1.0 ? null :
        (
            <span className="promo-tag position-absolute badge rounded-pill bg-danger">{diff}</span>
        )}
    </span>
  )
}

export default PriceTag