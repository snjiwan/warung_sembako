document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Fungsi untuk menangani login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('error');
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(user => user.username === username && user.password === password);
            
            if (user) {
                localStorage.setItem('username', username);
                window.location.href = 'index.html';
            } else {
                errorElement.textContent = 'Username atau password salah';
                errorElement.style.display = 'block';
                setTimeout(() => {
                    errorElement.style.display = 'none';
                }, 3000);
            }
        });
    }

    // Fungsi untuk menangani registrasi
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const errorElement = document.getElementById('registerError');
            let users = JSON.parse(localStorage.getItem('users')) || [];

            const userExists = users.some(user => user.username === username);
            
            if (userExists) {
                errorElement.textContent = 'Username sudah ada, gunakan username lain';
                errorElement.style.display = 'block';
                setTimeout(() => {
                    errorElement.style.display = 'none';
                }, 3000);
            } else {
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registrasi berhasil! Silakan login.');
                window.location.href = 'login.html';
            }
        });
    }
});

const products = [
    { id: 1, name: 'Gula Pasir', price: 5500, img: 'D:/Image/Gula Pasir.jpeg' },
    { id: 2, name: 'Beras Pandan Wangi', price: 18000, img: 'D:/Image/Beras PW.jpeg' },
    { id: 3, name: 'Minyak', price: 5000, img: 'D:/Image/Minyak.jpeg' },
    { id: 4, name: 'Terigu', price: 3000, img: 'D:/Image/Terigu.jpeg' },
    { id: 5, name: 'Kara Sun', price: 4000, img: 'D:/Image/Kara Sun.jpeg' },
    { id: 6, name: 'Aci', price: 3000, img: 'D:/Image/Aci.jpeg' }
];

function scrollLeft() {
    const productList = document.querySelector('.product-list');
    productList.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
}

function scrollRight() {
    const productList = document.querySelector('.product-list');
    productList.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
}

        function addToCart(productName, productPrice) {
    // Ambil data keranjang dari localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tambahkan produk ke keranjang
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Tampilkan pesan notifikasi
    showNotification("Produk berhasil ditambahkan ke keranjang!");
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;

    document.body.appendChild(notification);

    // Hapus notifikasi setelah beberapa detik
    setTimeout(() => {
        notification.remove();
    }, 3000); // 3 detik
}

document.addEventListener("DOMContentLoaded", () => {
    const checkoutContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('totalPrice');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `<p>${item.name} - Rp. ${item.price}</p>`;
        checkoutContainer.appendChild(cartItem);

        totalPrice += item.price;
    });

    totalPriceElement.innerText = `Rp. ${totalPrice}`;
});

function completeCheckout() {
    alert('Terima kasih telah melakukan pembelian!');
    localStorage.removeItem('cart'); // Kosongkan keranjang setelah pembelian
    window.location.href = 'index.html'; // Arahkan kembali ke halaman utama
}

// Fungsi untuk menambahkan item ke keranjang
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productItem = event.target.closest('.product-item');
        const name = productItem.getAttribute('data-name');
        const price = productItem.getAttribute('data-price');
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item berhasil ditambahkan ke keranjang');
}

// Fungsi untuk menampilkan item di keranjang
const cartItemsContainer = document.getElementById('cart-items');
if (cartItemsContainer) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Harga: Rp. ${item.price}</p>
            <p>Jumlah: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    const cartTotalContainer = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalContainer.innerHTML = `<h3>Total: Rp. ${total}</h3>`;
}

// Fungsi untuk menangani checkout
const checkoutButton = document.getElementById('checkout');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        alert('Terima kasih telah membeli!');
        window.location.href = 'index.html';
    });
}
;
