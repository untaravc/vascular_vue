<template>
    <div class="card">
        <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
                <span class="card-label fw-bold text-dark">Institution Record</span>
                <span class="text-muted mt-1 fw-semibold fs-7"></span>
            </h3>
        </div>
        <div class="card-body pt-6">
            <div v-for="data in data_content.institutions" :key="data.id">
                <div class="d-flex flex-stack">
                    <div class="symbol symbol-40px me-4">
                        <div class="symbol-label fs-2 fw-semibold text-inverse-danger bg-danger">
                            {{ $filters.initial(data.name) }}
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                        <div class="flex-grow-1 me-2">
                            <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bold">{{ data.name }}</a>
                            <div>
                                <span class="text-muted fw-semibold fs-7 me-2" v-for="record in data.records">
                                    {{ record.category_name }}: <b>{{ record.record_count }}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separator separator-dashed my-4"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data_content: []
        }
    },
    methods: {
        loadUser() {
            this.authGet('dashboard-user')
                .then((data) => {
                    this.data_content = data.result;
                })
        }
    },
    created() {
        this.loadUser()
    }
}
</script>