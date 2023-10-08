document.getElementById('flexSwitchCheckDefault').addEventListener('change', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.querySelector('main').style.backgroundColor = 'LightGrey';
    } 
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.querySelector('main').style.backgroundColor = 'DarkSlateGrey';
    }
})
// the below line is to default the theme to dark
document.querySelector('main').style.backgroundColor = 'DarkSlateGrey';
