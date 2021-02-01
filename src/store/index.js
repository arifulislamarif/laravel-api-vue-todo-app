import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    students:[]
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
