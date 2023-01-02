import { Col, Row } from "react-bootstrap"
import ProductTile from "../components/ProductTile"
import { useCFilter } from "../context/FilterContext"
import products from "../storage/products.json" 

function Store() {
  const {filterCategory, filterOpen} = useCFilter()
  return (
    <>
        <h1>Sklep</h1>
        <div className="filter-menu-button bg-light border-left border-right border-bottom" onClick={filterOpen}>Filtry</div>
        <Row md={2} lg={3} className="g-4">
            {products.filter(cat => filterCategory.includes(cat.category)).map(product => (
                <Col key={product.id}>
                    <ProductTile {...product} />
                </Col>
                ))}
        </Row>
    </>
  )
}

export default Store