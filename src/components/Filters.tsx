import { useEffect } from "react";
import { Offcanvas, Stack, Form  } from "react-bootstrap";
import { useCFilter } from "../context/FilterContext";
import products from "../storage/products.json"

type FilterProps = {
    isOpen: Boolean
}

function Filters({isOpen}: FilterProps) {
    const {filterClose, filterCategory, addCategory, removeCategory} = useCFilter()

    const categories = Array.from(new Set(products.map(product => product!.category)))

    const filterChange = (event: { target: { checked: any; name: string; }; }) => {

        if (event.target.checked) 
            addCategory(event.target.name)
        else
            removeCategory(event.target.name)
    }

    useEffect(() => {
        categories.map(cat => {
            addCategory(cat)
        })
      }, []);

  return (
    <Offcanvas show={isOpen} onHide={filterClose} placement="start">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Opcje filtrowania</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={2}>
            <Stack className="fw-bold">
                Kategorie produktów:
            </Stack>
            {categories.map(category => (
                <Stack direction="horizontal" gap={2} key={`s_${category}`}>
                    <Form.Check 
                        type="checkbox" 
                        key={`f_${category}`} 
                        onChange={filterChange} 
                        name={category} 
                        id={category} 
                        checked={filterCategory.find(cat => cat === category)} />
                    <label htmlFor={category} key={`l_${category}`}>&nbsp;{category}</label>
                </Stack>
                ))}
            </Stack>
    </Offcanvas.Body>
    </Offcanvas>
    
  )
}

export default Filters