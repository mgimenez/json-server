import './App.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HeaderNav from '../HeaderNav/HeaderNav';
import ProductList from '../ProductList/ProductList';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }

        this.removeProd = this.removeProd.bind(this);
    }

    componentWillMount() {

        fetch('http://localhost:3000/products')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({ products: data });
                localStorage.setItem('products', JSON.stringify(this.state.products));
            })
    }

    removeProd(prodId) {
        this.state.products.map((item, index) => {
            if (prodId === item.id) {
                this.state.products.splice(index, 1);

                fetch('http://localhost:3000/products/' + prodId, {
                    method: 'delete'
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    this.setState({ products: this.state.products });
                    localStorage.setItem('products', JSON.stringify(this.state.products));
                })

            }
        })
    }

    editProd(prodId) {
        let prodRow = document.querySelector(`.product-item[data-product-id="${prodId}"]`);
        console.log(prodRow);
        prodRow.querySelector('.product-item__info').setAttribute('contenteditable', true);
        // console.log(prodId);
    }

    render() {
        return <div>
            <HeaderNav />
            <ProductList products={this.state.products} removeProd={this.removeProd} editProd={this.editProd}  />
        </div>
    }

}


export default App;
