<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Menu Role
                    </h1>
                </div>
            </div>
        </div>

        <div class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card">
                    <div class="card-body">
                        <page-loader v-model:active="loader" v-bind="page_loader_config"/>
                        <!--begin::Table-->
                        <div id="kt_customers_table_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                            <div class="table-responsive">
                                <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                                       id="kt_customers_table">
                                    <thead>
                                    <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                        <th>Menu</th>
                                        <th v-for="role in roles" :key="role.id">
                                            {{role.name}}
                                        </th>
                                    </tr>
                                    <tr v-for="data in data_content" :key="data.id">
                                        <td>{{ data.name }}</td>
                                        <td v-for="role in data.role" :key="data.id + role.id" class="text-center">
                                            <div class="form-check form-check-custom form-check-solid">
                                                <input class="form-check-input" type="checkbox" @click="updateMenu($event,data.id,role.id)"
                                                       :checked="role.is_checked === 1" :id="'check'+data.id + '_' + role.id"/>
                                                <label class="form-check-label" for="'check'+data.id + '_' + role.id"></label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-for="project in data_project" :key="project.id">
                                        <td>{{ project.name }}</td>
                                        <td v-for="role in project.role" :key="project.id + role.id" class="text-center">
                                            <div class="form-check form-check-custom form-check-solid">
                                                <input class="form-check-input" type="checkbox" @click="updateMenu($event,project.id,role.id)"
                                                       :checked="role.is_checked === 1" :id="'check'+project.id + '_' + role.id"/>
                                                <label class="form-check-label" for="'check'+data.id + '_' + role.id"></label>
                                            </div>
                                        </td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loader: false,
            data_content: [],
            data_project: [],
            roles: [],
        }
    },
    methods: {
        loadDataContent(loader = false) {
            this.loader = loader;
            this.authGet('menu-roles')
                .then((data) => {
                    this.data_content = data.result
                    this.data_project = data.project
                    this.roles = data.roles
                    this.loader = false
                });
        },
        updateMenu(e, menu_id, role_id){
            this.authPost('menu-roles', {
                is_checked: e.target.checked,
                menu_id: menu_id,
                role_id: role_id,
            }).then((data)=>{
                if(data.status){
                    this.loadDataContent()
                }
            })
        }
    },
    created() {
        this.loadDataContent(true)
    }
}
</script>