import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    students:[]
    // students: [
    //   { name: 'arif', roll: 1234, address: "asdasasdsa"},
    //   { name: 'khan', roll: 1234, address: "asdasasdsa"},
    //   { name: 'islam', roll: 5456234, address: "asdasasasdasdasddsa"}
    // ]
  },
  actions: {
    async loadStudents({ commit }){
      let response =  await axios.get('http://127.0.0.1:8000/api/student')
      commit("loadStudentss",response.data.students);
    }
  },
  mutations: {
    loadStudentss(state,data){
      state.students = data;
    },
    addStudent(state, value){
      state.students.push(value)
    },
  },
  modules: {
  }
})
