const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menuBtn');
const closeBtn = document.querySelector('#closeBtn');
const themeToggler = document.querySelector('.theme_toggler');

// open sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

// close sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

// change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark_theme');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

// orders
Orders.forEach( order => {
    const tr = document.createElement('tr');
    const trContent = `
                        <td>${order.productName}</td>
                        <td>${order.productNumber}</td>
                        <td>${order.paymentStatus}</td>
                        <td class='${order.shipping === 'Declined' ? 'danger' : order.shipping === 'Pending' ? 'warning' : 'primary'}'>${order.shipping}</td>
                        <td class='primary'>Details</td>`;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr)
})