import './ProductItem.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ProductItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="product-item" data-product-id={this.props.product.id}>
            <div className="product-item__info">
                <h5 className="product-item__name">{this.props.product.name}</h5>
                <p className="product-item__category">{this.props.product.category}</p>
                <p className="product-item__price">$ {this.props.product.price}</p>
            </div>
            <a href="#" className="product-item__btn-edit app-btn" onClick={() => this.props.editProd(this.props.product.id)}>Edit</a>
            <a href="#" className="product-item__btn-remove app-btn" onClick={() => this.props.removeProd(this.props.product.id)}>Remove</a>
        </div>
    }

}


export default ProductItem;