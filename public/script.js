document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProducts();
    loadReport();

    const modal = document.getElementById('productModal');
    const addBtn = document.getElementById('addBtn');
    const closeBtn = document.querySelector('.close');
    const productForm = document.getElementById('productForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Auth Check
    async function checkAuth() {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        if (!data.authenticated) {
            window.location.href = '/login.html';
        } else {
            document.getElementById('welcomeMsg').textContent = `Welcome, ${data.user.username}`;
        }
    }

    // Logout
    logoutBtn.addEventListener('click', async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/login.html';
    });

    // Load Products
    async function loadProducts() {
        const res = await fetch('/api/products');
        const products = await res.json();
        const tbody = document.getElementById('productBody');
        tbody.innerHTML = '';

        products.forEach(p => {
            const tr = document.createElement('tr');
            const imgSrc = p.image ? `/uploads/${p.image}` : 'https://via.placeholder.com/50';
            tr.innerHTML = `
                <td><img src="${imgSrc}" class="product-img" alt="${p.name}"></td>
                <td>${p.name}</td>
                <td>${p.description || '-'}</td>
                <td>$${parseFloat(p.price).toFixed(2)}</td>
                <td>${p.quantity}</td>
                <td>
                    <button class="btn-edit" onclick="editProduct(${p.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Load Report
    async function loadReport() {
        const res = await fetch('/api/products/report');
        const report = await res.json();
        document.getElementById('totalProducts').textContent = report.totalProducts || 0;
        document.getElementById('totalStock').textContent = report.totalStock || 0;
        document.getElementById('totalValue').textContent = `$${parseFloat(report.totalValue || 0).toFixed(2)}`;
    }

    // Modal Controls
    addBtn.onclick = () => {
        document.getElementById('modalTitle').textContent = 'Add Product';
        productForm.reset();
        document.getElementById('productId').value = '';
        modal.style.display = 'block';
    };

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };

    // Save Product
    productForm.onsubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById('productId').value;
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('quantity', document.getElementById('quantity').value);
        
        const imageFile = document.getElementById('image').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/products/${id}` : '/api/products';

        const res = await fetch(url, {
            method,
            body: formData
        });

        if (res.ok) {
            modal.style.display = 'none';
            loadProducts();
            loadReport();
        } else {
            alert('Error saving product');
        }
    };

    // Global functions for buttons in table
    window.editProduct = async (id) => {
        const res = await fetch(`/api/products/${id}`);
        const p = await res.json();
        
        document.getElementById('modalTitle').textContent = 'Edit Product';
        document.getElementById('productId').value = p.id;
        document.getElementById('name').value = p.name;
        document.getElementById('description').value = p.description;
        document.getElementById('price').value = p.price;
        document.getElementById('quantity').value = p.quantity;
        
        modal.style.display = 'block';
    };

    window.deleteProduct = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                loadProducts();
                loadReport();
            } else {
                alert('Error deleting product');
            }
        }
    };
});
