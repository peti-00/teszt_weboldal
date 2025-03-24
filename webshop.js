let fiokname = '';
let fiokemail = '';
let fiokaddress = '';
let veglegname = '';
let veglegemail = '';
let veglegaddress = '';
let szallitas = '';
let asd;

function addToCart(productName) {
    alert(productName + ' hozzáadva a kosárhoz!');
}

function showmain() {
    document.getElementById('main').style.display = 'block';
    document.getElementById('order_').style.display = 'none';

    document.getElementById('lead').style.display = 'none';

    document.getElementById('vadat').style.display = 'none';
    document.getElementById('kosar').style.display = 'none'
    document.getElementById('nagykosar').style.display = 'none';
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('regisztracio').style.display = 'none';
    document.getElementById('belepes').style.display = 'none';

    if (fiokname) {
        document.getElementById('welcome-message').innerText = 'Üdvözlünk, ' + fiokname + '!';
    }
}


function filterProducts() {
    const searchValue = document.getElementById('search-bar').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();

        if (productName.includes(searchValue)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}





function animateAddToCart(imageSrc) {
    // Animációs kép létrehozása
    const productImage = document.createElement("img");
    productImage.src = imageSrc;
    productImage.className = "floating-image";

    // Hozzáadás a DOM-hoz
    document.body.appendChild(productImage);

    // Az esemény céljának pozíciójának meghatározása
    const productElement = event.target.closest(".product");
    const productRect = productElement.getBoundingClientRect();

    // Görgetési pozíció figyelembe vétele
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Kép kezdő pozíciójának beállítása
    productImage.style.top = `${productRect.top + scrollTop}px`;
    productImage.style.left = `${productRect.left + scrollLeft}px`;

    // Kosár ikon pozíciójának meghatározása
    const cartIcon = document.querySelector("#kosar img");
    const cartRect = cartIcon.getBoundingClientRect();

    // Animáció végső pozíciójának beállítása
    const targetX = cartRect.left + scrollLeft;
    const targetY = cartRect.top + scrollTop;

    // Animáció elindítása
    setTimeout(() => {
        productImage.style.transform = `translate(${targetX - (productRect.left + scrollLeft)}px, ${targetY - (productRect.top + scrollTop)}px) scale(0.5)`;
        productImage.style.opacity = "0";
    }, 50);

    // Az elem eltávolítása az animáció vége után
    productImage.addEventListener("transitionend", () => {
        productImage.remove();
    });
}

function clearOrders() {
    const ordersContainer = document.getElementById("orders-container");
    ordersContainer.innerHTML = ""; // Törli az összes gyermekelemet
}

function showorder(){
    clearOrders()
    getOrdersByEmail(fiokemail)
    document.getElementById('main').style.display = 'none';

    document.getElementById('order_').style.display = 'block';
    document.getElementById('lead').style.display = 'none';
    document.getElementById('vadat').style.display = 'none';
    document.getElementById('kosar').style.display = 'flex'
    document.getElementById('nagykosar').style.display = 'none';
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('regisztracio').style.display = 'none';
    document.getElementById('belepes').style.display = 'none';
}

function showkosar(){
    document.getElementById('main').style.display = 'none';

    document.getElementById('order_').style.display = 'none';
    document.getElementById('lead').style.display = 'none';
    document.getElementById('kosar').style.display = 'none'
    document.getElementById('nagykosar').style.display = 'block';
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('belepes').style.display = 'none';
    document.getElementById('regisztracio').style.display = 'none';
    document.getElementById('vadat').style.display = 'none';


}

function showadateldont(){
    document.getElementById('main').style.display = 'none';

    document.getElementById('order_').style.display = 'none';
    document.getElementById('lead').style.display = 'none';
    document.getElementById('nagykosar').style.display = 'none';
    document.getElementById('vadat').style.display = 'block';
}

function showRegisterForm() {
    document.getElementById('main').style.display = 'none';

    document.getElementById('order_').style.display = 'none';

    document.getElementById('lead').style.display = 'none';
    document.getElementById('kosar').style.display = 'none';
    document.getElementById('nagykosar').style.display = 'none';
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('regisztracio').style.display = 'block';
    document.getElementById('belepes').style.display = 'none';
    document.getElementById('vadat').style.display = 'none';
}

function showSigninForm() {
    document.getElementById('main').style.display = 'none';

    document.getElementById('lead').style.display = 'none';
    document.getElementById('order_').style.display = 'none';

    document.getElementById('kosar').style.display = 'none';
    document.getElementById('nagykosar').style.display = 'none';
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('regisztracio').style.display = 'none';
    document.getElementById('belepes').style.display = 'block';
    document.getElementById('vadat').style.display = 'none';
}

function showProducts() {
    document.getElementById('main').style.display = 'none';

    document.getElementById('order_').style.display = 'none';

    document.getElementById('lead').style.display = 'none';

    document.getElementById('vadat').style.display = 'none';
    document.getElementById('kosar').style.display = 'flex'
    document.getElementById('nagykosar').style.display = 'none';
    document.getElementById('product-container').style.display = 'flex';
    document.getElementById('regisztracio').style.display = 'none';
    document.getElementById('belepes').style.display = 'none';

    if (fiokname) {
        document.getElementById('welcome-message').innerText = 'Üdvözlünk, ' + fiokname + '!';
    }
}

// regisztráció
async function registerUser() {
    const userDetails = {
        userEmail: document.getElementById('email').value,
        userPassword: document.getElementById('password').value,
        userName: document.getElementById('name').value,
        userAddress: document.getElementById('address').value
    };

    if (userDetails.userName && userDetails.userEmail && userDetails.userAddress && userDetails.userPassword) {
        const registrationSuccessful = await addUser(userDetails);

        if (registrationSuccessful) {
            fiokname = userDetails.userName;
            fiokemail = userDetails.userEmail;
            fiokaddress = userDetails.userAddress;

            // Üres mezők törlése
            document.getElementById('password').value = '';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('address').value = '';

            document.getElementById('fiokom-link').style.display = 'none';
            document.getElementById('logout-button').style.display = 'block';
            document.getElementById('rendeleseim').style.display = 'block';

            showProducts();

            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Sikeres Regisztráció",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: "Ez az email már létezik, kérlek válassz másikat!",
                footer: '<a href="#">Felhasználási feltételek</a>'
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Töltsön ki minden mezőt kérem!",
            footer: '<a href="#">Felhasználási feltételek</a>'
        });
    }
}

// bejelentkezés
// Helyi bejelentkezési függvény átnevezése
async function signinUserLocal() {
    const userDetails = {
        userEmail: document.getElementById('email_').value,
        userPassword: document.getElementById('password_').value,
    };

    if (userDetails.userEmail && userDetails.userPassword) {
        const result = await signinUser(userDetails.userEmail, userDetails.userPassword);

        if (result.success) {
            fiokname = result.data.name;
            fiokemail = userDetails.userEmail;
            fiokaddress = result.data.address;

            document.getElementById('password_').value = '';
            document.getElementById('email_').value = '';

            document.getElementById('fiokom-link').style.display = 'none';
            document.getElementById('rendeleseim').style.display = 'block';

            document.getElementById('logout-button').style.display = 'block';

            showProducts();

            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Sikeres bejelentkezés",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: result.message,
                footer: '<a href="#">Felhasználási feltételek</a>'
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Töltsön ki minden mezőt kérem!",
            footer: '<a href="#">Felhasználási feltételek</a>'
        });
    }
}

function logout() {
    fiokname = '';
    fiokemail = '';
    fiokaddress = '';
    veglegemail = '';
    veglegaddress = '';
    veglegname = '';
    document.getElementById('welcome-message').innerText = '';
    document.getElementById('fiokom-link').style.display = 'block';
    document.getElementById('logout-button').style.display = 'none';
    document.getElementById('rendeleseim').style.display = 'none';

    showProducts();
    showDiv(3);
    szall(3)

    Swal.fire({
        position: "top-center",
        icon: "info",
        title: "Sikeres kijelentkezés",
        showConfirmButton: false,
        timer: 1500
    });
}

const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');
let totalPrice = 0;

// Globális lista a kosár elemeinek tárolására
const cartItems = [];

// Frissített függvény
function addToCart(name, image, price) {
    // Létrehoz egy új div elemet a kosárhoz
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Beállítja a HTML-t az új kosárelemhez
    cartItem.innerHTML = `
        <img src="${image}" alt="${name}">
        <div class="content">
            <span>${name} - ${price.toLocaleString()} Ft</span>
            <button class="remove-button">Eltávolítás</button>
        </div>
        <br>
        <br>
    `;

    // Hozzáadja az új elemet a kosárhoz
    cartList.appendChild(cartItem);

    // Frissíti az összértéket
    updateTotal(price);

    // Hozzáadás a globális listához
    cartItems.push({ name, price });

    // Keresés az eltávolító gombokkal és eseménykezelők hozzáadása
    const removeButton = cartItem.querySelector('.remove-button');
    removeButton.addEventListener('click', function() {
        removeFromCart(cartItem, price);
    });

    // A vasterm nevű div-be az aktuális elemek hozzáadása
    const vastermDiv = document.getElementById('vasterm');
    const itemElement = document.createElement('div');
    itemElement.classList.add('vasterm-item');
    itemElement.innerText = `${name} - ${price.toLocaleString()} Ft`;
    vastermDiv.appendChild(itemElement);
}



function removeFromCart(cartItem, price) {
    // A kosár elemet eltávolítjuk
    cartList.removeChild(cartItem);

    // Frissíti az összértéket
    updateTotal(-price);

    // Kikeressük a vasterm-ben az eltávolítandó elemet
    const vastermDiv = document.getElementById('vasterm');
    const itemName = cartItem.querySelector('.content span').innerText.split(' - ')[0];

    // Megkeressük és eltávolítjuk az első egyező elemet
    const vastermItems = vastermDiv.querySelectorAll('.vasterm-item');
    for (let i = 0; i < vastermItems.length; i++) {
        const item = vastermItems[i];
        if (item.innerText.startsWith(itemName)) {
            vastermDiv.removeChild(item);
            break; // Megállítjuk a ciklust az első találat után
        }
    }

    // Az elem törlése a `cartItems` listából
    const itemIndex = cartItems.findIndex((item) => item.name === itemName);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1); // Eltávolítjuk az elemet a listából
    }
}



function updateTotal(amount) {
    // Összérték frissítése
    totalPrice += amount;
    totalPriceElement.textContent = totalPrice.toLocaleString();
}

function showDiv(selected) {
    const div3 = document.getElementById('div3');
    const div4 = document.getElementById('div4');

    if (selected === 1) {
        if (fiokname && fiokemail && fiokaddress){
            document.getElementById('fizetes2').classList.add('hidden')
            document.getElementById('fizetes1').classList.remove('hidden')
            document.getElementById('div1').classList.add('select')
            document.getElementById('div2').classList.remove('select')
            div3.classList.remove('hidden');
            div4.classList.add('hidden');
            const anev = document.getElementById('nev');
            anev.textContent = fiokname.toLocaleString()
            const vemail = document.getElementById('nemail');
            vemail.textContent = fiokemail.toLocaleString()
            const vaddress = document.getElementById('naddress');
            vaddress.textContent = fiokaddress.toLocaleString()

        }
        else {
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: "ahoz hogy ezt az opciót válassza be kell legyen lépve a fiókjába. kérem lépjen be a fiókjába vagy regisztráljon!",

                footer: '<a href="#">Felhasználási feltételek</a>'
            });
        }
    } else if (selected === 2) {
        document.getElementById('fizetes1').classList.add('hidden')
        document.getElementById('fizetes2').classList.remove('hidden')
        document.getElementById('div2').classList.add('select')
        document.getElementById('div1').classList.remove('select')
        div4.classList.remove('hidden');
        div3.classList.add('hidden');
    }
    else{
        document.getElementById('div1').classList.remove('select')
        document.getElementById('div2').classList.remove('select')
        div3.classList.add('hidden');
        div4.classList.add('hidden');
    }
}

function szall(sel){
    if (sel === 1){
        document.getElementById('div5').classList.add('select')
        document.getElementById('div6').classList.remove('select')
        szallitas = 'h'
    }
    else if(sel === 2){
        document.getElementById('div6').classList.add('select')
        document.getElementById('div5').classList.remove('select')
        szallitas = 'sz'
    }
    else {
        document.getElementById('div5').classList.remove('select')
        document.getElementById('div6').classList.remove('select')
        szallitas = ''

    }
}

function adatvegleg(selectede){
    if (selectede === 1){
        asd = 1
        veglegemail = fiokemail
        veglegaddress = fiokaddress
        veglegname = fiokname
    }
    else if (selectede === 2){
        asd = 2
        const a = document.getElementById("in1").value;
        const b = document.getElementById("in2").value;
        const c = document.getElementById("in3").value;
        if (a && b && c){
            veglegemail = b
            veglegaddress = c
            veglegname = a
        }
        else{
            veglegemail = ''
            veglegaddress = ''
            veglegname = ''
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: "Töltsön ki minden mezőt kérem!",
                footer: '<a href="#">Felhasználási feltételek</a>'
            });
        }
    }
    if (veglegemail && veglegname && veglegaddress && szallitas){
        document.getElementById('menu').style.display = 'none';
        document.getElementById('welcome-message').style.display = 'none';
        document.getElementById('lead').style.display = 'block';
        document.getElementById('vadat').style.display = 'none';
        vegleg()
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Töltsön ki minden mezőt kérem!",
            footer: '<a href="#">Felhasználási feltételek</a>'
        });
    }
}

function vegleg(){
    const anev = document.getElementById('leadnev');
    anev.textContent = veglegname.toLocaleString()
    const vemail = document.getElementById('leademail');
    vemail.textContent = veglegemail.toLocaleString()
    const vaddress = document.getElementById('leadaddress');
    vaddress.textContent = veglegaddress.toLocaleString()
    const vrosz = document.getElementById('leadreszosszeg');
    vrosz.textContent = totalPrice.toLocaleString()
    var vegosszeg = '';
    var szallitmod = '';
    if (szallitas === 'h'){
        const vszal = document.getElementById('leadszallitas');
        vszal.textContent = 'házhoz szállítás + 1500ft';
        szallitmod = 'h'
        const vosz = document.getElementById('leadvegosszeg');
        vosz.textContent = (totalPrice + 1500).toLocaleString()
        vegosszeg = (totalPrice + 1500);
    }
    else if(szallitas === 'sz'){
        const vszal = document.getElementById('leadszallitas');
        vszal.textContent = 'személyes átvétel ingyenes';
        szallitmod = 'sz'
        const vosz = document.getElementById('leadvegosszeg');
        vosz.textContent = totalPrice.toLocaleString()
        vegosszeg = totalPrice;
    }
    const min = 1000000;
    const max = 2000000;
    const kosarID = Math.floor(Math.random() * (max - min + 1)) + min;



    const vasarlasadat = {
        name: veglegname,
        email: veglegemail,
        address: veglegaddress,
        part_amount: totalPrice,
        delivery: szallitmod,
        total_amount: vegosszeg,
        selected: asd,
        kosar_ID: kosarID
    }



    savedata(vasarlasadat, cartItems)

}
function reset(){
    location.reload()
}