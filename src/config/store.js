// Vuex
import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            project_setup_cat_ids: {},
            user: {
                email: '',
                id: '',
                institution_id: '',
                name: "",
                role: "",
            }
        }
    },
    mutations: {
        input_setup_cat_id(state, payload) {
            state.project_setup_cat_ids[payload.name] = payload.value
        }
    }
})

export default store;