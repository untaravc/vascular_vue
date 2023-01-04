import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/home/Home.vue'
import AdminPanel from '../pages/AdminPanel.vue'
import LandingPage from '../pages/LandingPage.vue'
import User from '../pages/users/Index.vue'
import LoginPage from '../pages/auth/Login.vue'
import Project from '../pages/projects/Index.vue'
import Role from '../pages/roles/Index.vue'
import MenuRole from '../pages/menu-roles/Index.vue'
import Patient from '../pages/patients/Index.vue'
import Institution from '../pages/institutions/Index.vue'
import ProjectInput from '../pages/project-input/Index.vue'
import ProjectRecord from '../pages/project-records/Index.vue'
import ProjectReport from '../pages/project-reports/Index.vue'
import ProjectLog from '../pages/project-logs/Index.vue'
import ProjectSetup from '../pages/project-setup/Index.vue'
import ProjectForm from '../pages/form/Index.vue'
import ProjectExport from '../pages/project-exports/Index.vue'
import Menu from '../pages/menu/Index.vue'
import Profile from '../pages/profile/Index.vue'

import PageNotFound from '../components/PageNotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LandingPage },
        { path: '/login', component: LoginPage, name: 'login' },
        {
            path: '/panel',
            component: AdminPanel,
            meta: { requiredAuth: true },
            children: [
                { path: 'home', component: Home,},
                { path: 'users', component: User, meta:{title: 'Vascular | User'}},
                { path: 'projects', component: Project, meta:{title: 'Vascular | Project'}},
                { path: 'roles', component: Role, meta:{title: 'Vascular | Role'}},
                { path: 'menu-roles', component: MenuRole, meta:{title: 'Vascular | Menu Role'}},
                { path: 'patients', component: Patient, meta:{title: 'Vascular | Patients'}},
                { path: 'institutions', component: Institution, meta:{title: 'Vascular | Institution'}},
                { path: 'menus', component: Menu, meta:{title: 'Vascular | Menu'}},
                { path: 'profile', component: Profile, meta:{title: 'Vascular | Profile'}},

                // project
                { path: 'p/:project_id/inputs', component: ProjectInput, meta:{title: 'Vascular | Input'} },
                { path: 'p/:project_id/records', component: ProjectRecord, meta:{title: 'Vascular | Record'}},
                { path: 'p/:project_id/reports', component: ProjectReport, meta:{title: 'Vascular | Report'}},
                { path: 'p/:project_id/logs', component: ProjectLog, meta:{title: 'Vascular | Logs'}},
                { path: 'p/:project_id/setup', component: ProjectSetup, meta:{title: 'Vascular | Setup'}},
                { path: 'p/:project_id/form', component: ProjectForm, meta:{title: 'Vascular | Form Edit'}},
                { path: 'p/:project_id/exports', component: ProjectExport, meta:{title: 'Vascular | Export Data'}},

                { path: '/:afterUser(.*)', component: PageNotFound },
            ]
        },
        { path: '/:pathMatch(.*)*', component: PageNotFound },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth) {
        let ls_token = localStorage.user_token;
        document.title = to.meta.title ?? 'National Vascular Registry'
        if (ls_token == null) {
            next({
                path: '/login',
                replace: true
            })
        }
    }
    next();
})

export default router;