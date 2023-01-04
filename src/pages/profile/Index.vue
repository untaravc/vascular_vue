<template>
    <div class="d-flex flex-column flex-column-fluid" data-select2-id="select2-data-131-6dxb">
        <div class="app-toolbar py-3 py-lg-6" data-select2-id="select2-data-kt_app_toolbar">
            <div class="app-container container-xxl d-flex flex-stack"
                 data-select2-id="select2-data-kt_app_toolbar_container">
                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Update Profile</h1>
                </div>
            </div>
        </div>

        <div class="app-content flex-column-fluid">
            <div class="app-container container-xxl">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="form.name"
                                           :class="{ 'is-invalid': form.errors.has('name') }">
                                    <div v-if="form.errors.has('name')" v-html="form.errors.get('name')"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" autocomplete="new-password" class="form-control"
                                           v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }">
                                    <div v-if="form.errors.has('email')" v-html="form.errors.get('email')"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>New Password</label>
                                    <input type="password" autocomplete="new-password" v-model="form.password"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" autocomplete="new-password"
                                           v-model="form.password_confirmation" class="form-control"
                                           :class="{ 'is-invalid': form.errors.has('password') }">
                                    <div v-if="form.errors.has('password')" v-html="form.errors.get('password')"/>
                                </div>
                            </div>
                            <div class="col-12 text-right">
                                <button class="btn btn-sm btn-primary" :disabled="disabled" @click="updateProfile">
                                    <BounceLoader :loading="disabled" color="#fff" size="22px"></BounceLoader>
                                    <span v-if="!disabled">Update</span>
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
            data_content: false,
            form: new form({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            })
        }
    },
    methods: {
        loadData() {
            this.loader = true
            this.authGet('profile')
                .then((data) => {
                    this.form.fill(data.result)
                    this.loader = false
                })
        },
        updateProfile() {
            this.disabled = true;
            this.form.post(this.base_api + 'profile', this.setHeader())
                .then(({data}) => {
                    this.toaster({title: data.text});
                    this.disabled = false
                }).catch(() => {
                this.disabled = false
            })
        }
    },
    created() {
        this.loadData();
    }
}
</script>