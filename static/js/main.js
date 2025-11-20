// ----------------------Login/Sign Up Function----------------------------------
    const dlg = document.getElementById('loginDialog');
    document.getElementById('openLogin').addEventListener('click', () => dlg.showModal());
    document.getElementById('closeLogin').addEventListener('click', () => dlg.close());
    // 是否需要加一个X的关闭按钮？
    // 登录是使用email还是别的自由命名？目前必须使用email登录
    // ※注意一下这里的提交表单是否需要防止重定向

// ----------------------Map Function--------------------------------------------
    // mapboxgl.accessToken = 'pk.eyJ1IjoiaDg2OTY2MTM2OCIsImEiOiJjbWgweXdiYXIyam4zMmpxMm4xdzVxdDZ3In0.ss474gDeBh40T0_8FFKw2A';

    // const map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v12', // 样式ID
    //   center: [-79.3832, 43.6532], // 多伦多坐标
    //   zoom: 12
    // });

    // // Add map scale handle 添加缩放控件
    // map.addControl(new mapboxgl.NavigationControl());

    // // Add Marker 添加标记
    // new mapboxgl.Marker().setLngLat([-79.3832, 43.6532]).addTo(map);

// -----------------------Note----------------------------------------------------
    // 目前的架构到底是跟着flask项目结构做还是跟着原来的js文件夹结构做？
    // ※ ※ ※记得把导航做成模板！！！！！！！
    // 首页到底叫homepage还是index？
    // start的颜色不对，需要吸色调整





// --------------------------call UI-----------------------------------
// 设计一个登录页面
    // 登录和注册是同一个按钮和页面吗？
// 登录图标旁边的用户头像，在没登陆前哪来的登录头像？需要设计登录前和登陆后的区别显示（※ 代码也需要设置此功能！！！）
// -------------------------call Art-------------------------------------
    // need a new Icon