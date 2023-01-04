<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div  class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div  class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Records</h1>
                </div>
                <div class="d-flex align-items-center gap-2 gap-lg-3">
                    <router-link :to="'/panel/p/'+$route.params.project_id+'/inputs'"
                                 class="btn btn-sm fw-bold btn-primary">Add New
                    </router-link>
                </div>
            </div>
        </div>

        <div  class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card">
                    <div class="p-6">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="d-flex align-items-center position-relative">
                                <span class="svg-icon svg-icon-1 position-absolute ms-6">
                                    <unicon name="search"></unicon>
                                </span>
                                <input type="text" v-model="filter.name" @keyup.enter="loadDataContent"
                                       class="form-control form-control-solid ps-15"
                                       placeholder="Search Name">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <select class="form-control form-control-solid" @change="loadDataContent" v-model="filter.category_id">
                                <option value="">Select Category</option>
                                <option :value="cat.id" :key="cat.id" v-for="cat in data_raw.categories">
                                    {{cat.name}}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-4">

                        </div>
                    </div>
                    </div>
                    <div class="card-body pt-0">
                        <page-loader v-model:active="loader" v-bind="page_loader_config"/>
                        <!--begin::Table-->
                        <div id="kt_customers_table_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                            <div class="table-responsive">
                                <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                                       id="kt_customers_table">
                                    <!--begin::Table head-->
                                    <thead>
                                    <!--begin::Table row-->
                                    <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                        <th style="width: 40px" class="text-center">No</th>
                                        <th>Name</th>
                                        <th>DoB</th>
                                        <th>Cetegory</th>
                                        <th class="action">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody class="fw-semibold text-gray-600">
                                    <tr class="odd" v-for="(data,i) in data_content.data" :key="data.id">
                                        <td class="text-center">{{ i + 1 }}</td>
                                        <td>{{ $filters.capitalize(data.name) }}</td>
                                        <td>{{ $filters.formatDate(data.dob) }}</td>
                                        <td>
                                            <span v-if="data.category">
                                                {{ data.category.name }}
                                            </span>
                                        </td>
                                        <td class="action">
                                            <router-link
                                                :to="'/panel/p/'+$route.params.project_id+'/inputs?record_id=' + data.id"
                                                class="btn btn-sm btn-primary">
                                                Edit
                                            </router-link>
                                        </td>
                                    </tr>
                                    <tr v-if="data_content.data.length === 0">
                                        <td colspan="5" class="text-center"><i>No data.</i></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div
                                    class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
                                    <div class="dataTables_length">
                                        <select class="form-select form-select-sm" v-model="filter.per_page"
                                                @change="loadDataContent">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                                <div
                                    class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                                    <laravel-pagination :limit="2" size="small"
                                                        :data="data_content" @pagination-change-page="loadDataContent"
                                    ></laravel-pagination>
                                </div>
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
            disabled: false,
            edit_mode: false,
            form: new form({
                id: '',
                name: '',
                email: '',
                role_id: '',
                institution_id: '',
                password_confirmation: '',
                password: '',
            }),
            data_content: {
                data:[]
            },
            data_raw: {
                categories: []
            },
            filter: {
                page: 1,
                per_page: 10,
                name: '',
                category_id: '',
            }
        }
    },
    methods: {
        loadDataContent(page = 1) {
            this.filter.page = page
            this.loader = true
            this.authGet('records/' + this.$route.params.project_id, this.filter)
                .then((data) => {
                    this.data_content = data
                    this.loader = false
                })
        },
        deleteData() {
            if (confirm('Delete data?')) {
                this.disabled = true;
                this.form.delete(this.base_api + 'records/' + this.form.id, this.setHeader())
                    .then(({data}) => {
                        this.disabled = false;
                        if (data.status) {
                            $('#kt_modal_add_customer').modal('hide')
                            this.loadDataContent()
                        }
                    })
            }
        },
        loadCategories(){
            this.authGet('categories-list', {
                project_id: this.$route.params.project_id
            }).then((data)=>{
                this.data_raw.categories = data.result
            })
        }
    },
    created() {
        this.loadDataContent();
        this.loadCategories();
    },
}
</script>