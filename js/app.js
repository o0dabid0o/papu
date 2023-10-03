class Product{
    constructor(name, price, quantity, date){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.date = date;
    }
}

class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong>: ${product.name}
                    <strong>Product quantity</strong>: ${product.quantity}
                    <strong>Product price</strong>: ${product.price}
                    <strong>Product date</strong>: ${product.date}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        
    }

    resetForm(){
        document.getElementById('product-form').reset();
        document.getElementById('year').valueAsDate = new Date();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product deleted successfully', 'info');
        }

    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);

    }
}

//DOM EVENTS
document.getElementById('year').valueAsDate = new Date();
document.getElementById('product-form')
    .addEventListener('submit', function(e){
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;
        const year = document.getElementById('year').value;

        const product = new Product(name, price, quantity, year);

        const ui = new UI();

        if(name === '' || price === '' || quantity === '' || year === ''){
            return ui.showMessage('Complete fields please', 'danger');
        }
        
        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Product added successfully', 'success');

        e.preventDefault();
    });

    document.getElementById('product-list')
        .addEventListener('click', function(e){
            const ui = new UI();
            ui.deleteProduct(e.target);

    });