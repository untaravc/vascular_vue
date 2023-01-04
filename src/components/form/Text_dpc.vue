<template>
    <div class="col-md-6 mb-3" v-if="question.type === 'text'">
        <div class="d-flex justify-content-between">
            <label>{{question.name}}</label>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id);">input logs</label>
        </div>
        <input type="text" :value="record_value" class="form-control" @focusout="updateInput($event.target.value)">
    </div>
    <div class="col-md-6 mb-3" v-if="question.type === 'textarea'">
        <div class="d-flex justify-content-between">
            <label>{{question.name}}</label>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id);">input logs</label>
        </div>
        <textarea type="text" :value="record_value" class="form-control" @focusout="updateInput($event.target.value)"></textarea>
    </div>
    <div class="col-md-6 mb-3" v-if="question.type === 'number'">
        <div class="d-flex justify-content-between">
            <label>{{question.name}}</label>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id);">input logs</label>
        </div>
        <input type="number" :value="record_value" v-if="question.suffix === null" class="form-control"
               @focusout="updateInput($event.target.value)">
        <div class="input-group" v-if="question.suffix">
            <input type="number" class="form-control" :value="record_value" @focusout="updateInput($event.target.value)"/>
            <span class="input-group-text">{{question.suffix}}</span>
        </div>
    </div>
    <div class="col-md-6 mb-3" v-if="question.type === 'select'">
        <div class="d-flex justify-content-between">
            <label>{{question.name}}</label>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id);">input logs</label>
        </div>
        <select :value="record_value" class="form-control" @change="updateInput($event.target.value)">
            <option value="">Pilih</option>
            <option v-for="(opt, o) in question.children" :key="o" :value="opt.value">{{opt.name}}</option>
        </select>
    </div>
    <div class="col-md-6 mb-3" v-if="question.type === 'radio'">
        <div class="d-flex justify-content-between">
            <label>{{question.name}}</label>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id);">input logs</label>
        </div>
        <select :value="record_value" class="form-control" @change="updateInput($event.target.value)">
            <option value="">Pilih</option>
            <option v-for="(opt, o) in question.children" :key="o" :value="opt.value">{{opt.name}}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: ['question', 'record_id', 'record_value'],
    methods:{
        updateInput(value){
            this.emitter.emit('updating-form', true);
            this.authPost('project-input', {
                input_id: this.question.id,
                record_id: this.record_id,
                value: value,
            }).then(()=>{
                this.emitter.emit('updating-form', false);
            })
        }
    },
}
</script>

<style>
.info-style{
    font-style: italic;
    color: #bdbdbd;
    text-decoration: underline;
}
</style>