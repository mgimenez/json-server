import './App.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HeaderNav from '../HeaderNav/HeaderNav';
import ProductList from '../ProductList/ProductList';
import Modal from 'react-modal';
import ProductItemForm from '../ProductItemForm/ProductItemForm';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: '50%',
        transform: 'translate(-50%, -50%)'
    }
};


Modal.setAppElement('#root');
class App extends Component {

    constructor(props) {
        super(props);


        
        this.state = {
            products: [],
            product: {},
            modalIsOpen: false 
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.editProd = this.editProd.bind(this);
        this.removeProd = this.removeProd.bind(this);
        this.saveProd = this.saveProd.bind(this);
        this.addProd = this.addProd.bind(this);
    }

    componentWillMount() {

        fetch('http://localhost:3000/products')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({ products: data });
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
                })

            }
        })
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    editProd(prodId) {
        let currentProduct;
        this.state.products.map((item, index) => {
            if (prodId === item.id) currentProduct = item;
        })

        this.setState({ product: currentProduct });
        this.openModal();
    }

    addProd() {
        this.setState({ product: [] });
        this.openModal();
    }

    saveProd(prodId, productData) {
        //If there's prodId value is an update else is a new one.
        prodId = prodId !== undefined ? prodId : '';
        let method = prodId !== '' ? 'PUT' : 'POST';

        fetch('http://localhost:3000/products/' + prodId, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (prodId) {
                this.state.products.map((item, index) => {
                    if (prodId === item.id) {
                        this.state.products[index] = data;
                        this.forceUpdate();
                        return false;
                    }
                })
            } else {
                this.state.products.push(data);
                this.forceUpdate();
            }





            
        })
        this.closeModal();
    }

    render() {
        return <div>
            <HeaderNav />
            <ProductList products={this.state.products} removeProd={this.removeProd} editProd={this.editProd} addProd={this.addProd} />
            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles}>
                <ProductItemForm product={this.state.product} saveProd={this.saveProd} />
            </Modal>
        </div>
    }

}


export default App;
