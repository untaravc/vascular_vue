<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Users List</h1>
                </div>
                <div class="d-flex align-items-center gap-2 gap-lg-3">
                    <a href="#" class="btn btn-sm fw-bold btn-primary" @click="addShow">Add New</a>
                </div>
            </div>
        </div>

        <div class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card">
                    <div class="card-header border-0 pt-6">
                        <div class="card-title">
                            <div class="d-flex align-items-center position-relative my-1">
                                <span class="svg-icon svg-icon-1 position-absolute ms-6">
                                    <unicon name="search"></unicon>
                                </span>
                                <input type="text" v-model="filter.name" @keyup.enter="loadDataContent"
                                       class="form-control form-control-solid w-250px ps-15"
                                       placeholder="Search Name">
                            </div>
                        </div>

                        <div class="card-toolbar">
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
                                        <th style="width: 20px">No</th>
                                        <th style="width: 250px">Name</th>
                                        <th style="width: 200px">Role</th>
                                        <th>Institution</th>
                                        <th class="action">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody class="fw-semibold text-gray-600">
                                    <tr class="odd" v-for="(data,i) in data_content.data" :key="data.id">
                                        <td>{{ i + 1 }}</td>
                                        <td>
                                            <b>{{ data.name }}</b> <br>
                                            {{ data.email }}
                                        </td>
                                        <td>{{ data.role_label }}</td>
                                        <td>
                                            <span v-if="data.institution">
                                                {{ data.institution.name }}
                                            </span>
                                        </td>
                                        <td class="action">
                                            <button class="btn btn-sm btn-primary" @click="editModal(data)">
                                                Edit
                                            </button>
                                        </td>
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

                <div class="modal fade" id="kt_modal_add_customer" data-backdrop="static" tabindex="-1"
                     aria-hidden="true">
                    <div class="modal-dialog modal-lg mw-650px">
                        <div class="modal-content">
                            <div class="modal-header py-3 px-5" id="kt_modal_add_customer_header">
                                <h3 class="fw-bold" v-if="!edit_mode">Add Data</h3>
                                <h3 class="fw-bold" v-if="edit_mode">Update Data</h3>
                                <button data-bs-dismiss="modal"
                                        class="btn close btn-icon btn-sm btn-active-icon-primary">
                                    <span class="svg-icon svg-icon-1">
                                        <unicon name="times"></unicon>
                                    </span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Name</label>
                                            <input type="text" class="form-control form-control-solid"
                                                   v-model="form.name"
                                                   :class="{ 'is-invalid': form.errors.has('name') }">
                                            <div v-if="form.errors.has('name')" v-html="form.errors.get('name')"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Email</label>
                                            <input type="email" autocomplete="new-password"
                                                   class="form-control form-control-solid"
                                                   v-model="form.email"
                                                   :class="{ 'is-invalid': form.errors.has('email') }">
                                            <div v-if="form.errors.has('email')" v-html="form.errors.get('email')"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Password</label>
                                            <div class="input-group mb-5">
                                                <input :type="pswd_show ? 'text' : 'password'"
                                                       class="form-control form-control-solid"
                                                       autocomplete="new-password"
                                                       v-model="form.password"/>
                                                <span class="input-group-text" style="border: none" @click="pswdTogle">
                                                    <unicon v-if="!pswd_show" name="eye"></unicon>
                                                    <unicon v-if="pswd_show" name="eye-slash"></unicon>
                                                </span>
                                            </div>
                                            <div v-if="form.errors.has('password')"
                                                 v-html="form.errors.get('password')"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Konfirm Password</label>
                                            <div class="input-group mb-5">
                                                <input :type="pswd_show ? 'text' : 'password'"
                                                       class="form-control form-control-solid"
                                                       v-model="form.password_confirmation"/>
                                                <span class="input-group-text" style="border: none" @click="pswdTogle">
                                                    <unicon v-if="!pswd_show" name="eye"></unicon>
                                                    <unicon v-if="pswd_show" @click="pswdTogle"
                                                            name="eye-slash"></unicon>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Role</label>
                                            <select class="form-control form-control-solid" v-model="form.role_id"
                                                    :class="{ 'is-invalid': form.errors.has('role_id') }">>
                                                <option value="">Select Role</option>
                                                <option :value="role.id" v-for="role in data_raw.roles" :key="role.id">
                                                    {{role.desc}}
                                                </option>
                                            </select>
                                            <div v-if="form.errors.has('role_id')" v-html="form.errors.get('role_id')"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Institution</label>
                                            <select class="form-control form-control-solid"
                                                    v-model="form.institution_id"
                                                    :class="{ 'is-invalid': form.errors.has('institution_id') }">>
                                                <option value="">Select Institution</option>
                                                <option :value="int.id" v-for="int in data_raw.institutions" :key="int.id">
                                                    {{int.name}}
                                                </option>
                                            </select>
                                            <div v-if="form.errors.has('institution_id')"
                                                 v-html="form.errors.get('institution_id')"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer flex-center">
                                <button @click="deleteData" v-if="edit_mode" :disabled="disabled"
                                        class="btn btn-danger">
                                    <span class="indicator-label">Delete</span>
                                </button>
                                <button @click="addData" v-if="!edit_mode" :disabled="disabled"
                                        class="btn btn-primary">
                                    <BounceLoader :loading="disabled" color="#fff" size="22px"></BounceLoader>
                                    <span v-if="!disabled" class="indicator-label">Add New</span>
                                </button>
                                <button @click="updateData" v-if="edit_mode" :disabled="disabled"
                                        class="btn btn-primary">
                                    <BounceLoader :loading="disabled" color="#fff" size="22px"></BounceLoader>
                                    <span v-if="!disabled" class="indicator-label">Update</span>
                                </button>
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
            pswd_show: false,
            value: '',
            selected_radio: 1,
            form: new form({
                id: '',
                name: '',
                email: '',
                role_id: '',
                institution_id: '',
                password: '',
                password_confirmation: '',
            }),
            data_content: {},
            data_raw: {
                institutions:[],
                roles:[],
            },
            filter: {
                page: 1,
                per_page: 10,
                name: '',
            },
        }
    },
    methods: {
        loadDataContent(page = 1) {
            this.filter.page = page
            this.loader = true
            this.authGet('users', this.filter)
                .then((data) => {
                    this.data_content = data
                    this.loader = false
                })
        },
        loadInstitution(){
            this.authGet('institutions-list')
            .then((data)=>{
                this.data_raw.institutions = data.result
            })
        },
        loadRoles(){
            this.authGet('roles-list')
            .then((data)=>{
                this.data_raw.roles = data.result
            })
        },
        addShow() {
            this.edit_mode = false;
            this.form.reset()
            $('#kt_modal_add_customer')
                .modal({
                    backdrop: 'static',
                    keyboard: false,
                }).modal('show')
            this.form.errors.clear()
        },
        addData() {
            this.disabled = true;
            this.form.post(this.base_api + 'users', this.setHeader())
                .then(({data}) => {
                    this.disabled = false;
                    if (data.status) {
                        $('#kt_modal_add_customer').modal('hide')
                        this.loadDataContent()
                    }
                }).catch(() => {
                this.disabled = false;
            })
        },
        editModal(data) {
            this.edit_mode = true;
            this.form.fill(data)
            $('#kt_modal_add_customer')
                .modal({
                    backdrop: 'static',
                    keyboard: false,
                }).modal('show')
            this.form.errors.clear()
        },
        updateData() {
            this.disabled = true;
            this.form.patch(this.base_api + 'users/' + this.form.id, this.setHeader())
                .then(({data}) => {
                    this.disabled = false;
                    if (data.status) {
                        $('#kt_modal_add_customer').modal('hide')
                        this.loadDataContent()
                    }
                }).catch(() => {
                this.disabled = false;
            })
        },
        deleteData() {
            if (confirm('Delete data?')) {
                this.disabled = true;
                this.form.delete(this.base_api + 'users/' + this.form.id, this.setHeader())
                    .then(({data}) => {
                        this.disabled = false;
                        if (data.status) {
                            $('#kt_modal_add_customer').modal('hide')
                            this.loadDataContent()
                        }
                    })
            }
        },
        pswdTogle() {
            this.pswd_show = !this.pswd_show
        },
    },
    created() {
        this.loadDataContent();
        this.loadInstitution();
        this.loadRoles();
    }
}
</script>

<style scoped>
.cursor-pointer:hover {
    font-weight: bolder;
}
</style>