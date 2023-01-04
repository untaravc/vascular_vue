<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div  class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div  class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Export Data</h1>
                </div>
            </div>
        </div>

        <div  class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card">
                    <div class="card-body">
                        <page-loader v-model:active="loader" v-bind="page_loader_config"/>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Tipe</label>
                                    <select class="form-control" @change="loadList" v-model="filter.category_parent_id">
                                        <option v-for="cat in data_raw.categories" :value="cat.id" :key="cat.id">{{cat.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="border p-4 mb-3" v-if="data_content.categories.length > 0">
                            <div v-for="data in data_content.categories" :key="data.id" class="mb-3 border-bottom pb-2">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" @click="addCartCat(data, $event.target.checked)">
                                    <b class="form-check-label">
                                        {{ data.name }}
                                    </b>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 my-1" v-for="input in data.inputs" :key="input.id" >
                                        <div class="form-check mt-1">
                                            <input type="checkbox" class="form-check-input" v-model="input.checked"
                                                   @change="addToCart" :checked="input.checked" :id="'input'+input.id">
                                            <label class="form-check-label" :for="'input'+input.id">
                                                {{input.name}}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="border p-4" v-if="carts.length > 0">
                            <span v-for="cart in carts" :key="cart.id">{{cart.name}}, </span>
                        </div>
                        <div style="text-align: right">
                            <button class="btn btn-sm btn-success mx-1">
                                Download Excel
                            </button>
                            <button class="btn btn-sm btn-primary mx-1" @click="previewData">
                                Preview Data
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-body">
                        <h5>Preview Data</h5>
                        <i v-if="preview_fields.length === 0">No preview data.</i>
                        <page-loader v-model:active="preview_loader" v-bind="page_loader_config"/>
                        <table class="table" v-if="preview_fields.length > 0">
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>DOB</th>
                                <th v-for="field in preview_fields" :key="field.id">{{field.name}}</th>
                            </tr>
                            <tr :key="prev.id" v-for="(prev, id) in data_preview">
                                <td>{{id + 1}}</td>
                                <td>{{$filters.capitalize(prev.name)}}</td>
                                <td>{{$filters.formatDate(prev.dob)}}</td>
                                <td v-for="item in prev.inputs" :key="item.id">
                                    <span class="p-0" v-if="item.value && item.value.value_str">{{item.value.value_str}}</span>
                                    <span class="p-0" v-else-if="item.value && item.value.value_text">{{item.value.value_text}}</span>
                                </td>
                            </tr>
                        </table>
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
            preview_loader: false,
            data_preview: [],
            preview_fields: [],
            data_content: {
                categories:[]
            },
            data_raw: {
                categories: [],
            },
            filter: {
                project_id: '',
                category_parent_id:'',
            },
            carts: []
        }
    },
    methods: {
        loadList() {
            this.loader = true
            this.filter.project_id = this.$route.params.project_id
            this.authGet('export-list', this.filter)
                .then((data) => {
                    this.data_content = data.result
                    this.loader = false

                    this.data_content.categories.forEach((item)=>{
                        item.inputs.forEach((input)=>{
                            input.checked = false;
                        })
                    })
                })
        },
        loadCat(){
            this.authGet('categories-list', {
                project_id: this.$route.params.project_id
            }).then(({result})=>{
                this.data_raw.categories = result;
                this.filter.category_parent_id = result[0].id
                this.loadList()
            })
        },
        addToCart(){
            this.carts = [];
            this.data_content.categories.forEach((item)=>{
                item.inputs.forEach((input)=>{
                    if(input.checked){
                        this.carts.push(input)
                    }
                })
            })
        },
        addCartCat(data, e){
            this.data_content.categories.forEach((item)=>{
                item.inputs.forEach((input)=>{
                    if(input.category_id === data.id){
                        if(e){
                            input.checked = true
                        }else{
                            input.checked = false
                        }
                    }
                })
            })
            this.addToCart()
        },
        previewData(){
            this.preview_loader = true;
            let cats = this.data_content.categories;
            let input_ids = [];
            cats.forEach((cat)=>{
                cat.inputs.forEach((input)=>{
                    if(input.checked === true){
                        input_ids.push(input.id)
                    }
                })
            })

            if(input_ids.length === 0){
                alert('No field selected');
                return
            }

            this.authPost('export-data', {
                input_ids: input_ids,
                project_id: this.$route.params.project_id
            }).then((data)=>{
                this.data_preview = data.result
                this.preview_fields = data.fields
                this.preview_loader = false;
            })
        }
    },
    created() {
        this.loadCat();
    }
}
</script>