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
                name: 'Support',
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
                path: '/#/admin/users',
                icon: 'fas fa-users'
            }
        ]
    },
    
]