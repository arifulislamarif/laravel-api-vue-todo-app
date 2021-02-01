<template>
  <h1 class="font-weight-bold">Todo App with Api Call</h1>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <!-- Students Tables  -->
      <div class="col-8">
        <div class="card">
          <div class="card-header bg-dark text-light text-left">
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
                    <button @click="editStudent(student)" class="btn btn-info m-1">
                      Edit
                    </button>
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

      <!-- Create Student Form  -->
      <div class="col-4" v-if="!editForm.isUpdate">
        <div class="card">
          <div class="card-header bg-dark text-light text-left">
            <h3>Create Student</h3>
          </div>
          <div class="card-body">
            <form class="text-left" @submit.prevent="addStudentForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  @keyup.prevent="addStudentForm"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Name"
                  :class="errorMsg.errFieldName ? 'error-field' : ''"
                />
                <span
                  v-for="(err_name, index) in errorMsg.name"
                  :key="index"
                  class="text-danger"
                >
                  {{ err_name }}
                </span>
              </div>
              <div class="form-group">
                <label for="roll">Roll</label>
                <input
                  v-model="form.roll"
                  type="text"
                  class="form-control"
                  id="roll"
                  placeholder="Roll"
                  :class="errorMsg.errFieldRoll ? 'error-field' : ''"
                />
                <span
                  v-for="(err_roll, index) in errorMsg.roll"
                  :key="index"
                  class="text-danger"
                  >{{ err_roll }}</span
                >
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <textarea
                  v-model="form.address"
                  class="form-control"
                  id="address"
                  rows="5"
                  placeholder="Address"
                  :class="errorMsg.errFieldAddress ? 'error-field' : ''"
                ></textarea>
                <span
                  v-for="(err_address, index) in errorMsg.address"
                  :key="index"
                  class="text-danger"
                  >{{ err_address }}</span
                >
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit Student Form  -->
      <div class="col-4" v-else>
        <div class="card">
          <div class="card-header bg-dark text-light text-left">
            <h3 class="display-inline-block">Edit Student</h3>
            <button
              @click="editForm.isUpdate = false"
              class="float-right btn btn-primary"
            >
              Create
            </button>
          </div>
          <div class="card-body">
            <form class="text-left" @submit.prevent="updateStudentForm(editForm.id)">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  v-model="editForm.name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Name"
                />
              </div>
              <div class="form-group">
                <label for="roll">Roll</label>
                <input
                  v-model="editForm.roll"
                  type="text"
                  class="form-control"
                  id="roll"
                  placeholder="Roll"
                />
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <textarea
                  v-model="editForm.address"
                  class="form-control"
                  id="address"
                  rows="5"
                  placeholder="Address"
                ></textarea>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Show Modal -->
  <div v-if="showForm.showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Student Information</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" @click="showForm.showModal = false"
                    >&times;</span
                  >
                </button>
              </div>
              <div class="modal-body">
                <form class="text-left">
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      v-model="showForm.name"
                      type="text"
                      class="form-control"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>Roll</label>
                    <input
                      v-model="showForm.roll"
                      type="text"
                      class="form-control"
                      disabled
                    />
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
                  type="button"
                  class="btn btn-secondary"
                  @click="showForm.showModal = false"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
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

    const editForm = reactive({
      id: "",
      name: "",
      roll: "",
      address: "",
      isUpdate: false,
    });

    const showForm = reactive({
      name: "",
      roll: "",
      address: "",
      showModal: false,
    });

    const errorMsg = reactive({
      name: [],
      roll: [],
      address: [],
      errFieldName: false,
      errFieldRoll: false,
      errFieldAddress: false,
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
        .then(() => {
          form.name = "";
          form.roll = "";
          form.address = "";
          store.dispatch("loadStudents");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            let nameErrorMessage = error.response.data.errors.name;
            let rollErrorMessage = error.response.data.errors.roll;
            let addressErrorMessage = error.response.data.errors.address;

            if (nameErrorMessage) {
              errorMsg.name = nameErrorMessage;
              errorMsg.errFieldName = true;
            } else if (rollErrorMessage) {
              errorMsg.roll = rollErrorMessage;
              errorMsg.errFieldRoll = true;
            } else if (addressErrorMessage) {
              errorMsg.address = addressErrorMessage;
              errorMsg.errFieldAddress = true;
            }
            // console.log(error.response.data.errors.name);
          }
        });
    }

    function showStudent(student) {
      showForm.showModal = true;
      showForm.name = student.name;
      showForm.roll = student.roll;
      showForm.address = student.address;
    }

    function editStudent(student) {
      console.log(student);
      editForm.isUpdate = true;
      editForm.id = student.id;
      editForm.name = student.name;
      editForm.roll = student.roll;
      editForm.address = student.address;
    }

    function updateStudentForm(id) {
      axios
        .put(`http://127.0.0.1:8000/api/student/${id}`, {
          name: editForm.name,
          roll: editForm.roll,
          address: editForm.address,
        })
        .then((response) => {
          console.log(response);
          editForm.isUpdate = false;
          store.dispatch("loadStudents");
        });
    }

    function deleteStudent(id) {
      axios.delete(`http://127.0.0.1:8000/api/student/${id}`).then(() => {
        store.dispatch("loadStudents");
      });
    }

    return {
      form,
      errorMsg,
      showForm,
      students,
      loadStudents,
      addStudentForm,
      editForm,
      showStudent,
      editStudent,
      updateStudentForm,
      deleteStudent,
    };
  },
};
</script>

<style>
.error-field {
  border-color: red;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
