<template>
    <div class="d-flex flex-column flex-root login-bg" id="kt_app_root">
        <div class="d-flex flex-column flex-column-fluid flex-lg-row">
            <div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
                <div class="d-flex flex-column">
                    <a href="#" class="mb-7">
                        <img alt="Logo" src="/assets/img/vascular-logo.png" style="width: 100px" />
                    </a>
                    <h2 class="text-white m-0">
                        National Vascular Registry
                    </h2>
                </div>
            </div>
            <div class="d-flex flex-center w-lg-50 p-10">
                <div class="card rounded-3 w-md-550px">
                    <div class="card-body p-10 p-lg-20">
                        <div class="text-center mb-11">
                            <h1 class="text-dark fw-bolder mb-3">Sign In</h1>
                            <div class="text-gray-500 fw-semibold fs-6">Registry System</div>
                        </div>

                        <div class="fv-row mb-3">
                            <input type="text" placeholder="Email" v-model="email" name="email" autocomplete="off"
                                class="form-control bg-transparent" />
                        </div>
                        <div class="fv-row mb-5">
                            <input type="password" v-model="password" placeholder="Password" name="password"
                                autocomplete="off" class="form-control bg-transparent" />
                        </div>
                        <div class="d-grid mb-10">
                            <button type="submit" :disabled="disabled" id="kt_sign_in_submit" class="btn btn-primary"
                                @click="login">
                                <span v-if="!disabled" class="indicator-label">Sign In</span>
                                <PulseLoader :loading="disabled" color="#fff" size="10px"></PulseLoader>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
    components: { PulseLoader },
    data() {
        return {
            disabled: false,
            email: '',
            password: '',
            error: '',
        }
    },
    methods: {
        login() {
            this.error = '';
            this.disabled = true;
            this.apiPost('login', {email: this.email, password: this.password})
                .then((data) => {
                    if (data.status) {
                        localStorage.setItem('user_token', data.result)
                        window.location = '/panel/home'
                    } else {
                        alert('Email atau password salah!');
                    }
                    this.disabled = false;
                })
        },
    },
}
</script>

<style>
.login-bg {
    background-image: url('../../assets/img/bg4.jpg');
    min-height: 100vh;
    background-position: top;
}
</style>