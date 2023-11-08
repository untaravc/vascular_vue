<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h3>Input Data</h3>
                </div>
                <div class="col-4" style="text-align: right">
                    <button class="btn btn-sm btn-danger mx-1" v-if="edit_mode" @click="deleteData">
                        Delete
                    </button>
                    <router-link :to="'/panel/p/'+ this.$route.params.project_id +'/records'"
                                 class="btn btn-sm btn-secondary mx-1">
                        Back to records
                    </router-link>
                </div>
            </div>
        </div>
        <div class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card p-6">
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <label>Diagnosis</label>
                            <select class="form-control" :disabled="edit_mode" v-model="patient.category_id">
                                <option :key="cat.id" v-for="cat in project_categories" :value="cat.id">{{
                                        cat.name
                                    }}
                                </option>
                            </select>
                            <div v-if="patient.errors.has('category_id')" class="text-danger" v-html="patient.errors.get('category_id')"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Nama</label>
                            <input type="text" :disabled="edit_mode" class="form-control" v-model="patient.name">
                            <div v-if="patient.errors.has('name')" class="text-danger" v-html="patient.errors.get('name')"/>
                        </div>
                        <div class="col-md-4">
                            <label>Tanggal Lahir</label>
                            <input type="date" :disabled="edit_mode" placeholder="dd-mm-yyyy" class="form-control" v-model="patient.dob">
<!--                            <VueCtkDateTimePicker v-model="patient.dob" v-bind="data_config"></VueCtkDateTimePicker>-->
                            <div v-if="patient.errors.has('dob')" class="text-danger" v-html="patient.errors.get('dob')"/>
                        </div>
                        <div class="col-md-4">
                            <label>NIK</label>
                            <input type="number" :disabled="edit_mode" class="form-control" v-model="patient.nik">
                            <div v-if="patient.errors.has('nik')" class="text-danger" v-html="patient.errors.get('nik')"/>
                        </div>
                        <div class="col-12 pt-3" style="text-align: center" v-if="!edit_mode">
                            <button class="btn btn-sm btn-success" :disabled="disabled" @click="addPatient">
                                Add New Record
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card mt-3 p-6" v-if="edit_mode">
                    <div class="d-flex flex-column flex-md-row rounded border p-5">
                        <ul class="nav nav-tabs nav-pills border-0 flex-row flex-md-column me-5 mb-3 mb-md-0 fs-6"
                            role="tablist">
                            <li class="nav-item w-md-200px me-0" role="presentation" :key="cat.id"
                                v-for="(cat, i) in sub_categories">
                                <a class="nav-link w-100 btn btn-flex btn-active-light-primary"
                                   :class="i === 0 ? 'active' : ''"
                                   @click="loadInput(cat.id)"
                                   data-bs-toggle="tab" :href="'#kt_vtab_pane_' + cat.id" role="tab" tabindex="-1">
                            <span class="d-flex flex-column align-items-start text-left">
                                <span class="fs-5 fw-bold">{{ $filters.capitalize(cat.name) }}</span>
                                <span class="fs-7">{{ cat.sum }} questions</span>
                            </span>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent" style="width: 100%">
                            <page-loader v-model:active="loader" v-bind="page_loader_config"/>
                            <div class="tab-pane fade" :class="c === 0 ? 'active show' : ''"
                                 :id="'kt_vtab_pane_' + cat.id"
                                 role="tabpanel" :key="c" v-for="(cat, c) in sub_categories">

                                <div class="row">
                                    <div class="col-12">
                                        <h5>{{ cat.name }}</h5>
                                    </div>
                                    <TextInput :question="question"
                                               :record_id="$route.query.record_id"
                                               :record_value="question.value"
                                               :key="question.id"
                                               v-for="question in question_form"></TextInput>
                                    <div v-for="cat in question_categories" :key="cat.id">
                                        <div class="border box-group">
                                            <div class="row">
                                                <div class="col-12">
                                                    <b><i>{{ cat.name }}</i></b>
                                                </div>
                                                <TextInput :question="sub_input"
                                                           :record_id="$route.query.record_id"
                                                           :record_value="sub_input.value"
                                                           :key="sub_input.id"
                                                           v-for="sub_input in cat.inputs"></TextInput>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="height: 15px">
                        <small v-if="saving" class="text-black-50"><i>saving..</i></small>
                    </div>
                </div>

                <div class="modal fade" id="log_modal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <page-loader v-model:active="loader_log" v-bind="page_loader_config"/>
                                <h6>Log Input : <span v-if="input_logs.input">{{ input_logs.input.name }}</span></h6>
                                <div v-if="input_logs.project_logs">
                                    <div class="alert alert-primary p-2 mb-1" :key="log.id"
                                         v-for="log in input_logs.project_logs">
                                        <span v-if="log.user">{{ log.user.name }}</span>:
                                        <span class="text-black">input</span>
                                        <b class="px-1">{{ log.value_then }}</b>
                                        <span
                                            class="text-black-50">at {{
                                                $filters.formatDateTime(log.created_at)
                                            }}</span>
                                    </div>
                                </div>
                                <div class="text-center" v-if="input_logs.project_logs.length === 0">
                                    <i class="text-black-50">Belum ada record</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="note_modal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div v-if="data_detail.note" v-html="data_detail.note"></div>
                                <div v-else class="italic">
                                    <i>Tidak ada catatan</i>
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
import TextInput from '../../components/form/Text'

export default {
    data() {
        return {
            saving: false,
            loader: false,
            loader_log: false,
            edit_mode: false,
            project_categories: [],
            disabled: false,
            data_detail: false,
            patient: new form({
                name: '',
                project_id: '',
                dob: '',
                nik: '',
                category_id: '',
            }),
            record: {},
            sub_categories: [],
            question_form: [],
            question_categories: [],
            input_logs: {
                project_logs: [],
                input: {},
            },
        }
    },
    methods: {
        loadProjectCategory() {
            this.authGet('categories-list', {
                project_id: this.$route.params.project_id
            }).then((data) => {
                this.project_categories = data.result
            })
        },
        addPatient() {
            this.disabled = true;
            this.patient.project_id = this.$route.params.project_id
            this.patient.post(this.base_api + 'patients', this.setHeader())
                .then(({data}) => {
                    if(data.status){
                    window.location = '/panel/p/' + this.$route.params.project_id + '/inputs?record_id=' + data.result.record.id;
                    this.disabled = false;
                    } else {
                        alert(data.text)
                    }

                }).catch(() => {
                this.disabled = false;
            })
        },
        loadData(record_id) {
            this.authGet('project-records', {record_id: record_id})
                .then((data) => {
                    this.patient.fill(data.result);
                    this.sub_categories = data.categories;

                    this.loadInput(this.sub_categories[0].id);
                })
        },
        loadInput(category_id) {
            this.loader = true;
            this.authGet('project-inputs', {
                project_id: this.$route.params.project_id,
                category_id: category_id,
                record_id: this.$route.query.record_id,
            }).then((data) => {
                this.question_form = data.result
                this.question_categories = data.categories
                this.loader = false;
            })
        },
        modalLog(input_id) {
            $('#log_modal').modal('show');
            this.loader_log = true;
            this.authGet('input-logs', {
                input_id: input_id,
                record_id: this.$route.query.record_id,
            }).then((data) => {
                this.input_logs = data.result;
                this.loader_log = false;
            })
        },
        noteModal(data) {
            this.data_detail = data
            $('#note_modal').modal('show');
        },
        deleteData() {
            if (confirm('Delete record?')) {
                this.$axios.delete(this.base_api + 'records/' + this.$route.query.record_id, this.setHeader())
                    .then(({data}) => {
                        if (data.status) {
                            this.toaster({title: 'Deleted!'})
                            this.$router.push('/panel/p/' + this.$route.params.project_id + '/records')
                        } else {
                            alert(data.text)
                        }
                    })
            }
        }
    },
    created() {
        this.loadProjectCategory()
        let record_id = this.$route.query.record_id;
        if (record_id > 0) {
            this.edit_mode = true;
            this.loadData(record_id)
        }
        this.emitter.on('updating-form', (val) => {
            this.saving = val
        })

        this.emitter.on('modal-log', (input_id, note = null) => {
            this.modalLog(input_id)
        })

        this.emitter.on('modal-note', (data) => {
            this.noteModal(data)
        })
    },
    components: {TextInput}
}
</script>
<style scoped>
.box-group{
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}
</style>