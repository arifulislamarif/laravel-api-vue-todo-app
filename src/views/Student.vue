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
              <tbody>
                <tr v-for="(student, index) in students" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.roll }}</td>
                  <td>{{ student.address }}</td>
                  <td>
                    <button class="btn btn-primary m-1">Show</button>
                    <button class="btn btn-info m-1">Edit</button>
                    <button class="btn btn-danger m-1">Delete</button>
                  </td>
                </tr>
              </tbody>
              <!-- <tbody v-if="students.length != 0">
                <tr v-for="(student, index) in students" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.roll }}</td>
                  <td>{{ student.address }}</td>
                  <td>
                    <button class="btn btn-primary m-1">Show</button>
                    <button class="btn btn-info m-1">Edit</button>
                    <button class="btn btn-danger m-1">Delete</button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr class="text-center">
                  Nothing Found
                </tr>
              </tbody> -->
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

    const store = useStore();
    const students = computed(() => store.state.students);
    const loadStudents = onMounted(() => store.dispatch("loadStudents"));

    // function addStudentForm() {
    //   if (form.name && form.roll && form.address) {
    //     axios
    //       .post("http://127.0.0.1:8000/api/student", {
    //         name: form.name,
    //         roll: form.roll,
    //         address: form.address,
    //       })
    //       .then((response) => {
    //         console.log(response);
    //       });
    //     form.name = "";
    //     form.roll = "";
    //     form.address = "";

    //     this.$store.dispatch("loadStudents");
    //   }
    // }

    return {
      form,
      students,
      // addStudentForm,
      loadStudents,
    };
  },
  methods: {
    addStudentForm() {
      axios
        .post("http://127.0.0.1:8000/api/student", {
          name: this.form.name,
          roll: this.form.roll,
          address: this.form.address,
        })
        .then((response) => {
          console.log(response);
        });
      this.form.name = "";
      this.form.roll = "";
      this.form.address = "";

      this.$store.dispatch("loadStudents");
    },
  },
};
</script>
