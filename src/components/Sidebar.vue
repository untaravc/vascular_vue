<template>
    <!--begin::sidebar-->
    <div id="kt_app_sidebar" class="app-sidebar flex-column" data-kt-drawer="true" data-kt-drawer-name="app-sidebar"
         data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="225px"
         data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
        <!--begin::Logo-->
        <div class="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
            <!--begin::Logo image-->
            <div class="d-flex align-items-center justify-content-center">
                <div>
                    <img alt="Logo" src="/assets/img/vascular-logo.png" style="height: 40px"
                         class="app-sidebar-logo-default">
                    <img alt="Logo" src="/assets/img/logo-vascular-sqr.png" style="height: 35px"
                         class="app-sidebar-logo-minimize">
                </div>
                <div style="font-size: 15px; color: #c7c7c7; font-weight: 600; padding-left: 10px"
                     class="app-sidebar-logo-default">
                    VASCULAR REGISTRY
                </div>
            </div>
            <!--end::Logo image-->
            <!--begin::Sidebar toggle-->
            <div id="kt_app_sidebar_toggle"
                 class="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
                 data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body"
                 data-kt-toggle-name="app-sidebar-minimize">
                <!--begin::Svg Icon | path: icons/duotune/arrows/arr079.svg-->
                <span class="svg-icon svg-icon-2 rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.5"
                              d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                              fill="currentColor"></path>
                        <path
                            d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                            fill="currentColor"></path>
                    </svg>
                </span>
                <!--end::Svg Icon-->
            </div>
            <!--end::Sidebar toggle-->
        </div>
        <!--end::Logo-->
        <!--begin::sidebar menu-->
        <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
            <!--begin::Menu wrapper-->
            <div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
                 data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto"
                 data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
                 data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px"
                 data-kt-scroll-save-state="true" style="height: 755px;">
                <!--begin::Menu-->
                <div class="menu menu-column menu-rounded menu-sub-indention px-3" id="#kt_app_sidebar_menu"
                     data-kt-menu="true" data-kt-menu-expand="false">

                    <div v-for="menu in main_menu" :key="menu.id">
                        <div class="menu-item" v-if="menu.children === null">
                            <router-link class="menu-link" :to="menu.link">
                                <span class="menu-icon">
                                    <unicon :name="menu.icon" fill="#49d919"></unicon>
                                </span>
                                <span class="menu-title">{{menu.name}}</span>
                            </router-link>
                        </div>

                        <div data-kt-menu-trigger="click" v-if="menu.children != null" class="menu-item menu-accordion">
                            <span class="menu-link">
                                <span class="menu-icon">
                                    <unicon :name="menu.icon" fill="#b3b3b3"></unicon>
                                </span>
                                <span class="menu-title">{{menu.name}}</span>
                                <span class="menu-arrow"></span>
                            </span>
                            <div class="menu-sub menu-sub-accordion" :kt-hidden-height="menu.height">
                                <div class="menu-item" v-for="submenu in menu.children" :key="submenu.id">
                                    <router-link class="menu-link" :to="submenu.link">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                        <span class="menu-title">{{submenu.name}}</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="menu-item pt-5">
                        <div class="menu-content">
                            <span class="menu-heading fw-bold text-uppercase fs-7">PROJECTS</span>
                        </div>
                    </div>

                    <div data-kt-menu-trigger="click" class="menu-item menu-accordion" v-for="project in project_menu" :key="project.id">
                        <span class="menu-link">
                            <span class="menu-icon">
                                <unicon :name="project.icon" fill="#0485db"></unicon>
                            </span>
                            <span class="menu-title">{{project.name}}</span>
                            <span class="menu-arrow"></span>
                        </span>
                        <div class="menu-sub menu-sub-accordion" kt-hidden-height="200">
                            <div class="menu-item" v-for="submenu in project.children" :key="submenu.id">
                                <router-link class="menu-link" :to="submenu.link">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">{{submenu.name}}</span>
                                </router-link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6" id="kt_app_sidebar_footer">
            <a href="#"
               class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
               data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click" data-kt-initialized="1">
                <span class="btn-label">Documentations</span>
                <span class="svg-icon btn-icon svg-icon-2 m-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3"
                              d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z"
                              fill="currentColor"></path>
                        <rect x="7" y="17" width="6" height="2" rx="1" fill="currentColor"></rect>
                        <rect x="7" y="12" width="10" height="2" rx="1" fill="currentColor"></rect>
                        <rect x="7" y="7" width="6" height="2" rx="1" fill="currentColor"></rect>
                        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"></path>
                    </svg>
                </span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            main_menu: [],
            project_menu: [],
        }
    },
    methods: {
        getMenu() {
            this.authGet('menu')
                .then((data) => {
                    this.main_menu = data.result.menu
                    this.project_menu = data.result.projects
                });
        }
    },
    created() {
        this.getMenu();
        this.emitter.on("reload-menu",()=>{
            this.getMenu()
        })
    }
}
</script>