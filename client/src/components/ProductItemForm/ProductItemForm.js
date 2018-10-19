import './ProductItemForm.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class ProductItemForm extends Component {

    constructor(props) {
        super(props);
    }

    handlerSubmit(prodId) {
        let productData = {
            name: this.refs.productName.value,
            category: this.refs.productCategory.value,
            price: this.refs.productPrice.value,
            stock: this.refs.productStock.value
        }

        this.props.saveProd(prodId, productData);
    }

    render() {
        return <form className="product-item-form" onSubmit={() => this.handlerSubmit(this.props.product.id)}> 
            <h3 className="product-item-form__title"> {this.props.product.name ? 'Edit product' : 'Add new product'}</h3>
                <div className="product-item__info">
                    <div className="app-form-row">
                        <label htmlFor="product-item-form__name">Name: </label>
                        <input id="product-item-form__name" type="text" ref="productName" defaultValue={this.props.product.name} />
                    </div>
                    <div className="app-form-row">
                        <label htmlFor="product-item-form__category">Category: </label>
                        <input id="product-item-form__category" type="text" ref="productCategory" defaultValue={this.props.product.category} />
                    </div>
                    <div className="app-form-row">
                        <label htmlFor="product-item-form__price">Price: </label>
                        <input id="product-item-form__price" type="text" ref="productPrice" defaultValue={this.props.product.price} />
                    </div>
                    <div className="app-form-row">
                        <label htmlFor="product-item-form__stock">Stock: </label>
                        <input id="product-item-form__stock" type="text" ref="productStock" defaultValue={this.props.product.stock} />
                    </div>
                    <div className="app-form-row">
                        <input type="submit" />
                    </div>
                </div>
            </form>
    }

}


export default ProductItemForm;