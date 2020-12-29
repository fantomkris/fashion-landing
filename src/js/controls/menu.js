var Menu = function() {
    const menuList = document.getElementsByClassName('js-menu-list')[0];
    const menuButton = document.getElementsByClassName('js-menu-button')[0];

    function closeMenu() {
        menuList.classList.add('hidden');
        menuList.classList.remove('show');
    }

    document.addEventListener('click', function(e) {
        let isClickedMenu = document.getElementsByClassName('js-menu')[0].contains(e.target);

        if(!isClickedMenu) {
            closeMenu();
        }

    });

    menuButton.onclick = function() {
        if(menuList.classList.contains('hidden')) {
            menuList.classList.add('show');
            menuList.classList.remove('hidden');
        } else {
            closeMenu();
        };
    };
}

module.exports = Menu;
