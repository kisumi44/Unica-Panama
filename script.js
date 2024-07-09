document.getElementById('product-search').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchProduct();
    }
});

function searchProduct() {
    const searchQuery = document.getElementById('product-search').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchQuery)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function addProduct() {
    const name = document.getElementById('newProductName').value;
    const category = document.getElementById('newProductCategory').value;
    const costPrice = document.getElementById('newProductCostPrice').value;
    const price = document.getElementById('newProductPrice').value;

    // 创建新的产品卡片
    const productGrid = document.getElementById('product-grid');
    const newProductId = `product-${Date.now()}`;
    const newProductCard = document.createElement('div');
    newProductCard.classList.add('product-card');
    newProductCard.id = newProductId;

    newProductCard.innerHTML = `
        <h3>${name}</h3>
        <p>品类: ${category}</p>
        <p>价格: ${price}</p>
        <button class="edit-button" onclick="openEditModal('${name}', '${category}', '${costPrice}', '${price}', '${newProductId}')">编辑</button>
        <button class="delete-button" onclick="deleteProduct('${newProductId}')">删除</button>
    `;

    productGrid.appendChild(newProductCard);

    console.log('Adding new product:', name, category, costPrice, price);
    // 清空表单并关闭模态窗口
    document.getElementById('addForm').reset();
    closeAddModal();
    showFeedback('addFeedback', '新增产品成功', 'success');
}

function searchCustomer() { 
    console.log('Searching for customer:', document.getElementById('customer-search').value); 
}

function addCustomer() { 
    console.log('Adding new customer'); 
}

function searchSupplier() { 
    console.log('Searching for supplier:', document.getElementById('supplier-search').value); 
}

function addSupplier() { 
    console.log('Adding new supplier'); 
}

function searchOrder() { 
    console.log('Searching for order:', document.getElementById('order-search').value); 
}

function addOrder() { 
    console.log('Adding new order'); 
}

// 搜索和添加应收帐款、应付账款、营业额、交货的功能
function searchAccountsReceivable() { 
    console.log('Searching for accounts receivable'); 
}

function addAccountsReceivable() { 
    console.log('Adding new accounts receivable'); 
}

function searchAccountsPayable() { 
    console.log('Searching for accounts payable'); 
}

function addAccountsPayable() { 
    console.log('Adding new accounts payable'); 
}

function searchRevenue() { 
    console.log('Searching for revenue'); 
}

function addRevenue() { 
    console.log('Adding new revenue'); 
}

function searchDelivery() { 
    console.log('Searching for delivery'); 
}

function addDelivery() { 
    console.log('Adding new delivery'); 
}

// 编辑功能相关代码
function openEditModal(name, category, costPrice, price, productId) {
    document.getElementById('productName').value = name;
    document.getElementById('productCategory').value = category;
    document.getElementById('productCostPrice').value = costPrice;
    document.getElementById('productPrice').value = price;
    document.getElementById('editModal').dataset.productId = productId;
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveProduct() {
    // 获取编辑后的产品信息
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const costPrice = document.getElementById('productCostPrice').value;
    const price = document.getElementById('productPrice').value;
    const productId = document.getElementById('editModal').dataset.productId;

    console.log('Saving product:', name, category, costPrice, price);
    // 更新产品卡片
    const productCard = document.getElementById(productId);
    productCard.querySelector('h3').textContent = name;
    productCard.querySelector('p:nth-child(2)').textContent = `品类: ${category}`;
    productCard.querySelector('p:nth-child(3)').textContent = `价格: ${price}`;

    // 更新编辑模态窗口中的信息
    document.getElementById('productName').value = name;
    document.getElementById('productCategory').value = category;
    document.getElementById('productCostPrice').value = costPrice;
    document.getElementById('productPrice').value = price;

    // 清空表单并关闭模态窗口
    document.getElementById('editForm').reset();
    closeEditModal();
    showFeedback('editFeedback', '产品保存成功', 'success');
}

// 删除产品功能
function deleteProduct(productId) {
    if (confirm('确定要删除这个产品吗？')) {
        const productElement = document.getElementById(productId);
        if (productElement) {
            productElement.remove();
            console.log('Deleted product:', productId);
            showFeedback('addFeedback', '产品删除成功', 'success');
        } else {
            showFeedback('addFeedback', '产品删除失败', 'error');
        }
    }
}

// 新增产品功能
function openAddModal() {
    document.getElementById('newProductName').value = '';
    document.getElementById('newProductCategory').value = '';
    document.getElementById('newProductCostPrice').value = '';
    document.getElementById('newProductPrice').value = '';
    document.getElementById('addModal').style.display = 'block';
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

// 点击模态窗口外部关闭模态窗口
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

// 显示反馈信息
function showFeedback(elementId, message, type) {
    const feedbackElement = document.getElementById(elementId);
    feedbackElement.textContent = message;
    feedbackElement.style.color = type === 'success' ? 'green' : 'red';
    setTimeout(() => {
        feedbackElement.textContent = '';
    }, 3000);
}
