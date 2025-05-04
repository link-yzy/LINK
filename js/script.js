// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // 滚动时高亮当前导航项并更新滚动指示器
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollPosition / documentHeight) * 100;
        
        // 更新滚动指示器
        document.body.style.setProperty('--scroll-percent', scrollPercent + '%');
        document.body.classList.add('scrolling');
        
        // 如果不滚动，3秒后移除滚动类
        clearTimeout(window.scrollTimer);
        window.scrollTimer = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 3000);
        
        // 高亮当前导航项
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // 初始化滚动指示器
    document.body.classList.add('scrolling');
    setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 3000);
    
    // 处理个人照片加载失败的情况
    const profileImg = document.getElementById('profile-img');
    profileImg.onerror = function() {
        // 如果图片加载失败，使用占位图
        this.src = 'https://via.placeholder.com/150?text=余泽瑞';
    };
    
    // 添加技能条动画效果
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // 初始时隐藏所有技能条
    skillLevels.forEach(skill => {
        skill.style.width = '0';
    });
    
    // 创建Intersection Observer来检测元素是否在视口中
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 当技能部分进入视口时，添加动画
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    entry.target.style.width = entry.target.getAttribute('data-width') || entry.target.getAttribute('style').split('width:')[1];
                    
                    // 移除百分比显示代码
                }, 200);
                // 一旦动画完成，停止观察
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // 开始观察所有技能条
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
    
    // 为项目卡片添加悬停效果
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // 添加滚动动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.75) {
                element.classList.add('fade-in-up');
            }
        });
    };
    
    // 初始化时运行一次
    window.addEventListener('load', animateOnScroll);
    // 滚动时运行
    window.addEventListener('scroll', animateOnScroll);
    
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // 初始化时间线动画顺序
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.setProperty('--animation-order', index);
        });
    });
    
    // 添加鼠标移动视差效果
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelectorAll('.section-title').forEach(title => {
            title.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});