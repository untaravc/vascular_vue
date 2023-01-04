<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">

                    </h1>
                </div>
            </div>
        </div>

        <div class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="row">
                    <div class="col-md-4" v-for="project in stats" :key="project.id">
                        <div class="card h-xl-100">
                            <div class="card-header border-0 pt-5">
                                <h3 class="card-title align-items-start flex-column">
                                    <span class="card-label fw-bold text-dark">{{project.name}}</span>
                                    <span class="text-muted mt-1 fw-semibold fs-7">{{project.records_count}} Records</span>
                                </h3>
                            </div>
                            <div class="card-body pt-6">
                                <div v-for="(cat, i) in project.categories" :key="cat.id">
                                    <div class="d-flex flex-stack">
                                        <div class="symbol symbol-40px me-4">
                                            <div class="symbol-label fs-2 fw-semibold text-inverse-danger" :class="bgItem(i)">
                                                {{cat.name.substring(0,1)}}
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                                            <div class="flex-grow-1 me-2">
                                                <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bold">
                                                    {{cat.name}}
                                                </a>
                                                <span class="text-muted fw-semibold d-block fs-7">{{cat.records_count}} Records</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="separator separator-dashed my-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <UserOnline></UserOnline>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserOnline from './UserOnline'
export default {
    data() {
        return {
            stats: [],
        }
    },
    components:{
        UserOnline
    },
    methods: {
        loadStat(){
            this.authGet('dashboard-stats')
            .then((data)=>{
                this.stats = data.result
            })
        },
        bgItem(i){
            let items = [
                'bg-danger',
                'bg-primary',
                'bg-warning',
                'bg-success',
                'bg-info',
            ];
            return items[i];
        }
    },
    created() {
        this.loadStat()
    },
    computed:{}
}
</script>