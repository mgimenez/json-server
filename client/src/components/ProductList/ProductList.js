import './ProductList.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ProductItem from '../ProductItem/ProductItem';

class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <section className="product-list">
            <h2 className="product-list__title">Products</h2>
            <ul>
                {
                    this.props.products.map((item, index) => {
                        return <ProductItem key={index} product={item} removeProd={this.props.removeProd} editProd={this.props.editProd} />
                    })
                }
            </ul>
        </section>
    }

}


export default ProductList;
