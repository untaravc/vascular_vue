<template>
    <div class="col-md-6 mb-4 p-2 " v-if="question.type === 'text'">
        <div class="d-flex justify-content-between">
            <b>
                {{ question.name }}
                <i class="fa fa-question-circle cursor-pointer" v-if="question.note" @click="emitter.emit('modal-note', question);"></i>
            </b>
            <label class="cursor-pointer info-style" @click="modalLog(question.id)">input logs</label>
        </div>
        <input type="text" :value="record_value" class="form-control" @focusout="updateInput($event.target.value)">
    </div>

    <div class="col-md-6 mb-4 p-2 " v-if="question.type === 'textarea'">
        <div class="d-flex justify-content-between">
            <b>
                {{ question.name }}
                <i class="fa fa-question-circle cursor-pointer" v-if="question.note" @click="emitter.emit('modal-note', question);"></i>
            </b>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id, 'textarea');">input logs</label>
        </div>
        <textarea type="text" :value="record_value" class="form-control" @focusout="updateInput($event.target.value)"></textarea>
    </div>

    <div class="col-md-6 mb-4 p-2 " v-if="question.type === 'number'">
        <div class="d-flex justify-content-between">
            <b>
                {{ question.name }}
                <i class="fa fa-question-circle cursor-pointer" v-if="question.note" @click="emitter.emit('modal-note', question);"></i>
            </b>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id);">input logs</label>
        </div>
        <input type="number" :value="record_value" v-if="question.suffix === null" class="form-control"
               @focusout="updateInput($event.target.value)">
        <div class="input-group" v-if="question.suffix">
            <input type="number" class="form-control" :value="record_value" @focusout="updateInput($event.target.value)"/>
            <span class="input-group-text">{{question.suffix}}</span>
        </div>
    </div>

    <div class="col-md-6 mb-4 p-2 " v-if="question.type === 'select'">
        <div class="d-flex justify-content-between">
            <b>
                {{ question.name }}
                <i class="fa fa-question-circle cursor-pointer" v-if="question.note" @click="emitter.emit('modal-note', question);"></i>
            </b>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id);">input logs</label>
        </div>
        <select :value="record_value" class="form-control" @change="updateInput($event.target.value)">
            <option value="">Select</option>
            <option v-for="(opt, o) in question.children" :key="o" :value="opt.value">{{opt.name}}</option>
        </select>
    </div>

    <div class="col-md-6 mb-4 p-2 " v-if="question.type === 'radio'">
        <div class="d-flex justify-content-between">
            <b>
                {{ question.name }}
                <i class="fa fa-question-circle cursor-pointer" v-if="question.note" @click="emitter.emit('modal-note', question);"></i>
            </b>
            <label class="cursor-pointer info-style" @click="emitter.emit('modal-log', question.id);">input logs</label>
        </div>
        <div class="row p-2">
            <div class="col d-flex align-items-center cursor-pointer" v-if="question.blank_option"
                 @click="updateInput('')">
                <unicon :name="input_value === '' ? 'check-circle' : 'circle'"
                        hover-fill="#17a8f8" :fill="input_value === '' ? '#17a8f8' : 'grey'" ></unicon>
                <div class="ms-2">
                    Unknown
                </div>
            </div>
            <div class="col d-flex align-items-center cursor-pointer" @click="updateInput(opt.value)"
                 v-for="(opt, o) in question.children" :key="o">
                <unicon :name="input_value === opt.value ? 'check-circle' : 'circle'"
                        hover-fill="#17a8f8" :fill="input_value === opt.value ? '#17a8f8' : 'grey'" ></unicon>
                <div class="ms-2">
                    {{opt.name}}
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6 mb-4 p-2 " v-if="question.type === 'date'">
        <div class="d-flex justify-content-between">
            <b>
                {{ question.name }}
                <i class="fa fa-question-circle cursor-pointer" v-if="question.note" @click="emitter.emit('modal-note', question);"></i>
            </b>
            <label class="cursor-pointer info-style" @click="modalLog(question.id)">input logs</label>
        </div>
        <input type="date" :value="record_value" class="form-control" @focusout="updateInput($event.target.value)">
    </div>

    <div class="col-md-6 mb-4 p-2 " v-if="question.type === 'checkbox'">
        <div class="d-flex justify-content-between">
            <b>
                {{ question.name }}
                <i class="fa fa-question-circle cursor-pointer" v-if="question.note" @click="emitter.emit('modal-note', question);"></i>
            </b>
            <label class="cursor-pointer info-style" @click="modalLog(question.id)">input logs</label>
        </div>
        <div>
            <div class="form-check py-1" v-for="(opt, o) in question.children" :key="o">
                <input class="form-check-input" type="checkbox" :value="opt.value" :checked="opt.checked"
                       :id="'cb_' + opt.id" @change="checkBox($event.target)">
                <label class="form-check-label" :for="'cb_' + opt.id">
                    {{opt.name}}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['question', 'record_id', 'record_value'],
    data(){
        return {
            input_value: this.record_value
        }
    },
    methods:{
        updateInput(value){
            this.input_value = value
            this.emitter.emit('updating-form', true);
            this.authPost('project-input', {
                input_id: this.question.id,
                record_id: this.record_id,
                value: value,
            }).then(()=>{
                this.emitter.emit('updating-form', false);
            })
        },
        modalLog(question_id){
            this.$parent.modalLog(question_id)
        },
        checkBox(target){
            this.authPost('project-input', {
                input_id: this.question.id,
                record_id: this.record_id,
                value: target.value,
                checked: target.checked,
            }).then(()=>{
                this.emitter.emit('updating-form', false);
            })
        },
        checkedBox(){
            // if(this.question.type === 'checkbox'){
            //     console.log(this.question.type)
            //     // let answer = this.record_value.split(",")
            //     // if(answer.length > 0){
            //     //     if(answer.include(value)){
            //     //         return true;
            //     //     }else{
            //     //         return false;
            //     //     }
            //     // }
            // }
            return false;
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