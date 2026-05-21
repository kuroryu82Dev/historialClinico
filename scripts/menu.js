CargarMenu = async () => {
    try {

        const navMenu = document.getElementById('menu');
        const menu = await fetch('../json/menu.json');
        const menuJson = await menu.json();

        console.log(menuJson);

        const menuList = document.createElement('ul');
        menuList.className = 'menu-list';

        menuJson.forEach(item => {
            const menuItem = document.createElement('li');
            const menuLink = document.createElement('a');

            menuLink.href = item.path;
            menuLink.textContent = item.name;

            menuItem.appendChild(menuLink);
            menuList.appendChild(menuItem);
        });

        navMenu.appendChild(menuList);
    }
    catch (error) {
        console.error('Error al cargar el menú:', error);
    }
}

//Llamar a la función cuando se cargue la página
window.addEventListener('DOMContentLoaded', CargarMenu);