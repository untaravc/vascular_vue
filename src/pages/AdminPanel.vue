<template>
    <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
        <!--begin::Page-->
        <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
            <!--begin::Header-->
            <TopBar></TopBar>
            <!--end::Header-->
            <!--begin::Wrapper-->
            <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                <Sidebar></Sidebar>
                <!--begin::Main-->
                <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
                    <!--begin::Content wrapper-->
                    <router-view></router-view>
                </div>
                <!--end::Social - Settings-->

                <!--end::Content wrapper-->
                <!-- <Footer></Footer> -->
            </div>
        </div>
        <!--end::Wrapper-->
    </div>
    <!--end::Page-->
</template>
<script>
import Sidebar from '../components/Sidebar.vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
export default {
    name: 'App',
    components: { Sidebar, TopBar, Footer }
}
</script>
  
<style>

</style>
