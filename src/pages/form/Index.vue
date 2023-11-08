<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Input Form
                    </h1>
                </div>
            </div>
        </div>

        <div class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card p-6">
                    <page-loader v-model:active="loader" v-bind="page_loader_config"/>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Name</label>
                                <input class="form-control" v-model="form.name"
                                       :class="{ 'is-invalid': form.errors.has('name') }">
                                <div v-if="form.errors.has('name')"
                                     v-html="form.errors.get('name')"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Type</label>
                                <select class="form-control" v-model="form.type"
                                        :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="">Select Type</option>
                                    <option v-for="(type, t) in data_raw.types" :key="t">{{ type }}</option>
                                </select>
                                <div v-if="form.errors.has('type')"
                                     v-html="form.errors.get('type')"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Category</label>
                                <select class="form-control" v-model="form.parent_id" @change="parseSubCat"
                                        :class="{ 'is-invalid': form.errors.has('parent_id') }">
                                    <option value="">Select Category</option>
                                    <option :value="cat.id" :key="cat.id" v-for="cat in data_raw.categories">
                                        {{ cat.name }}
                                    </option>
                                </select>
                                <div v-if="form.errors.has('parent_id')"
                                     v-html="form.errors.get('parent_id')"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Sub Category</label>
                                <select class="form-control" v-model="form.category_id"
                                        :class="{ 'is-invalid': form.errors.has('category_id') }">
                                    <option value="">Select Sub Category</option>
                                    <option :value="sub_cat.id" :key="sub_cat.id"
                                            v-for="sub_cat in data_raw.subcategories">
                                        {{ sub_cat.name }}
                                    </option>
                                </select>
                                <div v-if="form.errors.has('category_id')"
                                     v-html="form.errors.get('category_id')"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Prefix</label>
                                <input class="form-control" v-model="form.prefix"
                                       :class="{ 'is-invalid': form.errors.has('prefix') }">
                                <div v-if="form.errors.has('prefix')"
                                     v-html="form.errors.get('prefix')"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Suffix</label>
                                <input class="form-control" v-model="form.suffix"
                                       :class="{ 'is-invalid': form.errors.has('suffix') }">
                                <div v-if="form.errors.has('suffix')"
                                     v-html="form.errors.get('suffix')"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Currency</label>
                                <select class="form-control" v-model="form.is_currency"
                                        :class="{ 'is-invalid': form.errors.has('is_currency') }">
                                    <option value="0">Non Currency</option>
                                    <option value="1">Currency</option>
                                </select>
                            </div>
                            <div v-if="form.errors.has('is_currency')"
                                 v-html="form.errors.get('is_currency')"/>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Order</label>
                                <input class="form-control"
                                       v-model="form.order"
                                       :class="{ 'is-invalid': form.errors.has('order') }">
                                <div v-if="form.errors.has('order')"
                                     v-html="form.errors.get('order')"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Blank Option</label>
                                <select class="form-control" v-model="form.blank_option"
                                        :class="{ 'is-invalid': form.errors.has('blank_option') }">
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div v-if="form.errors.has('status')"
                                 v-html="form.errors.get('status')"/>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Status</label>
                                <select class="form-control" v-model="form.status"
                                        :class="{ 'is-invalid': form.errors.has('status') }">
                                    <option value="0">Non Active</option>
                                    <option value="1">Active</option>
                                </select>
                            </div>
                            <div v-if="form.errors.has('status')"
                                 v-html="form.errors.get('status')"/>
                        </div>
                        <div class="col-12">
                            <label>Deskripsi</label>
                            <VueEditor v-model="form.note" useCustomImageHandler @image-added="handleImageAdded"></VueEditor>
                        </div>
                        <div class="col-12 mt-3" style="text-align: right">
                            <button :disabled="disabled" v-if="!edit_mode" @click="createData"
                                    class="btn btn-sm btn-primary">
                                Create
                            </button>
                            <button :disabled="disabled" v-if="edit_mode" @click="updateData('create')"
                                    class="btn btn-sm btn-primary">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="edit_mode">
                    <div class="col-md-6">
                        <div class="card p-6 mt-4">
                            <page-loader v-model:active="loader_detail" v-bind="page_loader_config"/>
                            <div class="d-flex justify-content-between">
                                <h5>Options</h5>
                                <button class="btn btn-sm btn-primary" @click="addModal">Add</button>
                            </div>
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th style="text-align: right">Action</th>
                                </tr>
                                <tr v-for="detail in input_details" :key="detail.id">
                                    <td>{{ detail.name }}</td>
                                    <td>{{ detail.value }}</td>
                                    <td style="text-align: right">
                                        <button class="btn btn-sm btn-success" @click="editModal(detail)">Edit</button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-6 mt-4">
                            <h5>Dependency</h5>
                            <div class="form-group">
                                <label>Field</label>
                                <select class="form-control" v-model="form.dependency_id" @change="parseDependence">
                                    <option value="">No Dependency</option>
                                    <option :value="input.id" :key="input.id" v-for="input in data_raw.inputs">
                                        {{input.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Value</label>
                                <select class="form-control" v-model="form.dependency_value">
                                    <option :value="input.value" :key="input.id"
                                            v-for="input in data_raw.input_details">
                                        {{input.name}}
                                    </option>
                                </select>
                            </div>
                            <div style="text-align: right">
                                <button :disabled="disabled" v-if="edit_mode" @click="updateData('save')"
                                        class="btn btn-sm btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="modal fade" id="modal_detail" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg mw-650px">
                <div class="modal-content">
                    <div class="modal-header py-3 px-5">
                        <h3 class="fw-bold" v-if="!edit_detail">Add Detail</h3>
                        <h3 class="fw-bold" v-if="edit_detail">Update Detail</h3>
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
                                           v-model="input_detail.name"
                                           :class="{ 'is-invalid': input_detail.errors.has('name') }">
                                    <div v-if="input_detail.errors.has('name')"
                                         v-html="input_detail.errors.get('name')"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Value</label>
                                    <input class="form-control form-control-solid"
                                           v-model="input_detail.value"
                                           :class="{ 'is-invalid': input_detail.errors.has('value') }">
                                    <div v-if="input_detail.errors.has('value')"
                                         v-html="input_detail.errors.get('value')"/>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button v-if="edit_detail" class="btn btn-sm btn-danger m-1" :disabled="disabled"
                                    @click="deleteDetail">
                                <BounceLoader :loading="disabled" color="#fff" size="22px"></BounceLoader>
                                <span v-if="!disabled">Delete</span>
                            </button>
                            <button v-if="edit_detail" class="btn btn-sm btn-primary m-1" :disabled="disabled"
                                    @click="updateDetail">
                                <BounceLoader :loading="disabled" color="#fff" size="22px"></BounceLoader>
                                <span v-if="!disabled">Update</span>
                            </button>
                            <button v-if="!edit_detail" class="btn btn-sm btn-primary m-1" :disabled="disabled"
                                    @click="addDetail">
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
import {VueEditor} from "vue3-editor";
export default {
    components:{VueEditor},
    data() {
        return {
            loader: false,
            loader_detail: false,
            disabled: false,
            edit_mode: false,
            edit_detail: false,
            input_details: false,
            data_raw: {
                categories: [],
                sub_categories: [],
                subcategories: [],
                types: [],
                inputs: [],
                input_details: [],
            },
            project: {},
            form: new form({
                id: '',
                parent_id: '',
                blank_option: '',
                category_id: '',
                project_id: '',
                institution_id: '',
                user_id: '',
                name: '',
                type: '',
                prefix: '',
                suffix: '',
                order: '',
                is_currency: 0,
                dependency_id: '',
                dependency_value: '',
                status: '',
                note: '',
            }),
            input_detail: new form({
                id: '',
                input_id: '',
                input_type: '',
                name: '',
                value: '',
            })
        }
    },
    methods: {
        loadData() {
            this.authGet('inputs/' + this.$route.query.input_id)
                .then(({result}) => {
                    this.form.fill(result);
                    this.loadInputProps();
                    this.loadInputs();
                })
        },
        loadProject() {
            this.authGet('projects/' + this.$route.params.project_id)
                .then(({result}) => {
                    this.project = result
                })
        },
        loadInputs() {
            this.authGet('inputs-list', {
                project_id: this.form.project_id,
                category_id: this.form.category_id,
                has_details: true
            }).then(({result}) => {
                this.data_raw.inputs = result;
                if(this.form.dependency_id > 0){
                    this.parseDependence()
                }
            })
        },
        loadInputProps() {
            this.authGet('inputs-properties', {
                project_id: this.$route.params.project_id,
            }).then(({result}) => {
                this.data_raw.types = result.types
                this.data_raw.categories = result.categories
                this.data_raw.sub_categories = result.sub_categories
                if (this.form.category_id) {
                    this.parseCat();
                }
            })
        },
        loadInputDetails() {
            this.authGet('input-details', {
                input_id: this.$route.query.input_id
            }).then((data) => {
                this.input_details = data.result
            })
        },
        parseSubCat() {
            let box = [];
            this.data_raw.sub_categories.forEach((item) => {
                if (item.parent_id === this.form.parent_id) {
                    box.push(item)
                }
            })
            this.data_raw.subcategories = box;
        },
        parseCat() {
            let selected_cat = this.data_raw.sub_categories.filter(cat => {
                return cat.id === this.form.category_id
            })
            if (selected_cat[0]) {
                this.form.parent_id = selected_cat[0].parent_id;
                this.parseSubCat();
                this.loader = false;
            }
        },
        createData() {
            this.disabled = true;
            this.form.post(this.base_api + 'inputs', this.setHeader())
                .then(({data}) => {
                    if (data.status) {
                        this.toaster({})
                    }
                    this.disabled = false;
                }).catch(() => {
                this.disabled = false;
            })
        },
        updateData(mode) {
            this.disabled = true;
            this.form.patch(this.base_api + 'inputs/' + this.form.id, this.setHeader())
                .then(() => {
                    this.disabled = false;
                    if(mode === 'create'){
                        this.$router.go(-1)
                    }
                    this.toaster({title: "Saved!"})
                }).catch(() => {
                this.disabled = false;
            })
        },
        editModal(detail) {
            $('#modal_detail').modal('show');
            this.input_detail.fill(detail);
            this.edit_detail = true;
        },
        addModal() {
            $('#modal_detail').modal('show');
            this.input_detail.reset();
            this.edit_detail = false;
        },
        deleteDetail() {
            if (confirm('Delete data?')) {
                this.authPost('input-details/' + this.input_detail.id, {
                    _method: 'DELETE'
                }).then((data) => {
                    if (data.status) {
                        $('#modal_detail').modal('hide');
                        this.toaster({title: 'Data deleted!'});
                        this.loadInputDetails()
                    } else {
                        alert(data.text)
                    }
                })
            }
        },
        updateDetail() {
            this.disabled = true;
            this.input_detail.patch(this.base_api + 'input-details/' + this.input_detail.id, this.setHeader())
                .then((data) => {
                    this.disabled = false;
                    if (data.status) {
                        $('#modal_detail').modal('hide');
                        this.toaster({title: 'Data updated!'});
                        this.loadInputDetails()
                    }
                }).catch(() => {
                this.disabled = false;
            })
        },
        addDetail() {
            this.input_detail.input_id = this.form.id
            this.input_detail.input_type = this.form.type
            this.disabled = true;
            this.input_detail.post(this.base_api + 'input-details', this.setHeader())
                .then((data) => {
                    this.disabled = false;
                    if (data.status) {
                        $('#modal_detail').modal('hide');
                        this.toaster({title: 'Data added!'});
                        this.loadInputDetails()
                    }
                }).catch(() => {
                this.disabled = false;
            })
        },
        parseDependence(){
            let input = '';
            input = this.data_raw.inputs.filter((item)=>{
                return item.id === this.form.dependency_id
            })

            if(input.length > 0){
            this.data_raw.input_details = input[0].input_details
        }
    },
        handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
            formData.append("file", file);

            this.authPost('file-upload', formData)
                .then((data) => {
                    const url = data.result.link; // Get url from response
                    Editor.insertEmbed(cursorLocation, "image", url);
                    resetUploader();
                })
                .catch(err => {

                });
        },
    },
    created() {
        this.loadProject();
        this.loadInputDetails();

        let input_id = this.$route.query.input_id;
        this.form.project_id = this.$route.params.project_id
        if (input_id) {
            this.loader = true;
            this.edit_mode = true;
            this.loadData();
        } else {
            this.loadInputProps();
            this.edit_mode = false;
        }
    },
}
</script>
<style>
.form-group{
    margin-bottom: 4px;
}
</style>