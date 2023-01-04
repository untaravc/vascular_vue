<template>
    <div class="d-flex flex-column flex-column-fluid">
        <div  class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div  class="app-container container-xxl d-flex flex-stack" data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">Faq Extended</h1>
                </div>
                <div class="d-flex align-items-center gap-2 gap-lg-3" data-select2-id="select2-data-121-724v">
                </div>
            </div>
        </div>
        <div  class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card">
                    <div class="card-body p-lg-15">
                        <div class="d-flex flex-column flex-lg-row">
                            <div class="flex-column flex-lg-row-auto w-100 w-lg-275px mb-10 me-lg-20">
                                <div class="mb-6">
                                    <div class="position-relative">
                                        <span class="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                        <input type="text" class="form-control form-control-solid ps-10" name="search" value="" placeholder="Search Patient">
                                    </div>
                                </div>

                                <div class="mb-15">
                                    <h4 class="text-dark mb-7">Records</h4>
                                    <div class="menu menu-rounded menu-column menu-title-gray-700 menu-state-title-primary menu-active-bg-light-primary fw-semibold">
                                        <div class="menu-item mb-1" v-for="(data, d) in data_content" :key="data.id">
                                            <a href="#" class="menu-link py-3" :class="record_id === data.id ? 'active' : ''" @click="loadData(data)">
                                                {{$filters.capitalize(data.name)}}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-lg-row-fluid">
                                <page-loader v-model:active="loader" v-bind="page_loader_config"/>
                                <div class="mb-13">
                                    <div v-if="selected_detail" class="p-3 mb-3"
                                         style="background-color:#f1faff; border-radius: 0.5em">
                                        <h4 class="mb-0">
                                            {{ $filters.capitalize(selected_detail.name) }}
                                        </h4>
                                    </div>
                                    <div v-for="(detail, d) in data_details" :key="d" class="mb-5">
                                        <h5 class="border-bottom">Section: {{detail.name}}</h5>
                                        <table style="width: 100%">
                                            <tr v-for="input in detail.input" :key="input.id">
                                                <td style="width: 35%; vertical-align: top">{{input.name}}</td>
                                                <td style="width: 2%; vertical-align: top">:</td>
                                                <td style="vertical-align: top">
                                                    <span v-if="input.project_input">
                                                        {{input.project_input.value_str ?? input.project_input.value_text}}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        <div v-if="detail.sub_categories && detail.sub_categories.length > 0">
                                            <div class="ms-4 mb-2" v-for="(sub, s) in detail.sub_categories" :key="s">
                                                <h5 class="border-bottom">Sub section: {{sub.name}}</h5>
                                                <table style="width: 100%">
                                                    <tr v-for="input in sub.input" :key="input.id">
                                                        <td style="width: 35%; vertical-align: top">{{input.name}}</td>
                                                        <td style="width: 2%; vertical-align: top">:</td>
                                                        <td style="vertical-align: top">
                                                    <span v-if="input.project_input">
                                                        {{input.project_input.value_str ?? input.project_input.value_text}}
                                                    </span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
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
            data_content: [],
            data_details: [],
            selected_detail: '',
            loader: false,
            record_id: 0,
            filter: {
                project_id: this.$route.params.project_id,
                name: '',
            }
        }
    },
    methods: {
        loadDataContent() {
            this.loader = true
            this.authGet('record-list', this.filter)
                .then((data) => {
                    this.data_content = data;
                    this.loader = false;
                    if(data[0]){
                        this.loadData(data[0])
                    }
                })
        },
        loadData(params){
            this.record_id = params.id
            this.loader = true;
            this.selected_detail = params
            this.authGet('record-report/' + params.id)
            .then((data)=>{
                this.loader = false;
                this.data_details = data.result
            })
        }
    },
    created() {
        this.loadDataContent();
    }
}
</script>