document.getElementById('product-search').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchProduct();
    }
});

let products = {};

function searchProduct() {
    const searchQuery = document.getElementById('product-search').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchQuery)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(product => {
        const productCategory = product.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        if (categoryFilter === '' || productCategory === categoryFilter) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function sortProducts() {
    const sortOption = document.getElementById('sort-products').value;
    const productGrid = document.getElementById('product-grid');
    const productCards = Array.from(productGrid.children);

    productCards.sort((a, b) => {
        const nameA = a.querySelector('h3').textContent;
        const nameB = b.querySelector('h3').textContent;
        const priceA = parseFloat(a.querySelector('p:nth-child(3)').textContent.split(': ')[1]);
        const priceB = parseFloat(b.querySelector('p:nth-child(3)').textContent.split(': ')[1]);

        if (sortOption === 'name-asc') return nameA.localeCompare(nameB);
        if (sortOption === 'name-desc') return nameB.localeCompare(nameA);
        if (sortOption === 'price-asc') return priceA - priceB;
        if (sortOption === 'price-desc') return priceB - priceA;
    });

    productGrid.innerHTML = '';
    productCards.forEach(product => productGrid.appendChild(product));
}

function addProduct() {
    const name = document.getElementById('newProductName').value;
    const category = document.getElementById('newProductCategory').value;
    const costPrice = document.getElementById('newProductCostPrice').value;
    const price = document.getElementById('newProductPrice').value;
    const imageFile = document.getElementById('newProductImage').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;

        const productGrid = document.getElementById('product-grid');
        const newProductId = `product-${Date.now()}`;
        const newProductCard = document.createElement('div');
        newProductCard.classList.add('product-card');
        newProductCard.id = newProductId;

        newProductCard.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <h3>${name}</h3>
            <p>品类: ${category}</p>
            <p>价格: ${price}</p>
            <button class="edit-button" onclick="openEditModal('${newProductId}')">编辑</button>
            <button class="delete-button" onclick="deleteProduct('${newProductId}')">删除</button>
        `;

        productGrid.appendChild(newProductCard);

        products[newProductId] = { name, category, costPrice, price, imageUrl };

        document.getElementById('addForm').reset();
        closeAddModal();
        showFeedback('addFeedback', '新增产品成功', 'success');
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        const imageUrl = 'default.jpg';
        const productGrid = document.getElementById('product-grid');
        const newProductId = `product-${Date.now()}`;
        const newProductCard = document.createElement('div');
        newProductCard.classList.add('product-card');
        newProductCard.id = newProductId;

        newProductCard.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <h3>${name}</h3>
            <p>品类: ${category}</p>
            <p>价格: ${price}</p>
            <button class="edit-button" onclick="openEditModal('${newProductId}')">编辑</button>
            <button class="delete-button" onclick="deleteProduct('${newProductId}')">删除</button>
        `;

        productGrid.appendChild(newProductCard);

        products[newProductId] = { name, category, costPrice, price, imageUrl };

        document.getElementById('addForm').reset();
        closeAddModal();
        showFeedback('addFeedback', '新增产品成功', 'success');
    }
}

function openEditModal(productId) {
    const product = products[productId];
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productCostPrice').value = product.costPrice;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').dataset.imageUrl = product.imageUrl;
    document.getElementById('editModal').dataset.productId = productId;
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveProduct() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const costPrice = document.getElementById('productCostPrice').value;
    const price = document.getElementById('productPrice').value;
    const productId = document.getElementById('editModal').dataset.productId;
    const imageFile = document.getElementById('productImage').files[0];
    const currentImageUrl = document.getElementById('productImage').dataset.imageUrl;

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;

        const productCard = document.getElementById(productId);
        productCard.querySelector('img').src = imageUrl;
        productCard.querySelector('h3').textContent = name;
        productCard.querySelector('p:nth-child(2)').textContent = `品类: ${category}`;
        productCard.querySelector('p:nth-child(3)').textContent = `价格: ${price}`;

        // 更新全局产品数据
        products[productId] = { name, category, costPrice, price, imageUrl };

        document.getElementById('editForm').reset();
        closeEditModal();
        showFeedback('editFeedback', '产品保存成功', 'success');
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        const productCard = document.getElementById(productId);
        productCard.querySelector('img').src = currentImageUrl;
        productCard.querySelector('h3').textContent = name;
        productCard.querySelector('p:nth-child(2)').textContent = `品类: ${category}`;
        productCard.querySelector('p:nth-child(3)').textContent = `价格: ${price}`;

        // 更新全局产品数据
        products[productId] = { name, category, costPrice, price, imageUrl: currentImageUrl };

        document.getElementById('editForm').reset();
        closeEditModal();
        showFeedback('editFeedback', '产品保存成功', 'success');
    }
}

function deleteProduct(productId) {
    if (confirm('确定要删除这个产品吗？')) {
        const productElement = document.getElementById(productId);
        if (productElement) {
            productElement.remove();
            delete products[productId];
            showFeedback('addFeedback', '产品删除成功', 'success');
        } else {
            showFeedback('addFeedback', '产品删除失败', 'error');
        }
    }
}

function openAddModal() {
    document.getElementById('addForm').reset();
    document.getElementById('addModal').style.display = 'block';
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    const addModal = document.getElementById('addModal');
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
    if (event.target === addModal) {
        addModal.style.display = 'none';
    }
}

function showFeedback(elementId, message, type) {
    const feedbackElement = document.getElementById(elementId);
    feedbackElement.textContent = message;
    feedbackElement.style.color = type === 'success' ? 'green' : 'red';
    setTimeout(() => {
        feedbackElement.textContent = '';
    }, 3000);
}

function previousPage() {
    // 分页功能的上一页逻辑
}

function nextPage() {
    // 分页功能的下一页逻辑
}
