export const sidebarData = [
    {
        name: 'Profile',
        path: '/',
        icon: 'far fa-user-circle'
    },
    {
        name: 'Subjects',
        path: '#',
        icon: 'far fa-paper-plane',
        sub: [
            {
                name: 'Main',
                path: '/completion/main',
                icon: 'fas fa-quran'
            },
            {
                name: 'Extra',
                path: '/completion/extra',
                icon: 'fas fa-book'
            },
            {
                name: 'Memory',
                path: '/completion/memory',
                icon: 'fas fa-inbox'
            }
        ]
    },
    {
        name: 'Admin',
        path: '#',
        icon: 'fas fa-user-cog',
        sub: [
            {
                name: 'Subjects',
                path: '/#/admin/subjects',
                icon: 'fas fa-chart-pie'
            },
            {
                name: 'Users',
                path: '/admin/userlist',
                icon: 'fas fa-users'
            }
        ]
    },
    
]