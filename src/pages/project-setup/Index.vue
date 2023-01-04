<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div  class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div  class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Project Setup</h1>
                </div>
            </div>
        </div>

        <div class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card-body p-lg-6">
                                <div class="menu menu-rounded menu-column menu-title-gray-700
                                    menu-state-title-primary menu-active-bg-light-primary fw-semibold">
                                    <div class="d-flex justify-content-between">
                                        <h4>Category</h4>
                                        <u class="me-1 cursor-pointer" @click="addBasCatModal()">Add</u>
                                    </div>
                                    <div class="menu-item" v-for="category in categories" :key="category.id">
                                        <div style="cursor: inherit"
                                             :class="active_menu === category.id ? 'active' : ''"
                                             class="menu-link py-3 mb-1 d-flex justify-content-between">
                                            <span class="cursor-pointer"
                                                  @click="category.show_child = !category.show_child">
                                                {{ category.name }} ({{ category.children.length }})
                                            </span>
                                            <div>
                                                <u class="me-1 cursor-pointer" @click="addChildModal(category)">Add</u>
                                                <u class="cursor-pointer" @click="editCatModal(category)">Edit</u>
                                            </div>
                                        </div>
                                        <div class="children" v-show="category.show_child"
                                             v-if="category.children && category.children.length > 0">
                                            <div class="menu-item ms-10" :key="sub_cat.id"
                                                 v-for="sub_cat in category.children">
                                                <div style="cursor: inherit"
                                                     :class="active_menu === sub_cat.id ? 'active' : ''"
                                                     class="menu-link py-3 d-flex justify-content-between">
                                                    <span class="cursor-pointer"
                                                          @click="getData(sub_cat)">{{ sub_cat.name }}</span>
                                                    <u class="cursor-pointer" @click="editCatModal(sub_cat)">Edit</u>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body p-lg-6">
                                <div class="d-flex justify-content-between">
                                    <h4>Questions</h4>
                                    <router-link :to="'/panel/p/' + $route.params.project_id + '/form'" class="btn btn-sm btn-primary">
                                        Add New
                                    </router-link>
                                </div>
                                <div class="table-responsive">
                                    <page-loader v-model:active="loader" v-bind="page_loader_config"/>
                                    <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
                                        <!--begin::Table head-->
                                        <thead>
                                        <!--begin::Table row-->
                                        <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                            <th>No</th>
                                            <th>Question</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th class="action">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody class="fw-semibold text-gray-600">
                                        <tr class="odd" v-for="(data,i) in inputs" :key="data.id">
                                            <td>{{ i + 1 }}</td>
                                            <td>
                                                <span v-if="data.name">{{ $filters.capitalize(data.name) }}</span> <br>
                                                <small>{{ $filters.formatDateTime(data.created_at) }}</small>
                                            </td>
                                            <td>
                                                {{ data.type }}
                                            </td>
                                            <td>
                                                <span v-if="!data.status">Non Active</span>
                                                <span v-if="data.status">Active</span>
                                            </td>
                                            <td class="action">
                                                <router-link :to="'/panel/p/' + $route.params.project_id+'/form?input_id=' + data.id" class="btn btn-sm btn-primary">
                                                    Edit
                                                </router-link>
                                            </td>
                                        </tr>
                                        <tr v-if="inputs.length === 0">
                                            <td colspan="4" class="text-center"><i>Select Category</i></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--        Kategori-->
        <div class="modal fade" id="modal_category" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg mw-650px">
                <div class="modal-content">
                    <div class="modal-header py-3 px-5">
                        <h3 class="fw-bold" v-if="!edit_mode">Add Category</h3>
                        <h3 class="fw-bold" v-if="edit_mode">Update Category</h3>
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
                                           v-model="category.name"
                                           :class="{ 'is-invalid': category.errors.has('name') }">
                                    <div v-if="category.errors.has('name')" v-html="category.errors.get('name')"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Label</label>
                                    <input class="form-control form-control-solid"
                                           v-model="category.label"
                                           :class="{ 'is-invalid': category.errors.has('label') }">
                                    <div v-if="category.errors.has('label')" v-html="category.errors.get('label')"/>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button v-if="edit_mode" class="btn btn-sm btn-danger m-1" :disabled="disabled" @click="deleteCat">
                                <BounceLoader :loading="disabled" color="#fff" size="22px"></BounceLoader>
                                <span v-if="!disabled">Delete</span>
                            </button>
                            <button v-if="edit_mode" class="btn btn-sm btn-primary m-1" :disabled="disabled" @click="updateCat">
                                <BounceLoader :loading="disabled" color="#fff" size="22px"></BounceLoader>
                                <span v-if="!disabled">Update</span>
                            </button>
                            <button v-if="!edit_mode" class="btn btn-sm btn-primary m-1" :disabled="disabled" @click="addCategory">
                                <BounceLoader :loading="disabled" color="#fff" size="22px"></BounceLoader>
                                <span v-if="!disabled">Add</span>
                            </button>
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
            active_menu: null,
            categories: [],
            inputs: [],
            category: new form({
                id: '',
                project_id: '',
                name: '',
                parent_id: '',
                label: '',
            })
        }
    },
    methods: {
        loadCategories() {
            this.authGet('categories-hierarchy', {
                project_id: this.$route.params.project_id
            }).then((data) => {
                let result = data.result
                result.forEach((item) => {
                    item.show_child = true;
                })
                this.categories = result;
                if(!this.active_menu){
                    this.active_menu = this.categories[0]['id']
                }
            })
        },
        editCatModal(cat) {
            $('#modal_category').modal('show')
            this.edit_mode = true;
            this.category.fill(cat)
        },
        updateCat() {
            this.disabled = true;
            this.category.patch(this.base_api + 'categories/' + this.category.id, this.setHeader())
                .then(() => {
                    this.disabled = false;
                    $('#modal_category').modal('hide')
                    this.loadCategories();
                }).catch(() => {
                this.disabled = false;
            })
        },
        addBasCatModal(){
            this.edit_mode = false;
            this.category.reset();
            this.category.parent_id = 0;
            this.category.project_id = this.$route.params.project_id;
            $('#modal_category').modal('show')
        },
        addChildModal(parent) {
            this.edit_mode = false;
            this.category.reset();
            this.category.parent_id = parent.id
            this.category.project_id = this.$route.params.project_id
            $('#modal_category').modal('show')
        },
        addCategory() {
            this.disabled = true;
            this.category.post(this.base_api + 'categories', this.setHeader())
                .then(() => {
                    this.disabled = false;
                    $('#modal_category').modal('hide')
                    this.loadCategories();
                }).catch(() => {
                this.disabled = false;
            })
        },
        deleteCat(){
            if(confirm('Delete category ' + this.category.name + '?')){
                this.disabled = true;
                this.category.delete(this.base_api + 'categories/' + this.category.id, this.setHeader())
                    .then(() => {
                        this.disabled = false;
                        $('#modal_category').modal('hide')
                        this.loadCategories();
                    }).catch(() => {
                    this.disabled = false;
                })
            }
        },
        getData(data) {
            this.active_menu = data.id
            this.$store.commit('input_setup_cat_id', {
                name: this.input_filter_name,
                value: data.id
            })

            this.loader = true;
            this.authGet('category-input/' + data.id)
                .then((data) => {
                    this.inputs = data.result;
                    this.loader = false;
                })
        }
    },
    computed:{
        input_filter_name(){
            return 'project_cat_' + this.$route.params.project_id
        }
    },
    created() {
        this.loadCategories();

        let cat_id = this.$store.state.project_setup_cat_ids[this.input_filter_name]
        if(cat_id){
            this.getData({id: cat_id})
        }
    }
}
</script>