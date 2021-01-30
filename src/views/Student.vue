<template>
  <h3>Todo App with Api Call</h3>
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
                  <th>SL</th>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
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
            <form class=" text-left">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Name">
              </div>
              <div class="form-group">
                <label for="roll">Roll</label>
                <input type="text" class="form-control" id="roll" placeholder="Roll">
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <textarea class="form-control" name="" id="address" cols="20" rows="5" placeholder="Address"></textarea>
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
