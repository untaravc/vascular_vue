import Swal from 'sweetalert2'
const mixin = {
    data() {
        return {
            base_api: '',
            logged_in: false,
            page_loader_config: {
                loader: 'bars',
                canCancel: false,
                isFullPage: false,
                color: '#009ef7',
                backgroundColor: '#fff',
                opacity: 0.5,
                blur: '0px'
            },
            today_date: new Date().toJSON().slice(0,10),
            setup_filter: 0,
            money_config: {
                decimal: ",",
                thousands: ".",
                disableNegative: true,
                precision: 0,
            },
            data_config:{
                formatted: 'll',
                onlyDate : true,
                inputSize : 'lg',
            }
        }
    },
    created: function () {
        if(window.location.origin === 'http://localhost:8080' || window.location.origin === 'http://127.0.0.1:8080'){
            this.base_api = 'http://127.0.0.1:8000/api/'
        }else{
            this.base_api = 'https://rgs-vascular.kardiologi-fkkmk.com/api/'
        }
    },
    methods: {
        async apiGet(uri, params) {
            let response = '';
            await this.$axios.get(this.base_api + uri, { params: params })
                .then(({ data }) => {
                    response = data;
                }).catch((e) => {
                    let rc = e.response.status;
                    if (rc === 401) {
                        // window.location = '/login'
                    }
                })

            return response;
        },
        async apiPost(uri, data = {}) {
            let response = '';
            await this.$axios.post(this.base_api + uri, data)
                .then(({ data }) => {
                    response = data;
                }).catch((e) => {
                    console.log(e.message)
                })

            return response;
        },
        async authGet(uri, params) {
            let response = '';
            let token = localStorage.getItem('user_token')
            await this.$axios.get(this.base_api + uri, {params: params, headers: {
                    Authorization: 'Bearer ' + token
                }}).then(({ data }) => {
                response = data;
            }).catch((e) => {
                let rc = e.response.status;
                if (rc === 401) {
                    window.location = '/login'
                } else if (rc === 422) {
                    response.status = false;
                    response.errors = '';
                }
            })

            return response;
        },
        async authPost(uri, data) {
            let response = '';
            let token = localStorage.getItem('user_token')
            await this.$axios.post(this.base_api + uri, data, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(({ data }) => {
                response = data;
            }).catch((e) => {
                let rc = e.response.status;
                if (rc === 401) {
                    window.location = '/login'
                } else if (rc === 422) {
                    response.status = false;
                    response.errors = '';
                }
            })

            return response;
        },
        setHeader() {
            let ls_token = localStorage.user_token
            return {
                headers: {
                    Authorization: 'Bearer ' + ls_token,
                    Accept: 'application/json'
                }
            }
        },
        toaster({title = 'Success!', icon = 'success'}){
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                icon: icon,
                title: title,
                width: '15em'
            })
        },
        updateSetupFilter(data){
            this.setup_filter = data
        }
    }
}

export default mixin;