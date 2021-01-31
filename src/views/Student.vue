<template>
  <h1 class="font-weight-bold">Todo App with Api Call</h1>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card">
          <div class="card-header bg-dark text-light">
            <h3>All Students</h3>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th width="5%">SL</th>
                  <th width="20%">Name</th>
                  <th width="5%">Roll</th>
                  <th width="40%">Address</th>
                  <th width="30%">Action</th>
                </tr>
              </thead>
              <tbody v-if="students.length != 0">
                <tr v-for="(student, index) in students" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.roll }}</td>
                  <td>{{ student.address }}</td>
                  <td>
                    <button @click="showStudent(student)" class="btn btn-primary m-1">
                      Show
                    </button>
                    <button class="btn btn-info m-1">Edit</button>
                    <button
                      onclick="return confirm('Are you sure you want to delete this item?');"
                      @click="deleteStudent(student.id)"
                      class="btn btn-danger m-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr class="text-center">
                  Nothing Found
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header bg-dark text-light">
            <h3>Create Student</h3>
          </div>
          <div class="card-body">
            <form class="text-left" @submit.prevent="addStudentForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Name"
                />
              </div>
              <div class="form-group">
                <label for="roll">Roll</label>
                <input
                  v-model="form.roll"
                  type="text"
                  class="form-control"
                  id="roll"
                  placeholder="Roll"
                />
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <textarea
                  v-model="form.address"
                  class="form-control"
                  id="address"
                  rows="5"
                  placeholder="Address"
                ></textarea>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Show Modal -->
  <div
    class="modal fade show"
    style="display: block"
    v-show="showForm.showModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button
            @click="showForm.showModal = false"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="text-left">
            <div class="form-group">
              <label>Name</label>
              <input v-model="showForm.name" type="text" class="form-control" disabled />
            </div>
            <div class="form-group">
              <label>Roll</label>
              <input v-model="showForm.roll" type="text" class="form-control" disabled />
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea
                v-model="showForm.address"
                class="form-control"
                rows="5"
                disabled
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            @click="showForm.showModal = false"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  setup() {
    const form = reactive({
      name: "",
      roll: "",
      address: "",
    });

    const showForm = reactive({
      name: "",
      roll: "",
      address: "",
      showModal: false,
    });

    const store = useStore();
    const students = computed(() => store.state.students);
    const loadStudents = onMounted(() => store.dispatch("loadStudents"));

    function addStudentForm() {
      axios
        .post("http://127.0.0.1:8000/api/student", {
          name: form.name,
          roll: form.roll,
          address: form.address,
        })
        .then((response) => {
          console.log(response);
          form.name = "";
          form.roll = "";
          form.address = "";
          store.dispatch("loadStudents");
        });
    }

    function showStudent(student) {
      showForm.showModal = true;
      showForm.name = student.name;
      showForm.roll = student.roll;
      showForm.address = student.address;

      // axios.delete(`http://127.0.0.1:8000/api/student/${id}`).then((response) => {
      //   console.log(response);
      //   store.dispatch("loadStudents");
      // });
    }

    function deleteStudent(id) {
      axios.delete(`http://127.0.0.1:8000/api/student/${id}`).then((response) => {
        console.log(response);
        store.dispatch("loadStudents");
      });
    }

    return {
      form,
      showForm,
      students,
      loadStudents,
      addStudentForm,
      showStudent,
      deleteStudent,
    };
  },
};
</script>
