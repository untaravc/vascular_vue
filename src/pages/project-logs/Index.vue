<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div  class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div  class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Project Logs</h1>
                </div>
            </div>
        </div>

        <div class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card">
                    <div class="card-body" style="min-height: 500px">
                        <page-loader v-model:active="loader" v-bind="page_loader_config"/>
                        <div class="row mb-2">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 d-flex justify-content-center">
                                <button class="btn btn-sm btn-secondary me-2" @click="changeDate(-1)">
                                    <i class="fa fa-angles-left"></i> Prev
                                </button>
                                <input type="date" v-model="filter.date" @change="loadDataContent" class="form-control width-auto">
                                <button class="btn btn-sm btn-secondary ms-2" @click="changeDate(1)">
                                    Next <i class="fa fa-angles-right"></i>
                                </button>
                            </div>
                            <div class="col-md-3"></div>
                        </div>
                        <table style="width: 100%">
                            <tr>
                                <th>Time</th>
                                <th>User</th>
                                <th>Type</th>
                                <th>Field</th>
                                <th>Action</th>
                            </tr>
                            <tr v-for="data in data_content" :key="data.id">
                                <td>
                                    {{ $filters.formatDateTime(data.created_at) }}
                                </td>
                                <td>
                                    <span v-if="data.user">{{ data.user.name }}</span>
                                </td>
                                <td>
                                    <span v-if="data.is_creator"> input </span>
                                    <span v-if="!data.is_creator"> mengubah data </span>
                                </td>
                                <td>
                                    <span v-if="data.input"> {{ data.input.name }}</span>
                                </td>
                                <td>
                                    <span v-if="data.is_creator"> {{ data.value_then }} </span>
                                    <span v-if="!data.is_creator">
                                        {{ data.value_from }} <i>ke</i> {{ data.value_then }}
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <div v-if="data_content.length === 0" class="text-center">
                            tidak ada data
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
            filter: {
                date: '',
                nav: 0,
            }
        }
    },
    methods: {
        loadDataContent() {
            this.loader = true;
            this.authGet('project-logs/' + this.$route.params.project_id, this.filter)
                .then((data) => {
                    this.data_content = data.result;
                    this.loader = false;
                    this.filter.date = data.query.date
                })
        },
        changeDate(direction){
            this.filter.nav = direction;
            this.loadDataContent()
        }
    },
    created() {
        this.loadDataContent()
    }
}
</script>
<style scoped>
.width-auto{
    width: auto;
}
</style>